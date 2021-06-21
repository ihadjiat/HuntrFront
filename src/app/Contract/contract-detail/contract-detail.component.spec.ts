import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contractDetailsComponent } from './contract-detail.component';

describe('contractDetailComponent', () => {
  let component: contractDetailsComponent;
  let fixture: ComponentFixture<contractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ contractDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(contractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
