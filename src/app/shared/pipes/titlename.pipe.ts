import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'titlename'
})

export class TitlenamePipe implements PipeTransform {
  transform(
    value: {
      firstName: string,
      lastName: string
    }
  ): string {
    return `${value.lastName.toUpperCase()} ${value.firstName.charAt(0).toUpperCase() + value.firstName.slice(1)}`;
  }
}
