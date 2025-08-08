import { Seat } from "../Seat"

export class AddBookingDto{

  scheduleId!: string
  fromJourneyId!: number
  toJourneyId!: number
  tokenId!: string | undefined

  seatModel!:Seat[]
}