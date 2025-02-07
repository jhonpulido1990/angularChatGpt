import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import {
  TextMessageBoxEvent,
  TextMessageBoxSelectComponent,
} from '../../components/text-boxes/text-message-box-select/text-message-box-select.component';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './text-to-audio-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public voices = signal([
    { id: 'nova', text: 'nova' },
    { id: 'alloy', text: 'alloy' },
    { id: 'ash', text: 'ash' },
    { id: 'coral', text: 'coral' },
    { id: 'echo', text: 'echo' },
    { id: 'fable', text: 'fable' },
    { id: 'onyx', text: 'onyx' },
    { id: 'sage', text: 'sage' },
    { id: 'shimmer', text: 'shimmer' },
  ]);

  handleMessageWithSelect({ prompt, selectOption }: TextMessageBoxEvent) {
    const message = `${selectOption} - ${prompt}`;
    this.isLoading.set(true);
    this.messages.update((prev)=> [
      ...prev, {
        isGpt: false,
        text: `Generar aduio de: ${prompt}: en voz de : ${selectOption}`
      }
    ])

    this.openAiService
      .textToAudio(prompt, selectOption)
      .subscribe(({ message, audioUrl }) => {
        this.isLoading.set(false);
        this.messages.update(prev=> [
          ...prev, {
            isGpt: true,
            text: message,
           audioUrl: audioUrl
          }
        ])
      });
  }
}
