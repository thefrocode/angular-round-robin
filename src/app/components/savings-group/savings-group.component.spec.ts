import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsGroupComponent } from './savings-group.component';

describe('SavingsGroupComponent', () => {
  let component: SavingsGroupComponent;
  let fixture: ComponentFixture<SavingsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
