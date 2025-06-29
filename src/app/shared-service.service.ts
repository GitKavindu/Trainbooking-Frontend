import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../Models/BaseResponse';
import { RegisterUserDto } from '../Models/DTOs/RegisterUserDto';
import { LoginUserDto } from '../Models/DTOs/LoginUserDto';
import { Token } from '../Models/Token';
import { TokenService } from './common/TokenService';
import { Station } from '../Models/Station';
import { StationDto } from '../Models/DTOs/StationDto';
import { Train } from '../Models/Train';
import { TrainDto } from '../Models/DTOs/TrainDto';
import { Apartment } from '../Models/Apartment';
import { SeatModel } from '../Models/SeatModel';
import { of } from 'rxjs';
import { ApartmentDto } from '../Models/DTOs/ApartmentDto';
import { Schedule } from '../Models/Schedule';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  readonly APIUrl="http://localhost:5000";

 
  public tokenService:TokenService

  constructor(private http:HttpClient) {
    this.tokenService=new TokenService() 
   }

  //User
  registerUser(registerUserDto:RegisterUserDto){
    return this.http.post<BaseResponse<string>>(this.APIUrl+"/User/registerUser",registerUserDto);
  }

  loginUser(loginUser:LoginUserDto){
    return this.http.post<BaseResponse<Token>>(this.APIUrl+"/User/getuserToken",loginUser);
  }

  //Station
  getAllStations(){
    return this.http.get<BaseResponse<Station[]>>(this.APIUrl+"/Station/getAllStations");
  }

  addStation(station:StationDto){
    return this.http.post<BaseResponse<string>>(this.APIUrl+"/Station/addStation",station);
  }

  editStation(station:StationDto){
    return this.http.put<BaseResponse<string>>(this.APIUrl+"/Station/updateStation",station);
  }

  deleteStation(station:StationDto){
    return this.http.delete<BaseResponse<string>>(this.APIUrl+"/Station/deleteStation", {
      body: station
    });
  }

  //Train
  getAllTrains(){
    return this.http.get<BaseResponse<Train[]>>(this.APIUrl+"/Train/getAllTrains");
  }

  addTrain(train:TrainDto){
    return this.http.post<BaseResponse<string>>(this.APIUrl+"/Train/addTrain",train);
  }

  editTrain(train:TrainDto){
    return this.http.put<BaseResponse<string>>(this.APIUrl+"/Train/updateTrain",train);
  }

  deleteTrain(train:TrainDto){
    return this.http.delete<BaseResponse<string>>(this.APIUrl+"/Train/deleteTrain", {
      body: train
    });
  }

  //Apartment
  getAllApartments(trainId:number, seqNo:number) {
    return this.http.get<BaseResponse<Apartment[]>>(
      `${this.APIUrl}/Apartment/getAllApartmentsForTrain?trainId=${trainId}&seqNo=${seqNo}`
    );
  }

  addApartment(Apartment:ApartmentDto) {
    return this.http.post<BaseResponse<string[]>>(
      `${this.APIUrl}/Apartment/addApartment`,Apartment
    );
  }

  updateApartment(Apartment:ApartmentDto) {
    return this.http.put<BaseResponse<string[]>>(
      `${this.APIUrl}/Apartment/updateApartment`,Apartment
    );
  }

  deleteApartment(Apartment:ApartmentDto){
    return this.http.delete<BaseResponse<string>>(this.APIUrl+"/Apartment/deleteApartment", {
      body: Apartment
    });
  }
  
  //Journey
  getAllSchedules() {
    return this.http.get<BaseResponse<Schedule[]>>(
      `${this.APIUrl}/Journey/getAllSchedules`
    );
  }

  //
  getSeatModel(){
    let seat:SeatModel[]=new Array()
      seat = [
      {
        row:1,
        left:[{ 
                number:1,
                available:true,
                selected:false
              },
              { 
                number:2,
                available:true,
                selected:false
              }
            ],
        right:[{ 
                number:1,
                available:true,
                selected:false
              },
              { 
                number:2,
                available:true,
                selected:false
              }
            ]
      },
      {
        row:2,
        left:[{ 
                number:1,
                available:true,
                selected:false
              },
              { 
                number:2,
                available:true,
                selected:false
              }
            ],
        right:[{ 
                number:1,
                available:true,
                selected:false
              },
              { 
                number:2,
                available:true,
                selected:false
              }
            ]
      },
      {
        row:3,
        left:[{ 
                number:1,
                available:true,
                selected:false
              },
              { 
                number:2,
                available:false,
                selected:false
              }
            ],
        right:[{ 
                number:1,
                available:true,
                selected:false
              },
              { 
                number:2,
                available:true,
                selected:false
              }
            ]
      },
      {
        row:4,
        left:[{ 
                number:1,
                available:false,
                selected:false
              },
              { 
                number:2,
                available:true,
                selected:false
              }
            ],
        right:[{ 
                number:1,
                available:true,
                selected:false
              },
              { 
                number:2,
                available:true,
                selected:false
              }
            ]
      }
    ]
    return of(seat)
  }
}