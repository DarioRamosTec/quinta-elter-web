import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRolesComponent } from './index-roles.component';

describe('IndexRolesComponent', () => {
  let component: IndexRolesComponent;
  let fixture: ComponentFixture<IndexRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
