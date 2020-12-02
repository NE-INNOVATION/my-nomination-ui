import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNominationContainerComponent } from './my-nomination-container.component';

describe('MyNominationContainerComponent', () => {
  let component: MyNominationContainerComponent;
  let fixture: ComponentFixture<MyNominationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNominationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNominationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
