import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { interval, Subscription } from "rxjs";

@Component({
    selector: "app-circle-timer",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./circle-timer.component.html",
    styleUrls: ["./circle-timer.component.scss"]
})
export class CircleTimerComponent implements OnInit, OnDestroy {

  @Input() public duration = 60; // Продолжительность в секундах
  @Input() public size = 80; // Размер в пикселях
  @Input() public strokeWidth = 8; // Толщина обводки
  @Input() public bgColor = "#e0e0e0"; // Цвет фона
  @Input() public colors: string[] = ["#004777", "#F7B801", "#A30000"]; // Цвета для разных состояний
  @Input() public warningThreshold = 25; // Порог предупреждения в процентах
  @Input() public criticalThreshold = 10; // Критический порог в процентах
  @Input() public customContent = false; // Флаг для использования пользовательского содержимого

  @Output() public onComplete = new EventEmitter<void>();
  @Output() public onTick = new EventEmitter<number>();

  public timeRemaining = 0;
  public timePercentage = 100;
  public dashOffset = 0;
  public radius = 45;
  public circumference = 0;

  private timerSubscription: Subscription | null = null;
  private startTime = 0;
  private pausedTimeRemaining = 0;
  private isPaused = false;

  constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
      this.timeRemaining = this.duration;
      this.circumference = 2 * Math.PI * this.radius;
      this.dashOffset = 0;

      this.elementRef.nativeElement.style.setProperty("--timer-size", `${this.size}px`);
  }

  public ngOnDestroy(): void {
      this.stop();
  }

  public start(): void {
      if (this.timerSubscription) {
          this.stop();
      }

      if (this.isPaused) {
          this.timeRemaining = this.pausedTimeRemaining;
          this.isPaused = false;
      } else {
          this.timeRemaining = this.duration;
      }

      this.startTime = Date.now();

      this.timerSubscription = interval(100).subscribe(() => {
          const elapsedSeconds = (Date.now() - this.startTime) / 1000;
          this.timeRemaining = Math.max(0, this.duration - elapsedSeconds);
          this.timePercentage = (this.timeRemaining / this.duration) * 100;

          this.dashOffset = this.circumference * (1 - this.timeRemaining / this.duration);

          this.onTick.emit(this.timeRemaining);

          if (this.timeRemaining <= 0) {
              this.complete();
          }
      });
  }

  public stop(): void {
      if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
          this.timerSubscription = null;
      }
  }

  public pause(): void {
      if (this.timerSubscription && !this.isPaused) {
          this.stop();
          this.pausedTimeRemaining = this.timeRemaining;
          this.isPaused = true;
      }
  }

  public reset(): void {
      this.stop();
      this.timeRemaining = this.duration;
      this.timePercentage = 100;
      this.dashOffset = 0;
      this.isPaused = false;
  }

  private complete(): void {
      this.stop();
      this.onComplete.emit();
  }

  public getProgressColor(): string {
      if (this.timePercentage <= this.criticalThreshold) {
          return this.colors[2] || "#A30000"; // Критический цвет (красный)
      } else if (this.timePercentage <= this.warningThreshold) {
          return this.colors[1] || "#F7B801"; // Предупреждающий цвет (желтый)
      } else {
          return this.colors[0] || "#004777"; // Нормальный цвет (синий)
      }
  }

  public formatTime(seconds: number): string {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

}