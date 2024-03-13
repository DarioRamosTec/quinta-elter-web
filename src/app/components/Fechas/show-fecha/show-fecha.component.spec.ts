import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFechaComponent } from './show-fecha.component';

describe('ShowFechaComponent', () => {
  let component: ShowFechaComponent;
  let fixture: ComponentFixture<ShowFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
