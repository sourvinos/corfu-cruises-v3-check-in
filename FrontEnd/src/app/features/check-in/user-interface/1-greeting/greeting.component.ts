import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { DestinationHttpService } from 'src/app/features/destinations/destination-http.service'
import { GenderService } from 'src/app/features/genders/gender-http.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { NationalityHttpService } from 'src/app/features/nationalities/nationality-http.service'

@Component({
    selector: 'app-greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.css']
})

export class GreetingComponent {

    public feature = 'check-in'

    constructor(private destinationService: DestinationHttpService, private genderService: GenderService, private messageLabelService: MessageLabelService, private NationalityHttpService: NationalityHttpService, private localStorageService: LocalStorageService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.populateStorageFromAPI()
        this.clearLocalStorage()
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public next(): void {
        this.router.navigateByUrl('search')
    }

    //#endregion

    //#region private methods

    private clearLocalStorage(): void {
        this.localStorageService.deleteItems([
            { 'item': 'criteria', 'when': 'always' },
            { 'item': 'reservation', 'when': 'always' }
        ])
    }

    private populateStorageFromAPI(): void {
        this.destinationService.getActive().subscribe(response => { this.localStorageService.saveItem('destinations', JSON.stringify(response)) })
        this.genderService.getActive().subscribe(response => { this.localStorageService.saveItem('genders', JSON.stringify(response)) })
        this.NationalityHttpService.getActive().subscribe(response => { this.localStorageService.saveItem('nationalities', JSON.stringify(response)) })
    }

    //#endregion

}
