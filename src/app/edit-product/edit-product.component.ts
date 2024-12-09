import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  allowEdit: boolean = false;

  product: any = {
    id: 0,
    name: ''
  };

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {

    // READING JUST LIKE A BOOT PATH VARIABLE VALUE @PathVariable
    this.product.id = this.actRoute.snapshot.params['id'];
    this.product.name = this.actRoute.snapshot.params['name'];

    // HERE WE WILL RECEIVE QUERY PARAM VALUE OF URL ?VALUE LIKE ?allowEdit=1
    // FOR PATH VARIABLE USE PARAMS
    // FOR REQUESTPARAM USE QUERYPARAMS

    console.log("before allowEdit is ::" + this.allowEdit);

    this.actRoute.queryParams.subscribe(
      (param: Params) => {
        // Convert the query parameter 'allowEdit' to a boolean
        this.allowEdit = param['allowEdit'] === '1'; // '1' becomes true, anything else becomes false
      }
    );
    console.log("\nafter allowEdit is ::" + this.allowEdit);
  }
}
