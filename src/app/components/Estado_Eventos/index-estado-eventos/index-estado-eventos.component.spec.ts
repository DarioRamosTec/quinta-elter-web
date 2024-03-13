import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEstadoEventosComponent } from './index-estado-eventos.component';

describe('IndexEstadoEventosComponent', () => {
  let component: IndexEstadoEventosComponent;
  let fixture: ComponentFixture<IndexEstadoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexEstadoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexEstadoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
