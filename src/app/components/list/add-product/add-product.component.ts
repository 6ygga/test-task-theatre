import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DataService} from '../../../services/data.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{

  constructor(public dataService: DataService,
              public dialogRef: MatDialogRef<AddProductComponent>) { }

  closeWindow(): void {
    this.dialogRef.close();
  }

  addItem(product, price, discNum, discPrice): void {
    if (this.dataService.listItems.find((item) => item.name === product)) {
      window.alert('Product already exist');
      return;
    }

    this.dataService.addNewProduct(
      product,
      Number(price),
      Number(discNum),
      Number(discPrice)
    );
    this.dialogRef.close();
  }
}
