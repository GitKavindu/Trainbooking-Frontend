import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Train } from '../../../../Models/Train';
import { SharedServiceService } from '../../../shared-service.service';
import { Station } from '../../../../Models/Station';
import { AddJourneyStationDto, ScheduleDto } from '../../../../Models/DTOs/ScheduleDto';
import { Schedule } from '../../../../Models/Schedule';
import { formatDate } from '@angular/common';

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

  scheduleDto:ScheduleDto =new ScheduleDto()

  lastSelectedStartStation!:Station
  lastSelectedEndStation!:Station

  @Output() notifyParent = new EventEmitter<void>();
  @Input() scheduleList!:Schedule[]
  @Input() scheduleDetails!:Schedule //rquired to take train id and seq no for update

  defaultStation:Station

  constructor(private service:SharedServiceService){
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
  }

  ngOnInit(): void {

    this.scheduleForm = new FormGroup({
      train: new FormControl('', Validators.required), // or new FormControl(new Train())
      startstation: new FormControl(this.defaultStation, Validators.required),
      endstation: new FormControl(this.defaultStation, Validators.required),
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
      if(this.scheduleList.length==0)
        this.findIndexAndRemove(val,true)
    });

     this.scheduleForm.get('endstation')?.valueChanges.subscribe((val:Station) => {
      //if(this.scheduleList.length==0)
        this.findIndexAndRemove(val,false)
    });

    this.scheduleForm.get('endTime')?.valueChanges.subscribe((val) => {
        this.validateForm()
    });

     this.setDefaultValues()
    if(this.scheduleList.length==0){
      this.disableEndStation()
    }
    else{
      setTimeout(()=>this.prepareForUpdate(),0)
    }   

    console.log('init')
  }

  disableStartStation(){
    this.scheduleForm.get('train')?.disable();
    this.scheduleForm.get('startstation')?.disable();
    this.scheduleForm.get('startDate')?.disable();
    this.scheduleForm.get('startTime')?.disable();

    this.scheduleForm.get('train')?.markAsUntouched();
    this.scheduleForm.get('startstation')?.markAsUntouched();
    this.scheduleForm.get('startDate')?.markAsUntouched();
    this.scheduleForm.get('startTime')?.markAsUntouched();

    this.scheduleForm.get('endDate')?.markAsUntouched();
    this.scheduleForm.get('endTime')?.markAsUntouched();
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
    
  }
  closeForm():void{
    this.notifyParent.emit();
  }

  //schedule form methods
  getControl(name: string): FormControl {
    return this.scheduleForm.get(name) as FormControl;
  }

  onSubmit(): void {
    this.addToSchedule()
  }

  onClear(): void {
    
    if(this.scheduleList.length==0){
      this.scheduleForm.get('train')?.setValue('')
      this.scheduleForm.get('startstation')?.setValue(this.defaultStation)
      this.scheduleForm.get('startDate')?.setValue('')
      this.scheduleForm.get('startTime')?.setValue('')
      this.setDefaultValues()
      this.disableEndStation()
      
    }
    else{      
      this.disableStartStation()       
    }
   
    this.scheduleForm.get('endstation')?.setValue(this.defaultStation, { emitEvent: false });

    this.scheduleForm.get('endDate')?.setValue('')
    this.scheduleForm.get('endTime')?.setValue('')

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

  formatTimeReverse(timeString: string): string{
      const [time,suffix]=timeString.split(' ');
      let [hh,mm]=time.split(':');

      if(suffix=='PM' && hh!='12'){
        hh=(Number(hh)+12).toString()
      }

      return `${hh}:${mm}`
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

    if(isStart==false && station.station_id!=this.defaultStation.station_id){
      this.lastSelectedEndStation=station
    }
    else if(isStart==true && station.station_id!=this.defaultStation.station_id){
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

  addToSchedule(){

    if(this.scheduleList.length==0){

      this.scheduleDto.trainId=this.scheduleForm.get('train')?.value.train_no
      this.scheduleDto.trainSeqNo=this.scheduleForm.get('train')?.value.train_seq_no
      this.scheduleDto.tokenId=this.service.tokenService.returnToken()?.tokenId

      this.scheduleDto.addJourneyStationDto=new Array<AddJourneyStationDto>()
      this.scheduleDto.addJourneyStationDto.push(this.getFormValues(true))
      this.scheduleDto.addJourneyStationDto.push(this.getFormValues(false))
      
      console.log('start ',JSON.stringify(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-2]))
       this.removeEndStationsFromlist(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-2])       
    }
    else{
      this.scheduleDto.addJourneyStationDto.push(this.getFormValues(false))
    }

    this.scheduleList.push( 
        this.convertScheduleDtoToSchedule( 
          this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-2],
          this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-1]
        ) 
     )
    
    this.setdefaultFormValues()
         
    this.removeEndStationsFromlist(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-1])
   
    this.onClear()
  }

  getFormValues(isFirst:boolean):AddJourneyStationDto{
    let addJourneyStationDto:AddJourneyStationDto=new AddJourneyStationDto()

    if(isFirst){
      addJourneyStationDto.setStationName(this.scheduleForm.get('startstation')?.value.station_name)
      addJourneyStationDto.stationId=this.scheduleForm.get('startstation')?.value.station_id
      addJourneyStationDto.stationSeqNo=this.scheduleForm.get('startstation')?.value.stationSeqNo
      addJourneyStationDto.startDate=this.scheduleForm.get('startDate')?.value
      addJourneyStationDto.startTime=this.formatTime(this.scheduleForm.get('startTime')?.value)
    }
    else{
      addJourneyStationDto.setStationName(this.scheduleForm.get('endstation')?.value.station_name)
      addJourneyStationDto.stationId=this.scheduleForm.get('endstation')?.value.station_id
      addJourneyStationDto.stationSeqNo=this.scheduleForm.get('endstation')?.value.stationSeqNo
      addJourneyStationDto.startDate=this.scheduleForm.get('endDate')?.value
      addJourneyStationDto.startTime=this.formatTime(this.scheduleForm.get('endTime')?.value)
    }
    return addJourneyStationDto
  }

  setdefaultFormValues(){
    
    this.scheduleForm.get('startstation')?.setValue(this.scheduleForm.get('endstation')?.value)
    this.scheduleForm.get('endstation')?.setValue(this.defaultStation);
    console.log(JSON.stringify(this.startStationList))

    this.scheduleForm.get('startDate')?.setValue(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-1].startDate)

    this.scheduleForm.get('startTime')?.setValue(
      this.formatTimeReverse(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-1].startTime)
    )

  }

  setFirstFormValues(){
    
    
    this.scheduleForm.get('startstation')?.setValue(
      this.getStationFromScheduleDto(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-1])
    )
    this.scheduleForm.get('endstation')?.setValue(this.defaultStation);
    console.log(this.scheduleForm.get('startstation')?.value)

    this.scheduleForm.get('startDate')?.setValue(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-1].startDate)

    this.scheduleForm.get('startTime')?.setValue(
      this.formatTimeReverse(this.scheduleDto.addJourneyStationDto[this.scheduleDto.addJourneyStationDto.length-1].startTime)
    )

  }

  getStationFromScheduleDto(addJourneyStationDto:AddJourneyStationDto):Station{
    let station:Station=new Station()
    station.station_id=addJourneyStationDto.stationId
    station.station_name=addJourneyStationDto.getStationName()
    station.stationSeqNo=addJourneyStationDto.stationSeqNo
    return station
  }

  convertScheduleDtoToSchedule(startStation:AddJourneyStationDto,endStation:AddJourneyStationDto):Schedule{
    let schedule:Schedule=new Schedule()
    schedule.startstation=startStation.getStationName()
    schedule.startStationId=startStation.stationId
    schedule.startSeqNo=startStation.stationSeqNo
    schedule.startingDate=startStation.startDate
    schedule.startingTime=startStation.startTime

    schedule.endstation=endStation.getStationName()
    schedule.endStationId=endStation.stationId
    schedule.endSeqNo=endStation.stationSeqNo
    schedule.endingDate=endStation.startDate
    schedule.endingTime=endStation.startTime

    return schedule
  }

  prepareForUpdate(){
    let addJourneyStationDto:AddJourneyStationDto[]=[]
    
    addJourneyStationDto.push(this.convertScheduleToScheduleDto(this.scheduleList[0],true))

    for (let index = 0; index < this.scheduleList.length; index++) {
       addJourneyStationDto.push(this.convertScheduleToScheduleDto(this.scheduleList[index],false))
    }

    let scheduleDto:ScheduleDto=new ScheduleDto()
    scheduleDto.addJourneyStationDto=addJourneyStationDto
    scheduleDto.trainId=this.scheduleDetails.trainId
    scheduleDto.trainSeqNo=this.scheduleDetails.trainSeqNo
    scheduleDto.tokenId=this.service.tokenService.returnToken()?.tokenId

    console.log(scheduleDto)

    this.scheduleDto=scheduleDto

    this.setFirstFormValues()
  }

  convertScheduleToScheduleDto(schedule:Schedule,isFirst:boolean):AddJourneyStationDto{
     console.log(this.scheduleList[0])
    let addJourneyStationDto:AddJourneyStationDto=new AddJourneyStationDto()
      if(isFirst){
        addJourneyStationDto.stationId=schedule.startStationId
        addJourneyStationDto.stationSeqNo=schedule.startSeqNo
        addJourneyStationDto.startDate=schedule.startingDate
        addJourneyStationDto.startTime=schedule.startingTime
        addJourneyStationDto.setStationName(schedule.startstation)
      }
      else{
        addJourneyStationDto.stationId=schedule.endStationId
        addJourneyStationDto.stationSeqNo=schedule.endSeqNo
        addJourneyStationDto.startDate=schedule.endingDate
        addJourneyStationDto.startTime=schedule.endingTime
        addJourneyStationDto.setStationName(schedule.endstation)
      }

      return addJourneyStationDto
  }

  removeEndStationsFromlist(addJourneyStationDto:AddJourneyStationDto){
   for (let index = 0; index < this.endStationList.length; index++) {
    if(this.endStationList[index].station_id==addJourneyStationDto.stationId){
      this.endStationList.splice(index,1)
      break
    }   
   }
  
  }


}
