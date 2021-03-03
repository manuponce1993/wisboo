import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from 'src/app/shared/models/image';


@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit {

  @Input() images: Image[];
  @Output('saveImage') onSaveImage = new EventEmitter<Image>(null);
  @Output('unsaveImage') onUnsaveImage = new EventEmitter<Image>(null);

  constructor() { }

  ngOnInit(): void {
  }

  onSaveUnsaveImage(image: Image) {
    image.isSaved ? this.onUnsaveImage.emit(image) : this.onSaveImage.emit(image);
  }

}
