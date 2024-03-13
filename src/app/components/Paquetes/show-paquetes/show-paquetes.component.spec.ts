import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaquetesComponent } from './show-paquetes.component';

describe('ShowPaquetesComponent', () => {
  let component: ShowPaquetesComponent;
  let fixture: ComponentFixture<ShowPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPaquetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
