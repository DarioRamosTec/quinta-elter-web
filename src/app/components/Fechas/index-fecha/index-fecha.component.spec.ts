import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFechaComponent } from './index-fecha.component';

describe('IndexFechaComponent', () => {
  let component: IndexFechaComponent;
  let fixture: ComponentFixture<IndexFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
