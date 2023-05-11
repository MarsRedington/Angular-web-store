import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  };

  public dataSource: Array<CartItem> = [];
  public displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  public getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  public onClearCart(): void {
    this.cartService.clearCart();
  }

  public onRemoveFromCart(cart: CartItem): void {
    this.cartService.removeFromCart(cart);
  }

  public onAddQuantity(cart: CartItem): void {
    this.cartService.addToCart(cart);
  }

  public onRemoveQuantity(cart: CartItem): void {
    this.cartService.removeQuantity(cart);
  }
}
