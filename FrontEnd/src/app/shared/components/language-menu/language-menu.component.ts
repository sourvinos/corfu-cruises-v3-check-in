import { Component } from '@angular/core'
// Custom
import { InteractionService } from '../../services/interaction.service'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { Menu } from 'src/app/shared/classes/menu'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { TooltipService } from 'src/app/shared/services/tooltip.service'

@Component({
    selector: 'language-menu',
    templateUrl: './language-menu.component.html',
    styleUrls: ['./language-menu.component.css']
})

export class LanguageMenuComponent {

    //#region variables

    public tooltipItems: Menu[]
    public feature = 'languages'

    //#endregion

    constructor(private interactionService: InteractionService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public getFlag(): string {
        return this.localStorageService.getItem('language', 'string') == ''
            ? this.doLanguageTasks('en-GB')
            : this.localStorageService.getItem('language', 'string')
    }

    public getLabel(id: string): string {
        return this.tooltipService.getDescription(this.tooltipItems, id)
    }

    public onChangelanguage(language: string): string {
        return this.doLanguageTasks(language)
    }

    //#endregion

    //#region private methods

    private buildTooltips(): void {
        this.tooltipService.getMessages().then((response) => {
            this.createTooltips(response)
            this.subscribeToTooltipLanguageChanges()
        })
    }

    private createTooltips(items: Menu[]): void {
        this.tooltipItems = []
        items.forEach(item => {
            this.tooltipItems.push(item)
        })
    }

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
        this.interactionService.updateMenus()
        this.interactionService.updateTabTitle()
        this.interactionService.updateTooltips()
    }

    private saveLanguage(language: string): void {
        this.localStorageService.saveItem('language', language)
    }

    private subscribeToTooltipLanguageChanges(): void {
        this.interactionService.refreshTooltips.subscribe(() => {
            this.buildTooltips()
        })
    }

    //#endregion

}
