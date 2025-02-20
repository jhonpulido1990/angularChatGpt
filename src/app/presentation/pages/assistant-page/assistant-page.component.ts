import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '../../../interfaces';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { OpenAiService } from '../../services/openai.service';

@Component({
  selector: 'app-assistant-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistant-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent implements OnInit {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public threasId = signal<string|undefined>(undefined);

  ngOnInit(): void {
    this.openAiService.createThread()
    .subscribe( id => {
      this.threasId.set(id);
    } )
  }
  handleMessage(question: string) {
    this.isLoading.set(true);
    this.messages.update( prev => [
      ...prev, {
        isGpt: false,
        text: question,
      }
    ]);
    this.openAiService.postQuestion(this.threasId()!, question)
    .subscribe(replies => {
      this.isLoading.set(false);
      for(const reply of replies){
        for (const message of reply.content) {
          this.messages.update(prev => [
            ...prev, {
              isGpt: reply.role[0] === 'Assistant',
              text: message
            },
          ])
        }
      }
    });
  }
}
