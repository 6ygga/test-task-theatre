import {Component} from '@angular/core';
import {CartItem, DataService, ListItem} from '../../services/data.service';
import {CartComponent} from '../cart/cart.component';
import {AddProductComponent} from './add-product/add-product.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  displayedColumns: string[] = ['name', 'price', 'buy'];
  cartList: CartItem[];

  constructor(public dataService: DataService, public dialog: MatDialog) {
    this.dataService = dataService;
  }

  addItem(): void {
    this.dialog.open(AddProductComponent);
  }

  openCart(): void {
    this.dialog.open(CartComponent);
  }

  onInput(itemName: string, numToBuy: string): void {
    this.cartList = this.dataService.cartList;
    const numberToBuy = Number(numToBuy);
    const currentCartItem = this.dataService.cartItemOnName(itemName);
    const currentListItem = this.dataService.listItemOnName(itemName);

    if (numberToBuy === 0) {
      if (currentCartItem) {
        this.dataService.removeItemFromCart(currentCartItem);
      }
      currentCartItem.number = numberToBuy;
      this.dataService.saveCartToLocalStorage();
      return;
    }

    if (!currentCartItem) {
      this.cartList.push({
        name: itemName,
        number: numberToBuy,
        amount: this.calculateAmount(currentListItem, numberToBuy),
      });
    } else {
      currentCartItem.number = numberToBuy;
      currentCartItem.amount = this.calculateAmount(currentListItem, numberToBuy);
    }
    this.dataService.saveCartToLocalStorage();
  }

  calculateAmount(currentListItem: ListItem, numToBuy: number): number {
    if (!currentListItem.discountNum || Number(numToBuy) < currentListItem.discountNum) {
      return numToBuy * currentListItem.price;
    }

    return (Math.trunc(numToBuy / currentListItem.discountNum)
      * currentListItem.discountPrice
      + (numToBuy % currentListItem.discountNum) * currentListItem.price);

  }
}
