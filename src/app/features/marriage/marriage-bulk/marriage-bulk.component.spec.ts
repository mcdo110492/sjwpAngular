import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageBulkComponent } from './marriage-bulk.component';

describe('MarriageBulkComponent', () => {
  let component: MarriageBulkComponent;
  let fixture: ComponentFixture<MarriageBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
