import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {Quiz} from "../../models/quiz-model";
import {QuizService} from "../../service/quiz.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-display-quiz-details',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './display-quiz-details.component.html',
  styleUrl: './display-quiz-details.component.css'
})
export class DisplayQuizDetailsComponent {
  id: number = 0;
  quiz: Quiz | null = null;
  private sub: any;

  constructor(private route: ActivatedRoute, private quizService : QuizService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.quizService.getQuiz(this.id).subscribe(quiz => this.quiz = quiz);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  launchTest(id: number) {
    this.quizService.startQuiz(id);
  }
}
