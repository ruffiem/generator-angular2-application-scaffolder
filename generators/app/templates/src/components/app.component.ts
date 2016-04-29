import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'app',
    templateUrl: './components/app.component.html',
    styleUrls: ['./components/app.component.css']
})

export class AppComponent implements OnInit {
  items:Array<string>;

  ngOnInit() {
    this.items = ['one','two','three'];
  }
}
