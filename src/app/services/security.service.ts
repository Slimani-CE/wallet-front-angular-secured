import {Injectable} from "@angular/core";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";

@Injectable({providedIn: 'root'})
export class SecurityService {
  public profile? : KeycloakProfile;
  constructor(public keycloakService: KeycloakService) {
    this.init();
  }

  // Load the user profile
  init() {
    this.keycloakService.keycloakEvents$.subscribe({
      next: (event) => {
        if (event.type == KeycloakEventType.OnAuthSuccess){
          this.keycloakService.loadUserProfile().then((profile) => {
            this.profile = profile;
          });
        }
      }
    });
  }

  // Check if the user has the given role
  public hasRoleIn(roles: string[]) : boolean {
    let userRoles = this.keycloakService.getUserRoles();
    for (let role of roles) {
      if (userRoles.includes(role)) return true;
    }
    return false;
  }
}
