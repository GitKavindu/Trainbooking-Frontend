import { Seat } from "../Seat"

export class Apartment{

   apartment_id!: number
  _class!: string
  train_id!: number
  train_seq_no!: number
  tokenId!: string

  seatModel!:Seat
}