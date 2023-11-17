import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpatientCustomerComponent } from './impatient-customer.component';

describe('ImpatientCustomerComponent', () => {
  let component: ImpatientCustomerComponent;
  let fixture: ComponentFixture<ImpatientCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpatientCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpatientCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
