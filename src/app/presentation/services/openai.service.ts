import { Injectable } from '@angular/core';
import { audioToTextUseCase, imageGenerationUseCase, orthographyUseCase, proConsStreamUseCase, prosConsUseCase, textToAudioUseCase, traslateTextUseCase } from '../../core';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStream(prompt: string, abortSignal: AbortSignal) {
    return proConsStreamUseCase(prompt, abortSignal);
  }

  traslateText(promt: string, lang: string) {
    return from(traslateTextUseCase(promt, lang));
  }

  textToAudio(promt: string, voice: string) {
    return from(textToAudioUseCase(promt, voice));
  }

  audioToText(file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }

  imageGeneration(prompt: string, originalImage?: string, maskImage?: string) {
    return from( imageGenerationUseCase(prompt, originalImage, maskImage) )
  }
}
