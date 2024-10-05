import { trigger, transition, style, animate } from '@angular/animations';

export const slideToLeftAnimation =
  trigger('slideToLeftAnimation', [
      transition(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
          animate('500ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
  ]);
