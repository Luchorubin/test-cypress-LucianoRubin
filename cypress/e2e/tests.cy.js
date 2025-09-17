import HomePage from "../support/Page Objects/HomePage";
import CatalogPage from "../support/Page Objects/CatalogPage";
import ProductPage from "../support/Page Objects/ProductPage";
import CheckoutPage from "../support/Page Objects/CheckoutPage";

const homePage = new HomePage();
const catalogPage = new CatalogPage();
const productPage = new ProductPage();
const checkoutPage = new CheckoutPage();


//utilizo alias y los guardo en wraps. Me permite probar los test con valores distintos facilmente.
describe("CP001 - Validar cuotas en compra de equipo", () => {
    beforeEach(() =>{
        cy.visit('/')
        cy.url().should('eq', Cypress.config().baseUrl)
        cy.viewport(1280, 800);
        cy.wrap("A15").as("producto");
        cy.wrap("3 cuotas sin interés").as("cuotas");
        cy.wrap("128").as("memoriaInterna");
        cy.wrap("300000_600000").as("rangoPrecio");
        cy.wrap("60 cuotas").as("cantCuotas");
        cy.wrap("Credicoop").as("banco");
        cy.wrap("Visa").as("tarjeta");
    });

    //CP001
    it("CP001 - Validar que se puede pagar el equipo A15 en 3 cuotas sin interes", function() {
        homePage.buscarProducto(this.producto);
        catalogPage.obtenerListaProductos().should("exist");
        catalogPage.seleccionarProducto(this.producto);
        productPage.obtenerNombreProducto().should("contain", this.producto);
        cy.url().should("include", this.producto.toLowerCase());
        productPage.obtenerInfoCuotas().should("contain", this.cuotas);
        cy.screenshot("CP001");
    });

    // CP002
    //dado que el filtro entre $200.000 - $300.000 no esta disponible, se decidio utilizar el filtro entre $300.000 - $600.000.
    it("CP002 - Filtrar por memoria interna y rango de precio", function() {
        homePage.selecionarFiltroMemoria(this.memoriaInterna);
        homePage.seleccionarFiltroPrecio(this.rangoPrecio);

        homePage.obtenerFiltrosSeleccionados().should("exist");

        //comparo la cantidad de productos que dice que obtengo con la que obtengo realmente
        homePage.obtenerListaProductos()
            .should("be.visible")
            .then($productos => {
                homePage.obtenerCantProductosBuscados()
                    .invoke("text")
                    .then(text => {
                        const cantidadTexto = parseInt(text.match(/\d+/)[0]);
                        cy.log(`Cantidad según texto: ${cantidadTexto}`);
                        expect($productos.length).to.eq(cantidadTexto);
                    });
            });

        cy.screenshot("CP002");
    });
    
    //CP003
       it("CP003 - Verificar que no exista método de pago 60 cuotas con Credicoop y Visa", function() {
        homePage.obtenerListaProductos().eq(2).should("be.visible").click();
        productPage.consultarMediosDePago();
        productPage.seleccionarBanco(this.banco);
        productPage.seleccionarTarjeta(this.tarjeta);
        productPage.obtenerCantidadDeCuotas()
            .should("be.visible")
            .then($tabla => {
                expect($tabla.text()).not.to.include(this.cantCuotas);
            });
        cy.screenshot("CP003");
    });
    
    //CP004 - CASO EXTRA
    // Validar responsividad de la pagina.
    //Descripcion: El objetivo es seleccionar el primer producto de la lista inicial y verificar que nombre, precio y foto del producto sean visibles. 
    //Luego agregar el producto al carrito y proceder a finalizar compra. Repetir los mismos pasos para las resoluciones tipicas de tablet y mobile.
    //RESULTADO ESPERADO: 1) Que se pueda ingresar a la pagina. 2) Que la información primordial sea visible en las 3 resoluciones.
    //3) Que sea posible seguir el flujo de compra y llegar a las seccion de ingresar datos en las 3 resoluciones.
        const viewports = [
            { dispositivo: "escritorio", resolucion: [1280, 800] },
            { dispositivo: "tablet", resolucion: [768, 1024] },
            { dispositivo: "mobile", resolucion: [375, 667] },
        ];

        viewports.forEach((viewport) => {
            it(`CP004 - Validar flujo básico en ${viewport.dispositivo}`, function () {
                cy.visit('/');
                cy.viewport(viewport.resolucion[0], viewport.resolucion[1]);

                homePage.obtenerListaProductos().should("be.visible").first().click();
                productPage.obtenerNombreProducto().should("be.visible");
                productPage.obtenerImagenProducto().should("be.visible");
                productPage.obtenerPrecioProducto().should("be.visible");
                productPage.agregarAlCarrito();

                cy.url().should("include", "checkout");
                checkoutPage.finalizarCompra();

                cy.screenshot(`CP004-${viewport.dispositivo}`);
        });
    });
});
