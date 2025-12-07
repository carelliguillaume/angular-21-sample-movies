import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorListItemComponent } from './actor-list-item-component';

describe('ActorListItemComponent', () => {
  let component: ActorListItemComponent;
  let fixture: ComponentFixture<ActorListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorListItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
