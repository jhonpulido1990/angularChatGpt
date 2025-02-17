import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './image-tunning-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public originalImage = signal<string | undefined>(undefined);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
    ]);
    this.openAiService.imageGeneration(prompt).subscribe((resp) => {
      this.isLoading.set(false);
      if (!resp) return;
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp,
        },
      ]);
    });
  }
  generateVariation() {}
}
