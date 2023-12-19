import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class InteractionService {

    private _refreshDateAdapter = new Subject<any>()
    private _refreshTabTitle = new Subject<any>()

    public refreshDateAdapter = this._refreshDateAdapter.asObservable()
    public refreshTabTitle = this._refreshTabTitle.asObservable()

    public updateDateAdapters(): void {
        setTimeout(() => {
            this._refreshDateAdapter.next(null)
        }, 1000)
    }

    public updateTabTitle(): void {
        setTimeout(() => {
            this._refreshTabTitle.next(null)
        }, 500)
    }

}
