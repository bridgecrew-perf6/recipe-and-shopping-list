import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterIngredientComponent } from './filter-ingredient.component';

describe('FilterIngredientComponent', () => {
  let component: FilterIngredientComponent;
  let fixture: ComponentFixture<FilterIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
