import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Subscription } from 'rxjs'
// Custom
import { CustomerReadDto } from '../classes/dtos/customer-read-dto'
import { CustomerService } from 'src/app/features/customers/classes/services/customer.service'
import { CustomerWriteDto } from '../classes/dtos/customer-write-dto'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'

@Component({
    selector: 'customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css']
})

export class CustomerFormComponent {

    //#region variables

    private record: CustomerReadDto
    private recordId: number
    private subscription = new Subscription()
    public feature = 'customerForm'
    public featureIcon = 'customers'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/customers'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private dexieService: DexieService, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageDialogService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
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
                this.customerService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('customers', this.form.value.id)
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

    //#endregion

    //#region private methods

    private cleanup(): void {
        this.subscription.unsubscribe()
    }

    private flattenForm(): CustomerWriteDto {
        return {
            id: this.form.value.id,
            description: this.form.value.description,
            profession: this.form.value.profession,
            address: this.form.value.address,
            phones: this.form.value.phones,
            personInCharge: this.form.value.personInCharge,
            email: this.form.value.email,
            isActive: this.form.value.isActive
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['customerForm']
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
            description: ['', [Validators.required, Validators.maxLength(128)]],
            profession: ['', [Validators.maxLength(128)]],
            address: ['', [Validators.maxLength(128)]],
            phones: ['', [Validators.maxLength(128)]],
            personInCharge: ['', [Validators.maxLength(128)]],
            email: ['', [Validators.email, Validators.maxLength(128)]],
            isActive: true
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                description: this.record.description,
                profession: this.record.profession,
                address: this.record.address,
                phones: this.record.phones,
                personInCharge: this.record.personInCharge,
                email: this.record.email,
                isActive: this.record.isActive
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(customer: CustomerWriteDto): void {
        this.customerService.save(customer).subscribe({
            next: (response) => {
                this.dexieService.update('customers', { 'id': response.id, 'description': customer.description })
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false)
            }
        })
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    //#endregion

    //#region getters

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get profession(): AbstractControl {
        return this.form.get('profession')
    }

    get address(): AbstractControl {
        return this.form.get('address')
    }

    get phones(): AbstractControl {
        return this.form.get('phones')
    }

    get personInCharge(): AbstractControl {
        return this.form.get('personInCharge')
    }

    get email(): AbstractControl {
        return this.form.get('email')
    }

    //#endregion

}
