import { describe, expect, it, jest } from '@jest/globals';
import Editora from '../../models/editora.js';

describe("Testes do modelo 'Editora'", () => {
  const objEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'csc@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objEditora);

    expect(editora).toEqual(
        expect.objectContaining(objEditora),
    );
  });

  it.skip('Deve salvar editora no BD', () => {
    const editora = new Editora(objEditora);

    editora.salvar().then((dados) => {
        expect(dados.nome).toBe('CDC');
    });
  });

  it.skip('Deve salvar no BD usando a sintaxe moderna', async () => {
    const editora = new Editora(objEditora);

    const dados = await editora.salvar();

    const retornado = await Editora.pegarPeloId(dados.id);
    expect(retornado).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            ...objEditora,
            created_at: expect.any(String),
            updated_at: expect.any(String),
        }),
    );
  });

  it('Deve retornar todas as editoras no BD', async () => {
    const dados = await Editora.pegarEditoras();

    expect(dados).toEqual(
        // ArrayContaining é um matcher, assim como o objectContaining
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }),
        ]),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const editora = new Editora(objEditora);

    editora.salvar = jest.fn().mockReturnValue({
        id: 10,
        nome: 'CDC',
        cidade: 'São Paulo',
        email: 'csc@c.com',
        created_at: '2025-11-10',
        updated_at: '2025-11-11',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            ...objEditora,
            email: expect.stringMatching(emailRegex),
            created_at: expect.any(String),
            updated_at: expect.any(String),
        }),
    );
  });
});
