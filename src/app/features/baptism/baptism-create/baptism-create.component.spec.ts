import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaptismCreateComponent } from './baptism-create.component';

describe('BaptismCreateComponent', () => {
  let component: BaptismCreateComponent;
  let fixture: ComponentFixture<BaptismCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaptismCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaptismCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
