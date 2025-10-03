import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { TokenService } from '../../common/TokenService';
import { GetUserStatusDto } from '../../../Models/DTOs/GetUserStatusDto';
import { TokenDto } from '../../../Models/DTOs/TokenDto';
import { ReturnUUserStatusDto } from '../../../Models/DTOs/ReturnUUserStatusDto';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {

  tokenService:TokenService
  user: ReturnUUserStatusDto

  constructor(private service:SharedServiceService){
    this.tokenService=new TokenService()
    this.user=new ReturnUUserStatusDto()
  }

  ngOnInit(){

    let tokenDto:TokenDto=new TokenDto()
    tokenDto.tokenId=this.tokenService.returnToken()?.tokenId

    if(tokenDto!=undefined){
      
      this.service.getUserDetails(tokenDto).subscribe((res)=>{
         this.user=res.Data
      })
    }

  }
}
