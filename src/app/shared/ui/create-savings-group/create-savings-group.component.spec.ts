import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavingsGroupComponent } from './create-savings-group.component';

describe('CreateSavingsGroupComponent', () => {
  let component: CreateSavingsGroupComponent;
  let fixture: ComponentFixture<CreateSavingsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSavingsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSavingsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
