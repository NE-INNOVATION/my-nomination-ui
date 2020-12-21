import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProgramComponent } from './setup-program.component';

describe('SetupProgramComponent', () => {
  let component: SetupProgramComponent;
  let fixture: ComponentFixture<SetupProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
