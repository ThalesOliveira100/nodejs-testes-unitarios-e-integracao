/* eslint-disable no-undef */
import Carrinho from "../carrinho.js";
import Item from "../item.js";

describe("Testes do carrinho", () => {
    it("Deve inicializar o carrinho vazio", () => {
        const carrinho = new Carrinho();

        expect(carrinho.subtotal).toBeNull();
    });

    it("Deve ter itens", () => {
        const item = new Item("Maçã", 2, 5);
        const item2 = new Item("Pêra", 0.5, 1);
        const carrinho = new Carrinho();

        carrinho.adiciona(item);
        carrinho.adiciona(item2);

        expect(typeof carrinho).toBe("object");
        expect(carrinho.itens[0]).toBe(item);
        expect(carrinho.itens[1]).toBe(item2);

        expect(carrinho.itens).toContain(item);
        expect(carrinho.itens).toContain(item2);
    });

    it("Deve ter a propriedade 'Total' na inicialização", () => {
        const carrinho = new Carrinho();
        expect(carrinho).toHaveProperty("total");
    });

    it("Deve lançar erro ao finalizar compra com carrinho vazio", () => {
        function englobaErroCarrinho() {
            const carrinho = new Carrinho();
            carrinho.finalizaCompra();
        }

        expect(englobaErroCarrinho).toThrowError("Carrinho de compras vazio");
    });

    it("Deve adicionar o frete", () => {
        const carrinho = new Carrinho();
        carrinho.adicionaFrete(150);

        expect(carrinho.frete).toBe(150);
    });

    it("Deve retornar o valor total somando o frete com o subtotal", () => {
        const carrinho = new Carrinho();
        const item1 = new Item("Maça", 5, 10);
        const item2 = new Item("Banana", 1.5, 3); 

        carrinho.adiciona(item1);
        carrinho.adiciona(item2);
        carrinho.adicionaFrete(5.45);

        expect(carrinho.calculaTotal()).toBe(58.95);
    });

    it("Deve finalizar as compras", () => {
        const carrinho = new Carrinho();
        const item1 = new Item("Maça", 2, 5);
        const item2 = new Item("Pêra", 0.8, 3);

        carrinho.adiciona(item1);
        carrinho.adiciona(item2);
        carrinho.adicionaFrete(15);

        expect(carrinho.finalizaCompra()).toStrictEqual({
            subtotal: 12.4,
            frete: 15,
            total: 27.4
        });
    });
});
