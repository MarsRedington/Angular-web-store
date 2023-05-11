import { Component, Input, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  public itemsQuantity: number = 0;

  private _cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}

  public getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  public onClearCart(): void {
    this.cartService.clearCart();
  }
}
