import { Guid } from 'guid-typescript'
// Custom
import { CheckInPassengerWriteDto } from './check-in-passenger-write-dto'

export interface CheckInReservationWriteDto {

    // PK
    reservationId: Guid
    // FKs
    customerId: number
    destinationId: number
    driverId?: number
    pickupPointId: number
    portId: number
    shipId?: number
    // Fields
    date: string
    refNo: string
    ticketNo: string
    email: string
    phones: string
    adults: number
    kids: number
    free: number
    remarks: string
    passengers: CheckInPassengerWriteDto[]
    // Rowversion
    putAt: string

}
