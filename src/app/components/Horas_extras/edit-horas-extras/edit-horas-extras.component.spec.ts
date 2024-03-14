import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHorasExtrasComponent } from './edit-horas-extras.component';

describe('EditHorasExtrasComponent', () => {
  let component: EditHorasExtrasComponent;
  let fixture: ComponentFixture<EditHorasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHorasExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHorasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
