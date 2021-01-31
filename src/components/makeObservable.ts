interface Observers {}

export default class MakeObservableSubject {
  private observers: Object;

  constructor() {
    this.observers = {};
  }

  subscribe(title: string, observer: Function) {
    if (typeof observer !== 'function') {
      throw new Error('observer must be a function');
    }
    if (this.observers[title]) {
      throw new Error('observer already in the list');
    }
    this.observers[title] = observer;
  }

  notify(title: string, value?: Object | Array<any>) {
    return this.observers[title](value);
  }
}
