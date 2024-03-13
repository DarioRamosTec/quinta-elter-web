import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstadoEventosComponent } from './edit-estado-eventos.component';

describe('EditEstadoEventosComponent', () => {
  let component: EditEstadoEventosComponent;
  let fixture: ComponentFixture<EditEstadoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEstadoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEstadoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
