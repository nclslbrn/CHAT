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


# Auto shutown 

Finally add a cron task 'sudo crontab -e' and type 
```
00 18 * * * root shutdown -h now

```

to make Raspbian shutdown automatically everyday at 6PM (change time according to your will).

[more info on crontab](https://askubuntu.com/questions/567955/automatic-shutdown-at-specified-times/#answer-567964)
