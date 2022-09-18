import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceProviderComponent } from './list-service-provider.component';

describe('ListServiceProviderComponent', () => {
  let component: ListServiceProviderComponent;
  let fixture: ComponentFixture<ListServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServiceProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
