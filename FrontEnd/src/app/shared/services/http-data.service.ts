import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export class HttpDataService {

    constructor(public http: HttpClient, public url: string) { }

    public getActive(): Observable<any[]> {
        return this.http.get<any[]>(this.url)
    }

    public getSingle(id: string | number): Observable<any> {
        if (id != undefined)
            return this.http.get<any>(this.url + '/' + id)
    }

    public save(formData: any): Observable<any> {
        return formData.id == 0
            ? this.http.post<any>(this.url, formData)
            : this.http.patch<any>(this.url + '/reservationId/' + formData.reservationId, formData)
    }

    public delete(id: string | number): Observable<any> {
        if (id != undefined)
            return this.http.delete<any>(this.url + '/' + id)
    }

}
