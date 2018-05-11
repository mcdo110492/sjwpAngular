import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisterEditorComponent } from './minister-editor.component';

describe('MinisterEditorComponent', () => {
  let component: MinisterEditorComponent;
  let fixture: ComponentFixture<MinisterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinisterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinisterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
