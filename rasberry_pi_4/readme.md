# Autostart

Make Firefox start on http://localost at Raspbian boot

Add a 'chat.dekstop' file into /etc/xdg/autostart/ folder with the content below

```
[Desktop Entry]
Type=Application
Name=chat
Comment=Start chat website client session
NoDisplay=false
Exec=sh /var/www/html/rasberry_pi_4/launch_firefox_ESR.sh
NotShowIn=GNOME;KDE;XFCE;
```
