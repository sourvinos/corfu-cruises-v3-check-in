import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
// Custom
import { ChangePasswordViewModel } from 'src/app/features/users/classes/view-models/change-password-view-model'
import { CoachRouteService } from 'src/app/features/coachRoutes/classes/services/coachRoute.service'
import { ConnectedUser } from '../classes/connected-user'
import { CustomerService } from 'src/app/features/customers/classes/services/customer.service'
import { DestinationService } from 'src/app/features/destinations/classes/services/destination.service'
import { DexieService } from './dexie.service'
import { DotNetVersion } from '../classes/dotnet-version'
import { DriverService } from 'src/app/features/drivers/classes/services/driver.service'
import { GenderService } from 'src/app/features/genders/classes/services/gender.service'
import { HttpDataService } from './http-data.service'
import { InteractionService } from './interaction.service'
import { NationalityService } from 'src/app/features/nationalities/classes/services/nationality.service'
import { PickupPointService } from 'src/app/features/pickupPoints/classes/services/pickupPoint.service'
import { PortService } from 'src/app/features/ports/classes/services/port.service'
import { ResetPasswordViewModel } from 'src/app/features/users/classes/view-models/reset-password-view-model'
import { SessionStorageService } from './session-storage.service'
import { ShipOwnerService } from 'src/app/features/shipOwners/classes/services/shipOwner.service'
import { ShipRouteService } from 'src/app/features/shipRoutes/classes/services/shipRoute.service'
import { ShipService } from 'src/app/features/ships/classes/services/ship.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class AccountService extends HttpDataService {

    //#region variables

    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus())
    private apiUrl = environment.apiUrl
    private urlForgotPassword = this.apiUrl + '/account/forgotPassword'
    private urlRegister = this.apiUrl + '/account'
    private urlResetPassword = this.apiUrl + '/account/resetPassword'
    private urlToken = this.apiUrl + '/auth/auth'

    //#endregion

    constructor(httpClient: HttpClient, private coachRouteService: CoachRouteService, private customerService: CustomerService, private destinationService: DestinationService, private dexieService: DexieService, private driverService: DriverService, private genderService: GenderService, private interactionService: InteractionService, private nationalityService: NationalityService, private ngZone: NgZone, private pickupPointService: PickupPointService, private portService: PortService, private router: Router, private sessionStorageService: SessionStorageService, private shipOwnerService: ShipOwnerService, private shipRouteService: ShipRouteService, private shipService: ShipService) {
        super(httpClient, environment.apiUrl)
    }

    //#region public methods

    public changePassword(formData: ChangePasswordViewModel): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/account/changePassword/', formData)
    }

    public clearSessionStorage(): void {
        this.sessionStorageService.deleteItems([
            // Auth
            { 'item': 'expiration', 'when': 'always' },
            { 'item': 'jwt', 'when': 'always' },
            { 'item': 'loginStatus', 'when': 'always' },
            { 'item': 'refreshToken', 'when': 'always' },
            { 'item': 'returnUrl', 'when': 'always' },
            { 'item': 'isAdmin', 'when': 'always' },
            // Reservations
            { 'item': 'date', 'when': 'always' },
            { 'item': 'destination', 'when': 'always' },
            { 'item': 'fromDate', 'when': 'always' },
            { 'item': 'toDate', 'when': 'always' },
            { 'item': 'dayCount', 'when': 'always' },
            // Criteria
            { 'item': 'embarkation-criteria', 'when': 'production' },
            { 'item': 'ledger-criteria', 'when': 'production' },
            { 'item': 'manifest-criteria', 'when': 'production' },
            // Table filters
            { 'item': 'coachRouteList-filters', 'when': 'always' }, { 'item': 'coachRouteList-id', 'when': 'always' }, { 'item': 'coachRouteList-scrollTop', 'when': 'always' },
            { 'item': 'customerList-filters', 'when': 'always' }, { 'item': 'customerList-id', 'when': 'always' }, { 'item': 'customerList-scrollTop', 'when': 'always' },
            { 'item': 'destinationList-filters', 'when': 'always' }, { 'item': 'destinationList-id', 'when': 'always' }, { 'item': 'destinationList-scrollTop', 'when': 'always' },
            { 'item': 'driverList-filters', 'when': 'always' }, { 'item': 'driverList-id', 'when': 'always' }, { 'item': 'driverList-scrollTop', 'when': 'always' },
            { 'item': 'genderList-filters', 'when': 'always' }, { 'item': 'genderList-id', 'when': 'always' }, { 'item': 'genderList-scrollTop', 'when': 'always' },
            { 'item': 'pickupPointList-filters', 'when': 'always' }, { 'item': 'pickupPointList-id', 'when': 'always' }, { 'item': 'pickupPointList-scrollTop', 'when': 'always' },
            { 'item': 'portList-filters', 'when': 'always' }, { 'item': 'portList-id', 'when': 'always' }, { 'item': 'portList-scrollTop', 'when': 'always' },
            { 'item': 'registrarList-filters', 'when': 'always' }, { 'item': 'registrarList-id', 'when': 'always' }, { 'item': 'registrarList-scrollTop', 'when': 'always' },
            { 'item': 'scheduleList-filters', 'when': 'always' }, { 'item': 'scheduleList-id', 'when': 'always' }, { 'item': 'scheduleList-scrollTop', 'when': 'always' },
            { 'item': 'shipCrewList-filters', 'when': 'always' }, { 'item': 'shipCrewList-id', 'when': 'always' }, { 'item': 'shipCrewList-scrollTop', 'when': 'always' },
            { 'item': 'shipList-filters', 'when': 'always' }, { 'item': 'shipList-id', 'when': 'always' }, { 'item': 'shipList-scrollTop', 'when': 'always' },
            { 'item': 'shipOwnerList-filters', 'when': 'always' }, { 'item': 'shipOwnerList-id', 'when': 'always' }, { 'item': 'shipOwnerList-scrollTop', 'when': 'always' },
            { 'item': 'shipRouteList-filters', 'when': 'always' }, { 'item': 'shipRouteList-id', 'when': 'always' }, { 'item': 'shipRouteList-scrollTop', 'when': 'always' },
            { 'item': 'userList-filters', 'when': 'always' }, { 'item': 'userList-id', 'when': 'always' }, { 'item': 'userList-scrollTop', 'when': 'always' },
            // Tasks filters
            { 'item': 'reservationList-filters', 'when': 'always' }, { 'item': 'reservationList-id', 'when': 'always' }, { 'item': 'reservationList-scrollTop', 'when': 'always' },
            { 'item': 'embarkationList-filters', 'when': 'always' }, { 'item': 'embarkationList-id', 'when': 'always' }, { 'item': 'embarkationList-scrollTop', 'when': 'always' },
            { 'item': 'ledgerList-filters', 'when': 'always' }, { 'item': 'ledgerList-id', 'when': 'always' }, { 'item': 'ledgerList-scrollTop', 'when': 'always' }
        ])
    }

    public forgotPassword(formData: any): Observable<any> {
        return this.http.post<any>(this.urlForgotPassword, formData)
    }

    public getNewRefreshToken(): Observable<any> {
        const userId = ConnectedUser.id
        const refreshToken = sessionStorage.getItem('refreshToken')
        const grantType = 'refresh_token'
        return this.http.post<any>(this.urlToken, { userId, refreshToken, grantType }).pipe(
            map(response => {
                if (response.token) {
                    this.setLoginStatus(true)
                    this.setAuthSettings(response)
                }
                return <any>response
            })
        )
    }

    public login(userName: string, password: string): Observable<void> {
        const grantType = 'password'
        const language = localStorage.getItem('language') || 'en-GB'
        return this.http.post<any>(this.urlToken, { language, userName, password, grantType }).pipe(map(response => {
            this.setLoginStatus(true)
            this.setUserData(response)
            this.setDotNetVersion(response)
            this.setAuthSettings(response)
            this.populateDexieFromAPI()
            this.refreshMenus()
        }))
    }

    public logout(): void {
        this.setLoginStatus(false)
        this.clearSessionStorage()
        this.refreshMenus()
        this.navigateToLogin()
        this.clearConnectedUser()
    }

    public resetPassword(vm: ResetPasswordViewModel): Observable<any> {
        return this.http.post<any>(this.urlResetPassword, vm)
    }

    //#endregion

    //#region private methods

    private checkLoginStatus(): boolean {
        const loginCookie = sessionStorage.getItem('loginStatus')
        if (loginCookie === '1') {
            if (sessionStorage.getItem('jwt') !== null || sessionStorage.getItem('jwt') !== undefined) {
                return true
            }
        }
        return false
    }

    private clearConnectedUser(): void {
        ConnectedUser.id = null
        ConnectedUser.displayname = null
        ConnectedUser.isAdmin = null
        ConnectedUser.customerId = null
    }

    private navigateToLogin(): void {
        this.ngZone.run(() => {
            this.router.navigate(['/'])
        })
    }

    private refreshMenus(): void {
        this.interactionService.updateMenus()
    }

    private setAuthSettings(response: any): void {
        sessionStorage.setItem('expiration', response.expiration)
        sessionStorage.setItem('jwt', response.token)
        sessionStorage.setItem('loginStatus', '1')
        sessionStorage.setItem('refreshToken', response.refreshToken)
    }

    private populateDexieFromAPI(): void {
        this.dexieService.populateTable('coachRoutes', this.coachRouteService)
        this.dexieService.populateTable('customers', this.customerService)
        this.dexieService.populateTable('destinations', this.destinationService)
        this.dexieService.populateTable('drivers', this.driverService)
        this.dexieService.populateTable('genders', this.genderService)
        this.dexieService.populateTable('nationalities', this.nationalityService)
        this.dexieService.populateTable('pickupPoints', this.pickupPointService)
        this.dexieService.populateTable('ports', this.portService)
        this.dexieService.populateTable('shipOwners', this.shipOwnerService)
        this.dexieService.populateTable('shipRoutes', this.shipRouteService)
        this.dexieService.populateTable('ships', this.shipService)
    }

    private setDotNetVersion(response: any): void {
        DotNetVersion.version = response.dotNetVersion
    }

    private setLoginStatus(status: boolean): void {
        this.loginStatus.next(status)
    }

    private setUserData(response: any): void {
        ConnectedUser.id = response.userId
        ConnectedUser.displayname = response.displayname
        ConnectedUser.isAdmin = response.isAdmin
        ConnectedUser.customerId = response.customerId
    }

    //#endregion

    //#region  getters

    get isLoggedIn(): Observable<boolean> {
        return this.loginStatus.asObservable()
    }

    //#endregion

}
