import { Injectable } from '@angular/core'
import { Observable, Subject, defer, finalize } from 'rxjs'

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

    //#region public methods

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

    public highlightRow(id: any): void {
        const allRows = document.querySelectorAll('.p-highlight')
        allRows.forEach(row => {
            row.classList.remove('p-highlight')
        })
        const selectedRow = document.getElementById(id)
        selectedRow.classList.add('p-highlight')
    }

    //#endregion

    //#region private methods

    private isObject(object: any): boolean {
        return object != null && typeof object === 'object'
    }

    //#endregion

}
