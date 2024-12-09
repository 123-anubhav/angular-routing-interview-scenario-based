import { Routes } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'products', component: ProductsComponent,
        children: [
                 { path: ':id/:name', component: ProductComponent },
                 { path: ':id/:name/edit/:id', component: EditProductComponent }
        ]
    },
      { path: 'customers/:id/:name', component: CustomerComponent },
    {
        path: 'customers', component: CustomersComponent,
        // IF WE WANT TO LOAD ANOTHER PAGE INSIDE OUR PAGE 
        // THEN USE IT IS LIKE
        // PARENT AND CHILD PAGES
       /*  children: [
            { path: ':id/:name', component: CustomerComponent }
        ] */
    }
];