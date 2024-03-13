import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaquetesComponent } from './create-paquetes.component';

describe('CreatePaquetesComponent', () => {
  let component: CreatePaquetesComponent;
  let fixture: ComponentFixture<CreatePaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePaquetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
