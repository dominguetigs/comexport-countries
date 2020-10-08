import { Pipe, PipeTransform } from '@angular/core';

import { Utils } from '../../core/utils/utils';

@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
  transform(value: any[], field: string): string {
    return Utils.mapFilterBySpecificField(value, field).join(', ');
  }
}
