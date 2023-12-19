import { Component } from '@angular/core'
// Custom
import { InteractionService } from '../../services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'language-menu',
    templateUrl: './language-menu.component.html',
    styleUrls: ['./language-menu.component.css']
})

export class LanguageMenuComponent {

    //#region variables

    public feature = 'languages'

    //#endregion

    constructor(
        private interactionService: InteractionService,
        private localStorageService: LocalStorageService,
        private messageDialogService: MessageDialogService,
        private messageHintService: MessageInputHintService,
        private messageLabelService: MessageLabelService,
        ) { }

    //#region public methods

    public getFlag(): string {
        return this.localStorageService.getItem('language', 'string') == ''
            ? this.doLanguageTasks('en-GB')
            : this.localStorageService.getItem('language', 'string')
    }

    public onChangelanguage(language: string): string {
        return this.doLanguageTasks(language)
    }

    //#endregion

    //#region private methods

    private doLanguageTasks(language: string): string {
        this.saveLanguage(language)
        this.loadMessages()
        return language
    }

    private loadMessages(): void {
        this.messageHintService.getMessages()
        this.messageLabelService.getMessages()
        this.messageDialogService.getMessages()
        this.interactionService.updateDateAdapters()
    }

    private saveLanguage(language: string): void {
        this.localStorageService.saveItem('language', language)
    }

    //#endregion

}
