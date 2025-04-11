import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, RouterOutlet } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { ProfileDisplayComponent } from "./profile-display/profile-display.component";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
import { IUser } from "../../models/user/user-model";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterOutlet, MatListModule, RouterModule, ProfileDisplayComponent, AsyncPipe, MatDividerModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css"
})
export class HomeComponent implements AfterViewInit {

    @ViewChild("sidenav") public sidenav!: MatDrawer;
    public user : Observable<IUser>;

    public ngAfterViewInit(): void {
        this.sidenav.toggle();
    }

    public close(): void {
        this.sidenav.close();
    }

}
