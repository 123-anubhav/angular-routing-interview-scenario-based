import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products = [
    { id: 10, name: 'Washing-Machine' },
    { id: 20, name: 'Mobile' },
    { id: 30, name: 'TV' }
  ];
}
