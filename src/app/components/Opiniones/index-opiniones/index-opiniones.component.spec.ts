import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexOpinionesComponent } from './index-opiniones.component';

describe('IndexOpinionesComponent', () => {
  let component: IndexOpinionesComponent;
  let fixture: ComponentFixture<IndexOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexOpinionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
