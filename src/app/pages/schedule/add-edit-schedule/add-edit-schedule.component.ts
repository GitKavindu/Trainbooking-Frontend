import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Train } from '../../../../Models/Train';
import { SharedServiceService } from '../../../shared-service.service';
import { Station } from '../../../../Models/Station';
import { ScheduleDto } from '../../../../Models/DTOs/ScheduleDto';

@Component({
  selector: 'app-add-edit-schedule',
  standalone: false,
  templateUrl: './add-edit-schedule.component.html',
  styleUrl: './add-edit-schedule.component.css'
})
export class AddEditScheduleComponent {
  
  scheduleForm!:FormGroup
  errMessege:string=''

  trainList:Train[]=[]
  selectedModel!:Train

  startStationList:Station[]=[]
  endStationList:Station[]=[]

  startDate: string = '';
  startTime: string = '';

  scheduleDto:ScheduleDto[]=[]

  lastSelectedStartStation:Station | null=null
  lastSelectedEndStation:Station | null=null

  @Output() notifyParent = new EventEmitter<void>();

  constructor(private service:SharedServiceService){}

  ngOnInit(): void {

    this.scheduleForm = new FormGroup({
      train: new FormControl('', Validators.required), // or new FormControl(new Train())
      startstation: new FormControl('', Validators.required),
      endstation: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      startTime: new FormControl(''),
      endDate: new FormControl(''),
      endTime: new FormControl('')
    });

    this.scheduleForm.get('startDate')?.valueChanges.subscribe((val) => {
      this.scheduleForm.get('endDate')?.enable();
    });

    this.scheduleForm.get('startTime')?.valueChanges.subscribe((val) => {
      this.scheduleForm.get('endTime')?.enable();
    });

    this.scheduleForm.get('startstation')?.valueChanges.subscribe((val:Station) => {
      this.findIndexAndRemove(val,true)
    });

     this.scheduleForm.get('endstation')?.valueChanges.subscribe((val) => {
      this.findIndexAndRemove(val,false)
    });

    this.scheduleForm.get('endTime')?.valueChanges.subscribe((val) => {
        this.validateForm()
    });

    // this.scheduleForm.get('endstation')?.disable();
    this.setDefaultValues()
    this.disableEndStation()
  }

  disableEndStation(){
    this.scheduleForm.get('endDate')?.disable();
    this.scheduleForm.get('endTime')?.disable();
    this.scheduleForm.get('endDate')?.markAsUntouched();
    this.scheduleForm.get('endTime')?.markAsUntouched();
  }

  setDefaultValues(){
    this.getTrainList()
    this.getStationsList()
    this.lastSelectedStartStation=null
    this.lastSelectedEndStation=null
  }
  closeForm():void{
    this.notifyParent.emit();
  }

  //schedule form methods
  getControl(name: string): FormControl {
    return this.scheduleForm.get(name) as FormControl;
  }

  onSubmit(): void {}

  onClear(): void {
    this.scheduleForm.get('train')?.setValue('')
    this.scheduleForm.get('startstation')?.setValue('')
    this.scheduleForm.get('endstation')?.setValue('')
    this.scheduleForm.get('startDate')?.setValue('')
    this.scheduleForm.get('startTime')?.setValue('')
    this.scheduleForm.get('endDate')?.setValue('')
    this.scheduleForm.get('endTime')?.setValue('')
    
    this.setDefaultValues()
    this.disableEndStation()
    
  }

  getTrainList(){
    this.service.getAllTrains().subscribe(res=>{
      this.trainList=res.Data;
      
      //this.scheduleForm.patchValue({ train: res.Data[0].train_no});
    })
  }

  getStationsList(){
    this.service.getAllStations().subscribe(res=>{
        this.startStationList=[...res.Data];  // shallow clone
        this.endStationList=[...res.Data];  // shallow clone
    })
  }

  formatTime(timeString: string): string {
    const [hourStr, minuteStr] = timeString.split(':');
    let hours = parseInt(hourStr, 10);
    const minutes = minuteStr;
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  }

  //remove station from 
  findIndexAndRemove(station:Station,isStart:boolean){
    
    let arr:Station[]=new Array()

    if(isStart==false){
      arr= this.startStationList
    }
    else{
      arr=this.endStationList
    }

    let removeIndex:number=0

    for (let index = 0; index < arr.length; index++) {
      if(arr[index].station_id==station.station_id){
        removeIndex=index
        break 
      }
    }

    arr.splice(removeIndex,1)

    if(isStart==true && this.lastSelectedStartStation!=null){
      arr.unshift(this.lastSelectedStartStation);
    }
    else if(isStart==false && this.lastSelectedEndStation!=null){
      arr.unshift(this.lastSelectedEndStation)
      
    }

    if(isStart==false){
      this.lastSelectedEndStation=station
    }
    else{
      this.lastSelectedStartStation=station
    }
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
      this.scheduleForm.get('endDate')?.value,
      this.scheduleForm.get('endTime')?.value,
      this.scheduleForm.get('startDate')?.value,
      this.scheduleForm.get('startTime')?.value
      ) 
    }
    return false
  }

  validateForm():boolean{
    if(this.getControl('endDate').value!='' && this.getControl('endTime').value!=''){
      
      return this.scheduleForm.invalid==false && this.validateEndDate()
    }
    return false
  }

}
