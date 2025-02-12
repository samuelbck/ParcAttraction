import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CritiqueComponent } from './critique.component';

describe('CritiqueComponent', () => {
  let component: CritiqueComponent;
  let fixture: ComponentFixture<CritiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CritiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CritiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
