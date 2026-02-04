# 🚀 Inicio Rápido - GitHub User Search

Guía rápida para poner en marcha la aplicación federada de GitHub.

## ⚡ Ejecución Inmediata

### 1. Instalar Angular CLI
```bash
npm install -g @angular/cli@17
```

### 2. Instalar Dependencias
```bash
# Next.js Host
cd nextjs-host
npm install

# Angular User Detail  
cd ../angular-user-detail
npm install

# Angular Followers
cd ../angular-followers
npm install
```

### 3. Iniciar Servidores
Abre **3 terminales**:

```bash
# Terminal 1
cd angular-user-detail && npm start

# Terminal 2  
cd angular-followers && npm start

# Terminal 3
cd nextjs-host && npm run dev
```

### 4. Acceder
- 🌐 **Aplicación**: http://localhost:3000
- 🔧 **Angular User Detail**: http://localhost:4201  
- 🔧 **Angular Followers**: http://localhost:4202

## 🧪 Prueba Rápida

1. Busca "octocat" en http://localhost:3000
2. Haz clic en "Ver Detalles"
3. Verás los microfrontends Angular cargados

## ❓ Problemas Comunes

**Rate limit de GitHub API**: Espera 1 hora o usa diferentes términos de búsqueda.

**Puertos en uso**: Cambia los puertos en los scripts de inicio.

**Module Federation no carga**: Asegúrate que los 3 servidores estén corriendos.

---

📖 **Para más detalles**: Ver [README.md](./README.md) completo.
