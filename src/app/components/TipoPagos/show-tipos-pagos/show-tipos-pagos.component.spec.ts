import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTiposPagosComponent } from './show-tipos-pagos.component';

describe('ShowTiposPagosComponent', () => {
  let component: ShowTiposPagosComponent;
  let fixture: ComponentFixture<ShowTiposPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTiposPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTiposPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
