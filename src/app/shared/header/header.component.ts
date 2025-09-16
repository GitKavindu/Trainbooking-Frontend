import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { TokenService } from '../../common/TokenService';
import { Token } from '../../../Models/Token';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(public service:SharedServiceService){}

  profileArrowBit:boolean=false  // false ▼ , true ▲
  pagesArrowBit:boolean=false // false ▼ , true ▲

  private getProfileText():string | undefined{
    if(this.service.tokenService.returnToken()!=undefined){
      return this.service.tokenService.returnToken()?.PreferedName
    }

    return "Login / Register"
  }

  changeProfileArrow(){
    this.profileArrowBit=!this.profileArrowBit
  }

  changePagesArrow(){
    this.pagesArrowBit=!this.pagesArrowBit
  }

  getProfileArrow():string{
    if(this.profileArrowBit==false)
      return " ▼"
    else
      return " ▲"
  }

  getPagesArrow():string{
    if(this.pagesArrowBit==false)
      return " ▼"
    else
      return " ▲"
  }

  getMobileProfileText(){
    return this.getProfileText()+this.getProfileArrow()
  }

  getDesktopProfileText():string{
    return this.getProfileText()+this.getProfileArrow()
  }
}
