
# Reto Técnico Double V Partners NYX

Este repositorio contiene la solución completa para el reto técnico de automatización y pruebas de API y UI sobre la tienda "Your Store".

## Estructura del proyecto

- `/test/apiTest/` — Pruebas automatizadas de API (Playwright Test)
- `/test/openCart/` — Pruebas E2E automatizadas sobre la tienda OpenCart (Playwright Test)
- `/page/` — Page Objects para la automatización UI
- `/utils/` — Utilidades y helpers
- `artillery-150users-test.yml` — Prueba de carga: 150 usuarios concurrentes (2 min)
- `artillery-scale-test.yml` — Prueba de escalado: 100 a 1000 usuarios concurrentes

## Instalación de dependencias

```bash
npm install
```

## Ejecución de pruebas y reportes

### 1. Pruebas de API

- Ejecutar todas las pruebas de API:
  ```bash
  npm run apitest
  ```
- Ver el reporte HTML de las pruebas:
  ```bash
  npm run report
  ```

### 2. Pruebas E2E OpenCart

- Ejecutar todas las pruebas E2E:
  ```bash
  npm run opencart
  ```
- Ver el reporte HTML de las pruebas:
  ```bash
  npm run report
  ```

### 3. Pruebas de carga y estrés (Artillery)

- Ejecutar prueba de carga (150 usuarios concurrentes, 2 min):
  ```bash
  npm run loadtest150
  ```
- Generar y abrir el reporte HTML de la prueba de carga:
  ```bash
  npm run loadreport150
  ```

- Ejecutar prueba de escalado (100 a 1000 usuarios):
  ```bash
  npm run loadtestscale
  ```
- Generar y abrir el reporte HTML de la prueba de escalado:
  ```bash
  npm run loadreportscale
  ```

## Notas y recomendaciones

- El video  de la ejecucion esta en la raiz del proyecto
- Todos los scripts están definidos en `package.json`.
- Los reportes HTML se generan automáticamente tras cada ejecución y pueden abrirse en el navegador.
- Para más información sobre la API: [FakeStore API Docs](https://fakestoreapi.com/docs)



