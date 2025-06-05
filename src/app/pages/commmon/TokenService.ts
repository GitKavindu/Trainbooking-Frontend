import { Token } from "../../../Models/Token";

export class TokenService {

    returnToken():Token | undefined{
        let userToken=undefined
        
        const tokenString:string |null=localStorage.getItem('userToken')
        
        if (tokenString!=null) {

            userToken = JSON.parse(tokenString);
            
            if(this.validateToken(userToken))
            {
                return userToken
            }
            return userToken=undefined

        } else {

            userToken = undefined;
        }

        return userToken
    }

    private validateToken(userToken:Token):boolean{
        
        const utcString= new Date();

        if(utcString>=userToken.endTime && userToken.isActive==true){
            return true
        }

        return false
    }
  }