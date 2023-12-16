import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// Custom
import { HelpIconComponent } from '../components/help-icon/help-icon.component'
import { InputTabStopDirective } from '../directives/input-tabstop.directive'
import { LanguageMenuComponent } from '../components/language-menu/language-menu.component'
import { MaterialModule } from './material.module'
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component'
import { PrimeNgModule } from './primeng.module'
import { SafeStylePipe } from '../pipes/safe-style.pipe'

@NgModule({
    declarations: [
        HelpIconComponent,
        InputTabStopDirective,
        LanguageMenuComponent,
        ModalDialogComponent,
        SafeStylePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PrimeNgModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        HelpIconComponent,
        InputTabStopDirective,
        LanguageMenuComponent,
        MaterialModule,
        PrimeNgModule,
        ReactiveFormsModule,
        RouterModule
    ],
})

export class SharedModule { }
