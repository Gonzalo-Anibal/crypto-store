import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCoinComponent } from './sell-coin.component';

describe('SellCoinComponent', () => {
  let component: SellCoinComponent;
  let fixture: ComponentFixture<SellCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellCoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
