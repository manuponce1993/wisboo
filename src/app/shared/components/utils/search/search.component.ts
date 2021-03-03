import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/search.json',
  };
  constructor() { }

  ngOnInit() { }

}
