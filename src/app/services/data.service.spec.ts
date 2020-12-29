import { TestBed } from '@angular/core/testing';

import { DataService, ListItem } from './data.service';
import {MatTableDataSource} from '@angular/material/table';

describe('DataService', () => {

  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return item on Name', () => {
    const val = service.listItemOnName('Popcorn');
    expect(val.name).toBe('Popcorn');
  });

  it('should return item on Name', () => {
    service.cartList = [{
      name: 'Popcorn',
      number: 1,
      amount: 1
    }];
    const val = service.cartItemOnName('Popcorn');
    expect(val.name).toBe('Popcorn');
  });

  it('should add new product', () => {
    service.addNewProduct('name', 1, 2, 3);
    const obj: ListItem = {
      name: 'name',
      price: 1,
      discountNum: 2,
      discountPrice: 3
    };
    expect(service.listItems[service.listItems.length - 1])
      .toEqual(obj);
  });

  it('should return number from cart on Name', () => {
    service.cartList = [{
      name: 'Popcorn',
      number: 1,
      amount: 1
    }];
    const val = service.cartNumberOnName('Popcorn');
    expect(val).toBe('1');
  });

  it('should return "0" when "name" is absent in cart', () => {
    service.cartList = [{
      name: 'Popcorn',
      number: 1,
      amount: 1
    }];
    const val = service.cartNumberOnName('Cola');
    expect(val).toBe('0');
  });
});
