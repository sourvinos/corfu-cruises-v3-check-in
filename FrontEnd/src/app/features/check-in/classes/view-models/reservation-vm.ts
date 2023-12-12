import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { PassengerVM } from './passenger-vm'
import { Guid } from 'guid-typescript'

export interface ReservationVM {

    reservationId: Guid
    date: string
    refNo: string
    ticketNo: string
    destination: SimpleEntity
    customer: SimpleEntity
    pickupPoint: SimpleEntity
    adults: number
    kids: number
    free: number
    totalPax: number
    phones: string
    remarks: string
    passengers: PassengerVM[]

}

