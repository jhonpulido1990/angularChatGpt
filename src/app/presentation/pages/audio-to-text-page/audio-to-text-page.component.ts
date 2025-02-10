import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { AudioToTextResponse, Message } from '../../../interfaces';
import { TextMessageBoxFileComponent, TextMessageEvent } from '../../components/text-boxes/text-message-box-file/text-message-box-file.component';
import { OpenAiService } from '../../services/openai.service';
import { Segment } from '../../../interfaces/audio-text.response';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audio-to-text-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev, {
        isGpt: false,
        text: text
      }
    ]);

    this.openAiService.audioToText(file, text)
    .subscribe(resp => this.handleResponse(resp));
  }

  handleResponse( resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if( !resp ) return;

    const text = `## Transcripcion:
    __Duracion:__ ${  Math.round(resp.duration)} segundos.
    ## El texto es:
    ${resp.text}
    `;
    this.messages.update(prev => [...prev, {isGpt: true, text: text}]);
    for (const segmen of resp.segments) {
      const segmentMessage = `
      __De ${Math.round(segmen.start)} a ${Math.round(segmen.end)} segundos.__
      ${ segmen.text }
      `;
      this.messages.update(prev => [...prev, { isGpt: true, text: segmentMessage }]);
    }
  }
}
