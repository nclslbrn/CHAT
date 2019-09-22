#!/bin/bash
sleep 20s 
export DISPLAY=:0.0
firefox -url http://localhost &
sleep 5s
xdotool mousemove 0 1080
xdotool search --name ".*Mozilla Firefox" key "F11"
