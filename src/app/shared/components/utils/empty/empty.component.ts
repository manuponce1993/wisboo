import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  // Lottie
  optionsLottie: AnimationOptions = {
    path: 'assets/animations/empty.json',
  };
  constructor() { }

  ngOnInit() { }

}
