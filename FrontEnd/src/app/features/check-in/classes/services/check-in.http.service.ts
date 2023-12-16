import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { CheckInReservationReadDto } from '../dtos/check-in-reservation-read-dto'
import { CheckInReservationVM } from '../view-models/list/check-in-reservation-vm'
import { CheckInReservationWriteDto } from '../dtos/check-in-reservation-write-dto'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class CheckInHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/reservations')
    }

    getByRefNo(refNo: string): Observable<CheckInReservationVM> {
        return this.http.get<any>(this.url + '/refNo/' + refNo)
    }

    getByDate(date: string, destinationId: number, lastname: string, firstname: string): Observable<CheckInReservationVM> {
        return this.http.get<any>(this.url + '/date/' + date + '/destinationId/' + destinationId + '/lastname/' + lastname + '/firstname/' + firstname)
    }

    updateReservation(reservation: CheckInReservationWriteDto): Observable<any> {
        return this.http.put<any>(this.url, reservation)
    }

    sendEmail(reservation: CheckInReservationReadDto): Observable<any> {
        return this.http.post<any>(this.url + '/emailReservation', reservation)
    }

}
