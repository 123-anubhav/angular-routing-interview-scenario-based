import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, OnDestroy {

  user: any = {
    id: 0,
    name: ''
  };

  paramSubscription!: Subscription;

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("ng on init execute when component is loading");
    // READING JUST LIKE A BOOT PATH VARIABLE VALUE @PathVariable
    this.user.id = this.actRoute.snapshot.params['id'];
    this.user.name = this.actRoute.snapshot.params['name'];

    // BUT IF INSIDE COMPONENT IF WE GIVE DYNAMIC URL LIKE EXPLICIT 
    // THEN WE NEED TO SUBSCRIBE THAT VALUE
    // OTHERWISE IT WILL NOT WORK
    //AND WITH THIS ONE ANOTHER THREAD WILL EXECUTE TO LISTEN UPDATES
    // AND FOR PERFORMANCE IMPROVEMENTS E NEED TO UNSUBSCRIBE THAT THREAD 
    // WHEN COMPONENT WILL UNLOAD

    this.paramSubscription=this.actRoute.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'],
          this.user.name = params['name']
      }
    );
  }

  // WHEN WE USE SUBSCRIPTION WE NEED TO UNSUBSCRIBE IT
  // BECAUSE IN BACKGROUND ONE THREAD EXECUTING
  // THAT MAY CAN REDUCE PERFORMANCE OF APPLICATION
  // SO WHEN WE MOVE TO ANOTHER COMPONENTS
  // WE NEED TO UNSUBSCRIBE IT
  // BY USING PARAMSUBSCRIPTION OF RXJS LIBRARY

  ngOnDestroy() {
    console.log("ng on destroy execute when component is un-loading");
    // Unsubscribe to avoid memory leaks
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
      console.log('Unsubscribed from route parameters');
    }
  }


}