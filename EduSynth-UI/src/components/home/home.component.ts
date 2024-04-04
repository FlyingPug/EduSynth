import {Component, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {provideRouter, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import { Router } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {RegisterUserComponent} from "../login/register-user/register-user.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
  { path: 'about', component: RegisterUserComponent },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterOutlet, MatListModule,MatDrawerContainer],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatDrawer;

  constructor(private router: Router) { }


close() {
    this.sidenav.close();
  }

}
