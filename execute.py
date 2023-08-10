#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#=======================pyDAMPF==============================
#The code written below is part of the pyDAMPF project and has
#been developed as a joint project between the IJS and UMSA. This 
#software will enable students and researchers from the 
#AFM community to easily plan AFM experiments.
#======================CREDITS==============================
#
# M.Sc. Willy Menacho N.
# PI Horacio V. Guzman Ph.D.
#
#======================pyDAMPF LICENSE==============================

#Copyright (C) 2022  Horacio V. Guzman and Willy Menacho N.

#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.

#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.

#You should have received a copy of the GNU General Public License
#along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
#
# What we observe is not nature itself, but nature exposed to
# our method of questioning. 
#                                  W. Heisenberg
#####################################################################
#====================================================================

import subprocess
import time

comandos_y_titulos = [
    ("cd motivus-marketplace-api && sudo docker-compose up; exec bash", "Marketplace API"),
    ("cd motivus-wb-api && sudo docker-compose up; exec bash", "WB API"),
    ("cd motivus-wb-floatingtool/node && sudo docker-compose up; exec bash", "WB Floatingtool"),
    ("cd motivus-home && sudo docker-compose up; exec bash", "Home"),
    ("cd jupyterlab-pydampf && sudo docker-compose up; exec bash", "JupyterLab PyDAMPF")
]

cmd, titulo = comandos_y_titulos[0]
subprocess.Popen(["gnome-terminal", "--title", titulo, "--", "bash", "-c", cmd])
time.sleep(10)
cmd, titulo = comandos_y_titulos[1]
subprocess.Popen(["gnome-terminal", "--title", titulo, "--", "bash", "-c", cmd])
time.sleep(15)
cmd, titulo = comandos_y_titulos[2]
subprocess.Popen(["gnome-terminal", "--title", titulo, "--", "bash", "-c", cmd])
time.sleep(10)
cmd, titulo = comandos_y_titulos[3]
subprocess.Popen(["gnome-terminal", "--title", titulo, "--", "bash", "-c", cmd])
time.sleep(15)
cmd, titulo = comandos_y_titulos[4]
subprocess.Popen(["gnome-terminal", "--title", titulo, "--", "bash", "-c", cmd])





