import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected title: string = 'WineExchange';
  protected isLoginPage: boolean = false;
  protected isRegisterPage: boolean = false;

  public constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLoginPage = this.router.url === '/login';
        this.isRegisterPage = this.router.url === '/register';
      }
    });
  }

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
