import MakeObservableSubject from '../src/components/makeObservableSubject';

const Observer = new MakeObservableSubject();
const someFunction = (someData) => {
  return someData;
};

describe ('Make observable subject', () => {
  test('subscribe callback', () => {
    const result = 'a';
    expect(someFunction('a')).toBe(result);
  });
});
