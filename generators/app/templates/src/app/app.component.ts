import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css']
})

export class AppComponent implements OnInit {
  items:Array<string>;

  ngOnInit() {
    this.items = ['one','two','three'];
  }
}
