/// <reference path="../../typings/jasmine.d.ts" />

import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {AppComponent} from "./app.component";

describe('AppComponent Tests', () => {
  let list:AppComponent;

  it('Should get 3', () => {
    list.ngOnInit();

    expect(list.items.length).toBe(3);
    expect(list.items).toEqual(['one', 'two', 'three']);
  });
});
