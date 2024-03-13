import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTiposPagosComponent } from './index-tipos-pagos.component';

describe('IndexTiposPagosComponent', () => {
  let component: IndexTiposPagosComponent;
  let fixture: ComponentFixture<IndexTiposPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexTiposPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexTiposPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
