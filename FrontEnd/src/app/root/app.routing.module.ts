// Base
import { NgModule } from '@angular/core'
import { NoPreloading, RouterModule, Routes } from '@angular/router'
// Custom
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'

const appRoutes: Routes = [
    { path: '', loadChildren: () => import('../features/check-in/classes/modules/check-in.module').then(m => m.CheckInModule) },
    { path: '**', component: EmptyPageComponent }
]

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', preloadingStrategy: NoPreloading, useHash: false })
    ]
})

export class AppRoutingModule { }
