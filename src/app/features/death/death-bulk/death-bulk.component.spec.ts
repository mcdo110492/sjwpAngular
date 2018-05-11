import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathBulkComponent } from './death-bulk.component';

describe('DeathBulkComponent', () => {
  let component: DeathBulkComponent;
  let fixture: ComponentFixture<DeathBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
