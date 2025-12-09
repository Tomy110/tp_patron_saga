# TP_Patron_Saga
DESARROLLO DE SOFTWARE

TRABAJO PRACTICO - PATRON SAGA CON MICROSERVICIOS

$ DAMIANI MACARENA
$ DIAZ ROSSI JUAN CRUZ
$ MATURANO PABLO
$ MERCADO MARTIN
$ LIMERES TOMÁS

## Descripción
Implementación del patrón Saga de orquestación para gestionar transacciones distribuidas entre microservicios.
Un usuario selecciona un producto, realiza una compra, y el sistema coordina automáticamente:
1. Verificación en catálogo
2. Registro de compra
3. Procesamiento de pago
4. Actualización del inventario
5. Si algo falla → Se revierte automáticamente todo

## Arquitectura

**Componentes:**
- ms-catalogo (3001) - Verifica disponibilidad de productos
- ms-compras (3002) - Registra las compras
- ms-pagos (3004) - Procesa los pagos
- ms-inventario (3003) - Actualiza el stock
- ms-orquestador (3000) - Coordina la saga
- traefik (80) - Reverse proxy para enrutar requests

## LEVANTAR LA APLICACIÓN

Requisitos: Docker y Docker Compose instalados

1. En cada directorio de microservicio (ms-catalogo, ms-compras, ms-pagos, ms-inventario, ms-orquestador, traefik):
```
Esto se repite en cada microservicio menos en el traefik que solo hay que realizar el paso 3 
1° cd ms-catalogo
2° docker build -t ms-pagos:1.0.0 .
3° docker compose up -d
```

## ENDPOINTS DISPONIBLES

- GET /api/v1/catalogo - Listar productos
- GET /api/v1/catalogo/{id} - Obtener un producto
- POST /api/v1/compra/transaccion - Crear compra
- POST /api/v1/compra/compensacion - Revertir compra
- POST /api/v1/pago/transaccion - Procesar pago
- POST /api/v1/pago/compensacion - Revertir pago
- POST /api/v1/inventario/actualizar - Actualizar stock
- POST /api/v1/orquestador/compra - Ejecutar saga

## RESPUESTAS ESPERADAS

**Compra exitosa (HTTP 200):**
```json
{
  "success": true,
  "compraId": "COMPRA-1765260594518",
  "pagoId": "PAGO-1765260594524",
  "message": "Compra realizada exitosamente"
}
```

**Compra fallida con compensación (HTTP 409):**
```json
{
  "message": "Compra fallida, se ejecuta compensacion"
}
```

## TECNOLOGÍAS UTILIZADAS

- Node.js v22 (Alpine Linux)
- TypeScript 5.9.3
- Express.js 5.1.0
- Docker & Docker Compose
- Traefik v2.11 