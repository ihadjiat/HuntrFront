import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contractListComponent } from './contract-list.component';

describe('contractListComponent', () => {
  let component: contractListComponent;
  let fixture: ComponentFixture<contractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ contractListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(contractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
