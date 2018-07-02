import React, { Component } from 'react';

function Cell(props) {
    return (
        <div className="cell" >
            { props.value }
        </div>
    )
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: Array(16).fill(null),
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    render() {
        return (
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

        do {
            index = parseInt(Math.random() * 100, 10) % 16;
        } while(values[index] !== null);

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

    moveLeft() {
        let values = this.state.values.slice();
        let wasMoved = false;

        for (let i = 0; i < 4; i++) {

            for (let k = 0; k < 4; k++) {
                let j = i * 4 + 1;

                while (j < (i + 1) * 4 && j >= i * 4 + 1) {

                    if (values[j] !== null && values[j - 1] === null) {
                        values[j - 1] = values[j];
                        values[j] = null;
                        wasMoved = true;
                    } else if (values[j] !== null && values[j] === values[j - 1]) {
                        values[j - 1] *= 2;
                        values[j] = null;
                        wasMoved = true;
                    }

                    j++;
                }
            }
        }

        if (wasMoved) {
            this.setState({
                values: values
            });
            this.createBlock();
        }
    }

    moveRight() {
        let values = this.state.values.slice();
        let wasMoved = false;

        for (let i = 1; i <= 4; i++) {

            for (let k = 0; k < 4; k++) {
                let j = i * 4 - 2;

                while (j >= (i - 1) * 4 && j <= i * 4) {

                    if (values[j] !== null && values[j + 1] === null) {
                        values[j + 1] = values[j];
                        values[j] = null;
                        wasMoved = true;
                    } else if (values[j] !== null && values[j] === values[j + 1]) {
                        values[j + 1] *= 2;
                        values[j] = null;
                        wasMoved = true;
                    }
                    j--;
                }
            }
        }

        if (wasMoved) {
            this.setState({
                values: values
            });
            this.createBlock();
        }
    }

    moveUp() {
        let values = this.state.values.slice();
        let wasMoved = false;

        for (let i = 0; i < 4; i++) {

            for (let k = 0; k < 4; k++) {
                let j = i;

                while (j < i + 12 && j >= i) {
                    console.log(j + ', ' + (j + 4));

                    if (values[j + 4] !== null && values[j] === null) {
                        values[j] = values[j + 4];
                        values[j + 4] = null;
                        wasMoved = true;
                    } else if (values[j] !== null && values[j] === values[j + 4]) {
                        values[j] *= 2;
                        values[j + 4] = null;
                        wasMoved = true;
                    }
                    j += 4;
                }
            }
        }

        if (wasMoved) {
            this.setState({
                values: values
            });
            this.createBlock();
        }
    }

    handleKeyDown(e) {
        if (e.keyCode === 37) {
            this.moveLeft();
        } else if (e.keyCode === 38) {
            this.moveUp();
        } else if (e.keyCode === 39) {
            this.moveRight();
        } else if (e.keyCode === 40) {
            console.log('down');
        }
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <h1>2048</h1>
                <Board />
            </div>
        )
    }
}

export default App;
