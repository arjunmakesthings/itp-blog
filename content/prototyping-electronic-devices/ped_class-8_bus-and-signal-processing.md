---
date: 2026-10-30
tags:
  - lectures
noteOrder: "560"
draft: "false"
---
- bus to reduce connections
- serial bus vs parallel bus

ata vs sata buses on hard drives: 

async serial: 
- rs 485
- 1-wire-1-wire

sync serial: 
- i2c
- spi 

- async has a receiver clock -> data will be corrupted if sender freezes (0 will be logged). 

differential vs single ended signal 

to reduce noise: twisted wire -> differential signal to reduce possibility of electromagnetic interference. 

usb extender: decode signals first and then encode and send them again. use one with a repeater. 

using shielded wires to remove noise. 

eeprom of monitor: stores data for config of monitor (hdmi talks to it). 

spi: 
- device selector pin (set to low to talk to it)
- send data mosi / mosc
>SPI uses 4 main pins: SCLK (clock), chip select (CS), MOSI (main out, subnode in), and MISO (main in, subnode out). On a Raspberry Pi, SPI0 uses GPIO 7–11 (plus CE0/CE1 chip-select on GPIO 8/7 by default), and SPI1 uses GPIO 16–21.

ibuttons for data logging and security checkpoints. 

moving point average instead of averaging all values. 

queue: take n signals and calculate average -> keep pushing and popping in & out of queue. 

ring buffer -> 

hysteris: two different thresholds and move them to avoid noise. 

advanced peak detection: 

look at total highest point and find out when it has dropped. 

the delta point is the peak. 