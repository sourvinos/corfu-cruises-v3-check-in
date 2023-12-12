// Base
import { NgModule } from '@angular/core'
import { NoPreloading, RouteReuseStrategy, RouterModule, Routes } from '@angular/router'
// Custom
import { CustomRouteReuseStrategyService } from '../shared/services/route-reuse-strategy.service'
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'

const appRoutes: Routes = [
    { path: '', loadChildren: () => import('../features/check-in/classes/modules/check-in.module').then(m => m.CheckInModule) },
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

