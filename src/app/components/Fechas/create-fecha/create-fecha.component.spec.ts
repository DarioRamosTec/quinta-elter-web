import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFechaComponent } from './create-fecha.component';

describe('CreateFechaComponent', () => {
  let component: CreateFechaComponent;
  let fixture: ComponentFixture<CreateFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
