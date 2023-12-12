import { NgModule } from '@angular/core'
// Custom
import { SearchComponent } from '../../user-interface/2-search/search.component'
import { EmailFormComponent } from '../../user-interface/6-email/email-form.component'
import { PassengerListComponent } from '../../user-interface/4-passenger-list/passenger-list.component'
import { ReservationComponent } from '../../user-interface/3-reservation/reservation.component'
import { GreetingComponent } from '../../user-interface/1-greeting/greeting.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    { path: '', component: GreetingComponent },
    { path: 'search', component: SearchComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'passenger-list', component: PassengerListComponent },
    { path: 'email', component: EmailFormComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CheckInRoutingModule { }
// @NgModule({
//     declarations: [
//         GreetingComponent,
//         SearchComponent,
//         ReservationComponent,
//         PassengerListComponent,
//         PassengerFormComponent,
//         EmailFormComponent
//     ],
//     imports: [
//         SharedModule,
//         CoachRouteRoutingModule
//     ]
// })

// export class CoachRouteModule { }
