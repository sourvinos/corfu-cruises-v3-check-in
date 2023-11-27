import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { Component } from '@angular/core'
import { map, startWith } from 'rxjs/operators'
// Custom
import { ConfirmValidParentMatcher, ValidationService } from '../../../../shared/services/validation.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { UserNewDto } from '../../classes/dtos/new-user-dto'
import { UserService } from '../../classes/services/user.service'

@Component({
    selector: 'new-user-form',
    templateUrl: './new-user-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './new-user-form.component.css']
})

export class NewUserFormComponent {

    //#region variables

    private subscription = new Subscription()
    public feature = 'newUserForm'
    public featureIcon = 'users'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/users'

    public arrowIcon = new BehaviorSubject('arrow_drop_down')
    public dropdownCustomers: Observable<SimpleEntity[]>
    public isAutoCompleteDisabled = true

    public confirmValidParentMatcher = new ConfirmValidParentMatcher()
    public hidePassword = true

    //#endregion

    constructor(private dexieService: DexieService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private sessionStorageService: SessionStorageService, private userService: UserService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.populateDropdowns()
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

    private flattenForm(): UserNewDto {
        return {
            userName: this.form.value.userName,
            displayname: this.form.value.displayname,
            customerId: this.form.value.customer.id == 'all' ? null : this.form.value.customer.id,
            email: this.form.value.email,
            password: this.form.value.passwords.password,
            confirmPassword: this.form.value.passwords.confirmPassword,
            isAdmin: this.form.value.isAdmin,
            isActive: this.form.value.isActive
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.maxLength(32), ValidationService.containsIllegalCharacters]],
            displayname: ['', [Validators.required, Validators.maxLength(32)]],
            customer: ['', ValidationService.RequireAutocomplete],
            email: ['', [Validators.required, Validators.maxLength(128), Validators.email]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(128), ValidationService.containsSpace]],
                confirmPassword: ['', [Validators.required, ValidationService.containsSpace]]
            }, { validator: ValidationService.childrenEqual }),
            isAdmin: false,
            isActive: true
        })
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('customers', 'dropdownCustomers', 'customer', 'description', true)
    }

    private populateDropdownFromDexieDB(table: string, filteredTable: string, formField: string, modelProperty: string, includeWildCard: boolean): void {
        this.dexieService.table(table).toArray().then((response) => {
            this[table] = response
            includeWildCard ? this[table].unshift({ 'id': '0', 'description': '[⭐]' }) : null
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(table, modelProperty, value)))
        })
    }

    private saveRecord(user: UserNewDto): void {
        this.userService.saveUser(user).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false, false)
            }
        })
    }

    //#endregion

    //#region getters

    get userName(): AbstractControl {
        return this.form.get('userName')
    }

    get displayname(): AbstractControl {
        return this.form.get('displayname')
    }

    get customer(): AbstractControl {
        return this.form.get('customer')
    }

    get email(): AbstractControl {
        return this.form.get('email')
    }

    get passwords(): AbstractControl {
        return this.form.get('passwords')
    }

    get password(): AbstractControl {
        return this.form.get('passwords.password')
    }

    get confirmPassword(): AbstractControl {
        return this.form.get('passwords.confirmPassword')
    }

    get matchingPasswords(): boolean {
        return this.form.get('passwords.password').value == this.form.get('passwords.confirmPassword').value
    }

    //#endregion

}
