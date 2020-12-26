import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DataService, ListItem} from '../../../services/data.service';
import {MatTableDataSource} from '@angular/material/table';


describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dataService: DataService;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  let spyAddItem: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
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
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close dialog window', () => {
    component.closeWindow();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call add new product method and close', () => {
    component.addItem('', 1, 1, 1);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call add new product method', () => {
    spyAddItem = spyOn(dataService, 'addNewProduct');
    component.addItem('', 1, 1, 1);
    expect(dataService.addNewProduct).toHaveBeenCalled();
  });
});
