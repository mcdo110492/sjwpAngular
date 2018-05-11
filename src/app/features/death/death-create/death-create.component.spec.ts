import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathCreateComponent } from './death-create.component';

describe('DeathCreateComponent', () => {
  let component: DeathCreateComponent;
  let fixture: ComponentFixture<DeathCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
