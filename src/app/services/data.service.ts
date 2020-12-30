import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface ListItem {
  name: string;
  price: number;
  discountNum: number;
  discountPrice: number;
}

export interface CartItem {
  name: string;
  number: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  listItems: ListItem[];

  cartList: CartItem[];

  dataForTable: MatTableDataSource<ListItem>;

  constructor() {
    this.cartList = this.cartFromLocalStorage() || [];
    this.listItems = this.productListFromLocalStorage() || [
      {name: 'Popcorn', price: 3, discountNum: 0, discountPrice: 0},
      {name: 'Snickers', price: 4, discountNum: 5, discountPrice: 12},
      {name: 'Soda', price: 2, discountNum: 0, discountPrice: 0},
    ];

    this.dataForTable = new MatTableDataSource<ListItem>(this.listItems);
  }

  addNewProduct(product, price, discNum, discPrice): void {
    this.listItems.push({
      name: product,
      price,
      discountNum: discNum,
      discountPrice: discPrice
    });
    this.dataForTable = new MatTableDataSource(this.listItems);
    this.saveProductsToLocalStorage();
  }

  removeItemFromCart(currentCartItem: CartItem): void {
    const index = this.cartList.indexOf(currentCartItem);
    this.cartList.splice(index, 1);
  }

  cartItemOnName(name): CartItem {
    return this.cartList.find((item) => item.name === name);
  }

  cartNumberOnName(name): string {
    const val = this.cartList.find((item) => item.name === name);
    if (!val) {
      return '0';
    }
    return val.number.toString();
  }

  listItemOnName(name): ListItem {
    return this.listItems.find((item) => item.name === name);
  }

  saveCartToLocalStorage(): void {
    window.localStorage.setItem('cartList', JSON.stringify(this.cartList));
  }

  saveProductsToLocalStorage(): void {
    window.localStorage.setItem('productList', JSON.stringify(this.listItems));
  }

  cartFromLocalStorage(): CartItem[] {
    return JSON.parse(window.localStorage.getItem('cartList'));
  }

  productListFromLocalStorage(): ListItem[] {
    return JSON.parse(window.localStorage.getItem('productList'));
  }

}
