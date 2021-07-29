import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoRestauranteComponent } from './novo-restaurante.component';

describe('NovoRestauranteComponent', () => {
  let component: NovoRestauranteComponent;
  let fixture: ComponentFixture<NovoRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
