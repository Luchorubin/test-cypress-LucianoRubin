class CheckoutPage{
    finalizarCompra(){
        cy.contains("Finalizar compra").click();
    }
}
export default CheckoutPage