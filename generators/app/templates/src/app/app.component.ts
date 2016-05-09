import { Component, OnInit } from 'angular2/core';
import { FormBuilder, Validators } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

@Component({
    selector: 'app',
    providers: [ Title ],
    templateUrl: './app/app.component.html',
    styleUrls: [ './app/app.component.css' ]
})

export class AppComponent implements OnInit {
  appForm:any;
  items:Array<string>;

  constructor(private builder: FormBuilder, private title: Title) {
    this.appForm = builder.group({
      name: ['<%= appName %>', Validators.required]
    });
  }

  ngOnInit() {
    this.items = ['one','two','three']
  }

  notify(event) {
    this.title.setTitle(this.appForm.value.name)
  }
}
