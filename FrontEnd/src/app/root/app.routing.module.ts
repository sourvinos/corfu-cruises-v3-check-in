// Base
import { NgModule } from '@angular/core'
import { NoPreloading, RouteReuseStrategy, RouterModule, Routes } from '@angular/router'
// Components
import { HomeComponent } from '../shared/components/home/home.component'
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
// Utils
import { CustomRouteReuseStrategyService } from '../shared/services/route-reuse-strategy.service'

const appRoutes: Routes = [
    // Home
    { path: '', component: HomeComponent },
    // Check-in
    { path: 'check-in', loadChildren: () => import('../features/check-in/classes/modules/check-in.module').then(m => m.CheckInModule) },
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
