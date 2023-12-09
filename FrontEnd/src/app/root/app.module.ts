// Base
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
// Modules
import { AppRoutingModule } from './app.routing.module'
import { PrimeNgModule } from '../shared/modules/primeng.module'
import { SharedModule } from 'src/app/shared/modules/shared.module'
// Components
import { AppComponent } from './app.component'
import { HomeComponent } from '../shared/components/home/home.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        PrimeNgModule,
        ReactiveFormsModule,
        SharedModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
