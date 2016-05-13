import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({ name: 'initCaps' })
export class InitCaps implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}
