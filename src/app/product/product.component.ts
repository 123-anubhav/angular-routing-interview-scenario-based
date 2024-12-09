import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {

  product: any = {
    id: 0,
    name: ''
  };

  paramSubscription!: Subscription;

  constructor(private actRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    console.log("ng on init execute when component is loading");
    // READING JUST LIKE A BOOT PATH VARIABLE VALUE @PathVariable
    this.product.id = this.actRoute.snapshot.params['id'];
    this.product.name = this.actRoute.snapshot.params['name'];

    this.paramSubscription = this.actRoute.params.subscribe(
      (param: Params) => {
        this.product.id = param['id'],
          this.product.name = param['name'];
      }
    )
  }

  Edit() {
    //  HERE IN URL ? QUERY PARAM VALUE AVAILABLE 
    // WE WILL PRESERVE THAT VALUE 
    // FOR GIVING ONE COMPONENT VALUE TO ANY CHILLD COMPONENT OR 3RD/4TH COMPONENT
    // [ queryParamsHandling: 'preserve' ]

    this.route.navigate(['edit',this.product.id], { relativeTo: this.actRoute, queryParamsHandling: 'preserve' });

  }

  ngOnDestroy() {
    console.log("ng on destroy execute when component is un-loading");
    // Unsubscribe to avoid memory leaks
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
      console.log('Unsubscribed from route parameters');
    }
  }
}
