import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { Router } from '@angular/router'
import { DestinationAutoCompleteVM } from 'src/app/features/destinations/classes/view-models/destination-autocomplete-vm'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { CheckInHttpService } from '../../classes/services/check-in.http.service'
import { indicate } from 'src/app/shared/services/helper.service'
import { Subject, map, startWith } from 'rxjs'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DestinationService } from 'src/app/features/destinations/classes/services/destination.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
// Custom

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    public isLoading = new Subject<boolean>()

    public searchForm: FormGroup
    public feature = 'check-in'
    public options: any[] = [
        { 'id': 1, 'description': this.getLabel('step-1-yes') },
        { 'id': 2, 'description': this.getLabel('step-1-no') }
    ]
    public destinations: DestinationAutoCompleteVM[] = []

    constructor(
        private dexieService: DexieService,
        private messageHintService: MessageInputHintService,
        private checkInService: CheckInHttpService,
        private messageLabelService: MessageLabelService,
        private dateHelperService: DateHelperService,
        private dialogService: ModalDialogService,
        private messageSnackbarService: MessageDialogService,
        private localStorageService: LocalStorageService,
        private destinationService: DestinationService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initSearchForm()
        this.populateDropdowns()
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

    private populateDexieFromAPI(): void {
        this.dexieService.populateTable('destinations', this.destinationService)
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = response.filter(x => x.isActive)
            this[filteredTable] = this.searchForm.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }
    private populateDropdowns(): void {
        setTimeout(() => {
            this.populateDropdownFromDexieDB('destinations', 'dropdownDestinations', 'destination', 'description', 'description')
        }, 5000)
    }

    private initSearchForm(): void {
        this.searchForm = this.formBuilder.group({
            selection: '',
            refNo: 'PA28952',
            complexGroup: this.formBuilder.group({
                date: [this.getToday()],
                destination: [''],
                lastname: [''],
                firstname: ['']
            })
        })
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    private getToday(): string {
        return (this.dateHelperService.formatDateToIso(new Date()))
    }

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
        if (this.searchForm.value.selection == '') {
            return true
        }
        if (this.searchForm.value.selection == 1) {
            return this.searchForm.value.refNo == ''
        }
        if (this.searchForm.value.selection == 2) {
            return (this.searchForm.value.complexGroup.date == '' || this.searchForm.value.complexGroup.destination == '' || this.searchForm.value.complexGroup.lastname == '' || this.searchForm.value.complexGroup.firstname == '')
        }
    }

    public doSearch(): void {
        if (this.searchForm.value.selection == 1) {
            this.searchByRefNo().then((response) => {
                this.localStorageService.saveItem('reservation', JSON.stringify(response.body))
                this.router.navigate(['reservation'])
            })
        }
        if (this.searchForm.value.selection == 2) {
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
}
