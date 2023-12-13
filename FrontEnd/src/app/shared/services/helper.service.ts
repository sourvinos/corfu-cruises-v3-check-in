import { FormGroup } from '@angular/forms'
import { Injectable, QueryList } from '@angular/core'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MatExpansionPanel } from '@angular/material/expansion'
import { Observable, Subject, defer, finalize } from 'rxjs'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
// Custom
import { MessageLabelService } from './message-label.service'
import { DialogService } from './modal-dialog.service'
import { environment } from 'src/environments/environment'

export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
        callback()
        return source
    })
}

export function indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        prepare(() => indicator.next(true)),
        finalize(() => indicator.next(false))
    )
}

@Injectable({ providedIn: 'root' })

export class HelperService {

    //#region variables

    private appName = environment.appName

    //#endregion

    constructor(private messageLabelService: MessageLabelService, private dialogService: DialogService, private router: Router, private titleService: Title) { }

    //#region public methods

    public doPostSaveFormTasks(message: string, iconType: string, returnUrl: string, goBack: boolean): Promise<any> {
        const promise = new Promise((resolve) => {
            this.dialogService.open(message, iconType, ['ok']).subscribe(() => {
                goBack ? this.router.navigate([returnUrl]) : null
                resolve(null)
            })
        })
        return promise
    }

    public enableOrDisableAutoComplete(event: { key: string }): boolean {
        return (event.key == 'Enter' || event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowRight' || event.key == 'ArrowLeft') ? true : false
    }

    public getApplicationTitle(): any {
        return this.appName
    }

    public getDistinctRecords(records: any[], object: string, orderField = 'description'): any[] {
        const distinctRecords = (Object.values(records.reduce(function (x, item) {
            if (!x[item[object].id]) {
                x[item[object].id] = item[object]
            }
            return x
        }, {})))
        distinctRecords.sort((a, b) => (a[orderField] > b[orderField]) ? 1 : -1)
        return distinctRecords
    }

    public flattenObject(object: any): any {
        const result = {}
        for (const i in object) {
            if ((typeof object[i]) === 'object' && !Array.isArray(object[i])) {
                const temp = this.flattenObject(object[i])
                for (const j in temp) {
                    result[i + '.' + j] = temp[j]
                }
            }
            else {
                result[i] = object[i]
            }
        }
        return result
    }

    public sortArray(array: any, field: string): any {
        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return -1
            }
            if (a[field] > b[field]) {
                return 1
            }
            return 0
        })
    }

    public deepEqual(object1: any, object2: any): boolean {
        if (object1 == undefined || object2 == undefined) {
            return false
        }
        const keys1 = Object.keys(object1)
        const keys2 = Object.keys(object2)
        if (keys1.length !== keys2.length) {
            return false
        }
        for (const key of keys1) {
            const val1 = object1[key]
            const val2 = object2[key]
            const areObjects = this.isObject(val1) && this.isObject(val2)
            if (
                areObjects && !this.deepEqual(val1, val2) || !areObjects && val1 !== val2
            ) {
                return false
            }
        }
        return true
    }

    public highlightRow(id: any): void {
        const allRows = document.querySelectorAll('.p-highlight')
        allRows.forEach(row => {
            row.classList.remove('p-highlight')
        })
        const selectedRow = document.getElementById(id)
        selectedRow.classList.add('p-highlight')
    }

    public openOrCloseAutocomplete(form: FormGroup<any>, element: any, trigger: MatAutocompleteTrigger): void {
        console.log('1', trigger.panelOpen)
        // trigger.panelOpen ? trigger.closePanel() : trigger.openPanel()
        trigger.openPanel()
        console.log('2', trigger.panelOpen)
    }

    public setTabTitle(feature: string): void {
        this.titleService.setTitle(environment.appName + ': ' + this.messageLabelService.getDescription(feature, 'header'))
    }

    public toggleExpansionPanel(panels: QueryList<MatExpansionPanel> | { open: () => any; close: () => any }[], newState: boolean): void {
        panels.forEach((panel: { open: () => any; close: () => any }) => {
            setTimeout(() => {
                newState == true ? panel.open() : panel.close()
            }, 400)
        })
    }

    public setSidebarsTopMargin(margin: string): void {
        const sidebars = document.getElementsByClassName('sidebar') as HTMLCollectionOf<HTMLElement>
        for (let i = 0; i < sidebars.length; i++) {
            sidebars[i].style.marginTop = margin + 'rem'
        }
    }

    //#endregion

    //#region private methods

    private isObject(object: any): boolean {
        return object != null && typeof object === 'object'
    }

    //#endregion

}

