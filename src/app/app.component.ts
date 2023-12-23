import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected title: string = 'WineExchange';
  protected isLoginPage: boolean = false;
  protected isRegisterPage: boolean = false;

  public constructor(private primengConfig: PrimeNGConfig, private router: Router) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.url === '/login';
      this.isRegisterPage = event.url === '/register';
    });
  }
}
