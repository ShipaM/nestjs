import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowerCasePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      console.log(metadata);
      return value.toLowerCase();
    }

    return value;
  }
}
