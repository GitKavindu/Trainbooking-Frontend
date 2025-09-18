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

  public getProfileText():string | undefined{
    if(this.service.tokenService.returnToken()!=undefined){
      return this.service.tokenService.returnToken()?.PreferedName
    }

    return "Login / Register"
  }

}
