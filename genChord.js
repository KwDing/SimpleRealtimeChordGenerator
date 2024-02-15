inlets = 3;
outlets = 6;
setinletassist(0,"give msg: previousRT, (C = 0 by default), majorScale(>0) or not");
setinletassist(1,"key");
setinletassist(2,"set scale: major 1, minor 0");
setoutletassist(0,"New root, key, major(1) or minor(0)");
setoutletassist(2,"rt note");
setoutletassist(2,"2nd note");
setoutletassist(3,"3rd note");
setoutletassist(4,"4th note");
setoutletassist(5,"chord in list");
output = new Array(3);
var major = [0, 2, 4, 5, 7, 9, 11];
var minor = [0, 2, 3, 5, 7, 10, 11];
var indexInScale = [0,0,1,2,2,3,3,4,5,5,5,6];
var oct = 4;
var majorproblist = [[1,0,1,0,1,1,0,1,0,1,0,1],[1,0,1,0,0,0,0,0,0,0,0,0],
[1,0,1,0,2,2,0,9,0,0,0,1],[3,0,1,0,1,1,0,2,0,0,0,0],
[1,0,1,0,1,8,0,1,0,5,0,0],
[1,0,5,0,1,1,0,5,0,0,0,1],[0,0,1,0,1,1,0,1,0,0,0,0],
[6,0,0,0,5,1,0,1,0,6,0,1],[7,0,0,0,0,1,0,1,0,1,0,0],
[1,0,6,0,3,6,0,3,0,1,0,0],[1,0,0,0,0,1,0,0,0,1,0,0],
[1,0,0,0,0,0,0,1,0,0,0,0]];
var maj = true, key = 0;
var minorproblist = [[1,0,1,1,0,1,0,1,1,1,0,1],//1
[1,0,1,0,0,0,0,0,0,0,0,0],
[1,0,1,0,2,2,0,10,0,0,0,1],//2
[1,0,1,1,0,1,0,1,2,0,0,1],//b3
[1,0,0,1,0,1,0,0,0,0,0,0],
[1,0,3,1,0,1,0,5,3,0,0,1],//4
[0,0,0,1,0,1,0,1,0,1,0,0],
[1,0,0,1,0,1,0,0,0,0,0,1],//5
[1,0,6,2,0,6,0,1,0,0,0,0],//b6
[1,0,0,0,0,0,0,1,2,0,0,0],
[1,0,0,2,0,1,0,0,1,0,0,1],
[1,0,0,0,0,0,0,1,0,0,0,0]];



function list(){
//	a = (arrayfromargs("",arguments));
	var len = arguments.length;
	var pre = arguments[0], key = 0;
	var cur = pre;

	if (len > 1) {key = arguments[1];}
	if (len > 2){	
		maj = (arguments[2] >0);
	}
	var rt0 = parseInt( (pre - key) % 12 );
	if(maj){
		prob = majorproblist[rt0];
	}else{
		prob = minorproblist[rt0];
	}

	var cumprob = cumulativeProb(prob);
	rt1 = findnote(cumprob);
	cur = rt1 + oct*12 + key;
	chord_notes = getchord(cur,maj,key,0);
	output[1] = key;
	output[0] = cur;
	output[2] = maj;
	
	outlet(0,output);
	outlet(1,chord_notes[0]);
	outlet(2,chord_notes[1]);
	outlet(3,chord_notes[2]);
	outlet(4,chord_notes[3]);
	outlet(5,chord_notes);
}
function cumulativeProb(arr){
	var length = arr.length;
	var cumsum = new Array(length);
	var sum = 0;
	for(i = 0; i < length; i++){
		sum += arr[i];
		cumsum[i] = sum;
	}
	for(i = 0; i < length; i++){
		cumsum[i] /= sum;
	}
	return cumsum;
}
function findnote(arr1){
	var	l = arr1.length;
	p = Math.random();
	for(i = 0; i < l;i++){
		if(p < arr1[i]){return i;}
	}
	return(l-1);
}

function getchord(cur,is_maj,key,rtPos){
	c = cur - key;
	octave = parseInt(c / 12);
	posInScale = indexInScale[parseInt(c % 12)];
	var notes = [cur, cur, cur, cur];
	if(is_maj){scale = major;}
	else{scale = minor;}
	var order = [2,4,6];
	order = shuffleArray(order);
	for(i = 1; i < 4; i++){
		diff = (order[i] - order[i-1]+7) % 7;
		posInScale += diff;
		if(posInScale > 6){
			octave += 1;
			posInScale -= 7;
		}
		notes[i] = octave * 12 + scale[posInScale] + key;
	}
	return notes;
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	var newArray = array.slice();
	newArray.unshift(0)
	return newArray;
}