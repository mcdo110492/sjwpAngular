import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathEditorComponent } from './death-editor.component';

describe('DeathEditorComponent', () => {
  let component: DeathEditorComponent;
  let fixture: ComponentFixture<DeathEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
