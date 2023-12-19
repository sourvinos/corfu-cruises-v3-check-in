import { ChangeDetectorRef, Component } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
// Custom
import { LoadingSpinnerService } from '../shared/services/loading-spinner.service'
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
        this.setBackgroundImage()
    }

    //#region private methods

    private initLoadingSpinner(): void {
        this.loadingSpinnerService.getSpinnerObserver().subscribe((status) => {
            this.isLoading = status == 'start'
            this.changeDetector.detectChanges()
        })
    }

    private setBackgroundImage(): void {
        document.getElementById('outer-wrapper').style.backgroundImage = 'url(../../assets/images/themes/background.svg'
    }

    //#endregion

}
