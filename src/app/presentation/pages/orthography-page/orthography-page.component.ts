import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/text-message-box/text-message-box.component';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';
import { GptMessageOrthographyComponent } from '../../components/chat-bubbles/gpt-message-orthography/gpt-message-orthography.component';

@Component({
    selector: 'app-orthography-page',
    imports: [
        CommonModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        GptMessageOrthographyComponent
    ],
    templateUrl: './orthography-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update( (prev)=> [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);
    this.openAiService.checkOrthography(prompt)
    .subscribe( resp => {
      this.isLoading.set(false)
      this.messages.update( (prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp
        }
      ] )
    } )
  }
}
