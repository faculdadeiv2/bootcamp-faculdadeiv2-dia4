import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesComponent } from './restaurantes.component';

describe('RestaurantesComponent', () => {
  let component: RestaurantesComponent;
  let fixture: ComponentFixture<RestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
