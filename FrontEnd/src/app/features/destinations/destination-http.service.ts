import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { DestinationDropdownVM } from './destination-dropdown-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class DestinationHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/destinations')
    }

    //#region public methods

    public getAutoComplete(): Observable<DestinationDropdownVM[]> {
        return this.http.get<DestinationDropdownVM[]>(environment.apiUrl + '/destinations/getAutoComplete')
    }

    //#endregion

}
