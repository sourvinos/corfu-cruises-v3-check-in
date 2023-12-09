import { Component, VERSION } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { HelperService } from '../../services/helper.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { Router } from '@angular/router'
import { DexieService } from '../../services/dexie.service'
import { NationalityService } from 'src/app/features/nationalities/classes/services/nationality.service'
import { DestinationService } from 'src/app/features/destinations/classes/services/destination.service'
import { GenderService } from 'src/app/features/genders/classes/services/gender-http.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    //#region variables

    public form: FormGroup
    public companyLogo: any
    public ngVersion: any

    //#endregion

    constructor(
        private genderService: GenderService,
        private destinationService: DestinationService,
        private nationalityService: NationalityService,
        private dexieService: DexieService,
        private router: Router,
        private formBuilder: FormBuilder,
        private dateHelperService: DateHelperService,
        private helperService: HelperService,
        private sessionStorageService: SessionStorageService,
        private titleService: Title
        ) { }

    //#region lifecyle hooks

    ngOnInit(): void {
        this.populateDexieFromAPI()
        this.getAppName()
        this.setWindowTitle()
        this.getNgVersion()
        this.initForm()
    }

    //#endregion

    public start(): void {
        this.router.navigate(['check-in'])
    }

    private populateDexieFromAPI(): void {
        this.dexieService.populateTable('destinations', this.destinationService)
        this.dexieService.populateTable('genders', this.genderService)
        this.dexieService.populateTable('nationalities', this.nationalityService)
    }

    //#region private methods

    private getAppName(): void {
        this.companyLogo = this.helperService.getApplicationTitle().split(' ')
    }

    private getNgVersion(): any {
        this.ngVersion = VERSION.full
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            date: ['', Validators.required]
        })
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle())
    }

    //#endregion

}
