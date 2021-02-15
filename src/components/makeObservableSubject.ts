export default class MakeObservableSubject {
  private observers: Object;

  constructor() {
    this.observers = {};
  }

  subscribe(name: string, observer: Function): void {
    if (typeof observer !== 'function') {
      throw new Error('observer must be a function');
    }
    if (typeof name !== 'string') {
      throw new Error('observer title must be a string type');
    }
    if (this.observers.hasOwnProperty(name)) {
      throw new Error(`observer "${name}" already in the list in`);
    }
    this.observers.name = observer;
  }

  unsubscribe(name: string): void {
    if (!this.observers.hasOwnProperty(name)) {
      throw new Error(`An accepted function "${name}" does not exist`);
    } else {
      delete this.observers.name;
    }
  }

  notify(name: string, value?: Object): void {
    if (this.observers.name) {
      this.observers.name(value);
    }
  }
}
