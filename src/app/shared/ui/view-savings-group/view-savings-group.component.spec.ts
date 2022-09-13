import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavingsGroupComponent } from './view-savings-group.component';

describe('ViewSavingsGroupComponent', () => {
  let component: ViewSavingsGroupComponent;
  let fixture: ComponentFixture<ViewSavingsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSavingsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSavingsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
