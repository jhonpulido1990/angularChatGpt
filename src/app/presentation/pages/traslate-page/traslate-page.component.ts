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

  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event);
  }
}
