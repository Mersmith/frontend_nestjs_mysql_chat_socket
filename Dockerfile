# - DEVELOPMENT -
# Establecer la imagen base
FROM node:18 AS development

# Establecer el directorio de trabajo en el contenedor
WORKDIR /src/app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install
RUN npm install -g @angular/cli@16.0.6

# Copiar el código fuente del proyecto
COPY . .

RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 4200

# Comando para ejecutar la aplicación
#CMD ["npm", "run", "start:dev"]