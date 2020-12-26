import { Component } from '@angular/core';
import {CartItem, DataService} from '../../services/data.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  displayedColumns: string[] = ['name', 'number', 'amount'];
  cartList: CartItem[];

  constructor(dataService: DataService,
              public dialogRef: MatDialogRef<CartComponent>) {
    this.cartList = dataService.cartList;
  }

  closeCart(): void {
    this.dialogRef.close();
  }

  totalCost(): number {
    return this.cartList.reduce((sum, item) => {
      sum += item.amount;
      return sum;
    }, 0);
  }
}
