import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { Component } from '@angular/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { Router } from '@angular/router'
import { Subject, map, startWith } from 'rxjs'
// Custom
import { CheckInHttpService } from '../../classes/services/check-in.http.service'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DestinationAutoCompleteVM } from 'src/app/features/destinations/classes/view-models/destination-autocomplete-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { indicate } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    //#region variables

    public feature = 'check-in'
    public isLoading = new Subject<boolean>()
    public searchForm: FormGroup
    public options: any[] = [{ 'id': 1, 'description': this.getLabel('step-2-yes') }, { 'id': 2, 'description': this.getLabel('step-2-no') }]
    public destinations: DestinationAutoCompleteVM[] = []

    //#endregion

    constructor(private checkInService: CheckInHttpService, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogService: ModalDialogService, private formBuilder: FormBuilder, private localStorageService: LocalStorageService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public patchFormWithSelectedDate(event: MatDatepickerInputEvent<Date>): void {
        this.searchForm.patchValue({
            complexGroup: {
                date: this.dateHelperService.formatDateToIso(new Date(event.value))
            }
        })
    }

    public requiredFieldsShouldBeGiven(): boolean {
        if (this.searchForm.value.hasRefNo == '') {
            return true
        }
        if (this.searchForm.value.hasRefNo == 1) {
            return this.searchForm.value.refNo == ''
        }
        if (this.searchForm.value.hasRefNo == 2) {
            return (this.searchForm.value.complexGroup.date == '' || this.searchForm.value.complexGroup.destination == '' || this.searchForm.value.complexGroup.lastname == '' || this.searchForm.value.complexGroup.firstname == '')
        }
    }

    public doSearch(): void {
        if (this.searchForm.value.hasRefNo == 1) {
            this.searchByRefNo().then((response) => {
                this.localStorageService.saveItem('reservation', JSON.stringify(response.body))
                this.router.navigate(['reservation'])
            })
        }
        if (this.searchForm.value.hasRefNo == 2) {
            this.searchByDate().then((response) => {
                this.localStorageService.saveItem('reservation', JSON.stringify(response.body))
                this.router.navigate(['reservation'])
            })
        }
    }

    public searchByDate(): Promise<any> {
        return new Promise((resolve) => {
            this.checkInService.getByDate(this.searchForm.value.complexGroup.date, this.searchForm.value.complexGroup.destination, this.searchForm.value.complexGroup.lastname, this.searchForm.value.complexGroup.firstname).pipe(indicate(this.isLoading)).subscribe({
                next: (response) => {
                    resolve(response)
                },
                error: (errorFromInterceptor) => {
                    this.showError(errorFromInterceptor)
                    resolve(false)
                }
            })
            return false
        })
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public doTodayTasks(): void {
        this.searchForm.patchValue({
            complexGroup: {
                date: this.dateHelperService.formatDateToIso(new Date())
            }
        })
    }

    public next(): void {
        this.router.navigate(['reservation'])
    }

    public searchByRefNo(): Promise<any> {
        return new Promise((resolve) => {
            this.checkInService.getByRefNo(this.searchForm.value.refNo).pipe(indicate(this.isLoading)).subscribe({
                next: (response) => {
                    resolve(response)
                },
                error: (errorFromInterceptor) => {
                    this.showError(errorFromInterceptor)
                    resolve(false)
                }
            })
            return false
        })
    }

    //#endregion

    //#region private methods

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private getToday(): string {
        return (this.dateHelperService.formatDateToIso(new Date()))
    }

    private initForm(): void {
        this.searchForm = this.formBuilder.group({
            hasRefNo: '',
            refNo: 'PA28952',
            complexGroup: this.formBuilder.group({
                date: [this.getToday()],
                destination: [''],
                lastname: [''],
                firstname: ['']
            })
        })
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = response.filter(x => x.isActive)
            this[filteredTable] = this.searchForm.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private populateDropdowns(): void {
        setTimeout(() => {
            this.populateDropdownFromDexieDB('destinations', 'dropdownDestinations', 'destination', 'description', 'description')
        }, 5000)
    }

    private showError(error: any): void {
        switch (error.status) {
            case 402:
                this.dialogService.open(this.messageSnackbarService.checkInAfterDepartureIsNotAllowed(), 'error', ['ok'])
                break
            case 404:
                this.dialogService.open(this.messageSnackbarService.reservationNotFound(), 'error', ['ok'])
                break
        }
    }

    //#endregion

    //#region getters

    get refNo(): AbstractControl {
        return this.searchForm.get('refNo')
    }

    get complexGroup(): AbstractControl {
        return this.searchForm.get('complexGroup')
    }

    get date(): AbstractControl {
        return this.searchForm.get('complexGroup.date')
    }

    get destination(): AbstractControl {
        return this.searchForm.get('complexGroup.destination')
    }

    get lastname(): AbstractControl {
        return this.searchForm.get('complexGroup.lastname')
    }

    get firstname(): AbstractControl {
        return this.searchForm.get('complexGroup.firstname')
    }

    //#endregion

}
