# Markdown Links

## Diagrama de Flujo

![MD-Links](https://github.com/Daianatk/LIM009-fe-md-links/blob/master/img/My-%20Markdown%20Links.jpg)

## Instalaciòn

Puede instalar la librería de la siguiente forma npm i daiana-md-links

## Guia de Uso

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente manera.

md-links <path-to-file> [options] (--stats ò --validate / --stats --validate)
Ejemplo:
 $ md-links ./example/README.md --stats --validate

Argumentos
path: Ruta absoluta o relativa al archivo o directorio.
options: Un objeto con las siguientes propiedades:
validate: Booleano que determina si se desea validar los links encontrados(true o false).

## Objetivos

El objetivo práctico de este proyecto es que aprendas cómo crear tu propia
**librería** (o biblioteca - _library_) en JavaScript.

Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador porque que te obliga a pensar en la interfaz (API) de tus
_módulos_ y cómo será usado por otros developers. Debes tener especial
consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.

## Criterios de aceptacion

Estos son los criterios de lo que debe ocurrir para que se satisfagan 
las necesidades del usuario:

- Instalar la libreria via `npm install --global <github-user>/md-links`

### `README.md`

- Encontrar el *pseudo codigo* o *diagrama de flujo* con el algoritmo que
  soluciona el problema.
- Encontrar un board con el backlog para la implementación de la librería.
- Encontrar la documentación técnica de la librería.
- Encontrar la Guía de uso e instalación de la librería.

### API `mdLinks(path, opts)`

- El módulo exporta una función con la interfaz (API) esperada.
- El módulo implementa soporte para archivo individual
- El módulo implementa soporte para directorios
- El módulo implementa `options.validate`

### CLI

- Expone ejecutable `md-links` en el path (configurado en `package.json`)
- Se ejecuta sin errores / output esperado.
- El ejecutable implementa `--validate`.
- El ejecutable implementa `--stats`.
- El ejecutable implementa `--validate` y `--stats` juntos.


Para comenzar este proyecto tendrás que hacer un _fork_ y _clonar_ este
repositorio.

Antes de comenzar a codear, es necesario que pensemos en la arquitectura y
boilerplate del proyecto, por lo que `antes de que empieces tu planificacion
y a trabajar en la funcionalidad de tu proyecto deberás de haber
creado tu boilerplate y tus tests`. Esto debería quedar
detallado en tu repo y haberte asegurado de haber recibido feedback de uno
de tus coaches. Una vez hayas terminado de definir la arquitectura y los tests
de tu proyecto estarás lista para iniciar con tu **planificacion** por lo cual
deberas de hacer uso de una serie de _issues_ y _milestones_ para priorizar
tus tareas y crear un _project_ para organizar el trabajo y poder hacer
seguimiento de tu progreso.

Dentro de cada _milestone_ se crearán y asignarán los _issues_ que cada quien
considere necesarios.

### JavaScript API

El módulo debe poder importarse en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es
  relativa, debe resolverse como relativa al directorio desde donde se invoca
  node - _current working directory_).
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe retornar una promesa (`Promise`) que resuelva a un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./example/README.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./example/README.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./example")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./example/README.md
./example/README.md https://github.com/Daianatk/md-links https://github.com/Daianatk/md-links
./example/README.md https://www.google.com/searc https://www.google.com/searc
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md --validate
./example/README.md https://github.com/Daianatk/md-links 200 OK https://github.com/Daianatk/md-links
./example/README.md https://www.google.com/searc 404 Fail https://www.google.com/searc
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md --stats
Total: 2 Unique: 2
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md --stats --validate
Total: 2 Unique: 2 Broken: 1
```
