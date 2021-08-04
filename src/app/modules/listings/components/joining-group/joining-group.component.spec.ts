import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningGroupComponent } from './joining-group.component';

describe('JoiningGroupComponent', () => {
  let component: JoiningGroupComponent;
  let fixture: ComponentFixture<JoiningGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoiningGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
