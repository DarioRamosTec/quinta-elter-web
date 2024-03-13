import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOpinionesComponent } from './show-opiniones.component';

describe('ShowOpinionesComponent', () => {
  let component: ShowOpinionesComponent;
  let fixture: ComponentFixture<ShowOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOpinionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
