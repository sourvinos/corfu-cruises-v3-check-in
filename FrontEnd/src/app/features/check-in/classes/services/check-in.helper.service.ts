import { Injectable } from '@angular/core'
// Custom
import { CheckInPassengerWriteDto } from '../dtos/check-in-passenger-write-dto'
import { CheckInReservationWriteDto } from '../dtos/check-in-reservation-write-dto'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'

@Injectable({ providedIn: 'root' })

export class CheckInHelperService {

    constructor(private dateHelperService: DateHelperService) { }

    //#region public methods

    public flattenForm(form: any): CheckInReservationWriteDto {
        return {
            reservationId: form.reservationId != '' ? form.reservationId : null,
            customerId: form.customer.id,
            destinationId: form.destination.id,
            driverId: form.driver ? form.driver.id : null,
            pickupPointId: form.pickupPoint.id,
            portId: form.port.id,
            shipId: form.ship ? form.ship.id : null,
            date: this.dateHelperService.formatDateToIso(new Date(form.date)),
            refNo: form.refNo,
            ticketNo: form.ticketNo,
            email: form.email,
            phones: form.phones,
            adults: form.adults,
            kids: form.kids,
            free: form.free,
            remarks: form.remarks,
            putAt: form.putAt,
            passengers: this.mapPassengers(form)
        }
    }

    //#endregion

    //#region private methods

    private mapPassengers(form: any): CheckInPassengerWriteDto[] {
        const passengers = []
        form.passengers.forEach((passenger: any) => {
            const x: CheckInPassengerWriteDto = {
                reservationId: form.reservationId,
                genderId: passenger.gender.id,
                nationalityId: passenger.nationality.id,
                occupantId: 2,
                lastname: passenger.lastname,
                firstname: passenger.firstname,
                birthdate: this.dateHelperService.formatDateToIso(new Date(passenger.birthdate)),
                specialCare: passenger.specialCare,
                remarks: passenger.remarks,
                isBoarded: passenger.isBoarded
            }
            passengers.push(x)
        })
        return passengers
    }

    //#endregion

}
