// Base
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// Custom
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing.module'
import { EmojiDirective } from '../shared/directives/emoji.directive'
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component'
import { PrimeNgModule } from '../shared/modules/primeng.module'
import { SharedModule } from '../shared/modules/shared.module'

@NgModule({
    declarations: [
        AppComponent,
        EmojiDirective,
        LoadingSpinnerComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        PrimeNgModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
