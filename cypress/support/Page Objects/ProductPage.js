class ProductPage {
    obtenerNombreProducto() {
        return cy.get('span.base');
    }

    obtenerImagenProducto() {
        return cy.get("img.fotorama__img");
    }

    obtenerInfoCuotas() {
        return cy.get('.price-content');
    }

    obtenerPrecioProducto() {
        return cy.get("span.price");
    }

    consultarMediosDePago() {
        cy.get("#open-installments-modal").click();
    }

    seleccionarBanco(banco) {
        cy.get('#banksArrow').click();
        cy.get("div#selectBank ul").contains(banco).click();
    }

    seleccionarTarjeta(tarjeta) {
        cy.get('#cardsArrow').click();
        cy.get("div#selectCardByBank ul").contains(tarjeta).click();
    }

    obtenerCantidadDeCuotas() {
        return cy.get("div#installmentsTable table");
    }

    agregarAlCarrito() {
        cy.get('#swatch_attribute_card').click();
    }
}

export default ProductPage;

