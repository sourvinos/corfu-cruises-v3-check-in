import { Component } from '@angular/core'
// Custom
import { environment } from 'src/environments/environment'
import { DialogService } from '../../services/modal-dialog.service'
import { MessageLabelService } from '../../services/message-label.service'
import { MessageDialogService } from '../../services/message-dialog.service'

@Component({
    selector: 'help-icon',
    templateUrl: './help-icon.component.html',
    styleUrls: ['./help-icon.component.css']
})

export class HelpIconComponent {

    //#region variables

    public feature = 'dialogs'

    //#endregion

    constructor(private dialogService: DialogService,private messageSnackbarService: MessageDialogService, private messageLabelService: MessageLabelService) { }

    //#region public methods
    public getIcon(): any {
        return environment.featuresIconDirectory + '/question.svg'
    }

    public showHelpDialog(): void {
        this.dialogService.open(this.messageSnackbarService.helpDialog(), 'info', ['ok'])
    }

    //#endregion

    //#region private methods

    //#endregion

}
