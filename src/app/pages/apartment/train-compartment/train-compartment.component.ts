import { Component } from '@angular/core';

@Component({
  selector: 'app-train-compartment',
  standalone: false,
  templateUrl: './train-compartment.component.html',
  styleUrl: './train-compartment.component.css'
})
export class TrainCompartmentComponent {
//  seats = [
//     // Upper berth - left side
//     { number: '1A', available: true, selected: false, isLeft: true, section: 'upper' },
//     { number: '1B', available: true, selected: false, isLeft: true, section: 'upper' },
//     // Upper berth - right side
//     { number: '1C', available: false, selected: false, isLeft: false, section: 'upper' },
//     { number: '1D', available: true, selected: false, isLeft: false, section: 'upper' },
    
//     // Lower berth - left side
//     { number: '2A', available: true, selected: false, isLeft: true, section: 'lower' },
//     { number: '2B', available: true, selected: false, isLeft: true, section: 'lower' },
//     // Lower berth - right side
//     { number: '2C', available: true, selected: false, isLeft: false, section: 'lower' },
//     { number: '2D', available: false, selected: false, isLeft: false, section: 'lower' },
//     // New seat
//     //{ number: '2F', available: false, selected: false, isLeft: false, section: 'lower' },
//     //   { number: '2G', available: false, selected: false, isLeft: false, section: 'lower' },
    
//     // Side berth - left side
//     { number: '3A', available: true, selected: false, isLeft: true, section: 'side' },
//     { number: '3B', available: false, selected: false, isLeft: true, section: 'side' },
//     // Side berth - right side
//     { number: '3C', available: true, selected: false, isLeft: false, section: 'side' },
//     { number: '3D', available: true, selected: false, isLeft: false, section: 'side' },
//     // { number: '2E', available: false, selected: false, isLeft: false, section: 'lower' },
//   ];

  seats = [
    {
      row:1,
      left:[{ 
              number:1,
              available:true,
              selected:false
            },
            { 
              number:2,
              available:true,
              selected:false
            }
           ],
      right:[{ 
              number:1,
              available:true,
              selected:false
            },
            { 
              number:2,
              available:true,
              selected:false
            }
           ]
    },
    {
      row:2,
      left:[{ 
              number:1,
              available:true,
              selected:false
            },
            { 
              number:2,
              available:true,
              selected:false
            }
           ],
      right:[{ 
              number:1,
              available:true,
              selected:false
            },
            { 
              number:2,
              available:true,
              selected:false
            }
           ]
    },
    {
      row:3,
      left:[{ 
              number:1,
              available:true,
              selected:false
            },
            { 
              number:2,
              available:false,
              selected:false
            }
           ],
      right:[{ 
              number:1,
              available:true,
              selected:false
            },
            { 
              number:2,
              available:true,
              selected:false
            }
           ]
    },
    {
      row:4,
      left:[{ 
              number:1,
              available:false,
              selected:false
            },
            { 
              number:2,
              available:true,
              selected:false
            }
           ],
      right:[{ 
              number:1,
              available:true,
              selected:false
            },
            { 
              number:2,
              available:true,
              selected:false
            }
           ]
    }
  ]

  selectedSeats: string[] = [];

  toggleSeatSelection(seat: any,rowNo:number,isLeft:'L'|'R'): void {
    if (seat.available) {
      seat.selected = !seat.selected;
      
      const index = this.selectedSeats.indexOf(rowNo+isLeft+seat.number);
      if (index === -1) {
        this.selectedSeats.push(rowNo+isLeft+seat.number);
      } else {
        this.selectedSeats.splice(index, 1);
      }
    }
  }

  getSeatClass(seat: any): string {
    if (!seat.available) return 'bg-secondary text-white';
    return seat.selected ? 'bg-primary text-white' : 'bg-light';
  }

  // Helper to get seats for a specific section and side
  // getSeats(section: string, isLeft: boolean): any[] {
  //   return this.seats.filter(seat => 
  //     seat.section === section && seat.isLeft === isLeft
  //   );
  // }
}
