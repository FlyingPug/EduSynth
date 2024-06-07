import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {provideRouter, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import { Router } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {RegisterUserComponent} from "../login/register-user/register-user.component";
import { OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ROUTES } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterOutlet, MatListModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatDrawer;
  names : string = "";

  constructor(private router: Router, private authService: AuthService)
  {

  }

  ngAfterViewInit() {
    this.sidenav.toggle();

    if(this.authService.isAuthorized)
    {
      this.authService.userSubject.subscribe(newSubject =>
        {
          this.names = newSubject.username;
        })
    }
  }

close() {
    this.sidenav.close();
  }

}
