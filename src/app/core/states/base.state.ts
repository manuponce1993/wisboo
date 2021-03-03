import { BehaviorSubject } from 'rxjs';

export type Store = {
    [propName: string]: BehaviorSubject<any>
}
export class BaseState {
    protected store: Store;

    constructor() {
    }

    cleanStore: () => void = () => {
        const properties = Object.entries(this.store);
        setTimeout(() => {
            properties.forEach(([property, _]) => {
                this.store[property].next(null);
            })
        }, 500);
    };
}