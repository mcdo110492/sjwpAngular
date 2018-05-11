import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageEditorComponent } from './marriage-editor.component';

describe('MarriageEditorComponent', () => {
  let component: MarriageEditorComponent;
  let fixture: ComponentFixture<MarriageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
