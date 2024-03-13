import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEstadoEventosComponent } from './show-estado-eventos.component';

describe('ShowEstadoEventosComponent', () => {
  let component: ShowEstadoEventosComponent;
  let fixture: ComponentFixture<ShowEstadoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowEstadoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowEstadoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
