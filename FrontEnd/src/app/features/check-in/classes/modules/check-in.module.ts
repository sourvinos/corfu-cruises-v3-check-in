import { NgModule } from '@angular/core'
// Components
import { GreetingComponent } from '../../user-interface/1-greeting/greeting.component'
import { SearchComponent } from '../../user-interface/2-search/search.component'
import { ReservationComponent } from '../../user-interface/3-reservation/reservation.component'
import { PassengerListComponent } from '../../user-interface/4-passenger-list/passenger-list.component'
import { PassengerFormComponent } from '../../user-interface/5-passenger-form/passenger-form.component'
import { EmailFormComponent } from '../../user-interface/6-email/email-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/shared/modules/material.module'
import { CommonModule } from '@angular/common'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'

@NgModule({
    declarations: [
        GreetingComponent,
        SearchComponent,
        ReservationComponent,
        PassengerListComponent,
        PassengerFormComponent,
        EmailFormComponent,
        InputTabStopDirective
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})

export class CheckInModule { }
