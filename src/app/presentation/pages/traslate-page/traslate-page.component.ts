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
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '../../components/text-boxes/text-message-box-select/text-message-box-select.component';

@Component({
  selector: 'app-traslate-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './traslate-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TraslatePageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  handleMessageWithSelect({prompt, selectOption}: TextMessageBoxEvent) {
    const message = `Traduce a ${selectOption}: ${prompt}`;
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev, {
        isGpt: false,
        text: message,
      }
    ]);
    this.openAiService.traslateText(prompt, selectOption)
    .subscribe(res => {
      this.isLoading.set(false);
      this.messages.update((prev)=>[
        ...prev, {
          isGpt: true,
          text: res.message
        }
      ])
    })
  }
}
