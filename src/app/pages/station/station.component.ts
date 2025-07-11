import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { StationDto } from '../../../Models/DTOs/StationDto';
import { Station } from '../../../Models/Station';

@Component({
  selector: 'app-station',
  standalone: false,
  templateUrl: './station.component.html',
  styleUrl: './station.component.css'
})
export class StationComponent {

  constructor(private service:SharedServiceService){}

    stationList:any=[]
    ModalTitle!:string
    ActivateAddEditStationComp:boolean=false
    Station!:Station

    stationIdFilter:string=""
    stationNameFilter:string=""
    stationListWithoutFilter:any=[]
    ngOnInit():void{
      this.refreshStationList();
    }

    addClick(){
      this.Station={
        station_id:0,
        stationSeqNo:0,
        station_name:'',
        created_date: '',
        lastUpdated_date:'',
        added_by:''
      }
      this.ModalTitle="Add station"
      this.ActivateAddEditStationComp=true
    }

    editClick(item: Station){
      this.Station=item
      this.ModalTitle="Edit station"
      this.ActivateAddEditStationComp=true
    }

    deleteClick(StationId:any){
      if(confirm('Are you sure ?')){
        
        let val:StationDto={
          station_id:StationId,
          station_name:'',
          token_id:this.service.tokenService.returnToken()?.tokenId
        }

        this.service.deleteStation(val).subscribe((res)=>{
          alert(res.Data.toString());
          this.refreshStationList()
        })
      }
      
    }

    closeClick(){
      this.ActivateAddEditStationComp=false
      this.refreshStationList()
    }

    refreshStationList(){
      this.service.getAllStations().subscribe(res=>{
        this.stationList=res.Data;
        this.stationListWithoutFilter=res.Data
      })
    }

    filterFn(){
      var stationIdFilter=this.stationIdFilter
      var stationNameFilter=this.stationNameFilter

      this.stationList=this.stationListWithoutFilter.filter(function(el:any){
        return el.station_id.toString().toLowerCase().includes(
          stationIdFilter.toString().trim().toLowerCase()
        )
        &&
        el.station_name.toString().toLowerCase().includes(
          stationNameFilter.toString().trim().toLowerCase()
        )
      })
    }

    sortResult(prop:any,asc:boolean){
        this.stationList=this.stationListWithoutFilter.sort(function(a:any,b:any){
          if(asc){
              return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0)
          }else{
            return (a[prop]<b[prop])?1:((a[prop]>b[prop])?-1:0)
          }
        })
    }
}
