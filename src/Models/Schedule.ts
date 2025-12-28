export class Schedule{

  public scheduleId!:string

  public startstation!:string
  public startStationId!:number
  public startSeqNo!:number

  public startJourneyId!:number
  
  public endstation!:string
  public endStationId!:number
  public endSeqNo!:number

  public endJourneyId!:number

  public startingDate!:string
  public startingTime!:string

  public endingDate!:string
  public endingTime!:string

  public train!:string

  public trainId!:number
  public trainSeqNo!:number

  showRow:boolean=false
}