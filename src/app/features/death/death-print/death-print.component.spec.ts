import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathPrintComponent } from './death-print.component';

describe('DeathPrintComponent', () => {
  let component: DeathPrintComponent;
  let fixture: ComponentFixture<DeathPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
