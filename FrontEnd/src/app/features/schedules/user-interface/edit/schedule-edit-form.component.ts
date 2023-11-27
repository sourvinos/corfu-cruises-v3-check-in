import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { map, startWith } from 'rxjs/operators'
// Custom
import { DestinationActiveVM } from 'src/app/features/destinations/classes/view-models/destination-active-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { PortActiveVM } from 'src/app/features/ports/classes/view-models/port-active-vm'
import { ScheduleReadDto } from '../../classes/form/schedule-read-vm'
import { ScheduleService } from '../../classes/services/schedule.service'
import { ScheduleWriteVM } from '../../classes/form/schedule-write-vm'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'schedule-edit',
    templateUrl: './schedule-edit-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class ScheduleEditFormComponent {

    //#region variables

    private record: ScheduleReadDto
    private recordId: number
    private subscription = new Subscription()
    public feature = 'scheduleEditForm'
    public featureIcon = 'schedules'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/schedules'

    public arrowIcon = new BehaviorSubject('arrow_drop_down')
    public dropdownDestinations: Observable<DestinationActiveVM[]>
    public dropdownPorts: Observable<PortActiveVM[]>
    public isAutoCompleteDisabled = true

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dateAdapter: DateAdapter<any>, private dexieService: DexieService, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private router: Router, private scheduleService: ScheduleService, private sessionStorageService: SessionStorageService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
        this.populateDropdowns()
        this.subscribeToInteractionService()
        this.setLocale()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    canDeactivate(): boolean {
        return this.helperService.goBackFromForm(this.form)
    }

    //#endregion

    //#region public methods

    public autocompleteFields(subject: { description: any }): any {
        return subject ? subject.description : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.dialogService.open(this.messageSnackbarService.confirmDelete(), 'warning', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.scheduleService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    //#endregion

    //#region private methods

    private cleanup(): void {
        this.subscription.unsubscribe()
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): ScheduleWriteVM {
        return {
            id: this.form.value.id,
            date: this.form.value.date,
            destinationId: this.form.value.destination.id,
            portId: this.form.value.port.id,
            maxPax: this.form.value.maxPax,
            time: this.form.value.time,
            isActive: this.form.value.isActive
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['scheduleEditForm']
                if (formResolved.error == null) {
                    this.record = formResolved.record.body
                    resolve(this.record)
                } else {
                    this.dialogService.open(this.messageSnackbarService.filterResponse(formResolved.error), 'error', ['ok']).subscribe(() => {
                        this.resetForm()
                        this.goBack()
                    })
                }
            })
        }
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            date: ['', [Validators.required, Validators.maxLength(10)]],
            destination: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            port: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            maxPax: [0, [Validators.required, Validators.min(0), Validators.max(999)]],
            time: ['', [Validators.required, ValidationService.isTime]],
            isActive: true
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('destinations', 'dropdownDestinations', 'destination', 'description')
        this.populateDropdownFromDexieDB('ports', 'dropdownPorts', 'port', 'description')
    }

    private populateDropdownFromDexieDB(table: string, filteredTable: string, formField: string, modelProperty: string): void {
        this.dexieService.table(table).toArray().then((response) => {
            this[table] = response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(table, modelProperty, value)))
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                date: this.record.date,
                destination: { 'id': this.record.destination.id, 'description': this.record.destination.description },
                port: { 'id': this.record.port.id, 'description': this.record.port.description },
                maxPax: this.record.maxPax,
                time: this.record.time,
                isActive: this.record.isActive
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(schedule: ScheduleWriteVM): void {
        this.scheduleService.save(schedule).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false)
            }
        })
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshDateAdapter.subscribe(() => {
            this.setLocale()
        })
    }

    //#endregion

    //#region getters

    get date(): AbstractControl {
        return this.form.get('date')
    }

    get destination(): AbstractControl {
        return this.form.get('destination')
    }

    get port(): AbstractControl {
        return this.form.get('port')
    }

    get maxPax(): AbstractControl {
        return this.form.get('maxPax')
    }

    get time(): AbstractControl {
        return this.form.get('time')
    }

    //#endregion

}
