import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeSalaChatComponent } from './mensaje-sala-chat.component';

describe('MensajeSalaChatComponent', () => {
  let component: MensajeSalaChatComponent;
  let fixture: ComponentFixture<MensajeSalaChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeSalaChatComponent]
    });
    fixture = TestBed.createComponent(MensajeSalaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
