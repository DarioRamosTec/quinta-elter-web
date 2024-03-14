import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexHorasExtrasComponent } from './index-horas-extras.component';

describe('IndexHorasExtrasComponent', () => {
  let component: IndexHorasExtrasComponent;
  let fixture: ComponentFixture<IndexHorasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexHorasExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexHorasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
