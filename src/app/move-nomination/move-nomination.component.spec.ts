import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveNominationComponent } from './move-nomination.component';

describe('MoveNominationComponent', () => {
  let component: MoveNominationComponent;
  let fixture: ComponentFixture<MoveNominationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveNominationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
