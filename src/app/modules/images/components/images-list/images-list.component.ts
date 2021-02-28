import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImagesFacade, MetaDataImages } from 'src/app/abstraction/images.facade';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {
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

  onLoadMore() {
    if (this.metadataImages.next) {
      this.imagesFacade.loadImages(this.metadataImages.next, false)
    }
  }

  loadImagesByDescription = (value: string) => this.imagesFacade.loadImages({ query: value })

}
