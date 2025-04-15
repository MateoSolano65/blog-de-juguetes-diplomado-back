# Blog de Juguetes API

API backend para un blog de juguetes, desarrollada con Node.js, Express y MongoDB.

## Descripción

Este proyecto proporciona una API RESTful para gestionar un blog de juguetes, incluyendo funcionalidades para manejo de usuarios, productos, y más.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB (con Mongoose)
- bcrypt (para encriptación de contraseñas)
- express-validator
- dotenv (para gestión de variables de entorno)
- multer (para manejo de archivos)

## Requisitos previos

- Node.js (versión 16 o superior)
- MongoDB instalado localmente o una cuenta en MongoDB Atlas
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd blog-de-juguetes-diplomado-back
```

2. Instala las dependencias:

```bash
npm install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3000
DB_URI=mongodb://localhost:27017/blog-juguetes
# Añade cualquier otra variable de entorno necesaria, como claves secretas para JWT
```

## Ejecución

### Modo desarrollo

Para ejecutar la aplicación en modo desarrollo con recarga automática:

```bash
npm run dev
```

### Modo producción

Para ejecutar la aplicación en modo producción:

```bash
npm start
```

## Estructura del proyecto

```
app.js                    # Punto de entrada de la aplicación
package.json
src/
  ├── config/             # Configuración (bases de datos, etc.)
  ├── constants/          # Constantes y enumeraciones
  ├── controllers/        # Controladores para manejar las solicitudes HTTP
  ├── helpers/            # Funciones de ayuda
  ├── middlewares/        # Middlewares de Express
  ├── models/             # Modelos de Mongoose
  ├── routes/             # Definición de rutas de la API
  ├── services/           # Lógica de negocio
  └── validators/         # Validadores para las solicitudes
```

## API Endpoints

La API utiliza la base `/api/v1.0` para todas las rutas.

### Rutas principales:

- `GET /api/v1.0/` - Mensaje de bienvenida

### Usuarios:

- `GET /api/v1.0/users` - Obtener todos los usuarios
- `GET /api/v1.0/users/:id` - Obtener un usuario específico
- `POST /api/v1.0/users` - Crear un nuevo usuario
- `PUT /api/v1.0/users/:id` - Actualizar un usuario
- `DELETE /api/v1.0/users/:id` - Eliminar un usuario

## Contribución

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia que se especifica en el archivo LICENSE.
