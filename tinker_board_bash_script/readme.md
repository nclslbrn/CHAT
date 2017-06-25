# Installation of the site on Lubuntu on Tinkerboard

- need to install apache2 & php
- configure the host (/etc/apache2/site-available/)
- install [rkiosk firefox plugin](https://addons.mozilla.org/fr/firefox/addon/r-kiosk/ "rkiosk firefox plugin"), be aware that when this plugin is activated, you can't access to search bar so you can use `firefox -safe-mode` if you want to use firefox normally
- install xdotool `sudo apt-get install xdotool`, used to move moose away from the viewport
- Add the closing schedule of the exhibition in /etc/crontab `sudo nano /etc/crontab/` [more infos on askubuntu.com](https://askubuntu.com/questions/567955/automatic-shutdown-at-specified-times/#answer-567964)
