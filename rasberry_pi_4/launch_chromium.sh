#!/bin/bash
sleep 5s 
#export DISPLAY=:0.0
#sleep 5s
chromium-browser --kiosk http://localhost
xdotool mousemove 1920 1080
