import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { PrimeNgModule } from './primeng.module'
import { RouterModule } from '@angular/router'
// Custom
import { EmojiDirective } from '../directives/emoji.directive'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { LanguageMenuComponent } from '../components/language-menu/language-menu.component'
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component'
import { MaterialModule } from './material.module'
import { ModalDialogComponent } from '../components/modal-dialog/modal-dialog.component'
import { PadNumberPipe } from '../pipes/pad-number.pipe'
import { ReplaceZeroPipe } from '../pipes/replace-zero.pipe'
import { SafeStylePipe } from '../pipes/safe-style.pipe'
import { TrimStringPipe } from './../pipes/string-trim.pipe'

@NgModule({
    declarations: [
        EmojiDirective,
        InputTabStopDirective,
        LanguageMenuComponent,
        LoadingSpinnerComponent,
        ModalDialogComponent,
        PadNumberPipe,
        ReplaceZeroPipe,
        SafeStylePipe,
        TrimStringPipe,
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
        EmojiDirective,
        FormsModule,
        InputTabStopDirective,
        LanguageMenuComponent,
        LoadingSpinnerComponent,
        MaterialModule,
        PadNumberPipe,
        PrimeNgModule,
        ReactiveFormsModule,
        ReplaceZeroPipe,
        RouterModule,
        RouterModule,
        TrimStringPipe,
    ],
})

export class SharedModule { }
