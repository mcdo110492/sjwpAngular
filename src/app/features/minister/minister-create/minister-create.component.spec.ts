import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisterCreateComponent } from './minister-create.component';

describe('MinisterCreateComponent', () => {
  let component: MinisterCreateComponent;
  let fixture: ComponentFixture<MinisterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinisterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinisterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
