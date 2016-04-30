/// <reference path="../../typings/jasmine.d.ts" />

import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {AppComponent} from "./app.component";

describe('AppComponent Tests', () => {
  let list;

  beforeEach(() => {
    list = new AppComponent();
    list.ngOnInit();
  });

  it('Should get 3', () => {
    expect(list.items.length).toBe(3);
  });

  it('Should be equal to ["one", "two", "three"]', () => {
    expect(list.items).toEqual(['one', 'two', 'three']);
  });
});
