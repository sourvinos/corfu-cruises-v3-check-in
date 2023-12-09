import { ChangeDetectorRef, Component } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
// Custom
import { LoadingSpinnerService } from '../shared/services/loading-spinner.service'
import { environment } from 'src/environments/environment'
import { routeAnimation } from '../shared/animations/animations'

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routeAnimation]
})

export class AppComponent {

    //#region variables

    public isLoading = true

    //#endregion

    constructor(private changeDetector: ChangeDetectorRef, private loadingSpinnerService: LoadingSpinnerService, private router: Router) {
        this.router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationStart) {
                this.isLoading = true
            }
            if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
                this.isLoading = false
            }
        })
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initLoadingSpinner()
        this.setUserSelect()
        this.setBackgroundImage()
    }

    //#endregion

    //#region private methods

    private initLoadingSpinner(): void {
        this.loadingSpinnerService.getSpinnerObserver().subscribe((status) => {
            this.isLoading = status == 'start'
            this.changeDetector.detectChanges()
        })
    }

    private setBackgroundImage(): void {
        document.getElementById('wrapper').style.backgroundImage = 'url(../../assets/images/themes/background.svg'
    }

    private setUserSelect(): void {
        document.getElementById('main').style.userSelect = environment.cssUserSelect
    }

    //#endregion

}
