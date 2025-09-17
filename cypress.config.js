const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://tiendaonline.movistar.com.ar/",
    //aumentar en caso de conexion lenta
    pageLoadTimeout: 120000,
  },
});
