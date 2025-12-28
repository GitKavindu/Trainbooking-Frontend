import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { StationComponent } from './pages/station/station.component';
import { TrainComponent } from './pages/train/train.component';
import { ApartmentComponent } from './pages/apartment/apartment.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { BookingComponent } from './pages/booking/booking.component';
import { MybookingsComponent } from './pages/mybookings/mybookings.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { HomeComponent } from './pages/home/home.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { PaymentGatewayComponentComponent } from './pages/payment-gateway-component/payment-gateway-component.component';

const routes: Routes = [
  
  /* Default route */
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'station', component: StationComponent },
  { path: 'train', component: TrainComponent },
  { path: 'apartment', component: ApartmentComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'mybookings', component: MybookingsComponent },
  { path: 'users', component: UserpageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: UserprofileComponent },
  { path: 'paywall', component: PaymentGatewayComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
