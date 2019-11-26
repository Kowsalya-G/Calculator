import React from 'react';
import "./calculatorStyle.css";

const keyboardKeys = [
  {id: "clear", className: 'operator', value: 'C'},
  {id: "backspace", className: 'operator', value: 'CE'},
  {id: "%", className: 'operator', value: '%'},
  {id: "/", className: 'operator', value: '/'},
  {id: "7", className: 'number', value: '7'},
  {id: "8", className: 'number', value: '8'},
  {id: "9", className: 'number', value: '9'},
  {id: "*", className: 'operator', value: '*'},
  {id: "4", className: 'number', value: '4'},
  {id: "5", className: 'number', value: '5'},
  {id: "6", className: 'number', value: '6'},
  {id: "+", className: 'operator', value: '+'},
  {id: "1", className: 'number', value: '1'},
  {id: "2", className: 'number', value: '2'},
  {id: "3", className: 'number', value: '3'},
  {id: "-", className: 'operator', value: '-'},
  {id: "empty", className: 'empty', value: ''},
  {id: "0", className: 'number', value: '0'},
  {id: "empty", className: 'empty', value: ''},
  {id: "=", className: 'operator', value: '='},
];

function Result(){
  return(
    <div id="result">
      <div id="history">
        <p id="history-value"></p>
      </div>
      <div id="output">
        <p id="output-value"></p>
      </div>
    </div>
  );
}

function handleChange(e){
  var element = e.target;
  console.log(element.id)
 
  if(e.target.className==="operator"){
		if(element.id==="clear"){ console.log("clear")
			printOutput("");
			printHistory("");
		}
		else if(element.id==="backspace"){
			var output = reverseNumberFormat(getOutput()).toString();
			if (output){
				output = output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output = getOutput();
			var history = getHistory();
			if(output!==""){
				output=reverseNumberFormat(output);
				history=history+output;
				if(element.id==='='){
					var result = eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+element.id;
					printOutput("");
					printHistory(history);
				}
      }
    }
  }else if(e.target.className==="number"){
    var output = reverseNumberFormat(getOutput());
    output=output+element.id;
    printOutput(output);
  }else{

  }
}

function KeyboardButton(){
  return(
    keyboardKeys.map((item)=>
      <button className={item.className} onClick={handleChange} id={item.id}>{item.value}</button>
    )
  );
}

function Keyboard(){
  return(
    <div id="keyboard">
      <KeyboardButton/>
    </div>
  );
}

function Calculator(){
  return (
    <div id="calculator">
      <Result />
      <Keyboard />
    </div>
  );
}

function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText; 
}
function printOutput(num){
  if(num===""){
    document.getElementById("output-value").innerText=num;	
	}
	else{
		document.getElementById("output-value").innerText=getFormatedNum(num);
	}
}
function getFormatedNum(num){
	if(num==="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator />
      </header>
    </div>
  );
}

export default App;
