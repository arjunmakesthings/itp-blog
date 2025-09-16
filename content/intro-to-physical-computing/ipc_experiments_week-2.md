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

### 250913_1837: 
failing to generate a new sequence, and running into programming problems. 

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

int seq[] = { 0, 1, 2, 3 };  //this is the base sequence, which is just the leds in sequence.

int led_length = 4;  //number of leds.

void setup() {
  Serial.begin(9600);  // start serial communication at 9600 baud rate

  //set pinModes:

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
  //calculate the size of the sequence array:
  int sequence_length = sizeof(seq) / sizeof(seq[0]);

  //then, generate a random sequence of leds to play out:
int newArra [] =   generate_sequence(seq, sequence_length);

  //show the sequence: 
  for (int i = 0; i<sequence_length; i++){
    digitalWrite(buttons[i], HIGH); //turn on
    delay (500); 
    digitalWrite(buttons[i], LOW); //turn off.
  }

  //check what the player enters. 
  int player_sequence [sequence_length] = {}; 

  
  int player_sequence_length = sizeof(player_sequence) / sizeof(player_sequence[0]);
  

  if (playerSequence)
  if (blue_button_value==HIGH){

  }
  //always read button-presses:
  blue_button_value = digitalRead(buttons[0]);
  yellow_button_value = digitalRead(buttons[1]);
  red_button_value = digitalRead(buttons[2]);
  green_button_value = digitalRead(buttons[3]);
}

//for the random sequence, we'll take an old sequence, put random numbers between 0 and 3.
//then, if three concurrent numbers are the same, we'll change both of them. this does not guarantee that the numbers won't repeat, but it's probabalistically rare.

void generate_sequence(int seq[], int sequence_length) {

  //whatever the sequence length was, add 2 to it.
  int new_sequence_length = sequence_length + 2;

  Serial.println(new_sequence_length); 

  //initialise a new sequence.
  int new_sequence[new_sequence_length];

  //assign a random pattern of indices to the new sequence:
  for (int i = 0; i < new_sequence_length; i++) {
    //pick a random number between 0 and the number of leds.
    int n = random(0, led_length);
    new_sequence[i] = n;

    //check for three consecutive numbers being the same. while so, keep changing them until they aren't.
    //i can tell that this is not the most efficient way to do this. but, it's fine. 
    //enter the loop only if new_sequence>3 elements.
    if (new_sequence_length > 3) {
      // while (new_sequence[i] == new_sequence[i - 1] == new_sequence[i + 1]) {
      while (new_sequence[i] == new_sequence[i - 1] && new_sequence[i] == new_sequence[i - 2]) {

        int n_minus_one = random(0, led_length);
        int n_minus_two = random(0, led_length);

        new_sequence[i - 1] = n_minus_one;
        new_sequence[i - 2] = n_minus_one;
      }
    }
    //else in both cases:

    //push the new numbers into the old array.
    return new_sequence[i];
  }
}

//christina's suggestion, but i decided against using it / wasn't able to implement it well .
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

[[william]] helped me understand how to push objects into a new array. 

![[z_images/IMG_6225.jpg]]

so, i wanted to refactor my code. however, at this point, i really want this to work. so, i'm going to think through the rest of the steps, and then step back in to change the size of the array. 

this made sense in my head, but the code is not working. 

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

int red_led = 6; 
int green_led = 17; 

int seq[] = { 0, 1, 2, 3 };      //this is the base sequence, which is just the leds in sequence.
int played_sequence[0];          //generate a played array.
int played_sequence_length = 0;  //initialise a length of zero.

int led_length = 4;  //number of leds.

bool player_input = false;

void setup() {
  Serial.begin(9600);  // start serial communication at 9600 baud rate

  //set pinModes:

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
  //calculate the size of the sequence array:
  int sequence_length = sizeof(seq) / sizeof(seq[0]);

  if (player_input == false) {
    //then, generate a random sequence of leds to play out:
    generate_sequence(seq, sequence_length);

    //show the sequence:
    for (int i = 0; i < sequence_length; i++) {
      digitalWrite(leds[i], HIGH);  //turn on
      delay(500);
      digitalWrite(leds[i], LOW);  //turn off.
    }

    delay(5000);  //delay for 5 seconds, then make a new sequence. this means the device is on, but the player didn't pay attention.
  }
  delay(100);  //arbitrary delay of 100ms.
               //  int played_sequence_length = sizeof(played_sequence) / sizeof(played_sequence[0]);
  player_input = true;

  if (player_input == true) {
    blue_button_value = digitalRead(buttons[0]);
    yellow_button_value = digitalRead(buttons[1]);
    red_button_value = digitalRead(buttons[2]);
    green_button_value = digitalRead(buttons[3]);

    //keep track of the length:
    int played_sequence_length = sizeof(played_sequence) / sizeof(played_sequence[0]);

    if (played_sequence_length < sequence_length + 1) {
      //if inputted numbers are lesser than expected, keep track.
      if (blue_button_value == HIGH) {
        insert_at_end(played_sequence, &played_sequence_length, blue_button);
        Serial.println("this works"); 
      }
      if (yellow_button_value == HIGH) {
        insert_at_end(played_sequence, &played_sequence_length, yellow_button);
      }
      if (green_button_value == HIGH) {
        insert_at_end(played_sequence, &played_sequence_length, green_button);
      }
      if (blue_button_value == HIGH) {
        insert_at_end(played_sequence, &played_sequence_length, blue_button);
      }
    } else {
      //now evaluate:
      bool win = false;
      for (int i = 0; i < sequence_length; i++) {
        if (played_sequence[i] == seq[i]) {
          //correct answer:
          win = true;
        } else {
          //wrong answer:
          win = false;
        }
      }

      if (win==true){
        // all true: 
        digitalWrite (green_led, HIGH); 
        delay (300); 
        digitalWrite (green_led, LOW); 
      }else{
        //failed.
        digitalWrite (red_led, HIGH); 
        delay (300); 
        digitalWrite (red_led, LOW); 
      }
      player_input = false;  //exit the loop, and start again.
    }
  }
  delay(500);  //small delay before next level.
}

void insert_at_end(int arr[], int *n, int val) {

  // Insert val at last
  arr[*n] = val;

  // Increase the current size
  (*n)++;
}

//for the random sequence, we'll take an old sequence, put random numbers between 0 and 3.
//then, if three concurrent numbers are the same, we'll change both of them. this does not guarantee that the numbers won't repeat, but it's probabalistically rare.

void generate_sequence(int seq[], int sequence_length) {

  //whatever the sequence length was, add 2 to it.
  int new_sequence_length = sequence_length + 2;

  //initialise a new sequence.
  int new_sequence[new_sequence_length];

  //assign a random pattern of indices to the new sequence:
  for (int i = 0; i < new_sequence_length; i++) {
    //pick a random number between 0 and the number of leds.
    int n = random(0, led_length);
    new_sequence[i] = n;

    //check for three consecutive numbers being the same. while so, keep changing them until they aren't.
    //i can tell that this is not the most efficient way to do this. but, it's fine.
    //enter the loop only if new_sequence>3 elements.
    if (new_sequence_length > 3) {
      // while (new_sequence[i] == new_sequence[i - 1] == new_sequence[i + 1]) {
      while (new_sequence[i] == new_sequence[i - 1] && new_sequence[i] == new_sequence[i - 2]) {

        int n_minus_one = random(0, led_length);
        int n_minus_two = random(0, led_length);

        new_sequence[i - 1] = n_minus_one;
        new_sequence[i - 2] = n_minus_two;
      }
    }
    //else in both cases:

    //push the new numbers into the old array.
    seq[i] = new_sequence[i];
  }
}

//christina's suggestion, but i decided against using it / wasn't able to implement it well .
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

i spent a long time on this, but it did not work. i'll book some time with a resident — i know that the problem is just in the code (because i'm not familiar with c syntax). but it's okay. 

i will focus on other things till tuesday. 

---
i couldn't. it kept me up at night. 

[[people/yuxin|yuxin]] helped, by offering to work on it for an hour. she 'vibe-coded', but wrote a piece that i couldn't understand. 

``` cpp
// 3-step RGB memory game (robust input, debug prints)
// Buttons: {2,3,4,5}  -> BLUE, YELLOW, RED, GREEN
// Game LEDs: {21,20,19,18} -> BLUE, YELLOW, RED, GREEN
// Status LEDs: red_led=6 (fail), green_led=17 (success)
// Sequence uses only BLUE(0), RED(2), GREEN(3). Yellow(1) is ignored for input.


const byte buttons[4] = {2, 3, 4, 5};
const byte leds[4]    = {21, 20, 19, 18};
const byte red_led    = 6;
const byte green_led  = 17;


const char* NAMES[4]  = {"BLUE","YELLOW","RED","GREEN"};


const byte SEQ_LEN = 3;
const unsigned long STEP_ON_MS   = 400;
const unsigned long STEP_OFF_MS  = 180;
const unsigned long DEBOUNCE_MS  = 20;    // slightly larger for stability


inline bool isAllowed(byte idx){ return (idx == 0 || idx == 2 || idx == 3); } // BLUE, RED, GREEN


byte seq[SEQ_LEN];
byte user[SEQ_LEN];
byte inputPos = 0;


// Non-blocking edge-detection state (INPUT_PULLUP: idle HIGH, pressed LOW)
bool          armed[4] = {true, true, true, true};  // true = ready to fire on next LOW
int           lastRead[4] = {HIGH, HIGH, HIGH, HIGH};
unsigned long lastT[4] = {0,0,0,0};


enum class Phase { Show, Input, Evaluate };
Phase phase = Phase::Show;


void setup() {
 Serial.begin(115200);
 #if defined(ARDUINO_ARCH_SAMD) || defined(USBCON)
   unsigned long t0 = millis(); while (!Serial && millis()-t0 < 1500) {} // brief wait on native-USB boards
 #endif


 for (byte i=0;i<4;i++){
   pinMode(buttons[i], INPUT_PULLUP);  // wire each button to GND
   pinMode(leds[i], OUTPUT);
   digitalWrite(leds[i], LOW);
   lastRead[i] = digitalRead(buttons[i]); // initialize debouncer baseline
 }


 pinMode(red_led, OUTPUT);   digitalWrite(red_led, LOW);
 pinMode(green_led, OUTPUT); digitalWrite(green_led, LOW);


 randomSeed(analogRead(A0) ^ micros());


 makeNewSequence();          // create the first round's sequence
}


void loop() {
 switch (phase) {
   case Phase::Show: {
     printSequence();
     playSequence();
     prepInputState();       // <-- critical: prevents phantom first press
     inputPos = 0;
     phase = Phase::Input;
   } break;


   case Phase::Input: {
     int p = readPressEventNonBlocking();       // -1 or 0..3
     if (p >= 0) {
       if (isAllowed((byte)p)) {
         user[inputPos] = (byte)p;
         Serial.print("DEBUG: Press #"); Serial.print(inputPos+1);
         Serial.print(" = "); Serial.println(NAMES[user[inputPos]]);
         inputPos++;
       } else {
         Serial.println("DEBUG: Ignored YELLOW press.");
       }
     }
     if (inputPos >= SEQ_LEN) {
       phase = Phase::Evaluate;
     }
   } break;


   case Phase::Evaluate: {
     // Compare
     bool ok = true;
     for (byte i=0;i<SEQ_LEN;i++){
       if (user[i] != seq[i]) { ok = false; break; }
     }


     Serial.print("Your input: [");
     for (byte i=0;i<SEQ_LEN;i++){ Serial.print(NAMES[user[i]]); if (i<SEQ_LEN-1) Serial.print(", "); }
     Serial.println("]");


     if (ok) {
       Serial.println("RESULT: CORRECT");
       digitalWrite(green_led, HIGH); delay(450); digitalWrite(green_led, LOW);
     } else {
       Serial.println("RESULT: WRONG");
       digitalWrite(red_led, HIGH);   delay(450); digitalWrite(red_led, LOW);
     }


     // Only AFTER comparing, build the next round's sequence
     makeNewSequence();
     phase = Phase::Show;
   } break;
 }
}


/* ----------------- Helpers ----------------- */


void makeNewSequence(){
 for (byte i=0;i<SEQ_LEN;i++){
   byte pick;
   do { pick = (byte)random(0,4); } while (!isAllowed(pick));
   seq[i] = pick;
 }
}


void printSequence(){
 Serial.println();
 Serial.print("Sequence idx: [");
 for (byte i=0;i<SEQ_LEN;i++){ Serial.print(seq[i]); if(i<SEQ_LEN-1) Serial.print(", "); }
 Serial.println("]");
 Serial.print("Sequence colors: [");
 for (byte i=0;i<SEQ_LEN;i++){ Serial.print(NAMES[seq[i]]); if(i<SEQ_LEN-1) Serial.print(", "); }
 Serial.println("]");
}


void playSequence(){
 delay(250);
 for (byte i=0;i<SEQ_LEN;i++){
   byte idx = seq[i];
   digitalWrite(leds[idx], HIGH); delay(STEP_ON_MS);
   digitalWrite(leds[idx], LOW);  delay(STEP_OFF_MS);
 }
}


void prepInputState(){
 // Re-sync debouncer and arm only released keys to prevent phantom press
 unsigned long now = millis();
 for (byte i=0;i<4;i++){
   int r = digitalRead(buttons[i]);
   lastRead[i] = r;
   lastT[i]    = now;
   armed[i]    = (r == HIGH);      // only keys that are released can fire next
   digitalWrite(leds[i], LOW);     // ensure game LEDs are off at input start
 }
 // Optional: print starting states
 Serial.print("DEBUG start states: ");
 for (byte i=0;i<4;i++){
   Serial.print("D"); Serial.print(buttons[i]); Serial.print("=");
   Serial.print(digitalRead(buttons[i])==LOW ? "LOW " : "HIGH ");
 }
 Serial.println();
 delay(30); // tiny settle time
}


// Non-blocking, debounced press event detector with per-button arming.
// Returns -1 if none; else 0..3 on a new press. Mirrors the pressed LED while held.
int readPressEventNonBlocking() {
 unsigned long now = millis();
 int fired = -1;


 for (byte i=0;i<4;i++){
   int raw = digitalRead(buttons[i]);


   // Debounce: note time of last change
   if (raw != lastRead[i]) { lastRead[i] = raw; lastT[i] = now; }


   bool stableLow  = (raw == LOW)  && (now - lastT[i] > DEBOUNCE_MS);
   bool stableHigh = (raw == HIGH) && (now - lastT[i] > DEBOUNCE_MS);


   // Visual: light the matching LED while held (non-blocking)
   digitalWrite(leds[i], stableLow ? HIGH : LOW);


   // Fire once when LOW and armed
   if (stableLow && armed[i]) {
     armed[i] = false;
     fired = i; // report this press (don’t break; we finish LED updates)
   }


   // Re-arm when fully released
   if (stableHigh && !armed[i]) {
     armed[i] = true;
   }
 }
 return fired;
}

```

i decided fine. despite my hatred for ai, let me not be averse and *try*. 

i gave it this prompt: 

```
no, something's not right,. the programmatic flow is very simple: when it turns on for the first time, light up (and shut) all the leds one after the other (except red and green of course) with a delay of 500ms. then generate a sequence. play that sequence out. each led turns on for 300ms, and then turns off. when the sequence is completed, all leds should be off (because only one led, as part of the sequence, turns on during the moment in the sequence). then, wait for player input. when player has inputted the required number (length of sequence), evaluate whether it was right or wrong. if it was wrong, light the red led for 500ms. generate another seqeunce of the same length (say, 4 in this case). if it was right, light the green led for the same duration. then turn it off, and generate a new sequence of n+2 items (say 6 leds). then play them out. repeat.
```

after rounds of back & forth, it produced this: 

![[z_images/IMG_6247.mov]]

this example is handy for my [[case against ai]]. it just doesn't get the intricacy right — maybe it gets 75% right, but why is that good enough? 

---

i booked an appointment with a human ([[people/lucia|lucia]]), and i will work with her to fix *my* code, and not machine-generated cacophony (yes it did many things right, but it made space for many tiny things to go wrong). 

---
### 250915_1416: 
[[people/lucia|lucia]] was patient with me, and helped me debug a lot of the code; line by line. i understood how to debug in complex programs like these, and to always build complexity incrementally. i think [[people/yuxin|yuxin]] also taught me this. 

lucia also helped me rising detection and falling detection. 

![[z_images/IMG_6255.jpg]]

basically, for a button-press you don't need to *only* see whether the output is high, but compare it to its previous state (and you want that to be low). a function executed on button-press is only meant to execute when `current_button_value = HIGH`, and `previous_button_value = LOW`

here's the code for now: 

``` cpp
// memory-game; september, 2025.

// the idea is to play a sequence through a program. the person is supposed to replicate the sequence. if they fail to do so accurately, they lose. else, they win.
// i might add sound too.

// i have buttons & led-s to manipulate, and a program to keep track of them.

int buttons[] = { 2, 3, 4, 5 };   //pin-numbers of buttons.
int leds[] = { 21, 20, 19, 18 };  //pin-numbers of leds.

int led_length = 4;  //number of leds.

//readable name variables, that point to buttons[].
int blue_button = buttons[0];
int yellow_button = buttons[1];
int red_button = buttons[2];
int green_button = buttons[3];

//values to keep track of current button values.
int blue_button_value, yellow_button_value, red_button_value, green_button_value;

//variables to keep track of previous values (we need this to understand when the button when from low to high, otherwise there are multiple values for each high-press).
int prev_blue_button_value = 0;
int prev_yellow_button_value = 0;
int prev_red_button_value = 0;
int prev_green_button_value = 0;

//readable name variables, that point to leds[].
int led_1 = leds[0];
int led_2 = leds[1];
int led_3 = leds[2];
int led_4 = leds[3];

//separate leds for correct / incorrect signifiers.
int red_led = 6;
int green_led = 17;

//base sequence, and the array that will keep track of the sequence.
int seq[] = { 0, 1, 2, 3 };

int played_sequence[50];              //an array to keep track of what a person enters. the max this game goes up to is 50.
int max_played_sequence_length = 50;  //variable to keep track of the length of the max_played_length.

int played_sequence_length = 0;  //variable to keep track of the actual length of played sequence, to mainpulate stages in the game.

bool player_input_expected = false;  //boolean to keep track of when a person is supposed to input value.

void setup() {
  Serial.begin(9600);  // start serial communication at 9600 baud rate. don't know what that is yet.

  //set input / output for pinModes:
  for (int i = 0; i < led_length; i++) {  //christina: i have to use a number here, because c++ is a lower level language.
    pinMode(buttons[i], INPUT);
    pinMode(leds[i], OUTPUT);
  };

  check();  //always perform a check when the program starts, which just lights up the leds.
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

//this is the game:
void loop() {
  //calculate the size of the sequence array:
  int sequence_length = sizeof(seq) / sizeof(seq[0]);

  if (player_input_expected == false) {
    //clear played sequence:
    for (int i = 0; i < played_sequence_length; i++) {
      played_sequence[i] = 0;
    }

    //reset played sequence length to 0;
    played_sequence_length = 0;

    //then, generate a random sequence of leds to play out:
    generate_sequence(seq, sequence_length);

    //show the sequence:
    for (int i = 0; i < sequence_length; i++) {
      digitalWrite(leds[seq[i]], HIGH);  //turn on
      delay(500);
      digitalWrite(leds[seq[i]], LOW);  //turn off.
    }
  }
  delay(10);  //arbitrary delay of 10ms.

  player_input_expected = true;  //the person has registered the sequence, and is prepared to input it via buttons.

  if (player_input_expected == true) {
    blue_button_value = digitalRead(buttons[0]);
    yellow_button_value = digitalRead(buttons[1]);
    red_button_value = digitalRead(buttons[2]);
    green_button_value = digitalRead(buttons[3]);

    if (played_sequence_length < sequence_length) {
      //if inputted numbers are lesser than expected, keep track.
      if (blue_button_value == HIGH && prev_blue_button_value == LOW) {
        insert_at_end(played_sequence, blue_button);
        for (int i = 0; i < played_sequence_length; i++) {
          Serial.print(played_sequence[i]);
        }
        Serial.println("");
      } else if (yellow_button_value == HIGH && prev_yellow_button_value == LOW) {
        insert_at_end(played_sequence, yellow_button);
      } else if (green_button_value == HIGH && prev_green_button_value == LOW) {
        insert_at_end(played_sequence, green_button);
      } else if (red_button_value == HIGH && prev_red_button_value == LOW) {
        insert_at_end(played_sequence, red_button);
      }
    } else {
      //means the played sequence is >= sequence_length. now evaluate:
      bool win = false;
      for (int i = 0; i < sequence_length; i++) {
        if (played_sequence[i] == seq[i]) {
          //correct answer:
          win = true;
        } else {
          //wrong answer:
          win = false;
        }
      }

      //print result:
      if (win == true) {
        // all true:
        digitalWrite(green_led, HIGH);
        delay(300);
        digitalWrite(green_led, LOW);
      } else {
        //failed.
        digitalWrite(red_led, HIGH);
        delay(300);
        digitalWrite(red_led, LOW);
      }
      player_input_expected = false;  //exit the loop, and start again.
    }
  }
  prev_blue_button_value = blue_button_value;
  prev_yellow_button_value = yellow_button_value;
  prev_red_button_value = red_button_value;
  prev_green_button_value = green_button_value;
}


// delay(500);  //small delay before next level.


void insert_at_end(int arr[], int val) {

  // insert val at last:
  if (played_sequence_length < max_played_sequence_length) {
    arr[played_sequence_length] = val;
  }
  played_sequence_length++;
}

//for the random sequence, we'll take an old sequence, put random numbers between 0 and 3.
//then, if three concurrent numbers are the same, we'll change both of them. this does not guarantee that the numbers won't repeat, but it's probabalistically rare.

void generate_sequence(int seq[], int sequence_length) {

  //whatever the sequence length was, add 2 to it.
  // int new_sequence_length = sequence_length + 2; //this is not working, because of the way c handles arrays.
  int new_sequence_length = sequence_length;

  //initialise a new sequence.
  // int new_sequence[new_sequence_length];

  //assign a random pattern of indices to the new sequence:
  for (int i = 0; i < new_sequence_length; i++) {
    //pick a random number between 0 and the number of leds.
    int n = random(0, led_length);
    // new_sequence[i] = n;

    //check for three consecutive numbers being the same. while so, keep changing them until they aren't.
    //i can tell that this is not the most efficient way to do this. but, it's fine.
    //enter the loop only if new_sequence>3 elements.
    if (i > 3) {
      // while (new_sequence[i] == new_sequence[i - 1] == new_sequence[i + 1]) {
      while (new_sequence[i] == new_sequence[i - 1] && new_sequence[i] == new_sequence[i - 2]) {

        int n_minus_one = random(0, led_length);
        int n_minus_two = random(0, led_length);

        new_sequence[i - 1] = n_minus_one;
        new_sequence[i - 2] = n_minus_two;
      }
    }
    //else in both cases:

    //push the new numbers into the old array.
    seq[i] = n;
  }
}

//christina's suggestion, but i decided against using it / wasn't able to implement it well .
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

i still need to figure out why the yellow button on my breadboard doesn't work (my guess is that it's on the bad row of my breadboard), why the success & error led-s aren't working, and how to increment the sequence to be played by 2. 

i now have to do all the other work that has piled up because of my p-comp obsession. 

---

i also realised this week that <mark>helping other people debug soldifies my understanding</mark> of the medium. this same line of thought carries forward in teaching too. perhaps this is why [[people/tom igoe|tom igoe]] still teaches intro-to-physical-computing. and maybe because he loves it too. 

had a question about dead batteries. <mark>if i pass electricity through them, (a) do they conduct, and (b) will they explode? what do batteries do, really?</mark>

