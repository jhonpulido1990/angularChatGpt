import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsUseCase } from '../../core';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {

  checkOrthography( prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosCons( prompt: string ) {
    return from(prosConsUseCase(prompt));
  }

}
