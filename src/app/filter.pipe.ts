import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args === undefined){ return value; }
    return value.filter(function(data){
      return data.child.subject1.toLowerCase().includes(args.trim().toLowerCase());
    })
  }

}
