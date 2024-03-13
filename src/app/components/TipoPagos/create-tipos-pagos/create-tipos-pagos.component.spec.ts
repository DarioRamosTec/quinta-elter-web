import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTiposPagosComponent } from './create-tipos-pagos.component';

describe('CreateTiposPagosComponent', () => {
  let component: CreateTiposPagosComponent;
  let fixture: ComponentFixture<CreateTiposPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTiposPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTiposPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
