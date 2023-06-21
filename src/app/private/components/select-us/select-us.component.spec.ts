import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUsComponent } from './select-us.component';

describe('SelectUsComponent', () => {
  let component: SelectUsComponent;
  let fixture: ComponentFixture<SelectUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectUsComponent]
    });
    fixture = TestBed.createComponent(SelectUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
