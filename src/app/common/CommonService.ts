import { CompartmentSeatModel } from "../../Models/CompartmentSeatModel";
import { Seat } from "../../Models/Seat";
import { SeatModel } from "../../Models/SeatModel"

export class CommonService{
    constructor(){}

    convertSeatToSeatModel(seat:Seat[]):SeatModel[]{
      
        let seatModel:SeatModel[]=new Array()

        let j:number=0
        let tempSeat:SeatModel=new SeatModel()
        tempSeat.left=[]
        tempSeat.right=[]

        let maxRowNo=0
        let leftMaxNo=0
        let rightMaxNo=0

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

            //find largest row no
            if(maxRowNo<seat[i].rowNo)
                maxRowNo=seat[i].rowNo

            //find largest left seqno
            if(seat[i].isLeft==true){
                if(leftMaxNo<seat[i].seqNo)
                    leftMaxNo=seat[i].seqNo
            }
            //find largest right seqno
            else{
                if(rightMaxNo<seat[i].seqNo)
                    rightMaxNo=seat[i].seqNo
            }
        }
         
        tempSeat.row=j
        seatModel.push(tempSeat)

        //fill the gaps
        for(let i=1;i<=maxRowNo;i++){

            //Add a row if there is a gap in rows
            if(seatModel[i-1].row!=i){
                
                tempSeat=new SeatModel()
                tempSeat.left=[]
                tempSeat.right=[]
                seatModel.splice(i-1,0,tempSeat)
            }

            //Add a seat to left if there is a gap in left seats
            for(let k=1;k<=leftMaxNo;k++){
                if(seatModel[i-1].left[k-1]==undefined || seatModel[i-1].left[k-1].number!=k){
                    let compSeat:CompartmentSeatModel=new CompartmentSeatModel()
                    compSeat.available=false
                    compSeat.selected=false
                    compSeat.number=k
                    seatModel[i-1].left.splice(k-1,0,compSeat)
                }
            }

            //Add a seat to right if there is a gap in right seats
            for(let k=1;k<=rightMaxNo;k++){ 
                if(seatModel[i-1].right[k-1]==undefined || seatModel[i-1].right[k-1].number!=k){
                    let compSeat:CompartmentSeatModel=new CompartmentSeatModel()
                    compSeat.available=false
                    compSeat.selected=false
                    compSeat.number=k
                    seatModel[i-1].right.splice(k-1,0,compSeat)
                }
            }

        }

       
        return seatModel
    }
}