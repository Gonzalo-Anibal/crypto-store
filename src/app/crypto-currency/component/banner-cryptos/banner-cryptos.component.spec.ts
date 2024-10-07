import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCryptosComponent } from './banner-cryptos.component';

describe('BannerCryptosComponent', () => {
  let component: BannerCryptosComponent;
  let fixture: ComponentFixture<BannerCryptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCryptosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCryptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
