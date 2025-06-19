import { Component, Input } from '@angular/core';
import { SharedServiceService } from '../../../shared-service.service';
import { ApartmentDto } from '../../../../Models/DTOs/ApartmentDto';
import { Apartment } from '../../../../Models/Apartment';

@Component({
  selector: 'app-add-edit-apartment',
  standalone: false,
  templateUrl: './add-edit-apartment.component.html',
  styleUrl: './add-edit-apartment.component.css'
})
export class AddEditApartmentComponent {
  @Input() Apartment!:Apartment
  
  constructor(private service:SharedServiceService){}
  Apartmentid!:number
  Apartmentclass!:string

  ngOnInit(): void {
    if(this.Apartment!=undefined){
        this.Apartmentid=this.Apartment.Apartment_id
      this.Apartmentclass=this.Apartment.ApartmrntClass
    }    
  }
  addApartment(){
    // let val:ApartmentDto={
    //   apartment_id:this.Apartmentid,
    //   _class:this.Apartmentclass,
    //   tokenId:this.service.tokenService.returnToken()?.tokenId
    // }
    // this.service.addApartment(val).subscribe(res=>{
    //   alert(res.Data.toString());
    // })
  }

  updateApartment(){
    // let val:ApartmentDto={
    //   apartment_id:this.Apartmentid,
    //   _class:this.Apartmentclass,
    //   tokenId:this.service.tokenService.returnToken()?.tokenId
    // }
    // console.log(val)
    // this.service.editApartment(val).subscribe(res=>{
    //   alert(res.Data.toString());
    // })
  }
}
