import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoEventosComponent } from './edit-tipo-eventos.component';

describe('EditTipoEventosComponent', () => {
  let component: EditTipoEventosComponent;
  let fixture: ComponentFixture<EditTipoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTipoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTipoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
