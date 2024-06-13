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
import {IUserInfo} from "../../models/user-info";
import {ProfileDisplayComponent} from "./profile-display/profile-display.component";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterOutlet, MatListModule, RouterModule, ProfileDisplayComponent, AsyncPipe, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatDrawer;
  user : Observable<IUserInfo>;

  constructor(private router: Router, private authService: AuthService)
  {

  }

  ngAfterViewInit() {
    this.sidenav.toggle();
  }

close() {
    this.sidenav.close();
  }

}
