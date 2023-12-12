import { Component, Input, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Table } from 'primeng/table'
// Custom
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { PassengerFormComponent } from '../5-passenger-form/passenger-form.component'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ReservationVM } from '../../classes/view-models/reservation-vm'
import { HelperService } from 'src/app/shared/services/helper.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { CheckInPassengerReadDto } from '../../classes/dtos/check-in-passenger-read-dto'

@Component({
    selector: 'passenger-list',
    templateUrl: './passenger-list.component.html',
    styleUrls: ['./passenger-list.component.css']
})

export class PassengerListComponent {

    @ViewChild('table') table: Table | undefined

    @Input() passengers: CheckInPassengerReadDto[] = []

    public feature = 'check-in'
    public reservation: ReservationVM
    public reservationForm: FormGroup

    constructor(private emojiService: EmojiService, private helperService: HelperService, private messageLabelService: MessageLabelService, private router: Router, private dialog: MatDialog, private localStorageService: LocalStorageService, private interactionService: InteractionService) { }

    ngOnInit(): void {
        this.reservation = JSON.parse(this.localStorageService.getItem('reservation'))
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }


    public previous(): void {
        this.router.navigate(['reservation'])
    }

    public next(): void {
        this.router.navigate(['email'])
    }

    public highlightRow(id: any): void {
        this.helperService.highlightRow(id)
    }


    public editRecord(record: any): void {
        this.showPassengerForm(record)
    }

    private showPassengerForm(passenger?: any): void {
        if (passenger == undefined) {
            this.showEmptyForm()
        }
        if (passenger != undefined) {
            this.sendPassengerToForm(passenger)
        }
    }

    private showEmptyForm(): void {
        const dialog = this.dialog.open(PassengerFormComponent, {
            width: '400px',
            data: {
                id: 0,
                reservationId: this.reservation.reservationId,
                lastname: '',
                firstname: '',
                nationality: { 'id': 1, 'description': '' },
                gender: { 'id': 1, 'description': '' },
                birthdate: '',
                specialCare: '',
                remarks: ''
            }
        })
        dialog.afterClosed().subscribe((newPassenger: any) => {
            if (newPassenger) {
                this.reservation.passengers.push(newPassenger)
                // this.reservation.outputPassengerCount.emit(this.reservation.passengers.length)
                // this.reservation.outputPassengers.emit(this.reservation.passengers)
                this.localStorageService.saveItem('reservation', JSON.stringify(this.reservation))
                console.log(this.reservation)
            }
        })
    }

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }



    private sendPassengerToForm(passenger: any): void {
        const dialog = this.dialog.open(PassengerFormComponent, {
            disableClose: true,
            width: '400px',
            data: {
                id: passenger.id,
                reservationId: passenger.reservationId,
                gender: { 'id': passenger.gender.id, 'description': passenger.gender.description },
                nationality: { 'id': passenger.nationality.id, 'description': passenger.nationality.description },
                lastname: passenger.lastname,
                firstname: passenger.firstname,
                birthdate: passenger.birthdate,
                remarks: passenger.remarks,
                specialCare: passenger.specialCare
            }
        })
        dialog.afterClosed().subscribe((result: any) => {
            if (result) {
                passenger = this.reservation.passengers.find(({ id }) => id === result.id)
                passenger.lastname = result.lastname
                passenger.firstname = result.firstname
                passenger.nationality = result.nationality
                passenger.birthdate = result.birthdate
                passenger.gender = result.gender
                passenger.specialCare = result.specialCare
                passenger.remarks = result.remarks
                this.localStorageService.saveItem('reservation', JSON.stringify(this.reservation))
                console.log(this.reservation)
                // this.interactionService.updateReservation()
            }
        })
    }

    public deleteRow(record: any): void {
        const index = this.reservation.passengers.indexOf(record)
        this.reservation.passengers.splice(index, 1)
        // this.reservation.outputPassengerCount.emit(this.reservation.passengers.length)
        // this.reservation.outputPassengers.emit(this.reservation.passengers)
        this.localStorageService.saveItem('reservation', JSON.stringify(this.reservation))
        // this.interactionService.updateReservation()
    }

    public newRow(): void {
        this.showPassengerForm()
    }

    public checkTotalPaxAgainstPassengerCount(): boolean {
        if (this.passengers != null) {
            return this.reservation.passengers.length >= this.reservation.totalPax ? true : false
        }
    }


}
