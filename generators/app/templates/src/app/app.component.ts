import {Component, OnInit} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {Title} from 'angular2/platform/browser';

@Component({
    selector: 'app',
    providers:[Title],
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css']
})

export class AppComponent implements OnInit {
  pageTitle:string;
  titleService:any;
  appForm:any;
  items:Array<string>;

  constructor(builder: FormBuilder, title: Title) {
    this.appForm = builder.group({
      name: ['My Angular2 App', Validators.required]
    });

    this.titleService = title;
    this.pageTitle = title.getTitle();
  }

  ngOnInit() {
    this.items = ['one','two','three']
  }

  notify(event) {
    this.pageTitle = this.appForm.value.name;
    this.titleService.setTitle(this.pageTitle);
  }
}
