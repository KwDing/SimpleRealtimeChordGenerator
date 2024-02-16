## Overview
This is a Max patch that generates arpeggiated seventh chords.

## Results
An Example Video of the patch is as follows: 


https://github.com/KwDing/SimpleRealtimeChordGenerator/assets/71970518/718456ab-4ffa-47dc-85fb-c0d48cf83bdd


## Techniques
### I. Midi note generation
This patch uses javascript functions and takes 3 inputs:
- the previous chord root note, 
- the key
- the scale(major/minor) 
Then it converts the note to scale degree and randomly choose the next scale degree based on a predefined probability chart. After that it defines the bass note as the root note, and then randomly spread spread the 3rd, 5th, and 7th note under the voice spacing restrictions (in SATB voice leading, interval of adjacent notes should be smaller than an octave). 

### II. Audio output
1. Part of the audio takes the output of the previous midi-generator, and outputs piano sound by loading the sfz file with [sfizz~]. [sfizz~] is compatible in Max 8.6.0 and later. For previous incompatible versions, users can load a virtual instruments with [vst~].

2. The other part of the audio is a pad generated with subtractive synthesis technique. It uses sawtooth waves and lowpass filters, envelope, and reverb to make smooth pad sound. This pad allows control over reverberation, envelop, and detuning.
