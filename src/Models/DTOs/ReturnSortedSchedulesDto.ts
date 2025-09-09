import { Schedule } from "../Schedule"

export class ReturnSortedSchedulesDto
{
      public scheduleId!:string

      public trainId!: number
      public trainSeqNo!: number
      public trainName!:string

      public startStationId!: number
      public startStationSeqNo!: number
      public startStationName!:string

      public startDate!: string
      public startTime!: string

      public endStationId!: number
      public endStationSeqNo!: number
      public endStationName!:string

      public endDate!: string
      public endTime!: string

      public startDestDetails! :Schedule

      public startJourneyId!:number
      public endJourneyId!:number

      //Give more details on mobile screens
      activateMoreDetails:boolean=false
}


