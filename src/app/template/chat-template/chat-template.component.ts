import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Message } from '../../interfaces';
import { TextMessageEvent } from '../../presentation/components/text-boxes/text-message-box-file/text-message-box-file.component';
import { TextMessageBoxEvent } from '../../presentation/components/text-boxes/text-message-box-select/text-message-box-select.component';
import { OpenAiService } from '../../presentation/services/openai.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../../presentation/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../presentation/components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../presentation/components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '../../presentation/components/text-boxes/text-message-box/text-message-box.component';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './chat-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log(prompt);
  }
/*   handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt, file });
  }
  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event);
  } */
}
