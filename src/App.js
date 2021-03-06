import React, { Component } from 'react';

function Cell(props) {
    return (
        <div className={ "cell cell-" + props.value }>
            { props.value }
        </div>
    )
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: Array(16).fill(null),
            newBlock: false,
            score: 0,
            won: false
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.newGame = this.newGame.bind(this);
    }

    render() {
        let cells = [];
        for (let i = 0; i < 16; i++) {
            cells.push(
                <div key={ i }>{ this.renderCell(i) }</div>
            );
        }
        return (
            <div>
                <div id="header">
                    <div id="title"><h1>2048</h1></div>
                    <div className="scoreContainer">
                        <div className="score"><small>Score</small><br /> { this.state.score }</div>
                        <button onClick={ this.newGame }>New game</button>
                    </div>
                </div>
                <div className="board" onKeyDown={ this.handleKeyDown }>
                    { cells }
                    <div id="win">
                        <div>
                            <h2>You won!</h2>
                        </div>
                        <div>
                            <button onClick={ this.newGame }>New game</button>
                            <button onClick={ hideMessage }>Keep playing</button>
                        </div>
                    </div>
                    <div id="end">
                        <h2>Game over!</h2>
                        <button onClick={ this.newGame }>Try again</button>
                    </div>
                </div>
            </div>
        )
    }

    renderCell(i) {
        return (
            <Cell
                value={ this.state.values[i] }
            />
        );
    }

    createBlock() {
        let values = this.state.values.slice();
        let index;
        let counter = 0;

        do {
            index = parseInt(Math.random() * 100, 10) % 16;
            counter++;
        } while(values[index] !== null && counter < 100);

        let number = parseInt(Math.random() * 10, 10) % 8;
        number === 0 ? number = 4 : number = 2;

        values[index] = number;

        this.setState({
            values: values
        });
    }

    createTwoBlocks() {
        let values = this.state.values.slice();
        let index;

        for (let i = 0; i < 2; i++) {
            do {
                index = parseInt(Math.random() * 100, 10) % 16;
            } while(values[index] !== null);

            let number = parseInt(Math.random() * 10, 10) % 10;
            number = number === 0 ? 4 : 2;

            values[index] = number;
        }

        this.setState({
            values: values
        });
    }

    componentDidMount() {
        this.createTwoBlocks();
        window.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e) {
        let values = this.state.values.slice();
        let tmp = [];
        let buf = [];
        let direction = 0;

        for (let i = 0; i < 4; i++) {
            let j = i * 4;
            tmp[i] = values.slice(j, j + 4);
        }

        if (e.keyCode === 37) {
            direction = 0;
        } else if (e.keyCode === 38) {
            direction = 3;
        } else if (e.keyCode === 39) {
            direction = 2;
        } else if (e.keyCode === 40) {
            direction = 1;
        } else {
            return;
        }


        tmp = rotateBoard(tmp, direction);
        tmp = this.makeMove(tmp);
        tmp = rotateBoard(tmp, - direction);

        buf = values;

        isMovePossible(tmp);

        values = [].concat.apply([], tmp);

        if (! (values.length === buf.length && values.every(function(v,i) { return v === buf[i]}))) {
            this.setState({
                newBlock: true
            });
        }

        if (Math.max( ...values ) === 2048 && !this.state.won) {
            this.setState({
                won: true
            });
            document.getElementById('win').style.display = 'flex';
        }

        if (this.state.newBlock === true) {
            this.setState({
                values: values,
                newBlock: false
            });
            this.createBlock();
        }
    }

    makeMove(values) {
        let score = 0;

        for (let i = 0; i < 4; i++) {
            values[i] = values[i].filter((val) => val > 0);
        }

        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values[i].length - 1; j++) {
                if (values[i][j] > 0 && values[i][j] === values[i][j + 1]) {
                    values[i][j] *= 2;
                    values[i][j + 1] = null;
                    values[i] = values[i].filter((val) => val > 0);
                    score += values[i][j];
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            while (values[i].length < 4) {
                values[i].push(null);
            }
        }

        this.increaseScore(score);

        return values;
    }

    increaseScore(value) {
        value += this.state.score;
        this.setState({
            score: value
        });
    }

    newGame() {
        this.setState({
            values: Array(16).fill(null),
            newBlock: false,
            score: 0,
            won: false
        },() => { this.createTwoBlocks(); });

        hideMessage();
    }
}

class App extends Component {
    render() {
        return (
            <Board />
        )
    }
}

function hideMessage() {
    document.getElementById('win').style.display = 'none';
    document.getElementById('end').style.display = 'none';
}

function rotateBoard(array, dir) {

    if (dir === 0) {
        return array;
    }

    if (dir === 1 || dir === -3) {
        array = rotateOnce(array);

        return array;

    } else if (dir === 2 || dir === -2) {
        array = rotateOnce(array);
        array = rotateOnce(array);

        return array;

    } else if (dir === 3 || dir === -1) {
        array = rotateOnce(array);
        array = rotateOnce(array);
        array = rotateOnce(array);

        return array;

    }
}

function rotateOnce(array) {
    array = array[0].map((col, i) => array.map(row => row[i]));

    array.forEach(function(row, y) {
        array[y].reverse();
    });

    return array;
}

function isMovePossible(values) {
    for (let i = 0; i < 4; i++) {
        if (Math.min(...values[i]) === 0) return;

        for (let j = 0; j < 3; j++) {
            if (values[i][j] === values[i][j + 1]) return;
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (values[i][j] === values[i + 1][j]) return;
        }
    }

    document.getElementById('end').style.display = 'flex';
}

export default App;


// 0   1   2   3
// 4   5   6   7
// 8   9   10  11
// 12  13  14  15