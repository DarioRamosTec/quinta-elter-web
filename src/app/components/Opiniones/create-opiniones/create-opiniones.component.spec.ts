import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOpinionesComponent } from './create-opiniones.component';

describe('CreateOpinionesComponent', () => {
  let component: CreateOpinionesComponent;
  let fixture: ComponentFixture<CreateOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOpinionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
