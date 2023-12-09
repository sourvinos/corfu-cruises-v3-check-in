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
            refNo: form.refNo,
            email: form.email,
            remarks: form.remarks,
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
                remarks: passenger.remarks
            }
            passengers.push(x)
        })
        return passengers
    }

    //#endregion

}
