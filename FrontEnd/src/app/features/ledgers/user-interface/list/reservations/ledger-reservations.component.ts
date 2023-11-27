import { Component, Input } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { LedgerVM } from '../../../classes/view-models/list/ledger-vm'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'ledger-customer-reservations',
    templateUrl: './ledger-reservations.component.html',
    styleUrls: ['../../../../../../assets/styles/material/mat-dialog.css', './ledger-reservations.component.css']
})

export class LedgerCustomerReservationListComponent {

    //#region variables

    @Input() customer: LedgerVM
    private feature = 'ledgerList'

    //#endregion

    constructor(private dateHelperService: DateHelperService, private dialogService: ModalDialogService, private emojiService: EmojiService, private messageLabelService: MessageLabelService) { }

    //#region public methods

    public formatDateToLocale(date: string, showWeekday = false, showYear = false): string {
        return this.dateHelperService.formatISODateToLocale(date, showWeekday, showYear)
    }

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

    public getIcon(filename: string): string {
        return environment.criteriaIconDirectory + filename + '.svg'
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public hasRemarks(remarks: string): boolean {
        return remarks.length > 0 ? true : false
    }

    public showRemarks(remarks: string): void {
        this.dialogService.open(remarks, 'info', ['ok'])
    }

    //#endregion

}
