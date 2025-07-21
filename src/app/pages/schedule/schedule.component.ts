import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { Schedule } from '../../../Models/Schedule';
import { ScheduleDto } from '../../../Models/DTOs/ScheduleDto';

@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  constructor(private service:SharedServiceService){}
  
      ScheduleList:Schedule[]=[]
      ModalTitle!:string
      ActivateAddEditScheduleComp:boolean=false

      Schedule!:Schedule
      enableApartment:boolean=false

      FromStationFilter:string=""
      ScheduleListWithoutFilter:any=[]

      enablethisschedule:boolean=false
      scheduleId:string=''

      titleText:string=''

      asc:boolean=true //represents ascending order
      startStation:boolean=false
      endStation:boolean=false
      train:boolean=false

      selectedModel:string='start'

      ngOnInit():void{
        this.refreshScheduleList();
      }
  
      addClick(){
        // this.Schedule={
        //   sc:0,
        //   schedule_name:'',
        //   schedule_seq_no:0,
        //   created_date: '',
        //   lastUpdated_date:'',
        //   added_by:''
        // }
        this.ModalTitle="Add Schedule"
        this.ActivateAddEditScheduleComp=true

        this.ScheduleList=[]
      }
  
      editClick(item: Schedule){
        this.Schedule=item
        this.ModalTitle="Edit Schedule"
        this.enableScheduleDetails(item.scheduleId)
      }
  
      deleteClick(ScheduleId:any){
        if(confirm('Are you sure ?')){
          
          // let val:ScheduleDto={
          //   schedule_id:ScheduleId,
          //   schedule_name:'',
          //   token_id:this.service.tokenService.returnToken()?.tokenId
          // }
  
          // this.service.deleteSchedule(val).subscribe((res)=>{
          //   alert(res.Data.toString());
          //   this.refreshScheduleList()
          // })
        }
        
      }
  
      closeClick(){
        this.ActivateAddEditScheduleComp=false
        this.refreshScheduleList()
        this.resetOptions()
      }
  
      refreshScheduleList(){
        if(this.enablethisschedule==false){
            this.service.getAllSchedules().subscribe(res=>{
            this.ScheduleList=res.Data;
            this.ScheduleListWithoutFilter=res.Data
            this.titleText='Click here to see more details'
          })
        }
        else{
          this.service.getSchedule(this.scheduleId).subscribe(res=>{
          this.ScheduleList=res.Data;
          this.ScheduleListWithoutFilter=res.Data
          if(this.Schedule!=undefined)
            this.ActivateAddEditScheduleComp=true
          this.titleText='Click here to go back'
        })
        }
      }

      filterFn(){
        var FromStationFilter=this.FromStationFilter
        
        if(this.selectedModel=='start'){
          this.ScheduleList=this.ScheduleListWithoutFilter.filter(function(el:any){
            return el.startstation.toString().toLowerCase().includes(
              FromStationFilter.toString().trim().toLowerCase()
            )
          })
        }
        else if(this.selectedModel=='train'){
          this.ScheduleList=this.ScheduleListWithoutFilter.filter(function(el:any){
            return el.train.toString().toLowerCase().includes(
              FromStationFilter.toString().trim().toLowerCase()
            )
          })
        }
        else{
          this.ScheduleList=this.ScheduleListWithoutFilter.filter(function(el:any){
            return el.endstation.toString().toLowerCase().includes(
             FromStationFilter.toString().trim().toLowerCase()
            )
          })
        }
      }

      sortResult(prop:string){
        this.ScheduleList=this.ScheduleListWithoutFilter.sort((a:any,b:any)=>{
            if(this.asc===true){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0) //asc true
            }else{
              return (a[prop]<b[prop])?1:((a[prop]>b[prop])?-1:0)
            }
        })
        this.asc=!this.asc

        if(prop=='startstation'){
          this.startStation=true
          this.endStation=false
          this.train=false
        }
        else if(prop=='train'){
          this.startStation=false
          this.endStation=false
          this.train=true
        }
        else{
          this.startStation=false
          this.endStation=true
          this.train=false
        }

      }

      enableDisableApartmentForSchedule(i:number,schedule_id:number,schedule_seq_no:number){
        this.enableApartment=!this.enableApartment;
        // this.router.navigate(['/apartment'], {
        //   queryParams: { scheduleId: schedule_id, seqNo: schedule_seq_no}
        // });
      }

      
      enableScheduleDetails(schedule_id:string){
        this.enablethisschedule=!this.enablethisschedule
        this.scheduleId=this.enablethisschedule ? schedule_id:''
        this.scheduleId=schedule_id
        this.refreshScheduleList()
        this.resetOptions()
      }

      resetOptions(){
        this.selectedModel='start'
        this.FromStationFilter=''

        this.asc=true

        this.startStation=false
        this.endStation=false
        this.train=false
      }

}
