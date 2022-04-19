import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailIngredientComponent } from './form-detail-ingredient.component';

describe('FormDetailIngredientComponent', () => {
  let component: FormDetailIngredientComponent;
  let fixture: ComponentFixture<FormDetailIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDetailIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDetailIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
