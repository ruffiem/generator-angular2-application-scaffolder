/// <reference path="../../typings/jasmine.d.ts" />

import {it, describe, expect} from 'angular2/testing';
import {AppComponent} from "./app.component";

describe('AppComponent Tests', () => {
  let list;

  beforeEach(function() {
    list = new AppComponent;
  });

  it('Should get 3', () => {
    list.ngOnInit();

    expect(list.items.length).toBe(3);
    expect(list.items).toEqual(['one', 'two', 'three']);
  });
});
