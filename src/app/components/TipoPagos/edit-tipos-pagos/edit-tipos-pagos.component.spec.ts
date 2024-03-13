import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTiposPagosComponent } from './edit-tipos-pagos.component';

describe('EditTiposPagosComponent', () => {
  let component: EditTiposPagosComponent;
  let fixture: ComponentFixture<EditTiposPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTiposPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTiposPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
