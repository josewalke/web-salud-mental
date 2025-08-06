# 🌟 Web de Salud Mental - Reconecta

Una aplicación web moderna y interactiva diseñada para abordar los problemas de salud mental causados por la desconexión social y la hiperconectividad digital.

## 📋 Tabla de Contenidos

- [🎯 Descripción del Proyecto](#-descripción-del-proyecto)
- [🚀 Características](#-características)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚡ Instalación y Uso](#-instalación-y-uso)
- [🎨 Componentes](#-componentes)
- [🔧 Configuración](#-configuración)
- [📊 Métricas de Performance](#-métricas-de-performance)
- [🔍 Análisis de Usabilidad](#-análisis-de-usabilidad)
- [🚀 Deployment](#-deployment)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

## 🎯 Descripción del Proyecto

**Reconecta** es una plataforma web diseñada para ayudar a las personas a reconectarse consigo mismas y con otros, abordando los problemas de salud mental causados por la desconexión social y la hiperconectividad digital.

### 🎪 Problema que Resuelve

- **Hiperconectividad Digital**: 6.5 horas promedio diarias frente a pantallas
- **Desconexión Social**: Relaciones interpersonales superficiales
- **Fatiga Digital**: 65% reporta fatiga digital constante
- **Ansiedad Tecnológica**: 40% aumento en ansiedad relacionada con tecnología

### 🎯 Objetivos

1. **Concienciación**: Educar sobre los efectos de la hiperconectividad
2. **Recursos**: Proporcionar herramientas para la desconexión digital
3. **Comunidad**: Crear espacios de reconexión social
4. **Bienestar**: Promover hábitos saludables de uso tecnológico

## 🚀 Características

### ✨ Diseño y UX
- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y efectos visuales
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Responsive Design**: Adaptable a todos los dispositivos
- **Accesibilidad**: Cumple con estándares WCAG

### 🎭 Fondo 3D Interactivo
- **Spline 3D**: Escena 3D interactiva como fondo
- **Branding Oculto**: Componente "Built with Spline" oculto
- **Fallback**: Gradiente animado si no carga
- **Performance**: Optimizado para no afectar la experiencia

### 📱 Componentes Principales
- **Header**: Navegación moderna con animaciones
- **Hero Section**: Sección principal con call-to-action
- **Problem Section**: Estadísticas y síntomas
- **Services Section**: Servicios ofrecidos
- **Footer**: Información de contacto y enlaces

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca principal para la UI
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Framework CSS utility-first
- **Framer Motion**: Animaciones y transiciones
- **Lucide React**: Iconos modernos

### Herramientas de Desarrollo
- **Create React App**: Configuración inicial
- **PostCSS**: Procesamiento de CSS
- **ESLint**: Linting de código
- **Git**: Control de versiones

### Dependencias Principales
```json
{
  "@splinetool/react-spline": "^2.2.6",
  "motion": "^10.16.4",
  "lucide-react": "^0.294.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

## 📁 Estructura del Proyecto

```
websaludmental/
├── public/                 # Archivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes de UI reutilizables
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── utils.ts
│   │   ├── figma/         # Componentes específicos de Figma
│   │   │   └── ImageWithFallback.tsx
│   │   ├── Header.tsx     # Navegación principal
│   │   ├── HeroSection.tsx # Sección hero
│   │   ├── ProblemSection.tsx # Sección de problemas
│   │   ├── ServicesSection.tsx # Sección de servicios
│   │   ├── Footer.tsx     # Pie de página
│   │   └── SplineBackground.tsx # Fondo 3D
│   ├── App.tsx            # Componente principal
│   ├── index.tsx          # Punto de entrada
│   └── index.css          # Estilos globales
├── package.json           # Dependencias y scripts
├── tailwind.config.js     # Configuración de Tailwind
├── postcss.config.js      # Configuración de PostCSS
└── tsconfig.json          # Configuración de TypeScript
```

## ⚡ Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm 8+ o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/josewalke/web-salud-mental.git
cd web-salud-mental

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build
```

### Scripts Disponibles
```bash
npm start          # Inicia el servidor de desarrollo
npm run build      # Construye la aplicación para producción
npm test           # Ejecuta las pruebas
npm run eject      # Expone la configuración (irreversible)
```

## 🎨 Componentes

### Header.tsx
**Propósito**: Navegación principal con diseño moderno
**Características**:
- Navegación sticky/fixed
- Animaciones de hover
- Menú móvil responsive
- Logo animado

### HeroSection.tsx
**Propósito**: Sección principal con call-to-action
**Características**:
- Título principal animado
- Descripción del problema
- Botones de acción
- Elementos flotantes

### ProblemSection.tsx
**Propósito**: Mostrar estadísticas y síntomas
**Características**:
- Estadísticas animadas
- Lista de síntomas
- Diseño de tarjetas
- Efectos visuales

### ServicesSection.tsx
**Propósito**: Mostrar servicios ofrecidos
**Características**:
- Tarjetas de servicios
- Imágenes con fallback
- Animaciones de hover
- Información detallada

### SplineBackground.tsx
**Propósito**: Fondo 3D interactivo
**Características**:
- Escena Spline 3D
- Loading state
- Fallback gradient
- Branding oculto

## 🔧 Configuración

### Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Configuraciones personalizadas
    },
  },
  plugins: [],
}
```

### PostCSS
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 📊 Métricas de Performance

### Bundle Size
- **Total JS**: ~1.4MB (gzipped: ~700KB)
- **Total CSS**: ~6.3KB (gzipped)
- **Chunks principales**: 2 (main + vendor)

### Optimizaciones Implementadas
- ✅ Lazy loading de componentes
- ✅ Code splitting automático
- ✅ Optimización de imágenes
- ✅ CSS purging con Tailwind
- ✅ Minificación de assets

### Áreas de Mejora
- 🔄 Reducir bundle size
- 🔄 Implementar service worker
- 🔄 Optimizar imágenes WebP
- 🔄 Añadir preloading

## 🔍 Análisis de Usabilidad

### Puntos Fuertes
1. **Diseño Atractivo**: Interfaz moderna y profesional
2. **Navegación Clara**: Estructura intuitiva
3. **Responsive**: Funciona en todos los dispositivos
4. **Performance**: Carga rápida y fluida
5. **Accesibilidad**: Cumple estándares básicos

### Áreas de Mejora
1. **SEO**: Meta tags y estructura semántica
2. **Analytics**: Tracking de usuarios
3. **Testing**: Pruebas automatizadas
4. **Documentación**: Guías de usuario
5. **Feedback**: Sistema de comentarios

### Métricas de Usuario
- **Tiempo de carga**: <3s
- **Tiempo de interacción**: <1s
- **Tasa de rebote**: <40%
- **Conversión**: Objetivo 5%

## 🚀 Deployment

### Netlify
```bash
# Configuración automática desde GitHub
# Build command: npm run build
# Publish directory: build
# Environment variables: Configuradas en Netlify
```

### GitHub Pages
```bash
# Configurar en Settings > Pages
# Source: GitHub Actions
# Branch: gh-pages
```

### Variables de Entorno
```env
REACT_APP_SPLINE_SCENE=https://prod.spline.design/Qi1xNMPOy3Jd6AVi/scene.splinecode
REACT_APP_ANALYTICS_ID=your-analytics-id
```

## 🤝 Contribución

### Guías de Contribución
1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- **TypeScript**: Tipado estricto
- **ESLint**: Reglas de linting
- **Prettier**: Formateo de código
- **Conventional Commits**: Mensajes de commit

### Estructura de Commits
```
feat: nueva característica
fix: corrección de bug
docs: documentación
style: cambios de estilo
refactor: refactorización
test: pruebas
chore: tareas de mantenimiento
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Desarrollador**: José Walke
- **Email**: josewalke@example.com
- **GitHub**: [@josewalke](https://github.com/josewalke)
- **Proyecto**: [web-salud-mental](https://github.com/josewalke/web-salud-mental)

---

## 🎯 Roadmap

### Fase 1 - MVP ✅
- [x] Diseño básico
- [x] Componentes principales
- [x] Fondo 3D
- [x] Responsive design

### Fase 2 - Mejoras 🔄
- [ ] Sistema de autenticación
- [ ] Dashboard de usuario
- [ ] Contenido dinámico
- [ ] Analytics

### Fase 3 - Escalabilidad 🚀
- [ ] API backend
- [ ] Base de datos
- [ ] Sistema de pagos
- [ ] App móvil

### Fase 4 - IA y ML 🤖
- [ ] Chatbot de ayuda
- [ ] Análisis de sentimientos
- [ ] Recomendaciones personalizadas
- [ ] Machine learning
