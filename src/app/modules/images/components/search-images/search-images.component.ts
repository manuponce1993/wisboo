import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImagesFacade, MetaDataImages } from 'src/app/abstraction/images.facade';
import { Image } from 'src/app/shared/models/image';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.scss']
})
export class SearchImagesComponent implements OnInit {
  click = false;
  images$;
  filterForm: FormGroup;
  metadataImages: MetaDataImages; _metadataImages: Subscription;
  public readonly SEARCH_IMAGE = 'query';

  constructor(private formBuilder: FormBuilder, private imagesFacade: ImagesFacade) { }

  ngOnInit(): void {
    this.filterForm = this.createFilterForm();
    this.images$ = this.imagesFacade.getImages$()
    this._metadataImages = this.imagesFacade.getMetaDataImages$().subscribe(
      mdi => this.metadataImages = mdi
    );
  }

  createFilterForm(): FormGroup {
    return this.formBuilder.group(
      {
        [this.SEARCH_IMAGE]: [''],
      }
    );
  }

  onSaveImage(image: Image) {
    console.log('entro');
    this.imagesFacade.saveImage(image)
  }

  onUnsaveImage(image: Image) { this.imagesFacade.unsaveImage(image) }

  onLoadMore() {
    if (this.metadataImages.next) {
      this.imagesFacade.loadImages(this.metadataImages.next, false)
    }
  }

  loadImagesByDescription = (value: string) => this.imagesFacade.loadImages({ query: value })

}
