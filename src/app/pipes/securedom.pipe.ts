import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'securedom'
})
export class SecuredomPipe implements PipeTransform {

	constructor(private domasanitizer: DomSanitizer){}

  transform(value: any, url: string): any {
    return this.domasanitizer.bypassSecurityTrustResourceUrl( url + value);
		// return 'qwewrr';
  }

}
