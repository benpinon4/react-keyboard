import { useState, useRef, useEffect } from "react";
import "./App.css";

const deepClone = (object) =>{
	/* This function will create a "deep-clone" of an object which is necessary
	when creating a copy an object with multiple nested layers of objects or arrays. */
	return JSON.parse(JSON.stringify(object))
}

const App = (event) => {
  const [text, setText] = useState("")

  const textHandler = (keyRowsClone) => {

    if(keyRowsClone === "Backspace"){

      setText(text.slice(0,-1))
    }
    if(keyRowsClone === "Enter"){
      setText(text + " \n ")
    }
    if(keyRowsClone !== "Backspace" && keyRowsClone !== "Enter"){
      console.log(keyRowsClone)
      setText(text + keyRowsClone.toLowerCase())
    }

    
  }
  return (
    <div className="App-header">
      <TextDisplay text={text} />
      <KeyboardGrid textHandler={textHandler}/>
    </div>
  );
}

const TextDisplay = (props) => {
  return(
    <div>
      {props.text}
    </div>
  )

}
const KeyboardGrid = (props) => {

	const keyBoardArr = [
		[
      { letter: "`", isPressed: false },
      { letter: "1", isPressed: false },
      { letter: "2", isPressed: false },
      { letter: "3", isPressed: false },
      { letter: "4", isPressed: false },
      { letter: "5", isPressed: false },
      { letter: "6", isPressed: false },
      { letter: "7", isPressed: false },
      { letter: "8", isPressed: false },
      { letter: "9", isPressed: false },
      { letter: "0", isPressed: false },
			{ letter: "-", isPressed: false },
			{ letter: "=", isPressed: false },
			{ letter: "Backspace", isPressed: false }
    ],
    [
      { letter: "Tab", isPressed: false },
      { letter: "Q", isPressed: false },
      { letter: "W", isPressed: false },
      { letter: "E", isPressed: false },
      { letter: "R", isPressed: false },
      { letter: "T", isPressed: false },
      { letter: "Y", isPressed: false },
      { letter: "U", isPressed: false },
      { letter: "I", isPressed: false },
      { letter: "O", isPressed: false },
      { letter: "P", isPressed: false },
      { letter: "[", isPressed: false },
      { letter: "]", isPressed: false },
      { letter: "\\", isPressed: false },
    ],
    [
      { letter: "CapsLock", isPressed: false },
      { letter: "A", isPressed: false },
      { letter: "S", isPressed: false },
      { letter: "D", isPressed: false },
      { letter: "F", isPressed: false },
      { letter: "G", isPressed: false },
      { letter: "H", isPressed: false },
      { letter: "J", isPressed: false },
      { letter: "K", isPressed: false },
      { letter: "L", isPressed: false },
      { letter: ";", isPressed: false },
      { letter: "'", isPressed: false },
			{ letter: "Enter", isPressed: false }
    ],
    [
			{ letter: "Shift", isPressed: false },
      { letter: "Z", isPressed: false },
      { letter: "X", isPressed: false },
      { letter: "C", isPressed: false },
      { letter: "V", isPressed: false },
      { letter: "B", isPressed: false },
      { letter: "N", isPressed: false },
      { letter: "M", isPressed: false },
      { letter: ",", isPressed: false },
      { letter: ".", isPressed: false },
      { letter: "/", isPressed: false },
      { letter: "Shift", isPressed: false },
    ],
		[
			{ letter: " ", isPressed: false }
		]
  ];

  const [keyRows, setKeyRows] = useState(keyBoardArr);

  const handleKeyDown = (event) => {
   let keyRowsClone = [...keyRows]   
    for (let i = 0; i < keyRowsClone.length; i++){

      for (let x = 0; x < keyRowsClone[i].length; x++){

        if(event.key.toLowerCase() === keyRowsClone[i][x].letter.toLowerCase()){
        
  
         keyRowsClone[i][x].isPressed = true
         props.textHandler(keyRowsClone[i][x].letter)

           
     
       
        }
      
      }
      

    }

    setKeyRows(keyRowsClone)
}

  

  const handleKeyUp = (event) => {
    const  keyRowsClone = [...keyRows]
    for (let i = 0; i < keyRowsClone.length; i++){
      // console.log(keyRowsClone[i])
      for (let x = 0; x < keyRowsClone[i].length; x++){
        // console.log(keyRowsClone[i][x].letter.toLowerCase())
        if(event.key.toLowerCase() === keyRowsClone[i][x].letter.toLowerCase()){
          keyRowsClone[i][x].isPressed = false
          


        }
      }
    }

    setKeyRows(keyRowsClone)
  };

	/* The following lines for the useRef and useEffect are serving a single purpose for us, it is getting the div in the JSX of <KeyboardGrid/> and focusing it on page load.*/
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div
      className="Keyboard-grid"
      ref={ref}
      tabIndex={-1}
			onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
			{keyRows.map((keyRow, index)=>{
				return <KeyboardRow keyRow={keyRow} key={index}/>
			})}
    </div>
  );
};

const KeyboardRow = (props) => {
	return (
		<div className="Keyboard-row">
			{props.keyRow.map((keyObject, index)=>{
				return <KeyboardKey keyObject={keyObject} key={index}/>
			})}
		</div>
	)
}

const KeyboardKey = (props) => {
if(props.keyObject.isPressed === true){  
const keyboardKeyClass = "Keyboard-Key pressed"
return (
  <div className={keyboardKeyClass}>
    {props.keyObject.letter}
  </div>
)
} 
if(props.keyObject.isPressed === false){  
  const keyboardKeyClass = "Keyboard-key"
  return (
		<div className={keyboardKeyClass}>
			{props.keyObject.letter}
		</div>
	)
}
}
export default App;
