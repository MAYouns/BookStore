import {
  trigger,
  transition,
  style,
  query,
  animate,
  stagger,
  sequence,
} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    // Ensure the entering/leaving pages are positioned stacked
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ],
      { optional: true }
    ),
  ]),
]);

export const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger('50ms', [
          animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
]);
