import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageCreateComponent } from './marriage-create.component';

describe('MarriageCreateComponent', () => {
  let component: MarriageCreateComponent;
  let fixture: ComponentFixture<MarriageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
