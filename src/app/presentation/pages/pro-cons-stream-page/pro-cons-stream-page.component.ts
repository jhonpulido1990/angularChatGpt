import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/text-message-box/text-message-box.component';

@Component({
  selector: 'app-pro-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './pro-cons-stream-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProConsStreamPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  async handleMessage(prompt: string) {
    await this.openAiService.prosConsStream(prompt)
  }
}
