import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { map, startWith } from 'rxjs/operators'
// Custom
import { ConnectedUser } from 'src/app/shared/classes/connected-user'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { UpdateUserDto } from '../../classes/dtos/update-user-dto'
import { UserReadDto } from '../../classes/dtos/user-read-dto'
import { UserService } from '../../classes/services/user.service'
import { ValidationService } from '../../../../shared/services/validation.service'

@Component({
    selector: 'edit-user-form',
    templateUrl: './edit-user-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class EditUserFormComponent {

    //#region variables

    private record: UserReadDto
    private subscription = new Subscription()
    public feature = 'editUserForm'
    public featureIcon = 'users'
    public form: FormGroup
    public icon = ''
    public input: InputTabStopDirective
    public parentUrl = ''

    public arrowIcon = new BehaviorSubject('arrow_drop_down')
    public dropdownCustomers: Observable<SimpleEntity[]>
    public isAutoCompleteDisabled = true

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private router: Router, private sessionStorageService: SessionStorageService, private userService: UserService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.getRecord()
        this.populateFields()
        this.populateDropdowns()
        this.updateReturnUrl()
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

    public changePassword(): void {
        if (ConnectedUser.id != this.record.id.toString()) {
            this.dialogService.open(this.messageSnackbarService.passwordCanBeChangedOnlyByAccountOwner(), 'error', ['ok'])
        } else {
            if (this.form.dirty) {
                this.dialogService.open(this.messageSnackbarService.formIsDirty(), 'warning', ['abort', 'ok']).subscribe(() => {
                    // 
                })
            } else {
                this.router.navigate(['/users/' + this.record.id.toString() + '/changePassword'])
            }
        }
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

    public isAdmin(): boolean {
        return ConnectedUser.isAdmin
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

    private editUserFromList(): void {
        this.parentUrl = '/users'
        this.icon = 'arrow_back'
    }

    private editUserFromTopMenu(): void {
        this.parentUrl = '/home'
        this.icon = 'home'
    }

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): UpdateUserDto {
        return {
            id: this.form.value.id,
            userName: this.form.value.userName,
            displayname: this.form.value.displayname,
            customerId: this.form.value.customer.id == 0 ? null : this.form.value.customer.id,
            email: this.form.value.email,
            isAdmin: this.form.value.isAdmin,
            isActive: this.form.value.isActive
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        return new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data['userEditForm']
            if (formResolved.error === null) {
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

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: '',
            userName: ['', [Validators.required, Validators.maxLength(32), ValidationService.containsIllegalCharacters]],
            displayname: ['', [Validators.required, Validators.maxLength(32), ValidationService.beginsOrEndsWithSpace]],
            customer: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
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

    private populateFields(): void {
        this.form.setValue({
            id: this.record.id,
            userName: this.record.userName,
            displayname: this.record.displayname,
            customer: { 'id': this.record.customer.id, 'description': this.record.customer.id == 0 ? this.emojiService.getEmoji('wildcard') : this.record.customer.description },
            email: this.record.email,
            isAdmin: this.record.isAdmin,
            isActive: this.record.isActive
        })
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(user: UpdateUserDto): void {
        this.userService.save(user).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false, false)
            }
        })
    }

    private updateReturnUrl(): void {
        this.sessionStorageService.getItem('returnUrl') == '/' ? this.editUserFromTopMenu() : this.editUserFromList()
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

    //#endregion

}
