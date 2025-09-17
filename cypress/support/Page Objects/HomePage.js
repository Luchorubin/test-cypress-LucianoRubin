class HomePage {
    buscarProducto(producto) {
        cy.get('#search_action').click();
        cy.get('[name="q"]').type(`${producto}{enter}`);
    }

    selecionarFiltroMemoria(memoriaInterna) {
        cy.get("div.filter-item.memory").click();
        cy.contains('div.filter-title', 'Memoria interna').click();
        cy.contains('li', memoriaInterna).click();
    }

    seleccionarFiltroPrecio(rangoPrecio) {
        cy.contains('div.filter-title', 'Precio').click();
        cy.get(`ol.items li.aggregations.item[data-value="${rangoPrecio}"] a`).click();
    }

    obtenerFiltrosSeleccionados() {
        return cy.get("div.selectedfilters");
    }

    obtenerListaProductos() {
        return cy.get("div.products ol li");
    }

    obtenerCantProductosBuscados() {
        return cy.get("div.total-products p");
    }
}

export default HomePage;
