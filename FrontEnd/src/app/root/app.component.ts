import { ChangeDetectorRef, Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
// Custom
import { LoadingSpinnerService } from '../shared/services/loading-spinner.service'
import { environment } from 'src/environments/environment'
import { routeAnimation } from '../shared/animations/animations'
import { ModalDialogService } from '../shared/services/modal-dialog.service'
import { MessageDialogService } from '../shared/services/message-dialog.service'

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

    constructor(private messageSnackbarService: MessageDialogService, private dialogService: ModalDialogService, @Inject(DOCUMENT) private document: Document, private changeDetector: ChangeDetectorRef, private loadingSpinnerService: LoadingSpinnerService, private router: Router) {
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
        this.attachStylesheetToHead()
    }

    //#endregion

    //#region private methods

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = 'light.css'
        headElement.appendChild(newLinkElement)
    }

    private initLoadingSpinner(): void {
        this.loadingSpinnerService.getSpinnerObserver().subscribe((status) => {
            this.isLoading = status == 'start'
            this.changeDetector.detectChanges()
        })
    }

    private setBackgroundImage(): void {
        // document.getElementById('wrapper').style.backgroundImage = 'url(../../assets/images/themes/background.svg'
    }

    private setUserSelect(): void {
        document.getElementById('wrapper').style.userSelect = environment.cssUserSelect
    }

    public showHelpDialog(): void {
        this.dialogService.open(this.messageSnackbarService.helpDialog(), 'info', ['ok'])
    }

    //#endregion

}
