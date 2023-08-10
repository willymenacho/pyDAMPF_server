=====================================================================================
============================ INSTALACION Y EJECUCION ================================
=====================================================================================
# EN UNA TERMINAL
	git clone https://github.com/m0tivus/jupyterlab-pydampf
	cd pyDAMPF_server
	python execute.py

# SALDRAN  PESTA~NAS QUE PEDIRAN CONTRASE~NAS PARA EJECUTARSE CON SUDO 
# VAMOS PONIENDO LAS CONTRASE~NAS Y EN LA ULTIMA TERMINAL APARECERA UN URL
# COPIAMOS EL ULTIMO O PENULTIMO URL Y LO COPIAMOS EN EL NAVEGADOR DE PREFERENCIA (FIREFOX)
# ENTRAMOS A WORK Y EJECUTAMOS EL UNICO NOTEBOOK QUE APARECERA


================= RESETEO DE LA CARPETA DEL USUARIO SI ASI LO DESEE =================
#en la terminal "JupyterLab pyDAMPF"
		 sudo docker-compose build --no-cache			 
	 	 sudo  docker-compose up

=====================================================================================
============================== ESO ES TODO PARA USAR PYDAMPF ========================
=====================================================================================







=====================================================================================
============== no deberia ser necesario estos comandos e instrucciones ==============
=====================================================================================

==================================== aplicaciones =================================== 

### install net-tools en una terminal:
	sudo apt-get install net-tools
	sudo netstat -pln

### descargar e instalar docker compose:
	curl -fsSL https://get.docker.com -o get-docker.sh
	sh get-docker.sh
	sudo apt  install docker-compose

========================= posibles problemas y solcuiones ==========================
### en mi caso ubo problemas con el dns pero la solucion es modificar el documento 
### buscar la linea en el que diga nameserver y cambiarla "nameserver 8.8.8.8"

	sudo vi /etc/resolv.conf
		nameserver 8.8.8.8

### esto para prueba (no recuerdo que soluciona exactamente pero no deberia ser necesario)

	sudo docker run -it --add-host=host.docker.internal:host-gateway ubuntu bash
	curl http://host.docker.internal:4000/
