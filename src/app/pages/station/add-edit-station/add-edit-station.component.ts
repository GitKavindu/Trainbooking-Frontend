import { Component, Input } from '@angular/core';
import { SharedServiceService } from '../../../shared-service.service';
import { StationDto } from '../../../../Models/DTOs/StationDto';
import { Station } from '../../../../Models/Station';

@Component({
  selector: 'app-add-edit-station',
  standalone: false,
  templateUrl: './add-edit-station.component.html',
  styleUrl: './add-edit-station.component.css'
})
export class AddEditStationComponent {
  @Input() Station!:Station
  
  constructor(private service:SharedServiceService){}
  Stationid!:number
  Stationname!:string

  ngOnInit(): void {
      this.Stationid=this.Station.station_id
      this.Stationname=this.Station.station_name
  }
  addStation(){
    let val:StationDto={
      station_id:this.Stationid,
      station_name:this.Stationname,
      token_id:this.service.tokenService.returnToken()?.tokenId
    }
    this.service.addStation(val).subscribe(res=>{
      alert(res.Data.toString());
    })
  }

  updateStation(){
    let val:StationDto={
      station_id:this.Stationid,
      station_name:this.Stationname,
      token_id:this.service.tokenService.returnToken()?.tokenId
    }
    console.log(val)
    this.service.editStation(val).subscribe(res=>{
      alert(res.Data.toString());
    })
  }
}
