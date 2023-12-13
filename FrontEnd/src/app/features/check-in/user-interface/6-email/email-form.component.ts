import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
// Custom
import { CheckInHttpService } from '../../classes/services/check-in.http.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { indicate } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.css']
})

export class EmailFormComponent {

    //#region variables

    public feature = 'check-in'
    public isLoading = new Subject<boolean>()
    public form: FormGroup
    public reservation: any

    //#endregion

    constructor(private localStorageService: LocalStorageService, private checkInHttpService: CheckInHttpService, private router: Router, private formBuilder: FormBuilder, private messageLabelService: MessageLabelService, private messageHintService: MessageInputHintService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
    }

    //#endregion

    //#region public methods

    public finish(): void {
        this.router.navigate(['/'])
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public previous(): void {
        this.router.navigate(['passenger-list'])
    }

    public next(): void {
        this.router.navigate(['/'])
    }

    public onSendEmail(): void {
        this.reservation = JSON.parse(this.localStorageService.getItem('reservation'))
        this.reservation.email = this.form.value.email
        this.localStorageService.saveItem('reservation', JSON.stringify(this.reservation))
        // this.reservationForm.patchValue({
        //     email: this.searchForm.value.email
        // })
        this.checkInHttpService.sendEmail(this.reservation).pipe(indicate(this.isLoading)).subscribe({
            complete: () => {
                // stepper.next()
            },
            error: () => {
                // this.isEmailSent = false
            }
        })
    }

    //#endregion

    //#region private methods

    private initForm(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.email, Validators.maxLength(128), Validators.required]],
        })
    }

    //#endregion

    //#region getters

    get email(): AbstractControl {
        return this.form.get('email')
    }

    //#endregion

}
