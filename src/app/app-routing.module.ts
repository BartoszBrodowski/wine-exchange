import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { WinesComponent } from './components/wines/wines.component';
import { WineDetailsComponent } from './components/wine-details/wine-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { notFoundGuard } from './guards/not-found.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'wines', component: WinesComponent },
  { path: 'wines/:id', component: WineDetailsComponent, canActivate: [notFoundGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
