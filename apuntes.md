# IDEMPOTENCIA

Propiedad de realizar una accion determinada varias veces y aun asi conseguir siempre el mismo resultado que obtendría al hacerlo una vez.

# POST (/Movies)

## NO IDEMPOTENTE → siempre crea un elemento / recurso nuevo.

Crea un nuevo elemento / recurso en el servidor

# PUT (/Movie/id:) //Es para cuando se actualiza TODO, no parcialmente.

## SI IDEMPOTENTE → el resultado siempre será el mismo

Actualizar totalmente un elemento ya existente o crearlo si no existe

# PATCH (/Movie/id:)

## SI IDEMPOTENTE → en principio si, pero depende.

Actualiza parcialmente un elemento o recurso

### Error CORS

CROS ORIGIN RESULT SHARING - ERROR DE USO COMPARTIDO ENTRE DOMINIOS

→ FALTA UNA CABECERA

Métodos normales: GET/HEAD/POST
Métodos complejos: PUT/PATCH/DELETE → CORS PRE-Flight: Petición "OPTIONS" (petición previa)
