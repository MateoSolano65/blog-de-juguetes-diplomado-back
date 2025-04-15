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
uploads/
  └── toys/               # Carpeta donde se almacenan las imágenes de juguetes
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
- `PATCH /api/v1.0/users/:id/role` - Actualizar el rol de un usuario

### Juguetes:

- `GET /api/v1.0/toys` - Obtener todos los juguetes
- `GET /api/v1.0/toys/:id` - Obtener un juguete específico
- `POST /api/v1.0/toys` - Crear un nuevo juguete
- `PUT /api/v1.0/toys/:id` - Actualizar un juguete
- `DELETE /api/v1.0/toys/:id` - Eliminar un juguete

### Gestión de imágenes de juguetes:

- `POST /api/v1.0/toys/:id/images` - Añadir una imagen a un juguete
- `POST /api/v1.0/toys/:id/images/multiple` - Añadir múltiples imágenes a un juguete
- `GET /api/v1.0/toys/:id/images` - Obtener todas las imágenes de un juguete
- `DELETE /api/v1.0/toys/:id/images/:filename` - Eliminar una imagen de un juguete
- `PUT /api/v1.0/toys/:id/images/:filename/main` - Establecer una imagen como principal

## Modelo de datos

### Usuario

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String (hashed)",
  "role": "String (user/admin)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Juguete

```json
{
  "_id": "ObjectId",
  "title": "String",
  "category": "String",
  "description": "String",
  "review": "String",
  "rating": "Number (1-5)",
  "imageUrl": "String",
  "images": [
    {
      "filename": "String",
      "isMain": "Boolean"
    }
  ],
  "tags": ["String"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Acceso a las imágenes

Las imágenes subidas se pueden acceder directamente a través de la URL:

- `http://localhost:3000/toys-images/:filename` - Donde `:filename` es el nombre del archivo de imagen

## Contribución

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia que se especifica en el archivo LICENSE.
