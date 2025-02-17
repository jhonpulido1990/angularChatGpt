import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';
import { GptMessageEditableImageComponent } from '../../components/chat-bubbles/gpt-message-editable-image/gpt-message-editable-image.component';

@Component({
  selector: 'app-image-tunning-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageEditableImageComponent,
  ],
  templateUrl: './image-tunning-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([
    {
      isGpt: true,
      text: 'dragon ball',
      imageInfo: {
        alt: 'dragoncito',
        url: 'http://localhost:3000/gpt/image-generation/1739812460880.png',
      },
    },
  ]);
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

  handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);

    // Todo: askm
    console.log({ newImage, originalImage });
  }

  generateVariation() {}
}
