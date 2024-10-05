import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appScrollDirective]',
    standalone: true
})
export class ScrollDirectiveDirective {
    @Input()
    public pixelLimit: number = 200;

    @Output()
    public scrolledToEnd: EventEmitter<void> = new EventEmitter();

    constructor(private element: ElementRef) {

    }

    @HostListener('scroll')
    public onScrollHandler(): void {
        const totalElementHeight = this.element.nativeElement.scrollHeight;
        const alreadyScrolled = this.element.nativeElement.scrollTop;
        const elementHeight = this.element.nativeElement.clientHeight;

        const toBottom = totalElementHeight - alreadyScrolled - elementHeight;

        if (toBottom < this.pixelLimit) {
            this.scrolledToEnd.emit();
        }
    }
}
