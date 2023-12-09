import { Guid } from 'guid-typescript'
// Custom
import { CheckInPassengerWriteDto } from './check-in-passenger-write-dto'

export interface CheckInReservationWriteDto {

    // PK
    reservationId: Guid
    // Fields
    refNo: string
    email: string
    remarks: string
    passengers: CheckInPassengerWriteDto[]

}
