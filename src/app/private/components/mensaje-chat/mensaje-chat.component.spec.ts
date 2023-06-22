import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeChatComponent } from './mensaje-chat.component';

describe('MensajeChatComponent', () => {
  let component: MensajeChatComponent;
  let fixture: ComponentFixture<MensajeChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeChatComponent]
    });
    fixture = TestBed.createComponent(MensajeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
