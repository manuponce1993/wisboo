import { Component, OnInit } from '@angular/core';
import { ROUTES } from 'src/app/shared/enums/routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  routes = ROUTES;

  constructor() { }

  ngOnInit() {
  }

}
