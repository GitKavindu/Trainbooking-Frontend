import { CompartmentSeatModel } from "../../Models/CompartmentSeatModel";
import { Seat } from "../../Models/Seat";
import { SeatModel } from "../../Models/SeatModel"

export class CommonService{
    constructor(){}

    convertSeatToSeatModel(seat:Seat[]):SeatModel[]{
      
        let seatModel:SeatModel[]=new Array()

        // for(let i=0;i<seat.length;i++){
        //     if(seat[i].apartmentId==apartmentId){
        //         let tempSeat:CompartmentSeatModel=new CompartmentSeatModel()
        //         tempSeat.number=seat[i].rowNo
        //         tempSeat.available=

        //         let found:boolean=false

        //         for(let j=0;j<seatModel.length;j++){
        //             if(seatModel[j].row==seat[i].rowNo){
        //                 found=true
        //                 if(seat[i].isLeft==true){
        //                     seatModel[j].left.push()
        //                 }
        //             }
        //         }
        //     }
                   
        // }

        let j:number=0
        let tempSeat:SeatModel=new SeatModel()
        tempSeat.left=[]
        tempSeat.right=[]
        
        for(let i=0;i<seat.length;i++){
            if(seat[i].rowNo!=j){
                if(j!=0){
                    tempSeat.row=j
                    seatModel.push(tempSeat)
                      
                    tempSeat=new SeatModel()
                    tempSeat.left=[]
                    tempSeat.right=[]
                }
                j=seat[i].rowNo
            }

            let compSeat:CompartmentSeatModel=new CompartmentSeatModel()
            compSeat.available=true
            compSeat.selected=false
            compSeat.number=seat[i].seqNo

            if(seat[i].isLeft==true)
                tempSeat.left.push(compSeat) 
            else
                tempSeat.right.push(compSeat) 
        }
         
        tempSeat.row=j
        seatModel.push(tempSeat)
        return seatModel
    }
}