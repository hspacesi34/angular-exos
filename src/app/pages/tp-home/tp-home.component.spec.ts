import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpHomeComponent } from './tp-home.component';

describe('TpHomeComponent', () => {
  let component: TpHomeComponent;
  let fixture: ComponentFixture<TpHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
