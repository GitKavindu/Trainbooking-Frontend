import { Token } from "../../Models/Token";


export class TokenService {

    constructor(){}

    returnToken():Token | undefined{
        let userToken:Token | undefined=undefined
        
        const tokenString:string |null=localStorage.getItem('userToken')
        
        if (tokenString!=null) {
            
            if(this.validateToken(tokenString))
            {
                userToken= JSON.parse(tokenString)
                return userToken
                
            }
            return userToken
           
        } 

        return userToken
    }

    private validateToken(tokenString:string):boolean{
        
        let userToken:Token= JSON.parse(tokenString);
        const utcString= new Date();
        const tokenDate=new Date(userToken.endTime)

        if(utcString<=tokenDate && userToken.isActive==true){
            return true
        }
        return false
    }

    setToken(token: Token): Token {
        localStorage.setItem('userToken', JSON.stringify(token));
        return token
    }
  }