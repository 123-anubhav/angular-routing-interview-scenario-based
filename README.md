# angular-routing-interview-scenario-based
angular-routing-interview-scenario-based

```markdown
# Angular Routing Project

This Angular project demonstrates **Dynamic Routing** and **Route Parameter Handling** in Angular. It involves navigating between components while passing route parameters. The goal of this project is to demonstrate how to manage dynamic URLs, handle route parameters, and properly unsubscribe from route parameter observables to avoid memory leaks.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [How to Use](#how-to-use)
- [Code Explanation](#code-explanation)
  - [Customer Component](#customer-component)
  - [Home Component](#home-component)
  - [Routing Configuration](#routing-configuration)
- [Conclusion](#conclusion)

---

## Project Overview

This project focuses on demonstrating **Angular Routing** with dynamic parameters. The `CustomerComponent` displays user information based on route parameters like `id` and `name`, while the `HomeComponent` provides buttons to navigate between customers.

Key Features:
- **Dynamic Routing:** Change URLs dynamically with parameters.
- **Parameter Subscription:** Subscribe to route parameters to update the component.
- **Unsubscription:** Properly unsubscribe from parameters to avoid memory leaks.
- **Nested Routes:** Use nested routes to display products and customers.

---

## Features

1. **Dynamic Parameter Handling:**
   - The `CustomerComponent` fetches `id` and `name` parameters from the route and updates the view accordingly.
   
2. **Subscription to Route Parameters:**
   - When the route parameters change (via Angular’s router), we subscribe to the `params` observable to update the component dynamically.
   
3. **Memory Management:**
   - Unsubscribing from the observable when the component is destroyed (`ngOnDestroy`) helps prevent memory leaks.

4. **Real-time Example:**
   - This project simulates an e-commerce app where users can navigate between customers, products, and edit product details.

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repository/angular-routing-project.git
   ```

2. **Install dependencies:**
   Navigate to the project directory and install the required dependencies using npm:
   ```bash
   cd angular-routing-project
   npm install
   ```

3. **Run the application:**
   Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and go to `http://localhost:4200` to view the application.

---

## How to Use

1. **Navigate between customers:**
   - Click on the "Load Raghu" or "Load Sandhya" buttons to navigate to the `CustomerComponent` with dynamic route parameters.
   
2. **Dynamic Product Routes:**
   - The `ProductsComponent` shows a list of products, where you can view or edit product details using dynamic URLs.
   
3. **Unsubscribe from Route Parameters:**
   - When navigating away from the `CustomerComponent`, the subscription to the route parameters is automatically unsubscribed in the `ngOnDestroy` lifecycle hook.

---

## Code Explanation

### `CustomerComponent`

This component uses Angular's `ActivatedRoute` to read route parameters (`id` and `name`) both statically and dynamically.

```typescript
export class CustomerComponent implements OnInit, OnDestroy {
  user: any = { id: 0, name: '' };
  paramSubscription!: Subscription;

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log("ngOnInit - Component loaded");

    // Reading parameters when the component loads
    this.user.id = this.actRoute.snapshot.params['id'];
    this.user.name = this.actRoute.snapshot.params['name'];

    // Dynamically subscribe to route parameters
    this.paramSubscription = this.actRoute.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

  ngOnDestroy() {
    console.log("ngOnDestroy - Component unloaded");

    // Unsubscribe to avoid memory leaks
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
      console.log('Unsubscribed from route parameters');
    }
  }
}
```

- **ngOnInit:** Initializes the `user` object with values from the route parameters.
- **ngOnDestroy:** Ensures the subscription is cleaned up when the component is destroyed.

### `HomeComponent`

This component demonstrates how to navigate between pages programmatically using Angular's `Router` service.

```typescript
export class HomeComponent {
  constructor(private router: Router) {}

  loadProducts() {
    // Absolute path redirection to the products page
    this.router.navigate(['/products']);
  }

  loadCustomers() {
    // Absolute path redirection to the customers page
    this.router.navigate(['/customers']);
  }
}
```

- **loadProducts:** Navigates to the products page using absolute path.
- **loadCustomers:** Navigates to the customers page.

### `Routing Configuration`

In `app.routes.ts`, we define the routes for the application:

```typescript
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
  { path: 'customers', component: CustomersComponent }
];
```

- **Products:** Displays products and allows editing via nested routes.
- **Customers:** Shows customer details based on dynamic route parameters.

---

## Conclusion

This Angular project demonstrates how to:
- Use **dynamic routing** with parameters.
- **Subscribe to and unsubscribe from route parameters** for better memory management.
- Configure **nested routes** and navigate between different pages.

---


```

---

### How to Update the `README.md`

1. **Add More Code:**
   If you add more features or code, just make sure to:
   - Explain **new components** in the "Code Explanation" section.
   - Update the "Features" section with any new functionality.
   
2. **Provide Examples:**
   You can include **screenshots** or **GIFs** to demonstrate how users interact with your app.

3. **Styling:**
   If you're working with CSS or SCSS, mention any important styles or custom themes in the "Code Explanation" section. For example:

```markdown
### Styles for Active Route Links

We have custom CSS to highlight active routes:

```css
.active {
  color: rgb(255, 249, 249);
  background-color: #0a0a0a; /* Blue background */
  border-radius: 5px;
  text-decoration: none;
}

.txt-decoration {
  text-decoration: none;
}
```

---

```markdown
# Angular Routing with Query Parameters and Dynamic Components

This Angular project demonstrates the use of **Dynamic Routing**, **Query Parameters**, and **Subscription Management** with **Angular Routing**. It covers how to navigate between components, pass parameters via URLs, and conditionally allow or disallow access to certain components based on query parameters.

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

---

## Project Overview

This Angular project showcases the following:
- **Dynamic Routing:** Dynamically load components based on route parameters like `id` and `name`.
- **Query Parameters:** Use query parameters in the URL to control component behavior (e.g., enabling or disabling the "Edit" feature for a product).
- **Unsubscribing from Route Parameters:** Use Angular’s `OnInit` and `OnDestroy` lifecycle hooks to manage route parameter subscriptions, avoiding memory leaks.

This is an example of an e-commerce app where products can be viewed, edited, or restricted based on user interaction.

---

## Features

1. **Dynamic Product Display:**
   - Products are displayed in a list, with each product being linked to a detailed view page.
   
2. **Query Parameters for Conditional Editing:**
   - The `EditProductComponent` uses query parameters (`allowEdit`) to conditionally allow or disallow editing of a product.

3. **Subscription Management:**
   - The components subscribe to route parameters and handle unsubscriptions properly in the `ngOnDestroy` lifecycle method to prevent memory leaks.

4. **Navigation:**
   - Components navigate using Angular's `Router` service, and route parameters are passed dynamically.

---

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repository/angular-routing-query-params.git
   ```

2. **Install Dependencies:**
   Navigate to the project folder and install all dependencies using npm:
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

The `ProductsComponent` displays a list of products and links to their individual details page. We use `routerLink` to bind dynamic routes to the product names.

```typescript
export class ProductsComponent {
  products = [
    { id: 10, name: 'Washing-Machine' },
    { id: 20, name: 'Mobile' },
    { id: 30, name: 'TV' }
  ];
}
```

- The `products` array holds the product list, with each product having an `id` and `name`.
- In the template, we use `*ngFor` to loop through the products and generate `li` elements for each one. We also add query parameters dynamically with `[queryParams]`.

### Template for `ProductsComponent`:

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

The `ProductComponent` displays detailed information about a product based on route parameters and query parameters.

```typescript
export class ProductComponent implements OnInit, OnDestroy {
  product: any = { id: 0, name: '' };
  paramSubscription!: Subscription;

  constructor(private actRoute: ActivatedRoute, private route: Router) {}

  ngOnInit() {
    this.product.id = this.actRoute.snapshot.params['id'];
    this.product.name = this.actRoute.snapshot.params['name'];

    this.paramSubscription = this.actRoute.params.subscribe(
      (param: Params) => {
        this.product.id = param['id'];
        this.product.name = param['name'];
      }
    );
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

- **`ngOnInit`**: The route parameters (`id` and `name`) are read from `ActivatedRoute.snapshot.params` to initialize the `product` object.
- **`ngOnDestroy`**: Ensures proper cleanup by unsubscribing from the route parameters to avoid memory leaks.
- **`Edit()`**: Navigates to the `EditProductComponent` while preserving the query parameters (using `queryParamsHandling: 'preserve'`).

### Template for `ProductComponent`:

```html
<div class="container">
  <h3>Product ID: {{ product.id }}</h3>
  <h4>Product Name: {{ product.name }}</h4>
  <button (click)="Edit()">Edit Product</button>
</div>
```

- Displays the `product.id` and `product.name`, and provides a button to navigate to the edit page.

### `EditProductComponent`

The `EditProductComponent` shows details of the product that the user can edit. It uses query parameters (`allowEdit`) to determine whether editing is allowed.

```typescript
export class EditProductComponent implements OnInit {
  allowEdit: boolean = false;
  product: any = { id: 0, name: '' };

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit() {
    this.product.id = this.actRoute.snapshot.params['id'];
    this.product.name = this.actRoute.snapshot.params['name'];

    this.actRoute.queryParams.subscribe(
      (param: Params) => {
        this.allowEdit = param['allowEdit'] === '1';
      }
    );
  }
}
```

- **`ngOnInit`**: Reads the `id` and `name` from the route parameters and subscribes to query parameters (`allowEdit`) to check whether editing is allowed.
- **`allowEdit`**: If the query parameter `allowEdit` is `1`, editing is enabled; otherwise, it is disabled.

### Template for `EditProductComponent`:

```html
<ng-container *ngIf="allowEdit">
  <div class="container">
    <h3>Edit Product: {{ product.name }}</h3>
    <!-- Your product edit form goes here -->
  </div>
</ng-container>

<ng-container *ngIf="!allowEdit">
  <div class="container">
    <p>You are not allowed to edit this product. For more information, check the query parameters in the URL.</p>
  </div>
</ng-container>
```

- **Conditional Rendering**: Displays the product edit form only if `allowEdit` is `true`, otherwise shows a message that editing is not allowed.

---

## Routing Configuration

The `app.routes.ts` file defines all the routes for the application:

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
- **`edit/:id`**: Allows editing a product, with query parameters to control whether editing is allowed.

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

This Angular project demonstrates how to work with **dynamic routing**, **query parameters**,

 and **route parameters** in Angular. It allows for conditionally enabling or disabling product editing based on query parameters, and ensures proper cleanup of subscriptions to avoid memory leaks.

```

---

### Key Points Recap:

- **Dynamic Routing**: We use dynamic route parameters (`id` and `name`) to load different components and display product details.
- **Query Parameters**: Conditional logic based on query parameters (`allowEdit`) is used to control access to edit functionality.
- **Subscription Management**: We ensure proper subscription handling with `ngOnInit` and `ngOnDestroy` to avoid memory leaks.

With this detailed explanation in your `README.md`, any developer reviewing your project will understand how the routing, query parameters, and component interactions work. You can also expand this with more examples, screenshots, or UI enhancements as your project evolves. Let me know if you'd like any further adjustments!
