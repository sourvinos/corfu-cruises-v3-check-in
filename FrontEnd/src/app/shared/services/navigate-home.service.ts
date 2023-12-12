import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { GreetingComponent } from 'src/app/features/check-in/user-interface/1-greeting/greeting.component'

@Injectable({ providedIn: 'root' })

export class CanActivateStart {

    public constructor(private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!(route.component instanceof GreetingComponent)) {
            this.router.navigateByUrl('/')
        }
        return true
    }

}
