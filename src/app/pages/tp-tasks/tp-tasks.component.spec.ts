import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpTasksComponent } from './tp-tasks.component';

describe('TpTasksComponent', () => {
  let component: TpTasksComponent;
  let fixture: ComponentFixture<TpTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
