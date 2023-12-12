import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { CheckInHttpService } from '../../classes/services/check-in.http.service'
import { indicate } from 'src/app/shared/services/helper.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { Subject } from 'rxjs'
// Custom

@Component({
    selector: 'email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.css']
})

export class EmailFormComponent {

    public feature = 'check-in'
    public isLoading = new Subject<boolean>()
    public form: FormGroup
    public reservation: any

    constructor(private localStorageService: LocalStorageService, private checkInHttpService: CheckInHttpService, private router: Router, private formBuilder: FormBuilder, private messageLabelService: MessageLabelService, private messageHintService: MessageInputHintService) { }

    ngOnInit(): void {
        this.initForm()
    }

    public previous(): void {
        this.router.navigate(['passenger-list'])
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }


    private initForm(): void {
        this.form = this.formBuilder.group({
            email: ''
        })
    }

    get email(): AbstractControl {
        return this.form.get('email')
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
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



}
