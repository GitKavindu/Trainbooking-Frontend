import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { StationComponent } from './pages/station/station.component';
import { TrainComponent } from './pages/train/train.component';
import { ApartmentComponent } from './pages/apartment/apartment.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'station', component: StationComponent },
  { path: 'train', component: TrainComponent },
  { path: 'apartment', component: ApartmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
