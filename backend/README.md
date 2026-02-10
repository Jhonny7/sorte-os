# Backend API - Instrucciones de uso

## Requisitos

- PHP >= 7.4
- Composer instalado globalmente

---

## Instalación

Antes de ejecutar el servidor, asegúrate de instalar las dependencias:

```bash
composer install
````

## Ejecución local
```bash
php -S localhost:8000 -t public
````

## Accede al path
```bash
http://localhost:8000
````

##Estructura de proyecto
```bash
.
├── app/
│   ├── Controllers/      
│   ├── Models/            
│   ├── Middlewares/       
│   └── Routes/            
│
├── config/               
│
├── public/               
│   └── index.php          
│
├── vendor/                
│
├── .env                   
├── composer.json          
└── README.md              
````