# data-proyect-angular-ignacio-duran


# Build del proyecto

1.ejecutar npm i para instalacion de modulos node_modules
2.ejecutar npm start



el proyecto esta hecho de la forma siguientes: 

Estilos : Se uso Material para el estilo del mismo 
tiene un modulo compartido para cargarlo en los modulos necesarios

# Partes 

tanto datos como autenticacion, cada uno poseera sus interfaces, paginados, servicios y modulos propios como su ruteo (incorporando el lazy loading para carga diferida)

hay un solo guard que es el auth.guard el cual tiene una validacion mientras el usuario sea admin como rol (propiedad del mismo), podra acceder a las operaciones CRUD como editar y crear

# login
los usuarios estan mockeados para ingresar en el login

admin : admin / 123456

user : user / 1234567

# manejo usuarios por rol

ADMIN
tanto creacion como edit comparten la misma pagina , dependiendo de lo solicitado los servicios se encargan de traer la data para editar o bien para crear una nueva card (data)

cabe destacar que la api NO CREA NUEVA DATA por ende no se ve actualizadas en la app sin embargo devuelve un dato mockeado el cual se va a ver por medio de un SNACKBAR el cual tiene un temporizador de muestreo 

USER
solo tiene acceso a visualisacion de la data



