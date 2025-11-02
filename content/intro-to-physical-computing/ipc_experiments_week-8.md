---
date: 2025-11-01
tags:
  - experiments
noteOrder: "163"
draft: "false"
---
i hadn't done the serial-communication lab in the previous week, so i did that this week. 

---
realised that an <mark>arduino is a development board</mark> — <mark>i write firmware</mark> for the board. my firmware is compiled into machine-readable code (binary), and <mark>sent to the arduino-bootloader</mark>. the bootloader facilitates the <mark>installation of the firmware onto the flash-memory</mark> of the controller. 

then <mark>the controller goes sequentially</mark> through bytes of memory (0x0000 ... ), and <mark>the cpu sends electricity to different parts</mark> (is what i gather). 

![[image-1.png]]
<figcaption>'agreement' by connections of tx -> rx & vice-versa.</figcaption>. 
> Since the data rate is 9600 bits per second (sometimes called 9600 baud), the receiver will read the voltage on its receive wire every 1/9600th of a second. It will interpret that voltage reading as a new bit of data. If the voltage is high (typically +5V or +3.3V in the case of most microcontrollers), it will interpret that bit of data as a 1. If it is low (typically 0V), it will interpret that bit of data as a 0. By interpreting the bits of data over time, the receiver can get a detailed message from the sender. at 9600 baud, for example, 1200 bytes of data can be exchanged in one second.

---

i didn't understand this: 

>As you might guess from this diagram, both devices also have to agree on the order of the bits. Usually the sender sends the highest bit (or most significant bit) first in time, and the lowest (or least significant bit) last in time.

if the microcontroller simply sends highs & lows (binaries), what is the 'highest' or 'most-significant' bit. 

tom's response: 

> In any number, the digit which represents the highest value is the most significant. So, for example, in the number 32,768, the most significant digit is the 3, because it represents 30,000. The 2 represents 2,000, the 7 represents 700, and so forth. 

---
this was interesting: 

> The advantage of a USB-native microcontroller is that they can also be programmed to behave as other USB devices, like MIDI, Mouse or Keyboard.

i wonder how. 

---
[[people/tom|tom]] connects a 'logic-analyser' in one of the videos. we don't have it in the shop. 

![[z_images/Screenshot 2025-11-01 at 17.19.59.webp]]

i hooked up a photoresistor, and tried to read values in different ways. 

![[z_images/Screenshot 2025-11-01 at 18.04.03.webp]]

i understand that 'print' converts what the arduino receives into numbers that i care about. 

i decided to go simpler, and see only what a button-press prints out in different formats. 

![[z_images/IMG_6848.mp4]]

the image below tells me that a zero is 30 in hexadecimal, and a period (+ perhaps a line break) is 0a. 

![[z_images/Screenshot 2025-11-01 at 18.18.50.webp]]

i then decided to understand what the hell these numbering systems are via this: https://www.youtube.com/watch?v=ZL-LhaaMTTE

then watched this: https://www.youtube.com/watch?v=FFDMzbrEXaE

![[z_images/Screenshot 2025-11-01 at 18.37.06.webp]]

^ this shows you how to <mark>convert decimal to binary by successive division</mark>. from the bottom (most significant bit) to top (least significant bit). 

for the same circuit as before, Serial.write sends information in a different format.

![[Screenshot 2025-11-01 at 18.48.08.png]]

chatgpt says this: 

![[Screenshot 2025-11-01 at 18.50.17.png]]

so, from what i can gather: the serial monitor on the arduino-ide is designed to display only a specific format (i don't know what to call it, but human-readable format (apparently)). i then found `Serial.print()`, and used it to [print values in different formats](https://docs.arduino.cc/language-reference/en/functions/communication/serial/print/).

![[z_images/Screen Recording 2025-11-01 at 19.01.12.mov]]

i then realised that <mark>i2c is just another protocol</mark>. i remember helping [[people/duan|duan]] & her partner with their motion sensor which used i2c (via the arduino's scl & sda pins). i now understood how that actually worked. 



