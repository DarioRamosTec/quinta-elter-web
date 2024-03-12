import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTipoEventosComponent } from './create-tipo-eventos.component';

describe('CreateTipoEventosComponent', () => {
  let component: CreateTipoEventosComponent;
  let fixture: ComponentFixture<CreateTipoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTipoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTipoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
