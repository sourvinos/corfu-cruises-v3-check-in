import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// Custom
import { InputTabStopDirective } from '../directives/input-tabstop.directive'
import { LanguageMenuComponent } from '../components/language-menu/language-menu.component'
import { MaterialModule } from './material.module'
import { PadNumberPipe } from '../pipes/pad-number.pipe'
import { PrimeNgModule } from './primeng.module'
import { ReplaceZeroPipe } from '../pipes/replace-zero.pipe'
import { SafeStylePipe } from '../pipes/safe-style.pipe'
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component'

@NgModule({
    declarations: [
        InputTabStopDirective,
        LanguageMenuComponent,
        PadNumberPipe,
        ReplaceZeroPipe,
        ModalDialogComponent,
        SafeStylePipe,
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
        InputTabStopDirective,
        LanguageMenuComponent,
        MaterialModule,
        PadNumberPipe,
        PrimeNgModule,
        ReactiveFormsModule,
        ReplaceZeroPipe,
        RouterModule,
    ],
})

export class SharedModule { }
