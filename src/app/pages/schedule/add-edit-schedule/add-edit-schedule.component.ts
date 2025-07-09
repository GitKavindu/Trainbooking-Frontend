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

  lastSelectedStartStation!:Station
  lastSelectedEndStation!:Station

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

    this.getTrainList()
    this.getStationsList()

    this.scheduleForm.get('train')?.valueChanges.subscribe((val) => {
      console.log('Train changed:', val);
    });

     this.scheduleForm.get('startDate')?.valueChanges.subscribe((val) => {
      console.log('date changed:', val);
    });

    this.scheduleForm.get('startTime')?.valueChanges.subscribe((val) => {
      console.log('time changed:', this.formatTime(val));
    });

    this.scheduleForm.get('startstation')?.valueChanges.subscribe((val:Station) => {
      this.findIndexAndRemove(val,true)
    });

     this.scheduleForm.get('endstation')?.valueChanges.subscribe((val) => {
      this.findIndexAndRemove(val,false)
    });
  }

  closeForm():void{
    this.notifyParent.emit();
  }

  //schedule form methods
  getControl(name: string): FormControl {
    return this.scheduleForm.get(name) as FormControl;
  }

  onSubmit(): void {}
  onClear(): void {}

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

    if(isStart==true && this.lastSelectedStartStation!=undefined){
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

}
