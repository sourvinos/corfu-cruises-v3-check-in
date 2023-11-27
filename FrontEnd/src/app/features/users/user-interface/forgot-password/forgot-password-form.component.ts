import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'forgot-password-form',
    templateUrl: './forgot-password-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', '../../../../shared/styles/login-forgot-reset-password.css']
})

export class ForgotPasswordFormComponent {

    //#region variables

    public feature = 'forgotPasswordForm'
    public featureIcon = 'password'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public isLoading: boolean
    public parentUrl = '/login'

    //#endregion

    constructor(private accountService: AccountService, private formBuilder: FormBuilder, private emojiService: EmojiService, private helperService: HelperService, private localStorageService: LocalStorageService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.focusOnField()
        this.populateFields()
    }

    //#endregion

    //#region public methods

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
        this.isLoading = true
        this.accountService.forgotPassword(this.form.value).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.emailSent(), 'success', this.parentUrl, this.form, true, true)
                this.isLoading = false
            },
            error: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.emailNotSent(), 'error', this.parentUrl, this.form)
                this.isLoading = false
            }
        })
    }

    //#endregion

    //#region private methods

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            returnUrl: '',
            language: ''
        })
    }

    private populateFields(): void {
        this.form.patchValue({
            returnUrl: environment.clientUrl,
            language: this.localStorageService.getLanguage(),
        })
    }

    //#endregion

    //#region getters

    get email(): AbstractControl {
        return this.form.get('email')
    }

    //#endregion

}
