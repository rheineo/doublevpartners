# GitHub User Search - Module Federation Demo

Aplicación web federada usando **Module Federation** que integra **Next.js** y **Angular** para buscar usuarios de GitHub y visualizar sus detalles.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS HOST (Port 3000)                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  • Búsqueda de usuarios GitHub                          │   │
│  │  • Listado de resultados con paginación                 │   │
│  │  • Estado global con Zustand                            │   │
│  │  • Tailwind CSS para estilos                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│              ┌───────────────┴───────────────┐                 │
│              ▼                               ▼                  │
│  ┌─────────────────────┐       ┌─────────────────────┐        │
│  │  ANGULAR REMOTE 1   │       │  ANGULAR REMOTE 2   │        │
│  │    (Port 4201)      │       │    (Port 4202)      │        │
│  │                     │       │                     │        │
│  │  • Detalle Usuario  │       │  • Lista Seguidores │        │
│  │  • Pipe Followers   │       │  • RxJS Observables │        │
│  │  • Interceptors     │       │  • Error Handling   │        │
│  └─────────────────────┘       └─────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
doublevpartners/
├── nextjs-host/                 # Host principal (Next.js 14)
│   ├── src/
│   │   ├── app/                 # App Router
│   │   │   ├── page.tsx         # Página principal
│   │   │   ├── layout.tsx       # Layout con header/footer
│   │   │   └── user/[username]/ # Página de detalle
│   │   ├── components/          # Componentes React
│   │   ├── services/            # API services
│   │   └── store/               # Zustand store
│   ├── next.config.js           # Module Federation config
│   └── tailwind.config.ts       # Tailwind config
│
├── angular-user-detail/         # Remote 1 (Angular 17)
│   ├── src/app/
│   │   ├── user-detail/         # Componente principal
│   │   ├── services/            # GitHub service
│   │   ├── pipes/               # Followers pipe
│   │   ├── interceptors/        # Logging & Error
│   │   └── models/              # TypeScript interfaces
│   └── webpack.config.js        # Module Federation config
│
├── angular-followers/           # Remote 2 (Angular 17)
│   ├── src/app/
│   │   ├── followers/           # Componente principal
│   │   ├── services/            # GitHub service
│   │   ├── interceptors/        # Error interceptor
│   │   └── models/              # TypeScript interfaces
│   └── webpack.config.js        # Module Federation config
│
└── shared/
    └── types/                   # Tipos compartidos
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Angular CLI** >= 17.x (global)

```bash
npm install -g @angular/cli@17
```

### 📋 Paso 1: Instalar dependencias

```bash
# Clonar el repositorio (si aplica)
git clone <repository-url>
cd doublevpartners

# Instalar dependencias de cada proyecto
cd nextjs-host
npm install

cd ../angular-user-detail
npm install

cd ../angular-followers
npm install

cd .. # Volver a la raíz
```

### 🚀 Paso 2: Ejecutar los proyectos

**Opción A: Terminales separadas (recomendado)**

Abre **3 terminales separadas** y ejecuta:

```bash
# Terminal 1 - Angular User Detail (Port 4201)
cd angular-user-detail
npm start

# Terminal 2 - Angular Followers (Port 4202)
cd angular-followers
npm start

# Terminal 3 - Next.js Host (Port 3000)
cd nextjs-host
npm run dev
```

**Opción B: Script concurrente**

Crea un `package.json` en la raíz:

```bash
# En la raíz del proyecto
npm init -y
npm install concurrently --save-dev
```

Agrega este script al `package.json` raíz:

```json
{
  "scripts": {
    "start": "concurrently \"cd angular-user-detail && npm start\" \"cd angular-followers && npm start\" \"cd nextjs-host && npm run dev\"",
    "start:angular": "concurrently \"cd angular-user-detail && npm start\" \"cd angular-followers && npm start\"",
    "start:nextjs": "cd nextjs-host && npm run dev"
  }
}
```

Luego ejecuta:
```bash
npm start
```

### 🌐 Paso 3: Acceder a la aplicación

Una vez que todos los servicios estén corriendo:

- **Aplicación principal:** http://localhost:3000
- **Angular User Detail (standalone):** http://localhost:4201
- **Angular Followers (standalone):** http://localhost:4202

### 🔍 Paso 4: Probar la aplicación

1. **Busca usuarios:** En http://localhost:3000 busca "octocat" o cualquier usuario
2. **Ver detalles:** Haz clic en "Ver Detalles" para ver los microfrontends Angular
3. **Prueba paginación:** Navega entre páginas de resultados
4. **Prueba estados vacíos:** Busca términos que no existan

## 🔧 Tecnologías Utilizadas

### Next.js Host
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 14.1.0 | Framework React con SSR/SSG |
| React | 18.2.0 | UI Library con Server Components |
| Zustand | 4.5.0 | Estado global del cliente |
| Tailwind CSS | 3.4.1 | Framework CSS utility-first |
| TypeScript | 5.3.3 | Tipado estático estricto |
| Server Actions | - | Ejecución de código en servidor |

### Angular Remotes
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 17.1.0 | Framework con standalone components |
| RxJS | 7.8.0 | Programación reactiva con Observables |
| TypeScript | 5.3.0 | Tipado estático estricto |
| HTTP Interceptors | - | Manipulación de solicitudes HTTP |
| Custom Pipes | - | Transformación de datos en templates |
| Module Federation | 17.0.0 | Arquitectura de microfrontends |

### Arquitectura y Comunicación
| Tecnología | Propósito |
|------------|-----------|
| Module Federation | Compartir módulos entre frameworks |
| Iframe Integration | Carga segura de microfrontends |
| Query Parameters | Paso de datos entre Next.js y Angular |
| Server-Side Rendering | Renderizado inicial en servidor |
| Client-Side Hydration | Interactividad en el cliente |

## 📋 APIs de GitHub Utilizadas

| Endpoint | Descripción |
|----------|-------------|
| `GET /search/users?q={query}` | Buscar usuarios |
| `GET /users/{username}` | Detalle de usuario |
| `GET /users/{username}/followers` | Lista de seguidores |

**Nota:** La API de GitHub tiene un límite de 60 requests/hora para usuarios no autenticados.

## ✨ Características Implementadas

### Next.js Host
- [x] Búsqueda de usuarios con debounce
- [x] Listado con paginación
- [x] Estado global con Zustand
- [x] Diseño responsivo con Tailwind
- [x] Loading states
- [x] Manejo de errores
- [x] Integración de microfrontends Angular

### Angular User Detail
- [x] Componente standalone
- [x] Servicio con RxJS Observables
- [x] Pipe personalizado para seguidores
- [x] Interceptor de logging
- [x] Interceptor de errores
- [x] Lazy loading
- [x] Module Federation expuesto

### Angular Followers
- [x] Componente standalone
- [x] Servicio con RxJS
- [x] Interceptor con mensajes user-friendly
- [x] Lazy loading
- [x] Lista scrolleable
- [x] Module Federation expuesto

## 🎨 Diseño

La aplicación utiliza un tema inspirado en GitHub con:
- Fondo oscuro (#0d1117)
- Bordes sutiles (#30363d)
- Texto claro (#c9d1d9)
- Acentos azules (#58a6ff)
- Botones verdes (#238636)

## 📝 Entidades del Dominio

```typescript
// User (detalle completo)
interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

// SearchResult (búsqueda)
interface SearchResult {
  total_count: number;
  items: UserSearchItem[];
}

// Follower
interface Follower {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}
```

## 🔍 Pipe de Seguidores

El pipe `followers` transforma el número de seguidores:

| Input | Output |
|-------|--------|
| `0` | "Sin seguidores" |
| `1` | "1 seguidor" |
| `1500` | "1.5K seguidores" |
| `2500000` | "2.5M seguidores" |

## 🛡️ Interceptors

### Logging Interceptor (User Detail)
- Registra tiempo de inicio de cada request
- Muestra duración de la respuesta
- Log de errores con detalles

### Error Interceptor
- Mensajes user-friendly por código de error
- Manejo de errores de red
- Logging centralizado

## 📦 Module Federation

### Configuración Host (Next.js)
```javascript
remotes: {
  angularUserDetail: 'angularUserDetail@http://localhost:4201/remoteEntry.js',
  angularFollowers: 'angularFollowers@http://localhost:4202/remoteEntry.js',
}
```

### Configuración Remote (Angular)
```javascript
exposes: {
  './UserDetailComponent': './src/app/user-detail/user-detail.component.ts',
  './UserDetailModule': './src/app/user-detail/user-detail.module.ts',
}
```

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Error: "Module Federation remote not loading"
1. Verificar que los remotes Angular estén corriendo
2. Verificar URLs en `next.config.js`
3. Revisar consola del navegador para errores CORS

## 👤 Autor

DoubleV Partners - Technical Test

## 📄 Licencia

Este proyecto es parte de una prueba técnica.