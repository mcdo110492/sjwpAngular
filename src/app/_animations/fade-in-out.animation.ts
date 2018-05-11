import { trigger , animate, transition, style, query, animateChild } from '@angular/animations';

export const fadeInAnimation =

    trigger('fadeInAnimation', [
        
        transition('* <=> *', [

            // make sure the new page is hidden first
            query(':enter' , [

                style({ opacity: 0 }),
                
            ], { optional:true } ), // optional true if element return zero values to disable the error

            // animate the leave page away
            query(':leave', [

                animate('0.3s', style({ opacity: 0 })),
                animateChild()

            ], { optional:true } ),

            query(':enter', [

                animate('0.3s', style({ opacity: 1 })),
                animateChild()

            ], { optional: true } )
            
        ])
    ]);