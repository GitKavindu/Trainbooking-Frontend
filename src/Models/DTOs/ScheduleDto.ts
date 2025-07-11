export class ScheduleDto
{     
    public scheduleId!:string

    public trainId!:number
    
    public trainSeqNo!:number

    public tokenId!:string | undefined

    public addJourneyStationDto!:AddJourneyStationDto[]
}

export class AddJourneyStationDto
{
    public stationId!:number

    public stationSeqNo!:number

    public startDate!:string

    public startTime!:string

    private stationName!:string

    getStationName():string{
        return this.stationName
    }

    setStationName(stationName:string):void{
        this.stationName=stationName
    }
}