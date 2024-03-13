import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiciosComponent } from './edit-servicios.component';

describe('EditServiciosComponent', () => {
  let component: EditServiciosComponent;
  let fixture: ComponentFixture<EditServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
