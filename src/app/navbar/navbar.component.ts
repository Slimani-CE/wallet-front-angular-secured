import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public securityService:SecurityService) {

  }

  public async ngOnInit() {

  }

  onLogout() {
    this.securityService.keycloakService.logout( window.location.origin);
  }

  public async getToken() {
  }

  async login(){
    await this.securityService.keycloakService.login(
      {
        redirectUri: window.location.origin
      }
    );
  }
}
