#!/bin/bash
#sleep 10s
sleep 0.1
xdotool key ctrl+shift+t
xdotool type "sudo apt-get remove firefox"
sleep 1s
xdotool key y
xdotool key Return
xdotool type "sudo apt-get update"
xdotool key Return
xdotool type "sudo apt-get install firefox=45.0.2+build1-0ubuntu1"
xdotool key Return
xdotool key y
xdotool key Return
sleep 50s
export DISPLAY=:0.0
firefox -url http://www.chat.expo &
sleep 5s
xdotool mousemove 0 1080
xdotool search --name ".*Mozilla Firefox" key "F11"
