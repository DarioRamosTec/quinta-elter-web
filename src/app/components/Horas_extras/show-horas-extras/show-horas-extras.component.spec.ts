import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHorasExtrasComponent } from './show-horas-extras.component';

describe('ShowHorasExtrasComponent', () => {
  let component: ShowHorasExtrasComponent;
  let fixture: ComponentFixture<ShowHorasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowHorasExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowHorasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
