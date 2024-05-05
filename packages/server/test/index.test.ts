import supertest from 'supertest';
import expressLoader from '../src/loaders/express';

const app = expressLoader();

describe('Hello World', () => {
  it('returns hello world', async () => {
    await supertest(app).get('/').expect('Hello World!');
  });
});
