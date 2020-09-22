import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsBoardComponent } from './options-board.component';

describe('OptionsBoardComponent', () => {
  let component: OptionsBoardComponent;
  let fixture: ComponentFixture<OptionsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
