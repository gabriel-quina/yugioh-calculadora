
const points = 50;

const turns = [12,8,0,-8,-12];
const atk = [4,2,0,-2,-4];
const def = [0,-10,-20,-30,-40];
const facedown = [0,-2,-4,-6,-8];
const fusion = [4,0,-4,-8,-12];
const equip = [4,0,-4,-8,-12];
const pure = [2,-4,-8,-12,-16];
const trap = [2,-8,-16,-24,-32];
const cards = [15,12,0,-5,-7];
const lp = [6,4,0,-5,-7];

const win = [2,-40,40,0];

var winCondition = 3;

const showResult = document.getElementById('result');

/* RANK:
					TECH 				|					POW
	S		A		B		C		D		D		C		B		A		S
	<9		10-19	20-29	30-39	40-49	50-59	60-69	70-79	80-89	90<
	
*/

const rankPow = ["<span>S<span>Rank</span></span><p class='red'>POW</p>","<span>A<span>Rank</span></span><p class='red'>POW</p>","<span>B<span>Rank</span></span><p class='red'>POW</p>","<span>C<span>Rank</span></span><p class='red'>POW</p>","<span>D<span>Rank</span></span><p class='red'>POW</p>"];
const rankTech = ["<span>S<span>Rank</span></span><p class='blue'>TECH</p>","<span>A<span>Rank</span></span><p class='blue'>TECH</p>","<span>B<span>Rank</span></span><p class='blue'>TECH</p>","<span>C<span>Rank</span></span><p class='blue'>TECH</p>","<span>D<span>Rank</span></span><p class='blue'>TECH</p>"];

const sectionsList = document.getElementsByClassName('sections');

function buttons(){
	for (const sections of sectionsList){
		var buttons = sections.querySelectorAll('button');
		const minusBtn = buttons[0];
		const plusBtn = buttons[1];
		minusBtn.disabled = true;
		minusBtn.addEventListener('click', () => {
			var getParent = minusBtn.parentElement;
			if (getParent.id === "lp" ){
				getParent = getParent.getElementsByTagName('select')[0];
				if (getParent.selectedIndex != 0){					
					-- getParent.selectedIndex;
				};
				if (getParent.selectedIndex === 0){
					minusBtn.disabled = true;
				};
				if (getParent.selectedIndex != 4){
					plusBtn.disabled = false;
				};
			} else {
			getParent = getParent.querySelector('input');
			var tempValue = Number(getParent.value);
			tempValue = tempValue - 1;			
			getParent.value = String(tempValue);
				if (tempValue === 0){					
					minusBtn.disabled = true;
				};
				if (tempValue != 40){					
					plusBtn.disabled = false;
				};
			};
			updateRank();
		});
		plusBtn.addEventListener('click', () => {
			var getParent = plusBtn.parentElement;
			if (getParent.id === "lp" ){
				getParent = getParent.getElementsByTagName('select')[0];
				if (getParent.selectedIndex < 4){					
					++ getParent.selectedIndex;
				};
				if (getParent.selectedIndex === 4){
					plusBtn.disabled = true;
				};
				if (getParent.selectedIndex != 0){
					minusBtn.disabled = false;
				};				
			} else {
			getParent = getParent.querySelector('input');
			var tempValue = Number(getParent.value);
			tempValue = tempValue + 1;			
			getParent.value = String(tempValue);
				if (tempValue === 40){					
					plusBtn.disabled = true;
				};
				if (tempValue != 0){					
					minusBtn.disabled = false;
				};
			};
			updateRank();
		});
		const resetBtn = document.getElementById('resetBtn');
		resetBtn.addEventListener('click', () => {
			winCondition = 3;
			minusBtn.disabled = true;
			plusBtn.disabled= false;
			if (sections.id === "lp" ){
				var getParent = sections.getElementsByTagName('select')[0];
				getParent.selectedIndex = 0;
			} else {
			var getParent = sections.querySelector('input');
			var tempValue = Number(getParent.value);
			tempValue = 0;			
			getParent.value = String(tempValue);
			};
			updateRank();
		});
	};
	
	buttons = document.getElementById('victory-condition');
	buttons = buttons.querySelectorAll('button');
	totalBtn = buttons[0];
	outBtn = buttons[1];
	exBtn = buttons[2];
	
	totalBtn.addEventListener('click', () => {
		winCondition = 0;
		updateRank();
	});
	outBtn.addEventListener('click', () => {
		winCondition = 1;
		updateRank();
	});
	exBtn.addEventListener('click', () => {
		winCondition = 2;
		updateRank();
	});
};

function updateRank(){
	for (const sections of sectionsList){
		
		if (sections.id === "lp"){
			getValue = sections.querySelector('select');
			getValue = getValue.selectedIndex;
				if (getValue === 0){
					lpIndex = 0;
				} else if (getValue === 1){
					lpIndex = 1;
				} else if (getValue === 2){
					lpIndex = 2;
				} else if (getValue === 3){
					lpIndex = 3;
				} else {
					lpIndex = 4;
				};
		} else {
		
			const inputs = sections.querySelectorAll('input');
			var getValue = inputs[0].value;
			
			const valueArray = ["turnValue","atkValue","defValue","facedownValue","fusionValue","equipValue","pureValue","trapValue","cardsValue","lpValue"];
			var turnsIndex, atkIndex, defIndex, facedownIndex, fusionIndex, equipIndex, pureIndex, trapIndex, cardsIndex, lpIndex;
		
		
			/* Turns:
			0-4	  = +12
			5-8	  = +8
			9-28  = 0
			29-32 = -8
			33+   = -12
			*/
					
			if (inputs[0].id === valueArray[0]){
			//	console.log(valueArray[0]);
				if (getValue < 5){
					turnsIndex = 0;
				} else if (getValue < 9){
					turnsIndex = 1;
				} else if (getValue < 29){
					turnsIndex = 2;
				} else if (getValue < 33){
					turnsIndex = 3;
				} else {
					turnsIndex = 4;
				};
			//	console.log(turns[turnsIndex]);
			};
			
			/* EFF. ATK:
			0-1	  = +4
			2-3	  = +2
			4-9   = 0
			10-19 = -2
			20+   = -4
			*/
	
			if (inputs[0].id === valueArray[1]){
			//	console.log(valueArray[1]);		
				if (getValue < 2){
					atkIndex = 0;
				} else if (getValue < 4){
					atkIndex = 1;
				} else if (getValue < 10){
					atkIndex = 2;
				} else if (getValue < 20){
					atkIndex = 3;
				} else {
					atkIndex = 4;
				};
			//	console.log(atk[atkIndex]);
			};
			
			/* DEF. WINS:
			0-1	  = 0
			2-5	  = -10
			6-9   = -20
			10-14 = -30
			15+   = -40
			*/
	
			if (inputs[0].id === valueArray[2]){
			//	console.log(valueArray[2]);
				if (getValue < 2){
					defIndex = 0;
				} else if (getValue < 6){
					defIndex = 1;
				} else if (getValue < 10){
					defIndex = 2;
				} else if (getValue < 15){
					defIndex = 3;
				} else {
					defIndex = 4;
				};
			//	console.log(def[defIndex]);
			};
			
			/* FACE DOWN:
			0	  = 0
			1-10  = -2
			11-20 = -4
			21-30 = -6
			31+   = -8
			*/
	
			if (inputs[0].id === valueArray[3]){
			//	console.log(valueArray[3]);
				if (getValue < 1){
					facedownIndex = 0;
				} else if (getValue < 11){
					facedownIndex = 1;				
				} else if (getValue < 21){
					facedownIndex = 2;
				} else if (getValue < 31){
					facedownIndex = 3;
				} else {
					facedownIndex = 4;
				};
			//	console.log(facedown[facedownIndex]);			
			};
			
			/* INIT. FUS.:
			0	  = +4
			1-4   = 0
			5-9   = -4
			10-14 = -8
			15+   = -12
			*/
	
			if (inputs[0].id === valueArray[4]){
			//	console.log(valueArray[4]);			
				if (getValue < 1){
					fusionIndex = 0;
				} else if (getValue < 5){
					fusionIndex = 1;
				} else if (getValue < 10){
					fusionIndex = 2;
				} else if (getValue < 15){
					fusionIndex = 3;
				} else {
					fusionIndex = 4;
				};
			//	console.log(fusion[fusionIndex]);
			};
			
			/* EQUIP MAG.:
			0	  = +4
			1-4	  = 0
			5-9   = -4
			10-14 = -8
			15+   = -12
			*/		
	
			if (inputs[0].id === valueArray[5]){
			//	console.log(valueArray[5]);
				if (getValue < 1){
					equipIndex = 0;
				} else if (getValue < 5){
					equipIndex = 1;
				} else if (getValue < 10){
					equipIndex = 2;
				} else if (getValue < 15){
					equipIndex = 3;
				} else {
					equipIndex = 4;
				};
			//	console.log(equip[equipIndex]);
			};
			
			/* PURE MAG:
			0	  = +2
			1-3	  = -4
			4-6   = -8
			7-9   = -12
			10+   = -16	
			*/
	
			if (inputs[0].id === valueArray[6]){
			//	console.log(valueArray[6]);			
				if (getValue < 1){
					pureIndex = 0;
				} else if (getValue < 4){
					pureIndex = 1;
				} else if (getValue < 7){
					pureIndex = 2;
				} else if (getValue < 10){
					pureIndex = 3;
				} else {
					pureIndex = 4;
				};
			//	console.log(pure[pureIndex]);
			};
			
			/* TRAP:
			0	  = +2
			1-2	  = -8
			3-4   = -16
			5-6   = -24
			7+    = -32
			*/
	
			if (inputs[0].id === valueArray[7]){
			//	console.log(valueArray[7]);			
				if (getValue < 1){
					trapIndex = 0;
				} else if (getValue < 3){
					trapIndex = 1;
				} else if (getValue < 5){
					trapIndex = 2;
				} else if (getValue < 7){
					trapIndex = 3;
				} else {
					trapIndex = 4;
				};
			//	console.log(trap[trapIndex]);
			};
		
			/* C. USED:
			0-8	  = +15
			9-12  = +12
			13-32 = 0
			33-36 = -5
			37+   = -7
			*/		
	
			if (inputs[0].id === valueArray[8]){
			//	console.log(valueArray[8]);
				if (getValue < 9){
					cardsIndex = 0;
				} else if (getValue < 13){
					cardsIndex = 1;
				} else if (getValue < 33){
					cardsIndex = 2;
				} else if (getValue < 37){
					cardsIndex = 3;
				} else {
					cardsIndex = 4;
				};
			//	console.log(cards[cardsIndex]);
			};	
		};
	};
	
	result = points + turns[turnsIndex] + atk[atkIndex] + def[defIndex] + facedown[facedownIndex] + fusion[fusionIndex] + equip[equipIndex] + pure[pureIndex] + trap[trapIndex] + cards[cardsIndex] + lp[lpIndex] + win[winCondition];
	
	// console.log(result);
	
	/* RANK:
					TECH 				|					POW
	S		A		B		C		D		D		C		B		A		S
	<9		10-19	20-29	30-39	40-49	50-59	60-69	70-79	80-89	90<
	
	*/
	
	if (result < 10){
			showResult.innerHTML = `${result} ${rankTech[0]}`;
	}	else if (result < 20){
			showResult.innerHTML = `${result} ${rankTech[1]}`;			
	}	else if (result < 30){
			showResult.innerHTML = `${result} ${rankTech[2]}`;			
	}	else if (result < 40){
			showResult.innerHTML = `${result} ${rankTech[3]}`;			
	}	else if (result < 50){
			showResult.innerHTML = `${result} ${rankTech[4]}`;			
	}	else if (result < 60){
			showResult.innerHTML = `${result} ${rankPow[4]}`;			
	}	else if (result < 70){
			showResult.innerHTML = `${result} ${rankPow[3]}`;			
	}	else if (result < 80){
			showResult.innerHTML = `${result} ${rankPow[2]}`;			
	}	else if (result < 90){
			showResult.innerHTML = `${result} ${rankPow[1]}`;			
	}	else {
			showResult.innerHTML = `${result} ${rankPow[0]}`;			
	};
	
	winCondition = 3;

};

buttons();

/* DUMB
const buttonsList = document.getElementsByTagName('button');

for (const buttons of buttonsList){ 
	if (buttons.textContent === "+"){
		buttons.addEventListener('click', () => {
			var getParent = buttons.parentElement;
			getParent = getParent.querySelector('input');
			var tempValue = Number(getParent.value);
			tempValue = tempValue + 1;
			
			getParent.value = String(tempValue);
			updateRank();
		});
	} else if (buttons.textContent === "-"){
		buttons.addEventListener('click', () => {
			var getParent = buttons.parentElement;
			getParent = getParent.querySelector('input');
			var tempValue = Number(getParent.value);
			tempValue = tempValue - 1;
			
			getParent.value = String(tempValue);
			updateRank();
		});
	};
};
*/
//	console.log(buttons.parentElement.id);
//	buttons.addEventListener('click', () => console.log(buttons));

/* OLD
turnValueMinus.addEventListener('click',
function(){
	var tempValue = Number(turnValue.value);
	tempValue = tempValue - 1;
	turnValue.value = String(tempValue);
});
turnValuePlus.addEventListener('click', function(){
	var tempValue = Number(turnValue.value);
	tempValue = tempValue + 1;
	turnValue.value = String(tempValue);
});
*/

/* RULES
Turns:
0-4	  = +12
5-8	  = +8
9-28  = 0
29-32 = -8
33+   = -12

EFF. ATK:
0-1	  = +4
2-3	  = +2
4-9   = 0
10-19 = -2
20+   = -4

DEF. WINS:
0-1	  = 0
2-5	  = -10
6-9   = -20
10-14 = -30
15+   = -40

FACE DOWN:
0	  = 0
1-10  = -2
11-20 = -4
21-30 = -6
31+   = -8

INIT. FUS.:
0	  = +4
1-4   = 0
5-9   = -4
10-14 = -8
15+   = -12

EQUIP MAG.:
0	  = +4
1-4	  = 0
5-9   = -4
10-14 = -8
15+   = -12

PURE MAG:
0	  = +2
1-3	  = -4
4-6   = -8
7-9   = -12
10+   = -16

TRAP:
0	  = +2
1-2	  = -8
3-4   = -16
5-6   = -24
7+    = -32

C. USED:
0-8	  = +15
9-12  = +12
13-32 = 0
33-36 = -5
37+   = -7

REM. LP:
8000      = +6
7999-7000 = +4
6999-1000 = 0
999-100   = -5
99-1      = -7
*/
