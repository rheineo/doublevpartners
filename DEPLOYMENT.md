# 🚀 Guía de Despliegue - Todo en Vercel

## 📋 Arquitectura de Despliegue

```
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js Host)                       │
│  https://github-user-lovat.vercel.app                          │
│  • SSR/SSG con Server Actions                                   │
│  • Estado global con Zustand                                    │
│  • Consume microfrontends via URLs públicas                    │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────┐       ┌─────────────────────┐
│    VERCEL (Angular) │       │    VERCEL (Angular) │
│  User Detail Remote  │       │  Followers Remote   │
│angular-user-detail  │       │angular-followers   │
│    .vercel.app      │       │    .vercel.app      │
└─────────────────────┘       └─────────────────────┘
```

## 🔧 Paso 1: Despliegue Next.js en Vercel

### 1.1 Preparar Variables de Entorno
En tu dashboard de Vercel:
- Ve a tu proyecto: https://vercel.com/lineyvisions-projects
- Settings → Environment Variables
- Agrega:

```bash
NEXT_PUBLIC_ANGULAR_USER_DETAIL_URL=https://angular-user-detail.vercel.app
NEXT_PUBLIC_ANGULAR_FOLLOWERS_URL=https://angular-followers.vercel.app
```

### 1.2 Desplegar
```bash
cd nextjs-host
vercel --prod
```

## 🎯 Paso 2: Desplegar Angular en Vercel

### 2.1 Angular User Detail
```bash
cd angular-user-detail
npm run build
```

1. Ve a la carpeta de build: `cd dist/angular-user-detail`
2. Despliega en Vercel:
```bash
vercel --prod --name angular-user-detail
```
3. Copia la URL generada: `https://angular-user-detail.vercel.app`

### 2.2 Angular Followers
```bash
cd angular-followers
npm run build
```

1. Ve a la carpeta de build: `cd dist/angular-followers`
2. Despliega en Vercel:
```bash
vercel --prod --name angular-followers
```
3. Copia la URL generada: `https://angular-followers.vercel.app`


## ⚙️ Paso 3: Configurar URLs

### 3.1 Actualizar Vercel Environment Variables
```bash
NEXT_PUBLIC_ANGULAR_USER_DETAIL_URL=https://angular-user-detail.vercel.app
NEXT_PUBLIC_ANGULAR_FOLLOWERS_URL=https://angular-followers.vercel.app
```

### 3.2 Redesplegar Next.js
```bash
cd nextjs-host
vercel --prod
```

## 🌐 URLs Finales del Despliegue

- **Next.js Host**: https://github-user-lovat.vercel.app
- **Angular User Detail**: https://angular-user-detail.vercel.app
- **Angular Followers**: https://angular-followers.vercel.app

## 🧪 Verificación del Despliegue

1. **Prueba Next.js**: Visita https://github-user-lovat.vercel.app
2. **Busca usuarios**: Prueba con "octocat"
3. **Ver detalles**: Haz clic en "Ver Detalles"
4. **Verifica microfrontends**: Los iframes deben cargar las URLs de Vercel

## 🔍 Troubleshooting

### Error: "CORS blocked"
- Asegúrate que las URLs de Vercel sean correctas
- Verifica las variables de entorno en Vercel
- Los microfrontends deben ser accesibles públicamente

### Error: "Module Federation not loading"
- Revisa que las URLs de los remotes sean correctas
- Verifica que los builds de Angular sean estáticos
- Prueba acceder a las URLs de Vercel directamente

### Error: "Server timeout"
- Aumenta `maxDuration` en `vercel.json`
- Optimiza las Server Actions para respuestas más rápidas

## 📊 Alternativas de Despliegue

### Opción A: Todo en Vercel
- Convertir Angular a Static Site
- Desplegar como proyectos separados en Vercel
- Usar dominios personalizados

### Opción B: GitHub Pages (Gratis)
- Desplegar Angular en GitHub Pages
- Configurar GitHub Actions para CI/CD
- URLs: `username.github.io/repo-name`

### Opción C: Railway/Render
- Desplegar Angular como contenedores
- URLs personalizadas
- Más control sobre el entorno

## 🚀 Automatización con GitHub Actions

Puedes automatizar el despliegue agregando:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy-nextjs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

🎉 **¡Tu aplicación federada estará desplegada y funcionando en producción!**
