import { EccentricCasePipe } from './eccentric-case.pipe';

/**
 * since we're testing a pipe and a pipe is essentially a pure function, we can write very simple unit tests -
 * called 'isolated unit tests' which don't involve loading up any angular components.
 *
 * We literally just create a new instance of `EccentricPipe` and call the transform method with different values. Easy.
 */
describe('eccentric-case pipe', () => {
  let eccentricCasePipe: EccentricCasePipe;

  beforeEach(() => {
    eccentricCasePipe = new EccentricCasePipe();
  });

  it('should not mutate an empty string', () => {
    let result = eccentricCasePipe.transform('');
    expect(result).toBe('');
  });

  it('should pass a few test cases', () => {
    expect(eccentricCasePipe.transform('beep boop')).toBe('Beep bOop');
    expect(eccentricCasePipe.transform('abcdefg')).toBe('AbcdefG');
  })
});