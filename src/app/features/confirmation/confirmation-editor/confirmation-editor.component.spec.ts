import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationEditorComponent } from './confirmation-editor.component';

describe('ConfirmationEditorComponent', () => {
  let component: ConfirmationEditorComponent;
  let fixture: ComponentFixture<ConfirmationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
