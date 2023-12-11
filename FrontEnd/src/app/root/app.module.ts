// Base
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
// Modules
import { AppRoutingModule } from './app.routing.module'
import { PrimeNgModule } from '../shared/modules/primeng.module'
// Components
import { AppComponent } from './app.component'
import { TrimStringPipe } from '../shared/pipes/string-trim.pipe'
import { SafeStylePipe } from '../shared/pipes/safe-style.pipe'
import { ReplaceZeroPipe } from '../shared/pipes/replace-zero.pipe'
import { PadNumberPipe } from '../shared/pipes/pad-number.pipe'
import { ModalDialogComponent } from '../shared/components/modal-dialog/modal-dialog.component'
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component'
import { LanguageMenuComponent } from '../shared/components/language-menu/language-menu.component'
import { EmojiDirective } from '../shared/directives/emoji.directive'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { CheckInModule } from '../features/check-in/classes/modules/check-in.module'

@NgModule({
    declarations: [
        AppComponent,
        EmojiDirective,
        LanguageMenuComponent,
        LoadingSpinnerComponent,
        ModalDialogComponent,
        PadNumberPipe,
        ReplaceZeroPipe,
        SafeStylePipe,
        TrimStringPipe,
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
        CheckInModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
