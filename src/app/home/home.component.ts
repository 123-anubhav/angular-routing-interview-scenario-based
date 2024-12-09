import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) { }

  loadProducts() {
    /*
         IN ABSOLUTE PATH "/" IS IMPORTANT BECAUSE IT LOAD URLS FROM app.routes.ts
         BUT IN RELATIVE PATH IT LOAD FROM IN CURRENT COMPONENT URL + NEW RELATIVE PATH URL
     */

    //   IN REAL LIFE EXAMPLE GOOGLE MapFORM WHER YOU STRTED RIIDNG THAT IS ABSOLUTE PATH 
    //   LET INERTNET STOPPED
    //   FROM WHERE YOU REACH YOU WILL START YOUR RIDING FROM THAT PATH THAT IS RELATVE PATH

    /* 
    THIS IS ABSOLUTE PATH REDIRECTION NOT RELATIVE PATH
    FOR RELATIVE PATH WE WILL USE ACTIVATEDROUTER
*/
    this.router.navigate(["/products"]);
  }

  loadCustomers() {
    /* 
        THIS IS ABSOLUTE PATH REDIRECTION NOT RELATIVE PATH
        FOR RELATIVE PATH WE WILL USE ACTIVATEDROUTER
    */
    this.router.navigate(["/customers"]);
  }

}
