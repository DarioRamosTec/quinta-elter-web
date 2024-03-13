import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPaquetesComponent } from './index-paquetes.component';

describe('IndexPaquetesComponent', () => {
  let component: IndexPaquetesComponent;
  let fixture: ComponentFixture<IndexPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPaquetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
