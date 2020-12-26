import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {DataService} from '../../services/data.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [MatDialogModule],
      providers: [
        DataService,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate cart total cost', () => {
    component.cartList = [
      {
        name,
        number: 1,
        amount: 1
      },
      {
        name,
        number: 1,
        amount: 2
      },
    ];
    expect(component.totalCost()).toBe(3);
  });

  it('should call close dialog window', () => {
    component.closeCart();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
