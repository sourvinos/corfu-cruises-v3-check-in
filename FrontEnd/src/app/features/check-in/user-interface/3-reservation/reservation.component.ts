import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
// Custom

@Component({
    selector: 'reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})

export class ReservationComponent {

    public reservation: any

    constructor(private router: Router, private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
        this.reservation = JSON.parse(this.localStorageService.getItem('reservation'))
    }

    public previous(): void {
        this.router.navigate(['search'])
    }

    public next(): void {
        this.router.navigate(['passenger-list'])
    }

}
