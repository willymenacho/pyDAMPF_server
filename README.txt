#no deberia ser necesario

sudo apt-get install net-tools
sudo netstat -pln

#esto para prueba
sudo docker run -it --add-host=host.docker.internal:host-gateway ubuntu bash
curl http://host.docker.internal:4000/


# SI SE TIENE PROBLEMAS CON EL DNS
sudo vi /etc/resolv.conf
	nameserver 8.8.8.8





#EN UNA TERMINAL ABIERTA EN EL DIRECTORIO DONDE DESCARGAREMOS LAS CARPETAS:

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo apt  install docker-compose

#EN UNA TERMINAL
git clone https://github.com/m0tivus/jupyterlab-pydampf

#SE ABRE LAS 4 TERMINALES EN CADA UNA SE EJECUTA LOS SIGUEINTES COMANDOS:

git clone https://github.com/m0tivus/motivus-marketplace-api
git clone https://github.com/m0tivus/motivus-wb-api
git clone https://github.com/m0tivus/motivus-wb-floatingtool
git clone https://github.com/m0tivus/motivus-home

#EN SUS RESPECTIVAS TERMINALES:

cd motivus-marketplace-api
cd motivus-wb-api
cd motivus-wb-floatingtool/node
cd motivus-home

#UNA VEZ SITUADOS EN CADA DIRECTORIO:

sudo  docker-compose up
sudo  docker-compose up

#esperar que se levanten las apis
sudo  docker-compose up
sudo  docker-compose up


en la terminal de pydampf
#para resetear el estado de las carpetas:

		 sudo docker-compose build --no-cache	
		 
	 	 sudo  docker-compose up

preguntar si solo en una terminal, y el token

figura2, izquierda esfera, del medio elipsoide (disco en general)
para el elipsoide  distancia de 4k cada 90 aparece los elipsoides con un ancho de 30

https://www.sciencedirect.com/science/article/pii/S2667074722000222?via%3Dihub

