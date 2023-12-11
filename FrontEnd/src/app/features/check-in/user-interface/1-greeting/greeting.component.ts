import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { DestinationService } from 'src/app/features/destinations/classes/services/destination.service'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { GenderService } from 'src/app/features/genders/classes/services/gender-http.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { NationalityService } from 'src/app/features/nationalities/classes/services/nationality.service'

@Component({
    selector: 'app-greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.css']
})

export class GreetingComponent {

    public feature = 'check-in'

    constructor(private destinationService: DestinationService, private dexieService: DexieService, private genderService: GenderService, private messageLabelService: MessageLabelService, private nationalityService: NationalityService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.populateDexieFromAPI()
    }

    //#endregion

    //#region public methods

    public next(): void {
        this.router.navigate(['search'])
    }

    //#endregion

    //#region private methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    private populateDexieFromAPI(): void {
        this.dexieService.populateTable('destinations', this.destinationService)
        this.dexieService.populateTable('genders', this.genderService)
        this.dexieService.populateTable('nationalities', this.nationalityService)
    }

    //#endregion

}
