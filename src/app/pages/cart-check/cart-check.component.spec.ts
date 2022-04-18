import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckComponent } from './cart-check.component';

describe('CartCheckComponent', () => {
  let component: CartCheckComponent;
  let fixture: ComponentFixture<CartCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
