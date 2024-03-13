import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServiciosComponent } from './show-servicios.component';

describe('ShowServiciosComponent', () => {
  let component: ShowServiciosComponent;
  let fixture: ComponentFixture<ShowServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
