import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTipoEventosComponent } from './show-tipo-eventos.component';

describe('ShowTipoEventosComponent', () => {
  let component: ShowTipoEventosComponent;
  let fixture: ComponentFixture<ShowTipoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTipoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTipoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
