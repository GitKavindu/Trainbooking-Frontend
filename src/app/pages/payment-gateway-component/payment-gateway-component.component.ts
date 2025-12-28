import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-gateway-component',
  standalone: false,
  templateUrl: './payment-gateway-component.component.html',
  styleUrl: './payment-gateway-component.component.css'
})
export class PaymentGatewayComponentComponent {
  amount:string
  constructor(private route:ActivatedRoute,private router:Router){
    this.amount='$0.00'
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
        console.log('No query parameters');
      } else {
        let price = +params['price'];
        this.amount='$'+price.toFixed(2).toString()
       
      }
     
    });
  }

  payButtonClick(){
    this.router.navigateByUrl("/mybookings")
  }

}