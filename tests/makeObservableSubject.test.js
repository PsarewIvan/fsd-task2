import MakeObservableSubject from '../src/components/makeObservableSubject';

let Observer;
let mockData;
const someFunction = (someData) => {
  mockData = someData;
};

beforeEach(() => {
  Observer = new MakeObservableSubject();
  mockData = 'empty';
});

describe('Make observable subject', () => {
  test('should return "This is data"', () => {
    Observer.subscribe((data) => {
      someFunction(data);
    });
    Observer.notify('This is data');

    expect(mockData).toBe('This is data');
  });

  test('should return "345"', () => {
    Observer.subscribe((data) => {
      someFunction(data);
    });
    Observer.notify(345);

    expect(mockData).toBe(345);
  });

  test('should return "null"', () => {
    Observer.subscribe((data) => {
      someFunction(data);
    });
    Observer.notify(null);

    expect(mockData).toBeNull();
  });

  test('should unsubscribe', () => {
    const testFunction = (data) => {
      someFunction(data);
    };
    Observer.subscribe(testFunction);
    Observer.unsubscribe(testFunction);
    Observer.notify(null);

    expect(mockData).toBe('empty');
  });
});
