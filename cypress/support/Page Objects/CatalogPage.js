class CatalogPage {
    obtenerListaProductos() {
        return cy.get('.wrapper > .products');
    }

    seleccionarProducto(producto) {
        cy.get('.wrapper > .products').contains(producto).first().click();
    }
}

export default CatalogPage;