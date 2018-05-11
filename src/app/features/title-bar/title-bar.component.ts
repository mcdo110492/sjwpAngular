import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {

  @Input() title   : string = '';
  @Input() goBack  : string = '';
  @Input() toolTip : string = '';
  @Input() bulk    : boolean = false;
  @Input() upload  : boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
