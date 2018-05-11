import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaptismBulkComponent } from './baptism-bulk.component';

describe('BaptismBulkComponent', () => {
  let component: BaptismBulkComponent;
  let fixture: ComponentFixture<BaptismBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaptismBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaptismBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
