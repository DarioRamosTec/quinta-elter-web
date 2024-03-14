import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHorasExtrasComponent } from './create-horas-extras.component';

describe('CreateHorasExtrasComponent', () => {
  let component: CreateHorasExtrasComponent;
  let fixture: ComponentFixture<CreateHorasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHorasExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHorasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
