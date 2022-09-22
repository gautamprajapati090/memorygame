import '../App.css';
import { useEffect, useState } from 'react';
let qBox = [], guess = [], color = "#FFFF00"
function Game() {

    // const [qBox, setQBox] = useState([]);
    // const [guess, setGuess] = useState([]);
    const [level, setLevel] = useState(1);
    const [msg, setMsg] = useState("");
    const [second, setSecond] = useState(5);
    // const [color, setColor] = useState("#FFFF00");
    const [boxView, setBoxView] = useState("");
    const [buttonLabel, setButtonLabel] = useState("Go to Next Level");

    useEffect(() => {
        console.log("called...");
        //get random number for every new level
        getRandomColor();
        //get random number to indicate memory color
        getRandomNumber()
        //main function to initialize game
        initiateGame(9)
        //timer to start game after 5 sec
        startTimerMemoryHide();

    }, [])

    const getRandomBoxNumber = (numbers) => {
        return numbers[Math.floor(Math.random() * numbers.length)];
    };

    //get random number for every new level
    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var clr = '#';
        for (var i = 0; i < 6; i++) {
            clr += letters[Math.floor(Math.random() * 16)];
        }
        // setColor(color)
        color = clr
    }

    //get random number to indicate memory color
    function getRandomNumber() {
        let array = []
        for (var i = 0; i < 5; i++) {
            var randNumber = Math.floor(Math.random() * 9);
            if (array.includes(randNumber)) {
            } else {
                array.push(randNumber);
            }
        }
        // setQBox(array)
        qBox = array
    }

    //remove memory color from boxes
    function removeColorFromGame() {
        var x = document.querySelectorAll("li");
        for (let i = 0; i < x.length; i++) {
            x[i].removeAttribute('style');
        }
    }

    function makeBoxDisbled(disbled = false) {
        var x = document.querySelectorAll("li");
        for (let i = 0; i < x.length; i++) {
            x[i].style.pointerEvents = disbled ? "none" : "inherit";
        }
    }

    const startTimerMemoryHide = () => {
        makeBoxDisbled(true)
        let timer = 5;
        var timerId = setInterval(function () {
            if (timer <= 0) {
                console.log("timer stop");
                removeColorFromGame();
                clearInterval(timerId);
                makeBoxDisbled(false)
            }
            setSecond(timer);
            timer--;
        }, 1000);
    }

    const onBoxClick = (event) => {
        var index = event.target.id;
        if (qBox.length > 0) {
            if (guess.includes(Number(index))) { } else {
                guess.push(Number(index));
            }
            event.target.style.backgroundColor = color
            if (qBox.length <= guess.length) {
                checkResult();
            }
        }
    }

    //main function to initialize game
    const initiateGame = (boxCount) => {
        // output images then hide them
        const rows = [];
        for (var i = 0; i < boxCount; i++) {
            if (qBox.includes(i)) {
                rows.push(<li key={i} className='box' id={i} style={{ backgroundColor: color }} onClick={onBoxClick}></li>);
            } else
                rows.push(<li key={i} className='box' id={i} onClick={onBoxClick}></li>);
        }
        // return (
        //     <ol>{rows}</ol>
        // )
        setBoxView(<ol>{rows}</ol>)
    }

    const checkResult = () => {
        makeBoxDisbled(true)
        let msg = "";
        // if (_.isEqual(qBox.sort(), guess.sort())) {
        if (qBox.sort().length === guess.sort().length && guess.sort().every(item => qBox.sort().indexOf(item) > -1)) {
            msg = "You have won the game."
            document.querySelector("#msg").style.color = "green"
            // level++;
            setLevel(level => level + 1)
        } else {
            msg = "Oops you lost!"
            // level = 1;
            setLevel(1)
            document.querySelector("#msg").style.color = "red"
            setButtonLabel('Restart Game')
        }
        setMsg(msg)
    }

    const onClickNextGame = () => {
        if (qBox.length <= guess.length) {
            setButtonLabel('Go to Next Level')
            setMsg('')
            // document.getElementById("level").innerText = "Level " + level;
            getRandomColor()
            getRandomNumber()
            initiateGame(getRandomBoxNumber([9, 12, 15]));
            startTimerMemoryHide();
            guess = []
            // $(".box").on('click');
            makeBoxDisbled(false)
        }
    }

    return (
        <div>
            <h1>Memory Game</h1>
            <h1>Level: {level}</h1>
            <h2>Hints will be hide in {second} sec</h2>
            <div id="container">
                <center>
                    {boxView}
                </center>
            </div>
            <h1>🧍🧍🧍🧍</h1>
            <h1 id='msg'>{msg}</h1>
            <button className="nextgame" onClick={onClickNextGame}> {buttonLabel} </button>
        </div>
    );
}

export default Game;
