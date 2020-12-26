import { Injectable } from '@angular/core';
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
  listItems: ListItem[] = [
    {name: 'Popcorn', price: 3, discountNum: 0, discountPrice: 0},
    {name: 'Snickers ', price: 4, discountNum: 5, discountPrice: 12},
    {name: 'Soda ', price: 2, discountNum: 0, discountPrice: 0},
  ];

  cartList: CartItem[] = [];

  dataForTable: MatTableDataSource<ListItem> =
   new MatTableDataSource<ListItem>(this.listItems);

  constructor() { }

  addNewProduct(product, price, discNum, discPrice): void {
    this.listItems.push({
      name: product,
      price,
      discountNum: discNum,
      discountPrice: discPrice
    });
    this.dataForTable = new MatTableDataSource(this.listItems);
  }

  cartItemOnName(name): CartItem {
    return this.cartList.find((item) => item.name === name);
  }

  listItemOnName(name): ListItem {
    return this.listItems.find((item) => item.name === name);
  }

}
