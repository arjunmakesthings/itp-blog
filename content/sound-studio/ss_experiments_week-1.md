---
date: 2026-01-21
tags:
  - experiments
noteOrder: "206"
draft: "false"
---
# 260121_1640: 
i got excited about [[unit generator theory]]. 

---
messed around a little bit with max. 

![[Screen Recording 2026-01-22 at 12.37.54.mp4]]

couldn't figure out packing yet. 

for the 30s found-sound assignment, i wanted to record a circuit making some kind of sound. i tried a circuit, but got stuck up on understanding capacitance instead: [[efi_experiments_week-1]]. 

when i got stuck in my house on sunday because of the storm, i decided to learn ffmpeg instead to atleast splice an audio file into a 30s clip and convert it to `.wav`. 

``` 
ffmpeg -i candy_lifafa.mp3 -ss 51 -to 81 -c:a libmp3lame -q:a 2 30_s.wav

```



