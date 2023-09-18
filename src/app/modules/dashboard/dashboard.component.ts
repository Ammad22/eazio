import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserInfo } from 'src/app/models/userInfo';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: UserInfo;

  constructor(public router: Router,
    private userService: UserService,
    private utilitySerivce: UtilityService,
    public store: Store,) { }

  ngOnInit(): void {
    this.utilitySerivce.IsUserLogedIn$.subscribe(res => {
      if (!res) {
        this.router.navigate(['signin']);
      }
    });
    this.user = this.userService.getUser();
  }
  logout() {
    this.utilitySerivce.IsUserLogedIn(this.store, false);
    this.router.navigate(['landing']);
  }
}
