export class ScheduleDto
{     
    public scheduleId!:string

    public trainId!:number
    
    public trainSeqNo!:number

    public token_id!:string | undefined

    public addJourneyStationDto!:AddJourneyStationDto[]
}

export class AddJourneyStationDto
{
    public scheduledStartTime!:Date

    public stationId!:number

    public stationSeqNo!:number
}