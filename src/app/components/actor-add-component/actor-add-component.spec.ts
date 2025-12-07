import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorAddComponent } from './actor-add-component';

describe('ActorAddComponent', () => {
  let component: ActorAddComponent;
  let fixture: ComponentFixture<ActorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorAddComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
