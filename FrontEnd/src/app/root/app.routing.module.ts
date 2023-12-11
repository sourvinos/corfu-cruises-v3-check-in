// Base
import { NgModule } from '@angular/core'
import { NoPreloading, RouteReuseStrategy, RouterModule, Routes } from '@angular/router'
// Components
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
// Utils
import { CustomRouteReuseStrategyService } from '../shared/services/route-reuse-strategy.service'
import { GreetingComponent } from '../features/check-in/user-interface/1-greeting/greeting.component'
import { SearchComponent } from '../features/check-in/user-interface/2-search/search.component'
import { ReservationComponent } from '../features/check-in/user-interface/3-reservation/reservation.component'
import { PassengerListComponent } from '../features/check-in/user-interface/4-passenger-list/passenger-list.component'
import { EmailFormComponent } from '../features/check-in/user-interface/6-email/email-form.component'

const appRoutes: Routes = [
    // Home
    { path: '', component: GreetingComponent },
    { path: 'search', component: SearchComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'passenger-list', component: PassengerListComponent },
    { path: 'email', component: EmailFormComponent },
    // Empty
    { path: '**', component: EmptyPageComponent }
]

@NgModule({
    declarations: [],
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
