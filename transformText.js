/*
	Each letter is drawed as a NxN block. For example, in a 5-bits 
  representantion each row is represented as a 5-bits binary number,
  where:
		a 0 is a non-active "pixel"
		a 1 is an active "pixel"
    
	For example, an "A" is drawed as:
		16 8  4  2  1
		0	 0	1	 0	0	= 4	  //	··■··
		0	 1	0	 1	0	= 10	//	·■·■·
		1	 0	0	 0	1	= 17	//	■···■
		1	 1	1	 1	1	= 31	//	■■■■■
		1	 0	0	 0	1	= 17	//	■···■
*/
var abc5x5 = {
	a:[4,10,17,31,17],
  "á":[4,10,17,31,17],
  b:[30,17,31,17,31],
  c:[31,16,16,16,31],
  d:[30,17,17,17,30],
  e:[31,16,28,16,31],
  "é":[31,16,28,16,31],
  f:[31,16,28,16,16],
  g:[31,16,19,17,31],
  h:[17,17,31,17,17],
  i:[31,4,4,4,31],
  "í":[31,4,4,4,31],
  j:[3,1,25,17,30],
  k:[17,18,28,18,17],
  l:[16,16,16,16,31],
  m:[27,21,21,17,17],
  n:[25,21,21,21,19],
  "ñ":[31,0,31,17,17],
  o:[31,17,17,17,31],
  "ó":[31,17,17,17,31],
  p:[31,17,31,16,16],
  q:[31,17,21,18,29],
  r:[31,17,31,18,17],
  s:[31,16,31,1,31],
  t:[31,4,4,4,4],
  u:[17,17,17,17,31],
  "ü":[17,17,17,17,31],
  "ú":[17,17,17,17,31],
	v:[17,17,10,10,4],
  w:[17,17,21,21,27],
  x:[17,10,4,10,17],
  y:[17,10,4,4,4],
  z:[31,2,4,8,31],
  0:[12,17,21,17,12],
  1:[1,3,5,1,1],
  2:[14,1,14,16,31],
  3:[14,1,7,1,31],
  4:[17,17,31,1,1],
  5:[31,16,31,1,30],
  6:[15,16,31,17,31],
  7:[31,1,2,4,4],
  8:[14,17,14,17,14],
  9:[14,17,15,1,30],
  "-":[0,0,31,0,0],
  "=":[0,31,0,31,0],
  "+":[4,4,31,4,4],
  "*":[21,4,31,4,21],
  "?":[31,1,7,0,4],
  "!":[6,6,6,0,6],
  "(":[3,6,6,6,3],
  "[":[7,6,6,6,7],
  "]":[28,12,12,12,28],
  ")":[24,12,12,12,24],
  "<":[1,2,4,2,1],
  ">":[16,8,4,8,16],
  "&":[28,20,30,18,31],
  ".":[0,0,0,3,3],
  ",":[0,0,3,3,6],
  ";":[3,0,3,3,6],
  ":":[3,3,0,3,3],
  "/":[1,2,4,8,16],
  "\\":[16,8,4,2,1],
	" ":[0,0,0,0,0]
};

var transformText = function(abc){
	var blockLength;

	/*
		Each converted word is stored here (case-sensitive) and converted only once.
	*/
	var dictionaryEntries = {};
	
	/*
		Check if every entry in abc array conversion has the same length.
	*/
	function getLengthBlock(){
		var checkBlockSize = new Set();
		Object.keys(abc).map(x=>abc[x].length).map(x=>checkBlockSize.add(x));
		return (checkBlockSize.size===1)?[...checkBlockSize][0]:-1;
	}
	
	/*
		If word was previously converted. If don't, transform it
	*/
	function checkWord(word, raw){
		if ((word == null) || (word === "")){
			return false;
		} else if (dictionaryEntries[word] == null) {
			transformWord(word, raw);
			return true;
		} else {
			return true;
		}
	}

	/*
		Apply the conversion for each letter from the word
	*/
	function transformWord(word, raw){
		dictionaryEntries[word] = [];
		word.split("").map(eachLetterFromWord => dictionaryEntries[word].push(transformLetter(eachLetterFromWord, raw)));

	}

	/*
		Look for a letter in the abc array conversion
	*/
	function lookforLetter(letter){
		if (abc[letter] != null){
			return letter;
		} else if (abc[letter.toLowerCase()] != null){
			return letter.toLowerCase();
		} else if (abc[letter.toUpperCase()] != null){
			return letter.toUpperCase();
		} else {
			return " ";
		}
	}

	/*
		Translate the "Array(N) of numbers" of each letter from Word into an "Array(N) of 0's & 1's strings"
	*/
	function transformLetter(letter, raw){
		var block=[];

		abc[lookforLetter(letter)].map(eachRowFromLetter => block.push(eachRowFromLetter.toString(2).padStart(5, "0")));

		if (!raw){
			block = block.map(eachRowFromLetter => eachRowFromLetter.replace(/0/g, " ").replace(/1/g, letter));
		}
		return block;
	}

	/*
		Each full word must be printed on a "single" line ("J A V A" instead of "J\nA\nV\nA")
	*/
	function printWord(word){
		var writer = [];
		for (line=0; line<blockLength; line++){
			for (letters = 0; letters<dictionaryEntries[word].length; letters++){
				writer.push(dictionaryEntries[word][letters][line]);
				writer.push("\t");
			}
			writer.push("\n");
		}
		return writer.join("");
	}

	function empty(){
		dictionaryEntries = {};
		return true;
	}

	function asciiArt(arguments){
		blockLength = blockLength || getLengthBlock();
		if (arguments != null){
			switch (arguments.length) {
				case 0:
					var writer = [];
					Object.keys(dictionaryEntries).forEach(function(key){
						writer.push(printWord(key));
						writer.push("\n\n");
					});
					return writer.join("");
					break;
				case 1:
					if (checkWord(arguments[0], false)) {
						return printWord(arguments[0]);
					}
					break;
				case 2:
          var printInRAW = ((arguments[1] != null) && (arguments[1] === true))?true:false;
          
					if (checkWord(arguments[0], printInRAW)) {
						return printWord(arguments[0]);
					}
					break;
				default:
					return "transformText is an ASCII art tool just for testing developed by heroma labs\n"+
						"\tIt has 2 methods avalaible reset(<<no argumnets>>) to clean the words transformed previously and toString():\n"+
					 	"\t\t0 arguments prints all words transformed previously\n"+
					 	"\t\t1 argument is interpreted as a word and it is transformed to a NxN block of white-spaces for 0's & the original letter for 1's\n"+
					 	"\t\t2 arguments as same as 1 argument but 2nd one if has a true value the NxN block is returned with 0's & 1's\n"+
					 	"\t\t+ arguments print this message\n\n";
			}
		}
	}

	return{
		reset: function(){
			 empty();
		},
		toString : function (){
			return asciiArt(arguments)
		}
	}
}(abc5x5);
