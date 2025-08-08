import { Component } from '@angular/core';
import { ReturnSortedSchedulesDto } from '../../../Models/DTOs/ReturnSortedSchedulesDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
    scheduleLit!:ReturnSortedSchedulesDto[]
    trainId!:number
    trainSeqNo!:number
    scheduleId!:string
    startJourneyId!:number
    endJourneyId!:number

    constructor(private router:Router,private route:ActivatedRoute){}

    ngOnInit():void{
      this.route.queryParams.subscribe(params => {
        if (Object.keys(params).length === 0) {
          console.log('No query parameters');
          this.trainId=0
          this.trainSeqNo=0
          this.scheduleId=''
          this.startJourneyId=0
          this.endJourneyId=0

        } else {
          this.trainId = params['trainId'];
          this.trainSeqNo = +params['seqNo']; // + converts it to number
          this.scheduleId = params['scheduleId'];
          this.startJourneyId=+params['startJourneyId'];
          this.endJourneyId=+params['endJourneyId'];
        }
       
      });    
    }

    detectScheduleChange(scheduleLit:ReturnSortedSchedulesDto[]){
        this.scheduleLit=scheduleLit
    }

    goToBooking(schedule:ReturnSortedSchedulesDto){
      this.router.navigate(['/booking'], {
          queryParams: { 
            trainId:schedule.trainId,
            seqNo: schedule.trainSeqNo,
            scheduleId:schedule.scheduleId,
            startJourneyId:schedule.startJourneyId,
            endJourneyId:schedule.endJourneyId
          }
      });
    }

    
}
