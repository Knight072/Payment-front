# 🛍️ Payment Front‑End

Aplicación React + Vite que permite:

1. **Listar productos**, añadirlos al carrito y calcular totales.
2. **Capturar datos de tarjeta y envío** (con validaciones y logotipos de VISA / MasterCard).
3. **Mostrar un resumen de pago** en un *backdrop* responsive con botón de confirmación.
4. **Consultar el estado** de la transacción creada en el back‑end.

> **Mobile‑first**: el diseño está optimizado para pantallas tipo iPhone SE (750 × 1334) y escala hasta desktop.

---

## 📂 Estructura

```
payment/
├─ src/
│  ├─ assets/           # imágenes y logos
│  ├─ components/       # componentes reutilizables
│  ├─ pages/           # rutas (ProductPage, SummaryPage, StatusPage)
│  ├─ store/           # Redux Toolkit slices
│  ├─ styles/          # CSS modular (mobile‑first)
│  └─ main.jsx         # punto de entrada React + Redux
├─ test/               # pruebas Jest / Testing Library
│  ├─ jest.front.config.cjs
│  ├─ jest.setup.js
│  └─ ...*.test.tsx
├─ public/
├─ staticwebapp.config.json
├─ vite.config.js
└─ README.md
```

---

## 🚀 Instalación

> Requiere **Node ≥ 20**.

```bash
git clone https://github.com/tu‑usuario/payment.git
cd payment
npm install
```

### Variables de entorno (opcional)

| Variable | Ejemplo | ¿Para qué sirve? |
|----------|---------|------------------|
| `VITE_API_BASE_URL` | `http://localhost:3000` | URL del back‑end Nest (por defecto intenta /products, /transactions en la misma host). |

Crea un archivo `.env`:

```ini
VITE_API_BASE_URL=http://localhost:3000
```

### 👩‍💻 Modo desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` y disfruta de hot‑reload.

### 🏗️ Build producción

```bash
npm run build          # genera /dist
npm run preview        # sirve dist en http://localhost:4173
```

### 🧪 Pruebas

```bash
# correr una sola vez
npm test

# modo watch interactivo
npm run test:watch

# cobertura
npm run test:cov
```

**Tecnologías usadas:**
- Jest 29 + ts‑jest (TypeScript + JSX).
- @testing‑library/react + jest‑dom para pruebas de componentes.
- identity‑obj‑proxy para mockear CSS Modules.

---

## ☁️ Despliegue en Azure Static Web Apps

Se incluye workflow GitHub Actions:

```
.github/workflows/azure-static-web-apps.yml
```

- Node 20
- `npm ci` → `vite build`
- Copia la carpeta `dist/` al contenedor de Azure.
- Archivo `staticwebapp.config.json` re‑escribe cualquier ruta a `index.html` (SPA).

### Deploy manual

```bash
npm run build
# subir contenido de /dist a Azure Storage o Netlify, etc.
```

---

## 📱 Responsive Design

- **Mobile‑first**: media queries ajustan paddings y tipografías a partir de 480 px.
- Botón flotante "Pagar ahora" se posiciona fijo en pantallas pequeñas.
- Usa Tamagui para estilos predictivos y tokens de color / tamaño.

---

## 🛠️ Solución de problemas

| Error | Causa | Solución |
|-------|-------|----------|
| `H.jsxDEV is not a function` | Alias automático a preact/compat | En `vite.config.js` añade `reactNative:false` o `aliasReact:false` en tamaguiPlugin y fuerza alias a react. |
| `Could not resolve "./store"` | Ruta incorrecta | Asegúrate de que existe `src/store/index.js` o corrige el import. |
| Pantalla blanca en producción | No hay fallback SPA | Verifica `staticwebapp.config.json`. |
| `EBADENGINE node >= 20` | Workflow usa Node 18 | `actions/setup-node@v4` con `node-version: '20'`. |

---

## 🤝 Contribuir

1. Crea un fork y rama: `git checkout -b feature/nueva-funcionalidad`
2. Asegúrate de que `npm test` y `npm run lint` pasen.
3. Envía tu pull request.