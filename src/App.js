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
            score: 0
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    render() {
        return (
            <div>
                <h1>2048</h1>
                <div className="score">Score<br /> { this.state.score }</div>
                <div className="board" onKeyDown={ this.handleKeyDown }>
                    { this.renderCell(0) }
                    { this.renderCell(1) }
                    { this.renderCell(2) }
                    { this.renderCell(3) }

                    { this.renderCell(4) }
                    { this.renderCell(5) }
                    { this.renderCell(6) }
                    { this.renderCell(7) }

                    { this.renderCell(8) }
                    { this.renderCell(9) }
                    { this.renderCell(10) }
                    { this.renderCell(11) }

                    { this.renderCell(12) }
                    { this.renderCell(13) }
                    { this.renderCell(14) }
                    { this.renderCell(15) }
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
            number === 0 ? number = 4 : number = 2;

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

        values = [].concat.apply([], tmp);

        if (! (values.length === buf.length && values.every(function(v,i) { return v === buf[i]}))) {
            this.setState({
                newBlock: true
            });
        }

        if (this.state.newBlock === true) {
            this.setState({
                values: values
            });
            this.createBlock();
            this.setState({
                newBlock: false
            });
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
            for (let j = 0; j < 4; j++) {
                if (! values[i][j]) {
                    values[i][j] = null;
                }
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
}

class App extends Component {
    render() {
        return (
            <Board />
        )
    }
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

export default App;
