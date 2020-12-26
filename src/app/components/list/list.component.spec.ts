import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';

import { ListComponent } from './list.component';
import {DataService, ListItem} from '../../services/data.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dataService: DataService;
  let spy: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatDialogModule],
      providers: [
        DataService,
      ]
    })
    .compileComponents();
    dataService = new DataService();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new item to cart array', () => {
    spy = spyOn(component, 'calculateAmount').and.returnValue(1);
    component.onInput('CocaCola', '1');
    expect(component.cartList[0].name).toBe('CocaCola');
  });

  it('should calculate amount 1 item', () => {
    spy = spyOn(component, 'calculateAmount').and.callThrough();
    const obj: ListItem = {
      name: 'name',
      price: 4,
      discountNum: 5,
      discountPrice: 12
    };
    expect(component.calculateAmount(obj, 1)).toBeTruthy(4);
  });
  it('should calculate amount discount items', () => {
    spy = spyOn(component, 'calculateAmount').and.callThrough();
    const obj: ListItem = {
      name: 'name',
      price: 4,
      discountNum: 5,
      discountPrice: 12
    };
    expect(component.calculateAmount(obj, 5)).toBeTruthy(12);
  });
  it('should calculate amount 1 more discount ', () => {
    spy = spyOn(component, 'calculateAmount').and.callThrough();
    const obj: ListItem = {
      name: 'name',
      price: 4,
      discountNum: 5,
      discountPrice: 12
    };
    expect(component.calculateAmount(obj, 6)).toBeTruthy(16);
  });
  it('should calculate amount 2 discounts', () => {
    spy = spyOn(component, 'calculateAmount').and.callThrough();
    const obj: ListItem = {
      name: 'name',
      price: 4,
      discountNum: 5,
      discountPrice: 12
    };
    expect(component.calculateAmount(obj, 10)).toBeTruthy(23);
  });
  it('should calculate amount product w/o discount ', () => {
    spy = spyOn(component, 'calculateAmount').and.callThrough();
    const obj: ListItem = {
      name: 'name',
      price: 4,
      discountNum: 0,
      discountPrice: 0
    };
    expect(component.calculateAmount(obj, 10)).toBeTruthy(40);
  });

});
