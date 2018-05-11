import {trigger, animate, style, animateChild, query, transition, group} from '@angular/animations';

// Component transition animations
export const slideInDownAnimation =

  trigger('routerAnimation', [
     
    transition('* <=> *', [

      query(':enter, :leave',
          style({ position: 'absolute', top: "5%", left: 0, right: 0 }), { optional : true } ),

      query(':enter', [
          style({ opacity:1, transform: 'translateX(100%)'})

      ], { optional: true } ),

      query(':leave', [
          animate('800ms cubic-bezier(.35,0,.25,1)', style({ opacity:0, transform: 'translateX(-100%)' }))
        ], { optional: true } ),

        group([

          query(':enter', [
            animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
          ], { optional: true } )

        ])
      ])

  ]);