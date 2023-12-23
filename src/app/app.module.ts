import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { WinesComponent } from './components/wines/wines.component';
import { WineService } from './services/wine.service';
import { WineCardComponent } from './components/wine-card/wine-card.component';
import { WineDetailsComponent } from './components/wine-details/wine-details.component';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeButtonComponent,
    NavComponent,
    WinesComponent,
    WineCardComponent,
    WineDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    HttpClientModule,
    PasswordModule,
    DataViewModule,
    TableModule,
  ],
  providers: [MessageService, WineService],
  bootstrap: [AppComponent],
})
export class AppModule {}
