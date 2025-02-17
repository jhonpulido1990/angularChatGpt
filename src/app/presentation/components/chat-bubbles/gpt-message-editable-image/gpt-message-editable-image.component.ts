import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  imports: [],
  templateUrl: './gpt-message-editable-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageEditableImageComponent implements AfterViewInit {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: { url: string; alt: string };

  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;

  @Output() onSelectedImage = new EventEmitter<string>();

  public originalImage = signal<HTMLImageElement | null>(null);
  public isDrawing = signal(false);
  public coors = signal({ x: 0, y: 0 });

  ngAfterViewInit(): void {
    // afterviewinit despues de que la vista es inicializada
    if (!this.canvasElement?.nativeElement) return;

    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymus';
    image.src = this.imageInfo.url;

    this.originalImage.set(image);

    image.onload = () => {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }

  onMouseDown(event: MouseEvent) {
    if (!this.canvasElement?.nativeElement) return;

    this.isDrawing.set(true);

    // obtener las coordenadas del mouse relativo al canvas
    const startX =
      event.clientX -
      this.canvasElement.nativeElement.getBoundingClientRect().left;
    const starty =
      event.clientY -
      this.canvasElement.nativeElement.getBoundingClientRect().top;

    // obtener los valores de los coors
    this.coors.set({ x: startX, y: starty });
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing()) return;
    if (!this.canvasElement?.nativeElement) return;

    const canvasRef = this.canvasElement.nativeElement;

    const currentX = event.clientX - canvasRef.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    // calcular el alto y ancho de un recuadro
    const width = currentX - this.coors().x;
    const heigth = currentY - this.coors().y;

    const canvasWidth = canvasRef.width;
    const canvasHeigth = canvasRef.height;

    // Todo: Limpiar el canvas
    const ctx = canvasRef.getContext('2d');
    ctx?.clearRect(0, 0, canvasWidth, canvasHeigth);
    ctx?.drawImage(this.originalImage()!, 0, 0, canvasWidth, canvasHeigth);

    ctx?.clearRect(this.coors().x, this.coors().y, width, heigth);
  }

  onMouseUp(event: MouseEvent) {
    this.isDrawing.set(false);

    const canvas = this.canvasElement!.nativeElement;
    const url = canvas.toDataURL('image/png');

    this.onSelectedImage.emit(url);
  }

  handleClick() {
    this.onSelectedImage.emit(this.imageInfo.url);
  }
}
