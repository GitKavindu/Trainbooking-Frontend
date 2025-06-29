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
      ToStationFilter:string=""
      ScheduleListWithoutFilter:any=[]
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
      }
  
      editClick(item: Schedule){
        this.Schedule=item
        this.ModalTitle="Edit Schedule"
        this.ActivateAddEditScheduleComp=true
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
      }
  
      refreshScheduleList(){
        this.service.getAllSchedules().subscribe(res=>{
          this.ScheduleList=res.Data;
          this.ScheduleListWithoutFilter=res.Data
        })
      }
  
      filterFn(){
        var FromStationFilter=this.FromStationFilter
        var ToStationFilter=this.ToStationFilter
  
        this.ScheduleList=this.ScheduleListWithoutFilter.filter(function(el:any){
          return el.startstation.toString().toLowerCase().includes(
            FromStationFilter.toString().trim().toLowerCase()
          )
          &&
          el.endstation.toString().toLowerCase().includes(
            ToStationFilter.toString().trim().toLowerCase()
          )
        })
      }
  
      sortResult(prop:any,asc:boolean){
          this.ScheduleList=this.ScheduleListWithoutFilter.sort(function(a:any,b:any){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0)
            }else{
              return (a[prop]<b[prop])?1:((a[prop]>b[prop])?-1:0)
            }
          })
      }

      enableDisableApartmentForSchedule(i:number,schedule_id:number,schedule_seq_no:number){
        this.enableApartment=!this.enableApartment;
        // this.router.navigate(['/apartment'], {
        //   queryParams: { scheduleId: schedule_id, seqNo: schedule_seq_no}
        // });
      }

      enablethisschedule:boolean=false
      enableScheduleDetails(){
        this.enablethisschedule=!this.enablethisschedule
      }
}
