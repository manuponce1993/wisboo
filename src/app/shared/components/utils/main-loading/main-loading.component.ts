import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-main-loading',
  templateUrl: './main-loading.component.html',
  styleUrls: ['./main-loading.component.scss']
})
export class MainLoadingComponent implements OnInit {

  // Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/mainLoading.json',
  };
  constructor() { }

  ngOnInit() { }

}
