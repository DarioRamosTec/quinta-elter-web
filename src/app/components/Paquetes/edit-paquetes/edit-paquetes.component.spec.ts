import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaquetesComponent } from './edit-paquetes.component';

describe('EditPaquetesComponent', () => {
  let component: EditPaquetesComponent;
  let fixture: ComponentFixture<EditPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPaquetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
