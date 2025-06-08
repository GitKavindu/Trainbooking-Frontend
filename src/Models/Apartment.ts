import { Seat } from "./Seat"

export class Apartment{

   Apartment_id!: number
  ApartmrntClass!: string
  added_by!: string
  created_date!: string
  lastUpdated_date!: string

  seatModel!:Seat
}