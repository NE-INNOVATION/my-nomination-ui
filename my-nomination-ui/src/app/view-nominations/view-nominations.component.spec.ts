import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNominationsComponent } from './view-nominations.component';

describe('ViewNominationsComponent', () => {
  let component: ViewNominationsComponent;
  let fixture: ComponentFixture<ViewNominationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNominationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
