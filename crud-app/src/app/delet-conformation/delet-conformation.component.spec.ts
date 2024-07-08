import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletConformationComponent } from './delet-conformation.component';

describe('DeletConformationComponent', () => {
  let component: DeletConformationComponent;
  let fixture: ComponentFixture<DeletConformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletConformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletConformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
