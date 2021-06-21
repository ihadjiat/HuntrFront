import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contractEditComponent } from './contract-edit.component';

describe('contractEditComponent', () => {
  let component: contractEditComponent;
  let fixture: ComponentFixture<contractEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ contractEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(contractEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
