# API de Gestión de Usuarios - Foro Alura

Este proyecto consiste en una API RESTful para gestionar usuarios en un foro de discusión. Los usuarios pueden registrarse, actualizar su información, habilitar/deshabilitar su cuenta, y más. La API está construida utilizando Spring Boot y proporciona varios endpoints para interactuar con los datos de los usuarios.

## Características

- **Registro de usuarios**: Permite crear nuevos usuarios con un nombre de usuario, contraseña, rol, etc.
- **Consulta de usuarios**: Permite obtener información sobre usuarios activos o todos los usuarios.
- **Actualización de usuarios**: Permite actualizar la información de un usuario (como contraseña, nombre, rol, etc.).
- **Deshabilitar usuarios**: Permite deshabilitar un usuario sin eliminarlo físicamente de la base de datos.

## Requisitos

- **Java 17 o superior**.
- **Spring Boot** para el desarrollo del backend.
- **BCryptPasswordEncoder** para la codificación de contraseñas.
- **Swagger** para la documentación de la API.

## Endpoints

### 1. **POST /usuarios**
**Descripción**: Registra un nuevo usuario en la base de datos.

**Request Body**:
```json
{
  "username": "usuario1",
  "password": "secreto123",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@correo.com",
  "role": "USER"
}
