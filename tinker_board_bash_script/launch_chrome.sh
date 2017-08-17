#!/bin/bash
sleep 20s 
export DISPLAY=:0.0
open -a "Google Chrome" index.html
chromium-browser --app=http://example.com --start-fullscreen
sleep 5s
xdotool mousemove 0 1080
xdotool search --name ".*Mozilla Firefox" key "F11"
