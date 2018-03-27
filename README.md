# ascii-art
An ASCII art tool developed in Javascript.

## transformText.js
This Javascript module can transform ascii char into blocks of any square-size. It publish two methods:
  - reset() to erase the previously converted words
  - toString() to print words converted to ascii-art:
    + with 0 arguments, prints the full list of previously converted words
    + with 1 argument, it is interpreted as a word and it is transformed to a NxN block of white-space chars for 0's & the original letter for 1's
    + with 2 arguments, as same as 1 argument but the 2nd one if it is true show the NxN block as a sequence of 0's & 1's to apply custom modifications
    + with + arguments, print the "help"

For example:
```javascript
> transformText.toString("java", true);
00011	00100	10001	00100	
00001	01010	10001	01010	
11001	10001	01010	10001	
10001	11111	01010	11111	
11110	10001	00100	10001	

> transformText.toString("Galiza!");
GGGGG	  a  	l    	iiiii	zzzzz	  a  	  !! 	
G    	 a a 	l    	  i  	   z 	 a a 	  !! 	
G  GG	a   a	l    	  i  	  z  	a   a	  !! 	
G   G	aaaaa	l    	  i  	 z   	aaaaa	     	
GGGGG	a   a	lllll	iiiii	zzzzz	a   a	  !! 	

```
In this case, the conversion object called "abc5x5" was defined to represent each letter as a block of size 5x5, where:
  - a 0 is a non-active "pixel"
  - a 1 is an active "pixel"

For example, an "A" is drawed as:
```
		16 08 04 02 01 (decimal value of 2^4, 2^3, 2^2, 2^1, 2^0)
		0  0  1  0  0	= 4    //  ··■··
		0  1  0  1  0	= 10   //  ·■·■·
		1  0  0  0  1	= 17   //  ■···■
		1  1  1  1  1	= 31   //  ■■■■■
		1  0  0  0  1	= 17   //  ■···■
```
So, the a-letter is defined as an array of integer numbers `[4,10,17,31,17]`;

From here, my best regards for you!
