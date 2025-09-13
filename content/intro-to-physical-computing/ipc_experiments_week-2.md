---
date: 2025-09-11
tags:
  - experiments
noteOrder: "48"
draft: "false"
---
did a [quiz](https://docs.google.com/forms/d/e/1FAIpQLScOWv02U7W2SZxD4D7G2M8BT7Mv19QAHfcYzpDkbH6iOzU8Gg/viewform) to solidify basic concepts. here are my responses: 

![[z_images/quiz.pdf]]

---

read about microcontrollers. liked this: 

> Other devices, like light, heat, or motion sensors, motors, lights, our sound devices, are attached to these pins to allow the microcontroller to be **sensitive to the world and to express itself.** 

got interested in differences between a microcontroller and a computer. 

asked [[people/tom igoe|tom igoe]] this: 

> i'm not sure i understand the difference here: 
> 
> *Computer and processor are generic terms for the anything that can run a program, basically. Controller or microcontroller is usually reserved for a simple processor that does only one task, like listening to sensors.*
> 
> but a microcontroller can do many tasks: 
> 	listen to a sensor
> 	compute input
> 	send output
> 	sense input through another sensor 
>
> so, what are the differences really? is it just that a computer or processor is a very powerful microcontroller? 

his response was this: 

> You've got the basics right. I think of "computer" as the most generic term. "Microcontroller" is an industry term used to distinguish a more limited computer, usually used for physical interfaces: sensor devices, tangible control devices, machine monitors, and so forth. Microcontrollers generally have less processing power and memory than, say, a laptop or desktop CPU. As a result, microcontrollers generally one program that does one task at a time, rather than swapping between tasks each processing cycle. 

> The CPU in a laptop or desktop, or even your phone, is optimized for running multiple programming tasks at more or less the same time (that's what an operating system does), and for communication with other devices. They are also more capable of managing larger amounts of memory, and are usually connected to external storage, like a disk drive or SD card. 

> In addition, microcontrollers often have sub-circuits which are optimized for physical input and output, like analog-to-digital converters (ADCs) or digital-to-analog converters (DACs). Microcontrollers' architecture is optimized for that physical input and output. 

> As an example, a computer mouse runs a microcontroller. That controller reads the mouse's sensors (optical sensors on the bottom, these days), converts those changes to a direction of movement, and communicates  via USB or Bluetooth to a computer running an operating system. The processor in that computer has more computational capability, and more memory than the microcontroller, and therefore manages a number of tasks (the apps you swap between), manages the attached storage drives, the WiFi, the Bluetooth, all at the same time.  

then i have more questions, so booked office hours with him. 

---

attempted to, but failed to understand [level shifting](https://itp.nyu.edu/physcomp/lessons/electronics/level-shifting/). 

---

needed to better understand everything. 

in the below image, the computer gives out 5v, which runs through the breadboard, and lights up the led via the resistor. 

![[z_images/IMG_6188.jpg]]

correction: it only gives out 3v, even though it should give out 5v. 

i also don't understand what the 3v3 pin does, because it gives out no voltage.

[[people/octavio|octavio]] helped me understand that the 5v board needs to be soldered from under. so he taught me how to solder, and we soldered the bottom of my board. 

![[z_images/IMG_6189.jpg]]

he said to keep the iron on one side, and the solder on the other (forming a 90-degree angle), because the solder is attracted to heat. 

---

used a switch, and `Serial.println()` to read whether the switch gives any input or not. 

![[z_images/IMG_6193.mov]]

[[people/octavio|octavio]] helped me understand that a `delay()` is always necessary in electronic-circuit-code, because electricity moves really fast, and can overwhelm the computer. 

code: 

``` c
//check for input from d2. 

int button_state; 

void setup(){
  pinMode (2, INPUT); //2nd hole, where button is plugged. 
}

void loop(){
  int button_val = digitalRead (2); 

  if (button_val == HIGH){
    button_state = 1;
  }else{
    button_state = 0;
  }

  delay (30); 

  Serial.println(button_state); 
}

```

![[z_images/IMG_6191.jpg]]

---

i wanted to build a working-memory-game, which plays back a sequence of leds and people are supposed to press it in the correct order. 

![[z_images/IMG_6194.jpg]]

realised that c is different to program in, and studied the [fisher & yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) shuffle as a way to randomise contents in the array of the sequence. 

![[z_images/IMG_6198.jpg]]

it was clear in my head, but c became difficult to execute it in. so, i spent time with [[christina tang]] to understand how arrays work in c (as opposed to javascript, because it's simpler to do it there). 

![[z_images/IMG_6208.jpg]]

we then wrote pseudocode together, to avoid duplicates in the new sequence. [[gabriel]] also pitched in.

``` cpp
oldSequence = { 3, 1, 0, 2}

newSequence[6] = {0, 0, 0, 0, 0, 0}


newSeqLength = sizeof(new)/sizeof(elem)


For (int i = 0; i < newSequenceLength; I++) {


	int count = 0;


	// for as many elements as are in old sequence, use old sequence

	while count < oldSeq Length {


		int randoldIndex = rand(0, oldsequencelength)


			newSeq[I] = oldSeq[randoldIndex]

			if newSeq[I] == 99, try again until it’s not 99

			then, oldSeq[randoldIndex] = 99;

			and count ++

	}


	// then do new ones

	

	newseq[I] = random(0, ledLength)

}

```

[[people/yuxin|yuxin]] later suggested a [circular array implementation of queue](https://www.geeksforgeeks.org/dsa/introduction-to-circular-queue/) to save memory. i didn't understand it, and asked her to explain it to me when we meet next. 

i then spent time figuring out the circuit, and cutting wires to make it look neat. i want this game to be a handheld device, even at this stage of breadboard-prototyping. perhaps case it later. 

![[z_images/IMG_6213.jpg]]

then i spent time testing different components of the circuit: 

![[z_images/IMG_6214.mov]]

ran into problems with the algorithm [[people/christina tang|christina tang]] suggested. 

---
### 250912; 2237: 
all the lines are running now. 

``` cpp
// memory-game; september, 2025.

// the idea is to play a sequence through a program. the person is supposed to replicate the sequence. if they fail to do so accurately, they lose. else, they win.
// i might add sound too.

// i have buttons & led-s to manipulate, and a program to keep track of them.

int buttons[] = { 2, 3, 4, 5 };   //pin-numbers of buttons.
int leds[] = { 21, 20, 19, 18 };  //pin-numbers of leds.

//initialise readable name variables.
int blue_button = buttons[0];
int yellow_button = buttons[1];
int red_button = buttons[2];
int green_button = buttons[3];

int blue_button_value, yellow_button_value, red_button_value, green_button_value;

int led_1 = leds[0];
int led_2 = leds[1];
int led_3 = leds[2];
int led_4 = leds[3];

int seq[4] = { 0, 1, 2, 3 };  //this is the base sequence, which is just the leds in sequence.

int led_length = 4;  //number of leds.

void setup() {
    Serial.begin(9600);  // Initialize serial communication at 9600 baud rate
  //initalise:

  //set pinModes:

  // int length_of_array = sizeof(seq) / sizeof(seq[0]);  // christina: size of an integer is always 32. therefore, since arrays are of a fixed data-type, dividing by the (byte) size of the first element, divides everything by that number.

  for (int i = 0; i < 4; i++) {  //christina: i have to use a number here, because c++ is a lower level language.
    pinMode(buttons[i], INPUT);
    pinMode(leds[i], OUTPUT);
  };

  check();  //always perform a check when the program starts.
}

//function to check if leds & switches are working. essentially a "boot-animation".
void check() {
  //check leds:
  for (int i = 0; i < led_length; i++) {
    digitalWrite(leds[i], HIGH);
    delay(500);
    digitalWrite(leds[i], LOW);
    delay(500);
  }
}

//this is essentially the game.
void loop() {
Serial.println("line 56");


  //calculate the size of the sequence array:
  int sequence_length = sizeof(seq) / sizeof(seq[0]);

  
Serial.println("line 61");
  //then, generate a random sequence of leds to play out:
  delay(5000);
  generate_sequence(seq, sequence_length);
  
  for (int i = 0; i<sequence_length; i++){
    Serial.println(seq[i]); 
    Serial.println(""); 
  }

  //always read button-presses:
  blue_button_value = digitalRead(buttons[0]);
  yellow_button_value = digitalRead(buttons[1]);
  red_button_value = digitalRead(buttons[2]);
  green_button_value = digitalRead(buttons[3]);
}

//generated by chat-gpt, because i failed. not that it succeeded. 
void generate_sequence(int seq[], int sequence_length) {
  Serial.println("entered"); 
  // Generate the new sequence with one additional element
  int new_sequence_length = sequence_length + 1;
  int new_sequence[new_sequence_length];

  Serial.println("line 80");

  // Copy the old sequence to the new sequence
  for (int i = 0; i < sequence_length; i++) {
    new_sequence[i] = seq[i];
  }

  Serial.println("line 87");

  // Add a new random element to the new sequence
  new_sequence[new_sequence_length - 1] = random(0, 4);  // Randomly pick a new LED (0 to 3)

  Serial.println("line 92");

  // Copy the new sequence back to the original sequence
  for (int i = 0; i < new_sequence_length; i++) {
    seq[i] = new_sequence[i];
  }
  Serial.println("line 98");
}

//function to generate a random sequence: 
// void generate_sequence(int seq[], int sequence_length) {
//   //decide new sequence length:
//   int new_sequence_length = sequence_length + (sizeof(seq[0]) * 2);  //always add 2 to the previous number.

//   //declare a new sequence, of the length decided above.
//   int new_sequence[new_sequence_length];
//   int old_sequence[sequence_length];

//   //make last played sequence the old sequence:
//   for (int i = 0; i < sequence_length; i++) {
//     old_sequence[i] = { seq[i] };
//   }

//   for (int i = 0; i < new_sequence_length; i++) {
//     int count = 0;

//     //for as many elements in old sequence, use old sequence:
//     while (count < sequence_length) {
//       int n = random(0, sequence_length);
//       while (old_sequence[n] == 99) {
//         int n = random(0, sequence_length);
//       }
//       new_sequence[i] = old_sequence[n];
//       old_sequence[n] = 99;
//       count++;
//     }
//     seq[i] = new_sequence[i];
//   }
// }

```

results in: 

```
3

line 56
line 61
entered
line 80
line 87
line 92
line 98
0

1

2

3

line 56
line 61
entered
line 80
```

---
on the train ride back home, i figured out a simpler way to generate a new sequence every time the play gets the right answer. it is not mathematically pure, but probabilistically accurate. 

---

i also realised during this week that <mark>helping other people debug soldifies my understanding</mark> of the medium. this same line of thought carries forward in teaching too. perhaps this is why [[people/tom igoe|tom igoe]] still teaches intro-to-physical-computing. and maybe because he loves it. 