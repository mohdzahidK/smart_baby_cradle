import json
from gpiozero import AngularServo
from time import sleep
import pygame
pygame.mixer.init()
pygame.mixer.music.load("alaarm.wav")

from websocket import create_connection
servo = AngularServo(18, min_pulse_width=0.0006, max_pulse_width=0.0023)
ws = create_connection("ws://3.110.24.21:5000/")
print('websocket conn success')

mtr=0.03
res = json.loads(ws.recv())
print('recvd...',res)
#res = 'DROWSINESS DETECTED'
servo.angle = 45
def swing(spd):
    print('SWING STARTED',mtr)
    while (True):
               #if(sleep and not cry):
               #servo.angle = 45
               #break
           for i in  range(0,90):
                print('servo angle = ',i)
                print(res['buttonState'])
                servo.angle = i
                sleep(spd)
           for i in range(90,0,-1):
                servo.angle = i
                sleep(spd)

sleep = False
cry = True
music = true


#res = {'mode':'auto'}

if(res=='DROWSINESS DETECTED'):
    sleep = True

if(res=='CRY DETECTED'):
    cry = True
while True:
    mess = json.loads(ws.recv())
    if(mess['buttonState']==False):
       mtr = mess['value']
       print('afsdfdsf',mtr)
       if(mtr==0):
           servo.angle = 45
       if(mtr==1):
            swing(0.3)
       if(mtr==2):
            swing(0.2)
       if(mtr==3):
            swing(0.1)
    
#if(not sleep or cry):
    #mtr = 0.01
    #swing()
    
if(music):
     print('Playing Music')
     pygame.mixer.music.play()
     while pygame.mixer.music.get_busy() == True:
        continue
    

ws.close()



