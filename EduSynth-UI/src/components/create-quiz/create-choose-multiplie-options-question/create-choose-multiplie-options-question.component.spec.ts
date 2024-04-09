import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChooseMultiplieOptionsQuestionComponent } from './create-choose-multiplie-options-question.component';

describe('CreateChooseMultiplieOptionsQuestionComponent', () => {
  let component: CreateChooseMultiplieOptionsQuestionComponent;
  let fixture: ComponentFixture<CreateChooseMultiplieOptionsQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChooseMultiplieOptionsQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateChooseMultiplieOptionsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
