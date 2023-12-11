import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { DestinationService } from 'src/app/features/destinations/classes/services/destination.service'
import { GenderService } from 'src/app/features/genders/classes/services/gender-http.service'
import { NationalityService } from 'src/app/features/nationalities/classes/services/nationality.service'
import { DexieService } from 'src/app/shared/services/dexie.service'

@Component({
    selector: 'app-greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.css']
})

export class GreetingComponent {

    constructor(private nationalityService: NationalityService, private genderService: GenderService, private router: Router, private dexieService: DexieService, private destinationService: DestinationService) { }

    ngOnInit(): void {
        this.populateDexieFromAPI()
    }

    public start(): void {
        this.router.navigate(['search'])
    }

    private populateDexieFromAPI(): void {
        this.dexieService.populateTable('destinations', this.destinationService)
        this.dexieService.populateTable('genders', this.genderService)
        this.dexieService.populateTable('nationalities', this.nationalityService)
    }

}
