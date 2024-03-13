import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFechaComponent } from './edit-fecha.component';

describe('EditFechaComponent', () => {
  let component: EditFechaComponent;
  let fixture: ComponentFixture<EditFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
