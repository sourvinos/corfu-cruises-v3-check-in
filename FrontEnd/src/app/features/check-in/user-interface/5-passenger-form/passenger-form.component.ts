import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, NgZone } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable, Subject } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
// Custom
import { CheckInPassengerReadDto } from '../../classes/dtos/check-in-passenger-read-dto'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'passenger-form',
    templateUrl: './passenger-form.component.html',
    styleUrls: ['./passenger-form.component.css']
})

export class PassengerFormComponent {

    //#region variables

    public passenger: CheckInPassengerReadDto
    private unsubscribe = new Subject<void>()
    public feature = 'check-in'
    public featureIcon = ''
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = null

    public minBirthDate = new Date(new Date().getFullYear() - 99, 0, 1)
    public maxBirthDate = new Date()

    public isAutoCompleteDisabled = true
    public dropdownNationalities: Observable<SimpleEntity[]>
    public dropdownGenders: Observable<SimpleEntity[]>

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: CheckInPassengerReadDto, private dateAdapter: DateAdapter<any>, private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogRef: MatDialogRef<PassengerFormComponent>, private formBuilder: FormBuilder, private helperService: HelperService, private localStorageService: LocalStorageService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private ngZone: NgZone,) {
        this.passenger = data
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
        this.populateFields()
        this.setLocale()
    }

    //#endregion

    //#region public methods

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    public onClose(): void {
        this.dialogRef.close()
    }

    public onSave(): void {
        this.closeDialog()
    }

    public patchFormWithSelectedDate(event: any): void {
        this.form.patchValue({
            birthdate: this.dateHelperService.gotoPreviousCenturyIfFutureDate(event.value.date)
        })
    }

    //#endregion

    //#region private methods

    private assignTempIdToNewPassenger(): number {
        return Math.round(Math.random() * new Date().getMilliseconds())
    }

    private closeDialog(): void {
        this.ngZone.run(() => {
            this.dialogRef.close(this.flattenForm())
        })
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): any {
        return {
            'id': this.form.value.id == 0
                ? this.assignTempIdToNewPassenger()
                : this.form.value.id,
            'reservationId': this.form.value.reservationId,
            'lastname': this.form.value.lastname,
            'firstname': this.form.value.firstname,
            'occupantId': 2,
            'birthdate': this.dateHelperService.formatDateToIso(new Date(this.form.value.birthdate)),
            'nationality': this.form.value.nationality,
            'gender': this.form.value.gender,
            'specialCare': this.form.value.specialCare,
            'remarks': this.form.value.remarks
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: this.data.id,
            reservationId: this.data.reservationId,
            gender: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            nationality: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            lastname: ['', [Validators.required, Validators.maxLength(128)]],
            firstname: ['', [Validators.required, Validators.maxLength(128)]],
            birthdate: ['', [Validators.required]],
            specialCare: ['', Validators.maxLength(128)],
            remarks: ['', Validators.maxLength(128)]
        })
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = this.passenger.reservationId.toString() == '' ? response.filter(x => x.isActive) : response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('genders', 'dropdownGenders', 'gender', 'description', 'description')
        this.populateDropdownFromDexieDB('nationalities', 'dropdownNationalities', 'nationality', 'description', 'description')
    }

    private populateFields(): void {
        if (this.passenger.id != 0) {
            this.form.setValue({
                id: this.passenger.id,
                reservationId: this.passenger.reservationId,
                gender: { 'id': this.passenger.gender.id, 'description': this.passenger.gender.description },
                nationality: { 'id': this.passenger.nationality.id, 'description': this.passenger.nationality.description },
                lastname: this.passenger.lastname,
                firstname: this.passenger.firstname,
                birthdate: this.passenger.birthdate,
                specialCare: this.passenger.specialCare,
                remarks: this.passenger.remarks
            })
        }
    }

    private setLocale(): void {
        this.dateAdapter.setLocale(this.localStorageService.getLanguage())
    }

    //#endregion

    //#region getters

    get lastname(): AbstractControl {
        return this.form.get('lastname')
    }

    get firstname(): AbstractControl {
        return this.form.get('firstname')
    }

    get nationality(): AbstractControl {
        return this.form.get('nationality')
    }

    get gender(): AbstractControl {
        return this.form.get('gender')
    }

    get birthdate(): AbstractControl {
        return this.form.get('birthdate')
    }

    get specialCare(): AbstractControl {
        return this.form.get('specialCare')
    }

    get remarks(): AbstractControl {
        return this.form.get('remarks')
    }

    //#endregion

}
