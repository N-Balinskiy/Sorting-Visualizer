let barsItems = [];
const def = "#fd0081", change = "#431f91", finished = "#8ef511", selected = "yellow";

window.onload = setup();
async function setup() {
	let bars = document.getElementById("bars");
	let delay = document.getElementById("delay");
	document.getElementById("b").innerText = bars.value;
	document.getElementById("d").innerText = delay.value + "ms";

	if (bars.length !== parseInt(bars.value)) {
		generateBars(parseInt(bars.value));
	}
}

function disableInput() {
	let inputs = document.getElementsByTagName("input");
	for (let i = 0; i < inputs.length; i++)
		inputs[i].disabled = true;
	return parseInt(document.getElementById("delay").value);
}


function finishedSorting() {
	let bars = document.getElementsByClassName("bar");
	for (let i = 0; i < bars.length; i++)
		bars[i].style.backgroundColor = finished;
	let inputs = document.getElementsByTagName("input");
	for (let i = 0; i < inputs.length; i++)
		inputs[i].disabled = false;

}


function generateBars(arraySize) {
	barsItems = [];
	for (let i = 0; i < arraySize; i++) {
		barsItems.push('<div class="bar" id="' + i + '" style="height:' + Math.floor(2 + Math.random() * 98) + '%"></div>');
	}
	document.getElementById("container").innerHTML = barsItems.join('');
}


function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
//=============================== Sorting Algorithms ==================================//

// BUBBLE SORT

// bubbleSort() : Implementation of bubble sort algorithm. O(n^2)
async function bubbleSort() {
	let delay = disableInput();
	let container = document.getElementById("container");

	for (let i = 0; i < barsItems.length - 1; i++) {
		let has_swap = false;
		for (let j = 0; j < barsItems.length - i - 1; j++) {
			let currentId = barsItems[j].split('id="')[1].split('"')[0];
			let nxt_ele = barsItems[j + 1].split('id="')[1].split('"')[0];

			document.getElementById(currentId).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = change;
			await Sleep(delay / 2);
			let a = parseInt(barsItems[j].split(/[:%]/)[1]);
			let b = parseInt(barsItems[j + 1].split(/[:%]/)[1]);
			if (a > b) {
				has_swap = true;

				let t = barsItems[j]; // add current bars to temporary variable
				barsItems[j] = barsItems[j + 1]; // here we change bars position if they stay incorrect
				barsItems[j + 1] = t; // place higher number to the next element

				container.innerHTML = barsItems.join('');
			}
			document.getElementById(currentId).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = change;
			await Sleep(delay / 2.0);
			document.getElementById(currentId).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		if (has_swap === false) break;
	}
	finishedSorting();
}

// INSERTION SORT

// insertionSort() : Implementation of insertion sort algorithm. O(n^2)
async function insertionSort() {
	let delay = disableInput();
	let container = document.getElementById("container");
	for (let i = 1; i < barsItems.length; i++) {
		let j = i - 1; // get previous i index
		let key = barsItems[i]; // value by i index in barsItems array
		let currentId = key.split('id="')[1].split('"')[0];
		let nextElement = barsItems[j].split('id="')[1].split('"')[0];
		document.getElementById(currentId).style.backgroundColor = selected;
		while (j >= 0 && parseInt(barsItems[j].split(/[:%]/)[1]) > parseInt(key.split(/[:%]/)[1])) { // while
			document.getElementById(nextElement).style.backgroundColor = def;
			nextElement = barsItems[j].split('id="')[1].split('"')[0];
			document.getElementById(nextElement).style.backgroundColor = change;
			await Sleep(delay);
			barsItems[j + 1] = barsItems[j];
			j--;
		}

		barsItems[j + 1] = key;
		container.innerHTML = barsItems.join('');
		document.getElementById(currentId).style.backgroundColor = selected;
		document.getElementById(nextElement).style.backgroundColor = change;
		await Sleep(delay * 3.0 / 5);
		document.getElementById(currentId).style.backgroundColor = def;
		document.getElementById(nextElement).style.backgroundColor = def;
	}
	finishedSorting();
}

// MERGE SORT
// Slide_down() : Places bars[r] at lth position by sliding other bars to the right. 
function Slide_down(leftIndex, rightIndex) {
	let temp = barsItems[rightIndex];
	for (let i = rightIndex - 1; i >= leftIndex; i--) {
		barsItems[i + 1] = barsItems[i];
	}
	barsItems[leftIndex] = temp;
}


async function merge(length, middleIndex, range, delay) {
	let leftIndex = length;
	let rightIndex = middleIndex + 1;

	while (leftIndex <= rightIndex && rightIndex <= range) { // sorting until leftArray doesn't get to the middleIndex and until rightArray doesn't get to the end of array
		let leftElement = barsItems[rightIndex].split('id="')[1].split('"')[0];
		let rightElement = barsItems[leftIndex].split('id="')[1].split('"')[0];
		document.getElementById(leftElement).style.backgroundColor = selected;
		document.getElementById(rightElement).style.backgroundColor = change;
		let a = parseInt(barsItems[rightIndex].split(/[:%]/)[1]);
		let b = parseInt(barsItems[leftIndex].split(/[:%]/)[1]);

		if (a > b) leftIndex++;
		else {
			Slide_down(leftIndex, rightIndex);
			leftIndex++; rightIndex++;
		}
		await Sleep(delay / 2.0);
		container.innerHTML = barsItems.join('');
		document.getElementById(leftElement).style.backgroundColor = selected;
		document.getElementById(rightElement).style.backgroundColor = change;
		await Sleep(delay / 2.0);
		document.getElementById(leftElement).style.backgroundColor = def;
		document.getElementById(rightElement).style.backgroundColor = def;
	}
}





async function mergeSort(length, range, delay) {
	// in this recursive function on every call we slice arrays on 2 half and when we sliced all items from array we merge these elements to one main array

	if (length < range) { // recursive calls this functions, until we don't get all items from array
		let middleIndex = parseInt(length + (range - length) / 2); // get middleIndex of array
		await mergeSort(length, middleIndex, delay); // sort first half of array
		await mergeSort(middleIndex + 1, range, delay); // sorting second half of array
		await merge(length, middleIndex, range, delay); // merging parts of array
	}
}


async function MergeSort() {
	let delay = disableInput();
	await mergeSort(0, barsItems.length - 1, delay);
	finishedSorting();
}