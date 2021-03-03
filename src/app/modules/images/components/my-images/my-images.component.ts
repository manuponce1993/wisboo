import { Component, OnInit } from '@angular/core';
import { ImagesFacade } from 'src/app/abstraction/images.facade';
import { Image } from 'src/app/shared/models/image';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.scss']
})
export class MyImagesComponent implements OnInit {

  myImages$: Observable<Image[]>;

  constructor(private imagesFacade: ImagesFacade) { }

  ngOnInit(): void {
    this.imagesFacade.loadMyImages();
    this.myImages$ = this.imagesFacade.getMyImages$();
  }

  onUnsaveImage(image: Image) { this.imagesFacade.unsaveImage(image) }

}
