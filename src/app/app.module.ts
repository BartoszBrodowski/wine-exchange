import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEditWineModule } from './components/add-edit-wine/add-edit-wine.module';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WineCardComponent } from './components/wine-card/wine-card.component';
import { WineDetailsComponent } from './components/wine-details/wine-details.component';
import { WinesComponent } from './components/wines/wines.component';
import { WineService } from './features/services/wine.service';
import { WineAvailabilityPipe } from './shared/pipes/wine-availability.pipe';
import { WineTagPipe } from './shared/pipes/wine-tag.pipe';
import { SidebarModule } from 'primeng/sidebar';

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
    PageNotFoundComponent,
    WineTagPipe,
    WineAvailabilityPipe,
    UserProfileComponent,
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
    ConfirmPopupModule,
    ConfirmDialogModule,
    DialogModule,
    AddEditWineModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule,
    SidebarModule
  ],
  providers: [MessageService, WineService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
