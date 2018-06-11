import { Pipe, PipeTransform } from '@angular/core';
import {URL_IMG} from "../../config/url.service";

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(codigo: string) {

    //value es lo que uno recibe
    return   URL_IMG + codigo + ".jpg";
  }
}
