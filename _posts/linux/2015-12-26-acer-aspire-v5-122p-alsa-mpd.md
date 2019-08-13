---
layout: post
category: linux
title: Acer Aspire v5 122p alsa, mpd
---

## How to get it work

### Alsa

~/.asoundrc :

```conf
pcm.dsp {  
  type plug  
  slave.pcm "dmix"  
}  
```

/etc/modprobe.d/50-alsa.conf:  

```conf
options snd-hda-intel index=1  
```

_So, HDMI is second device, and sources mixings by dmix_

### mpd

/etc/mpd.conf:   

```conf
music_directory         "/home/{username}/Music"  
playlist_directory      "/home/{username}/.mpd/playlists"  
db_file                        "/home/{username}/.mpd/mpd.db"  
log_file                "/home/{username}/.mpd/mpd.log"  

audio_output {  
        type                    "alsa"  
        name                    "ALSA Device"  
}  
```

### Last steps

<u>remove pulseaudio</u>, if exists, and:  

```shell
mkdir -p ~/.mpd/playlists  
sudo systemctl enable mpdsudo systemctl start mpd

mpc load <playlist_name>

mpc play 1
```
