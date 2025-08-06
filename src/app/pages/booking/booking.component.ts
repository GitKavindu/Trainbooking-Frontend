import { Component } from '@angular/core';
import { ReturnSortedSchedulesDto } from '../../../Models/DTOs/ReturnSortedSchedulesDto';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
    scheduleLit!:ReturnSortedSchedulesDto[]

    detectScheduleChange(scheduleLit:ReturnSortedSchedulesDto[]){
        this.scheduleLit=scheduleLit
    }
}
