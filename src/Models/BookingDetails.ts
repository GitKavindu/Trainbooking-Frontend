import { Apartment } from "./Apartment"
import { GetBookingDetailsDto } from "./DTOs/GetBookingDetailsDto"

export class BookingDetails{

    public getbookingDetailsDto!:GetBookingDetailsDto

    public showRow:boolean=false

    public apartmentIds!:number[]

    public apartments!:Apartment[]

    public selectedApartmentIndex:number=-1
}