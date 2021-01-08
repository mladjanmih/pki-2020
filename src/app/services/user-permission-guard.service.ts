import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { User, UserRole } from "../models/user.model";
import { AuthenticationService } from "./contracts/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserPermissionGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    const user = this.authService.authenticate();

    if (user.role !== UserRole.PLAYER) {
      this.router.navigate['home'];
      return false;
    }

    return true;
  }
}
