import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstadoEventosComponent } from './create-estado-eventos.component';

describe('CreateEstadoEventosComponent', () => {
  let component: CreateEstadoEventosComponent;
  let fixture: ComponentFixture<CreateEstadoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEstadoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEstadoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
