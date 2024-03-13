import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOpinionesComponent } from './edit-opiniones.component';

describe('EditOpinionesComponent', () => {
  let component: EditOpinionesComponent;
  let fixture: ComponentFixture<EditOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOpinionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
