import {
  afterEach,
  beforeEach,
  describe,
  expect,
}
  from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/) // aplica expressão regular para confirmar se a resposta foi um JSON.
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});
