import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiciosComponent } from './create-servicios.component';

describe('CreateServiciosComponent', () => {
  let component: CreateServiciosComponent;
  let fixture: ComponentFixture<CreateServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
