from gpiozero import AngularServo
from time import sleep
import pygame

mtr=1
for i in  range(0,90):
        print('servo angle = ',i)
        servo.angle = i
        sleep(mtr)
for i in range(90,0,-1):
        servo.angle = i
        sleep(mtr)

