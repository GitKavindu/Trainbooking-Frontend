import { Seat } from "../Seat"

export class GetBookingDetailsDto{

    public  bookedBy!: string
    
    public  isCanceled!:boolean
    public bookedSeats!:Seat[]
    public  bookingDate!: string
    public  bookingTime!: string
    public trainName!:string
    public  price!:number

    public bookingId!: number
    public scheduleId!:string

    public trainNo!:number
    public trainSeqNo!:number

    public fromStationNo!:number
    public fromStationSeqNo!:number

    public toStationNo!:number
    public toStationSeqNo!:number
}