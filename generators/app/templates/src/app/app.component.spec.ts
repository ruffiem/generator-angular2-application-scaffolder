/// <reference path="../../typings/jasmine.d.ts" />

import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {AppComponent} from "./app.component";

describe('AppComponent Tests', () => {
  let list:AppComponent;

  beforeEachProviders(() => [
    AppComponent
  ]);

  beforeEach(inject([AppComponent], l => {
    list = l;
  }));

  it('Should get 3', () => {
    list.ngOnInit();
    expect(list.items.length).toBe(3);
  });

  it('Should be equal to ["one", "two", "three"]', () => {
    list.ngOnInit();
    expect(list.items).toEqual(['one', 'two', 'three']);
  });
});
