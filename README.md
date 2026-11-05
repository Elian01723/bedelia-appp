# Bedelía Universitaria — App con base de datos en la nube

## Archivos (todos van en la raíz del repositorio de GitHub)
- `index.html` — la aplicación completa
- `manifest.webmanifest`, `sw.js` — permiten instalarla como app y usarla sin internet
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — íconos de la app

## 1. Publicar en GitHub (gratis)
1. En github.com crea un repositorio nuevo (por ejemplo `bedelia-app`), **público**.
2. Pulsa **Add file → Upload files**, arrastra los 6 archivos de arriba y pulsa **Commit changes**.
3. Ve a **Settings → Pages**. En "Build and deployment" elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y guarda.
4. Espera 1 o 2 minutos. Tu app quedará en: `https://TU-USUARIO.github.io/bedelia-app/`

## 2. Actualizar la app
Cada vez que subas un archivo nuevo (por ejemplo un `index.html` modificado) con **Commit changes**,
GitHub Pages lo publica solo en 1 o 2 minutos. Las apps instaladas se actualizan al abrirlas con internet.

## 3. Instalar en el teléfono
- **Android (Chrome):** abre el enlace → menú ⋮ → **Instalar aplicación** (o "Añadir a pantalla de inicio").
- **iPhone (Safari):** abre el enlace → botón Compartir → **Agregar a pantalla de inicio**.

## 4. Cuentas
| Rol | Correo | Contraseña | Qué puede hacer |
|---|---|---|---|
| Administrador | bedelia.admin@universidad.edu | 123456 | Todo |
| Usuario | usuario.bedelia@universidad.edu | 123456 | Registrar y consultar. No elimina ni limpia el historial |
| Invitado | (botón "Entrar como Invitado") | — | Solo ver |

Para entrar hay que aceptar los Términos y Condiciones.

## 5. Base de datos (Firebase Realtime Database)
Todo se guarda en `https://bedelia-universitaria-default-rtdb.firebaseio.com`, dentro del nodo `bedelia`:
- `equipos`, `profesores`, `prestamos`, `historialLogs` — los registros que ven todos los dispositivos
- `accesos` — una constancia por cada inicio de sesión (usuario, correo, rol, fecha y hora del servidor, dispositivo)

Para verlo: console.firebase.google.com → proyecto **bedelia-universitaria** → **Realtime Database → Datos**.

## 6. Importante
- Las reglas en "modo de prueba" **vencen el 3 de diciembre de 2026**. Antes de esa fecha hay que cambiarlas
  (si no, la app dejará de guardar y mostrará "Sin permiso en la base de datos").
- En modo de prueba, quien tenga la dirección de la base puede leerla y modificarla. Úsala solo para las pruebas.
