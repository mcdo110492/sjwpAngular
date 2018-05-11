import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCreateComponent } from './confirmation-create.component';

describe('ConfirmationCreateComponent', () => {
  let component: ConfirmationCreateComponent;
  let fixture: ComponentFixture<ConfirmationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
