import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { GenderDropdownVM } from './gender-dropdown-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class GenderService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/genders')
    }

    //#region public methods

    public getAutoComplete(): Observable<GenderDropdownVM[]> {
        return this.http.get<GenderDropdownVM[]>(environment.apiUrl + '/genders/getAutoComplete')
    }

    //#endregion

}
