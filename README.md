# Food Store - Parcial I - Programacion III

Para este parcial amplié el proyecto Food Store que veníamos trabajando. Ahora el usuario puede recorrer el catálogo, buscar productos, filtrarlos por categoría y agregarlos a un carrito.

## Video de presentación

## Funcionalidades implementadas

- Los productos y las categorías se cargan desde el archivo `src/data/data.ts`.
- Se puede buscar un producto escribiendo su nombre o una parte del mismo.
- También se puede elegir una categoría o volver a mostrar todos los productos.
- Si la búsqueda no encuentra resultados, se muestra un mensaje en pantalla.
- Cada producto disponible tiene un botón para agregarlo al carrito.
- El carrito queda guardado en `localStorage`, por lo que no se pierde al recargar la página.
- Cuando se agrega más de una vez el mismo producto, aumenta su cantidad en lugar de repetirse.
- En la página del carrito se muestran los productos elegidos, sus cantidades, los subtotales y el total de la compra.
- Si todavía no se agregó ningún producto, se informa que el carrito está vacío.
- Los productos que no tienen stock se muestran como no disponibles y no se pueden agregar.

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite
- localStorage

## Instalación y ejecución

Es necesario tener Node.js y pnpm instalados.

```bash
pnpm install
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

Para comprobar que el proyecto compila correctamente:

```bash
pnpm build
```

## Cuenta administradora

- Email: `admin@foodstore.com`
- Contraseña: `Admin123`

También se puede crear un usuario cliente desde la pantalla de registro.
