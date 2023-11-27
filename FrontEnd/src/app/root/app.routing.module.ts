// Base
import { NgModule } from '@angular/core'
import { NoPreloading, RouteReuseStrategy, RouterModule, Routes } from '@angular/router'
// Components
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { ForgotPasswordFormComponent } from '../features/users/user-interface/forgot-password/forgot-password-form.component'
import { HomeComponent } from '../shared/components/home/home.component'
import { LoginFormComponent } from '../features/login/user-interface/login-form.component'
import { ResetPasswordFormComponent } from '../features/users/user-interface/reset-password/reset-password-form.component'
// Utils
import { AuthGuardService } from '../shared/services/auth-guard.service'
import { CustomRouteReuseStrategyService } from '../shared/services/route-reuse-strategy.service'

const appRoutes: Routes = [
    // Login
    { path: '', component: LoginFormComponent, pathMatch: 'full' },
    // Auth
    { path: 'login', component: LoginFormComponent },
    { path: 'forgotPassword', component: ForgotPasswordFormComponent },
    { path: 'resetPassword', component: ResetPasswordFormComponent },
    // Home
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    // Reservations menu
    { path: 'reservations', loadChildren: () => import('../features/reservations/classes/modules/reservation.module').then(m => m.ReservationModule) },
    { path: 'availability', loadChildren: () => import('../features/availability/classes/modules/availability.module').then(m => m.AvailabilityModule) },
    // Tasks menu
    { path: 'ledgers', loadChildren: () => import('../features/ledgers/classes/modules/ledger.module').then(m => m.LedgerModule) },
    { path: 'embarkation', loadChildren: () => import('../features/embarkation/classes/modules/embarkation.module').then(m => m.EmbarkationModule) },
    { path: 'manifest', loadChildren: () => import('../features/manifest/classes/modules/manifest.module').then(m => m.ManifestModule) },
    // Tables menu
    { path: 'coachRoutes', loadChildren: () => import('../features/coachRoutes/classes/modules/coachRoute.module').then(m => m.CoachRouteModule) },
    { path: 'customers', loadChildren: () => import('../features/customers/classes/modules/customer.module').then(m => m.CustomerModule) },
    { path: 'destinations', loadChildren: () => import('../features/destinations/classes/modules/destination.module').then(m => m.DestinationModule) },
    { path: 'drivers', loadChildren: () => import('../features/drivers/classes/modules/driver.module').then(m => m.DriverModule) },
    { path: 'genders', loadChildren: () => import('../features/genders/classes/modules/gender.module').then(m => m.GenderModule) },
    { path: 'pickupPoints', loadChildren: () => import('../features/pickupPoints/classes/modules/pickupPoint.module').then(m => m.PickupPointModule) },
    { path: 'ports', loadChildren: () => import('../features/ports/classes/modules/port.module').then(m => m.PortModule) },
    { path: 'registrars', loadChildren: () => import('../features/registrars/classes/modules/registrar.module').then(m => m.RegistrarModule) },
    { path: 'schedules', loadChildren: () => import('../features/schedules/classes/modules/schedule.module').then(m => m.ScheduleModule) },
    { path: 'shipCrews', loadChildren: () => import('../features/shipCrews/classes/modules/shipCrew.module').then(m => m.ShipCrewModule) },
    { path: 'shipOwners', loadChildren: () => import('../features/shipOwners/classes/modules/shipOwner.module').then(m => m.ShipOwnerModule) },
    { path: 'shipRoutes', loadChildren: () => import('../features/shipRoutes/classes/modules/shipRoute.module').then(m => m.ShipRouteModule) },
    { path: 'ships', loadChildren: () => import('../features/ships/classes/modules/ship.module').then(m => m.ShipModule) },
    { path: 'users', loadChildren: () => import('../features/users/classes/modules/user.module').then(m => m.UserModule) },
    // Check-in
    { path: 'check-in', loadChildren: () => import('../features/check-in/classes/modules/check-in.module').then(m => m.CheckInModule) },
    // Settings
    { path: 'settings', loadChildren: () => import('../features/settings/classes/modules/settings.module').then(m => m.SettingsModule) },
    // Empty
    { path: '**', component: EmptyPageComponent }
]

@NgModule({
    declarations: [],
    entryComponents: [],
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', preloadingStrategy: NoPreloading, useHash: true })
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategyService }
    ]
})

export class AppRoutingModule { }
