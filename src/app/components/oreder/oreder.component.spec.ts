import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrederComponent } from './oreder.component';

describe('OrederComponent', () => {
  let component: OrederComponent;
  let fixture: ComponentFixture<OrederComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrederComponent]
    });
    fixture = TestBed.createComponent(OrederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
