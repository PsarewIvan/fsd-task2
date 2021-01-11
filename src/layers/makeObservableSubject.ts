export default class MakeObservableSubject {
  private observers: Array<Function>

  constructor() {
    this.observers = []
  }

  subscribe(observer: Function) {
    if (typeof observer !== 'function') {
      throw new Error('observer must be a function');
    }
    if (this.observers.includes( (obs: Function) => obs !== observer)) {
      throw new Error('observer already in the list');
    }
    this.observers.push(observer);
  }

  unsubscribe(observer: Function) {
    this.observers = this.observers.filter( (obs) =>  obs !== observer);
  }

  notify(data: Array) {
    const observersSnapshot = this.observers.slice(0);
    observersSnapshot.forEach( (obs) => {
      obs(data);
    });
  }
}
