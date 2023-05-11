import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) { }

  public addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item) => _item.id === item.id);

    if (itemsInCart) {
      itemsInCart.quantity +=1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 300 });
  }

  public getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  public clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared', 'Ok', { duration: 300 });
  }

  public removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteretedItems = this.cart.value.items.filter((_item) => _item.id !== item.id);
    
    if (update) {
      this.cart.next({ items: filteretedItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 300 })
    }
   return filteretedItems;
  }

  public removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteretedItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      filteretedItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: filteretedItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 300 });
  }
}
