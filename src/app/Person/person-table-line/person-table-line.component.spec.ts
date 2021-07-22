import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableLineComponent } from './person-table-line.component';

describe('PersonTableLineComponent', () => {
  let component: PersonTableLineComponent;
  let fixture: ComponentFixture<PersonTableLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTableLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTableLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
