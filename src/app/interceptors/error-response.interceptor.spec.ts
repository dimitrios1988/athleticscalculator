import { ErrorResponseInterceptor } from './error-response.interceptor';

describe('ErrorResponseInterceptor', () => {
  it('should create an instance', () => {
    expect(new ErrorResponseInterceptor(null)).toBeTruthy();
  });
});
