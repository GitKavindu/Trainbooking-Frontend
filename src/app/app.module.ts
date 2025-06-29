import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { StationComponent } from './pages/station/station.component';
import { AddEditStationComponent } from './pages/station/add-edit-station/add-edit-station.component';
import { TrainComponent } from './pages/train/train.component';
import { AddEditTrainComponent } from './pages/train/add-edit-train/add-edit-train.component';
import { ApartmentComponent } from './pages/apartment/apartment.component';
import { AddEditApartmentComponent } from './pages/apartment/add-edit-apartment/add-edit-apartment.component';
import { TrainCompartmentComponent } from './pages/apartment/train-compartment/train-compartment.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    StationComponent,
    AddEditStationComponent,
    TrainComponent,
    AddEditTrainComponent,
    ApartmentComponent,
    AddEditApartmentComponent,
    TrainCompartmentComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
