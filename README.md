# prueba-tecnica - Getronics - LUCIANO RUBIN

## 1️⃣ Descripción de la prueba técnica

Este proyecto contiene pruebas automatizadas para la tienda online de Movistar. Se puede acceder a la misma a través de la siguiente url:
https://tiendaonline.movistar.com.ar/

Se utilizan Cypress y el patrón Page Object para mantener el código limpio y escalable, donde cada página tiene su propia clase con métodos para interactuar con el DOM. 

En el archivo tests.cy.js se encuentran los casos de prueba con su correspondiente lógica de negocio.

NOTA: 
- Se ignoraron excepciones no críticas de la aplicación para poder correr los test de forma correcta. Esto se encuentra en el archivo e2e.js
- En algunos casos ocurre que algunos test fallan por problemas de conexión y/o rendimiento del sistema donde se ejecutan.

Los casos de prueba implementados incluyen:

- CP001: Validar que el equipo A15 se pueda pagar en 3 cuotas sin interés.
- CP002: Filtrar productos por memoria interna y rango de precio y validar cantidad de equipos.
- CP003: Verificar que no exista el método de pago de 60 cuotas para Credicoop con tarjeta VISA.
- CP004(inventado por mi): Flujo principal de la web en distintas resoluciones (desktop, tablet, mobile).

## 2️⃣ Requisitos para instalar el proyecto.

1) Node.js
2) Git
3) Navegador moderno (Chrome, Edge, etc)

## 3️⃣ Instalación.

1) git clone https://github.com/Luchorubin/test-cypress-LucianoRubin.git

2) npm install

## 4️⃣ Scripts disponibles.

- "cypress:open": "cypress open",
- "cypress:run": "cypress run",
- "browser": "npm run cypress:open",
- "console": "npm run cypress:run"

## 5️⃣ Posibles mejoras.

Se tuvieron en consideración las [buenas practicas](https://docs.cypress.io/app/core-concepts/best-practices) sugeridas por la documentación de cypress.

Una posible mejora sería la implementación de atributos data-* como localizadores. Actualmente, los selectores utilizados se basan en clases, id, estructuras html o texto contenido. Esto puede llegar a generar conflictos si se realizan cambios en el frontend. Una manera de evitar esto sería utilizar selectores basados en atributos data-* que son más resistentes a cambios. 


