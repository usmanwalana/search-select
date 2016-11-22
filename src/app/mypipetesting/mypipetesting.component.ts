import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-mypipetesting',
  templateUrl: './mypipetesting.component.html',
  styleUrls: ['./mypipetesting.component.css']
})
export class MypipetestingComponent implements OnInit {

  message: Observable<string>;
  private messages = [
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];
  ngOnInit()
  {

  }
  constructor() { this.resend(); }
  resend() {
    this.message = Observable.interval(500)
        .map(i => this.messages[i])
        .take(this.messages.length);
  }

}
