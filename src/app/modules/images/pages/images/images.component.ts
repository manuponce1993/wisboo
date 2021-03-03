import { Component, OnInit } from '@angular/core';

enum IMAGES_TAB {
  SEARCH_IMAGES,
  MY_IMAGES
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  IMAGES_TAB = IMAGES_TAB;
  actualTab: number = IMAGES_TAB.SEARCH_IMAGES;

  constructor() { }

  ngOnInit(): void {
  }

}
