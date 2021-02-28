import { Injectable } from '@angular/core';
import _ from 'lodash'
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestUtilitiesService {

  constructor() { }

  formatQPs = (qps: {}): { param: string, value: string }[] => {
    return _.map(qps, (value, key): { param: string, value: string } => {
      if (Array.isArray(value)) value = value.join(',');
      return {
        param: key,
        value: value?.toString()
      };
    });
  }

  createAndAppendQps = (qpsProcessed: { param: string, value: string }[]): HttpParams => {
    let queryParams = new HttpParams();
    qpsProcessed.forEach(qp => {
      queryParams = queryParams.append(qp.param, qp.value);
    })
    return queryParams;
  }

  appendQps = (qpsProcessed: { param: string, value: string }[], queryParams: HttpParams): HttpParams => {
    qpsProcessed.forEach(qp => {
      queryParams = queryParams.append(qp.param, qp.value);
    })
    return queryParams;
  }

}
