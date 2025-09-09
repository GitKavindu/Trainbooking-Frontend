import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Station } from '../../../../Models/Station';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../../shared-service.service';
import { GetSortedSchedulesDto } from '../../../../Models/DTOs/GetSortedSchedulesDto';
import { TimeService } from '../../../common/TimeService';
import { ReturnSortedSchedulesDto } from '../../../../Models/DTOs/ReturnSortedSchedulesDto';
import { ScheduleDto } from '../../../../Models/DTOs/ScheduleDto';

@Component({
  selector: 'app-booking-form',
  standalone: false,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {

  @Input() scheduleList!:ReturnSortedSchedulesDto[]
  @Output() scheduleListChange = new EventEmitter<ReturnSortedSchedulesDto[]>();
  
  bookingForm!: FormGroup
  errMessege:string=''
  messege!:string

  lastSelectedStartStation!:Station
  lastSelectedEndStation!:Station
  defaultStation!:Station

  startStationList:Station[]=[]
  endStationList:Station[]=[]

  getSortedSchedulesDto:GetSortedSchedulesDto
  isEndDateAndTimeValidated:boolean=true

  private timeService:TimeService

  constructor(private fb: FormBuilder,private service:SharedServiceService) {
     this.defaultStation={
      station_id:0,
      stationSeqNo:0,
      station_name:'----------Select a station---------',
      added_by:'',
      created_date:'',
      lastUpdated_date:''
    }

    this.lastSelectedStartStation=this.defaultStation
    this.lastSelectedEndStation=this.defaultStation
    this.getSortedSchedulesDto=new GetSortedSchedulesDto()
    this.timeService=new TimeService()
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      startstation: new FormControl(this.defaultStation, Validators.required),
      endstation: new FormControl(this.defaultStation, Validators.required),
      startDate: new FormControl(''),
      startTime: new FormControl(''),
      endDate: new FormControl(''),
      endTime: new FormControl('')
    });

     this.bookingForm.get('startDate')?.valueChanges.subscribe((val) => {
      this.requestDto()
    });

    this.bookingForm.get('startTime')?.valueChanges.subscribe((val) => {
      this.requestDto()
    });

    this.bookingForm.get('startstation')?.valueChanges.subscribe((val:Station) => {
        this.findIndexAndRemove(val,true)
        this.requestDto() 
    });

     this.bookingForm.get('endstation')?.valueChanges.subscribe((val:Station) => {
        this.findIndexAndRemove(val,false)
        this.requestDto()
        //console.log(JSON.stringify(this.lastSelectedStartStation),'\n\n',JSON.stringify(this.lastSelectedEndStation))
    });

    this.bookingForm.get('endDate')?.valueChanges.subscribe(() => {
        this.requestDto()
        this.validateEndDateAndTime()
    });

    this.bookingForm.get('endTime')?.valueChanges.subscribe((val) => {
        this.requestDto()
        this.validateEndDateAndTime()
    });

    this.setDefaultValues()
    this.activateDeactivateEndStationRibbon()
    console.log('width ',window.innerWidth)
  }

  validateEndDateAndTime():void{
    if(this.getControl('endDate').value!='' && this.getControl('endTime').value!=''){
       this.isEndDateAndTimeValidated= this.validateEndDate()
    }   
  }

  onClear(): void {
    this.bookingForm.get('startstation')?.setValue(this.defaultStation)
    this.bookingForm.get('startDate')?.setValue('')
    this.bookingForm.get('startTime')?.setValue('')
    this.setDefaultValues()        
   
    this.bookingForm.get('endstation')?.setValue(this.defaultStation);

    this.bookingForm.get('endDate')?.setValue('')
    this.bookingForm.get('endTime')?.setValue('')

  }

  getControl(name: string): FormControl {
    return this.bookingForm.get(name) as FormControl;
  }

  compareDates(leftdate:string,leftTime:string,rightdate:string,rightTime:string):boolean{

    const EndtDate =this.parseDateTime(leftdate,leftTime);
    const StartDate = this.parseDateTime(rightdate,rightTime);

    //return true if start date is small than end date
    return EndtDate >= StartDate; 
  }

  parseDateTime(date:string,time:string){
      const dateTimeStr = `${date} ${time}`;
      return new Date(dateTimeStr);
  }

  validateEndDate():boolean{
    if(this.getControl('endDate').value!='' && this.getControl('endTime').value!=''){
      return this.compareDates(
      this.bookingForm.get('endDate')?.value,
      this.bookingForm.get('endTime')?.value,
      this.bookingForm.get('startDate')?.value,
      this.bookingForm.get('startTime')?.value
      ) 
    }
    return false
  }

  validateForm():boolean{
    if(this.getControl('endDate').value!='' && this.getControl('endTime').value!=''){
      
      return this.bookingForm.invalid==false && this.validateEndDate()
    }
    return false
  }

  findIndexAndRemove(station:Station,isStart:boolean){
  
    let arr:Station[]=new Array()
    
    if(isStart==false){
      arr= this.startStationList
    }
    else{
      arr=this.endStationList
    }

    if(station.station_id!=this.defaultStation.station_id){

      let removeIndex:number=0

      for (let index = 0; index < arr.length; index++) {
        if(arr[index].station_id==station.station_id){
          removeIndex=index
          break 
        }
      }
    
      arr.splice(removeIndex,1)
    }

    if(isStart==true && this.lastSelectedStartStation.station_id!=this.defaultStation.station_id){
      arr.unshift(this.lastSelectedStartStation);
    }
    else if(isStart==false && this.lastSelectedEndStation.station_id!=this.defaultStation.station_id){
      arr.unshift(this.lastSelectedEndStation)
    }

    if(isStart==false){
      this.lastSelectedEndStation=station
    }
    else if(isStart==true){
      this.lastSelectedStartStation=station
    }

  }

  getStationsList(){
    this.service.getAllStations().subscribe(res=>{
        this.startStationList=[...res.Data];  // shallow clone
        this.endStationList=[...res.Data];  // shallow clone
    })
  }

  setDefaultValues(){
    this.getStationsList()
  }

  isEndStationRibbonActivated:boolean=false
  activateDeactivateEndStationRibbon(){
    this.isEndStationRibbonActivated=!this.isEndStationRibbonActivated
    const state=this.bookingForm.get('endDate')?.disabled

    if(state){
      this.bookingForm.get('endDate')?.enable()
      this.bookingForm.get('endTime')?.enable()
    }
    else{
      this.bookingForm.get('endDate')?.disable()
      this.bookingForm.get('endTime')?.disable()

      this.bookingForm.get('endDate')?.setValue('')
      this.bookingForm.get('endTime')?.setValue('')
      this.isEndDateAndTimeValidated=true
    }
  }

  requestDto(){
    this.getSortedSchedulesDto.startStationId=this.bookingForm.get('startstation')?.value.station_id
    this.getSortedSchedulesDto.startStationSeqNo=this.bookingForm.get('startstation')?.value.stationSeqNo
    this.getSortedSchedulesDto.startDate=this.bookingForm.get('startDate')?.value
    this.getSortedSchedulesDto.startTime=this.timeService.formatTime(this.bookingForm.get('startTime')?.value)

    this.getSortedSchedulesDto.endStationId=this.bookingForm.get('endstation')?.value.station_id
    
    this.getSortedSchedulesDto.endStationSeqNo=this.bookingForm.get('endstation')?.value.stationSeqNo
    this.getSortedSchedulesDto.endDate=this.bookingForm.get('endDate')?.value
    this.getSortedSchedulesDto.endTime=this.timeService.formatTime(this.bookingForm.get('endTime')?.value)

    console.log(this.getSortedSchedulesDto)

    this.service.selectSortedSchedules(this.getSortedSchedulesDto).subscribe((res)=>{
      this.changeScheduleList(res.Data)
    })
  }

  changeScheduleList(val:ReturnSortedSchedulesDto[]){
    this.scheduleList=[...val]
    this.scheduleListChange.emit(this.scheduleList)
    console.log(this.scheduleList)
  }
   
}
