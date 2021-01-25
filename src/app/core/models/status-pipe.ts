import { Pipe, PipeTransform } from '@angular/core';
import { Status } from './nomination-program.model';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform{
    transform(value: number) {
        switch (value) {
            case Status.Draft:
                return "Draft"
                break;
            case Status.Active:
                return "Active"
                break;
            case Status.Hold:
                return "Hold"
                break;
           case Status.Deleted:
                return "Deleted"
                break;
            default:
                break;
        }   
    }
}