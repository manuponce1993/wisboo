import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ImagesFacade, MetaDataImages } from 'src/app/abstraction/images.facade';
import { Image } from 'src/app/shared/models/image';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.scss']
})
export class SearchImagesComponent implements OnInit {
  @Input() isVisibleScreen: boolean;
  images$: Observable<Image[]>;
  isLoadingImages$: Observable<boolean>;
  metadataImages: MetaDataImages; _metadataImages: Subscription;
  // Filter form variables
  filterForm: FormGroup;
  public readonly SEARCH_IMAGE = 'query';

  constructor(private formBuilder: FormBuilder, private imagesFacade: ImagesFacade) { }

  ngOnInit(): void {
    this.filterForm = this.createFilterForm();
    this.images$ = this.imagesFacade.getImages$();
    this.isLoadingImages$ = this.imagesFacade.isLoadingGettingImages$();
    this._metadataImages = this.imagesFacade.getMetaDataImages$().subscribe(mdi => this.metadataImages = mdi);
  }

  createFilterForm = (): FormGroup => this.formBuilder.group({ [this.SEARCH_IMAGE]: [''] });

  onSaveImage = (image: Image) => this.imagesFacade.saveImage(image)

  onUnsaveImage = (image: Image) => this.imagesFacade.unsaveImage(image)

  onLoadMore() {
    if (this.isVisibleScreen && this.metadataImages.next) {
      this.imagesFacade.loadImages(this.metadataImages.next, false)
    }
  }

  loadImagesByDescription = (value: string) => this.imagesFacade.loadImages({ query: value })
}
