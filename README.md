# angular-routing-interview-scenario-based
angular-routing-interview-scenario-based

informative, perfect for anyone new to the project or Angular routing in general. 
Let’s dive in!

---

```markdown
# Angular Routing with Query Parameters and Dynamic Components

This Angular project demonstrates the use of **Dynamic Routing**, **Query Parameters**, and **Subscription Management** with **Angular Routing**. It shows how to navigate between components, pass parameters via URLs, and conditionally control component behavior using query parameters.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Code Explanation](#code-explanation)
  - [ProductsComponent](#productscomponent)
  - [ProductComponent](#productcomponent)
  - [EditProductComponent](#editproductcomponent)
  - [Routing Configuration](#routing-configuration)
- [Styling](#styling)
- [Conclusion](#conclusion)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

This Angular project demonstrates the use of dynamic routing and query parameters for displaying and editing product details. Key features of this project include:

- **Dynamic Routing**: Components are loaded dynamically based on the route parameters like `id` and `name`.
- **Query Parameters**: Use query parameters in URLs to control component behavior (e.g., enabling or disabling the "Edit" feature).
- **Memory Management**: Subscriptions to route parameters are handled carefully with `ngOnInit` and `ngOnDestroy` lifecycle hooks to prevent memory leaks.

This is a simplified e-commerce application where users can navigate between products, view product details, and edit them based on dynamic route and query parameters.

---

## Features

1. **Dynamic Product Display**: 
   - Products are displayed in a list with dynamic routes generated based on the `id` and `name` of each product.

2. **Conditional Editing**: 
   - The `EditProductComponent` uses the `allowEdit` query parameter to control whether editing is allowed on a particular product.

3. **Subscription Management**: 
   - Components subscribe to route parameters using `ActivatedRoute` and handle unsubscriptions in the `ngOnDestroy` lifecycle hook to avoid memory leaks.

4. **Routing & Navigation**: 
   - Components use Angular's `Router` service to navigate between pages, passing route and query parameters as needed.

---

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repository/angular-routing-query-params.git
   ```

2. **Install Dependencies:**
   Navigate to the project folder and install all dependencies:
   ```bash
   cd angular-routing-query-params
   npm install
   ```

3. **Run the Application:**
   Start the development server:
   ```bash
   ng serve
   ```

4. **Visit the Application:**
   Open your browser and go to `http://localhost:4200` to view the application.

---

## Code Explanation

### `ProductsComponent`

The `ProductsComponent` displays a list of products. Each product links to a detailed view page, passing dynamic route parameters (`id`, `name`) and query parameters (`allowEdit`).

```typescript
export class ProductsComponent {
  products = [
    { id: 10, name: 'Washing-Machine' },
    { id: 20, name: 'Mobile' },
    { id: 30, name: 'TV' }
  ];
}
```

#### Template for `ProductsComponent`:

```html
<div class="container text-center p-3">
  <ul class="list-unstyled">
    <li class="menu-item" *ngFor="let product of products" [routerLink]="[product.id, product.name]"
      [queryParams]="{ allowEdit: product.name === 'TV' ? '1' : '0' }">
      {{ product.name }}
    </li>
  </ul>
</div>
<router-outlet></router-outlet>
```

- **`[routerLink]`**: Dynamically links to the product detail page using the product's `id` and `name`.
- **`[queryParams]`**: Dynamically sets the `allowEdit` query parameter. If the product is `TV`, it allows editing (`allowEdit=1`), otherwise it prevents editing (`allowEdit=0`).

### `ProductComponent`

The `ProductComponent` displays detailed information about a product based on route parameters and query parameters. It allows navigation to an edit page if `allowEdit` is `true`.

```typescript
export class ProductComponent implements OnInit, OnDestroy {
  product: any = { id: 0, name: '' };
  paramSubscription!: Subscription;

  constructor(private actRoute: ActivatedRoute, private route: Router) {}

  ngOnInit() {
    this.product.id = this.actRoute.snapshot.params['id'];
    this.product.name = this.actRoute.snapshot.params['name'];

    this.paramSubscription = this.actRoute.params.subscribe((param: Params) => {
      this.product.id = param['id'];
      this.product.name = param['name'];
    });
  }

  Edit() {
    this.route.navigate(['edit', this.product.id], { relativeTo: this.actRoute, queryParamsHandling: 'preserve' });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
```

- **`ngOnInit`**: Initializes the product object with `id` and `name` from route parameters.
- **`Edit()`**: Navigates to the `EditProductComponent` and preserves the query parameters.
- **`ngOnDestroy`**: Ensures proper cleanup by unsubscribing from route parameters.

#### Template for `ProductComponent`:

```html
<div class="container">
  <h3>Product ID: {{ product.id }}</h3>
  <h4>Product Name: {{ product.name }}</h4>
  <button (click)="Edit()">Edit Product</button>
</div>
```

### `EditProductComponent`

The `EditProductComponent` shows details of the product that the user can edit. It checks the `allowEdit` query parameter to determine if editing is allowed.

```typescript
export class EditProductComponent implements OnInit {
  allowEdit: boolean = false;
  product: any = { id: 0, name: '' };

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit() {
    this.product.id = this.actRoute.snapshot.params['id'];
    this.product.name = this.actRoute.snapshot.params['name'];

    this.actRoute.queryParams.subscribe((param: Params) => {
      this.allowEdit = param['allowEdit'] === '1';
    });
  }
}
```

- **`ngOnInit`**: Reads route parameters (`id`, `name`) and subscribes to query parameters (`allowEdit`) to check if editing is allowed.
- **`allowEdit`**: If `allowEdit` is `'1'`, editing is allowed; otherwise, it is disabled.

#### Template for `EditProductComponent`:

```html
<ng-container *ngIf="allowEdit">
  <div class="container">
    <h3>Edit Product: {{ product.name }}</h3>
    <!-- Your product edit form goes here -->
  </div>
</ng-container>

<ng-container *ngIf="!allowEdit">
  <div class="container">
    <p>You are not allowed to edit this product.</p>
  </div>
</ng-container>
```

### Routing Configuration

The `app.routes.ts` file defines the routes for the application.

```typescript
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id/:name', component: ProductComponent },
  { path: 'edit/:id', component: EditProductComponent }
];
```

- **`products`**: Displays a list of products.
- **`product/:id/:name`**: Displays product details based on dynamic parameters.
- **`edit/:id`**: Allows editing of a product, with query parameters to control whether editing is allowed.

---

## Styling

The following styles are applied to the components for a clean and modern look:

```css
.menu-item {
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: rgb(122, 9, 9);
  cursor: pointer;
}

.menu-item:hover {
  background-color: #6c757d; /* A slightly darker shade for hover effect */
  color: #ffc107; /* Change text color on hover */
}
```

---

## Conclusion

This Angular project demonstrates how to effectively work with **dynamic routing**, **query parameters**, and **route parameters** in Angular. Key takeaways:

- **Dynamic Routing**: Components are dynamically loaded based on route parameters (`id`, `name`).
- **Query Parameters**: Conditional logic based on query parameters (`allowEdit`) is used to control access to product editing.
- **Subscription Management**: Proper subscription handling with `ngOnInit` and `ngOnDestroy` to avoid memory leaks.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Angular Documentation](https://angular.io/docs) for routing concepts and lifecycle hooks.
- [RxJS](https

://rxjs.dev/) for managing subscriptions.
- Bootstrap for styling.

```

---

### Key Sections Breakdown:
1. **Project Overview**: Describes the goal and highlights the key features of the application.
2. **Features**: Lists all the main features (dynamic routing, query parameters, etc.).
3. **Setup Instructions**: Step-by-step guide to getting the project running.
4. **Code Explanation**: Detailed explanations of each component and how they work together (includes TypeScript and HTML).
5. **Routing Configuration**: How routing is structured and how it links the components together.
6. **Styling**: A brief explanation of the applied CSS for UI elements.
