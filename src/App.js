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

    handleKeyDown(e) {
        let values = this.state.values.slice();
        let wasMoved = false;

        if (e.keyCode === 37) {
            wasMoved = this.moveLeft(values);
        } else if (e.keyCode === 38) {
            wasMoved = this.moveUp(values);
        } else if (e.keyCode === 39) {
            wasMoved = this.moveRight(values);
        } else if (e.keyCode === 40) {
            wasMoved = this.moveDown(values);
        }

        if (wasMoved) {
            this.setState({
                values: values
            });
            this.createBlock();
        }
    }

    moveLeft(values) {
        let wasMoved = false;

        for (let i = 0; i < 4; i++) {

            let j = i * 4 + 1;

            while (j < (i + 1) * 4 && j >= i * 4 + 1) {

                while (values[j] !== null && values[j - 1] === null) {
                    values[j - 1] = values[j];
                    values[j] = null;
                    wasMoved = true;

                    if (j > i * 4 + 1) j--;
                }

                if (values[j] !== null && values[j] === values[j - 1]) {
                    values[j - 1] *= 2;
                    values[j] = null;
                    wasMoved = true;
                }

                j++;
            }
        }

        return wasMoved;
    }

    moveRight(values) {
        let wasMoved = false;

        for (let i = 1; i <= 4; i++) {

            let j = i * 4 - 2;

            while (j >= (i - 1) * 4 && j <= i * 4) {

                while (values[j] !== null && values[j + 1] === null) {
                    values[j + 1] = values[j];
                    values[j] = null;
                    wasMoved = true;

                    if (j < i * 4) j++;
                }

                if (values[j] !== null && values[j] === values[j + 1]) {
                    values[j + 1] *= 2;
                    values[j] = null;
                    wasMoved = true;
                }
                j--;
            }
        }

        return wasMoved;
    }

    moveDown(values) {
        let wasMoved = false;

        for (let i = 0; i < 4; i++) {

            let j = i + 12;

            while (j > i && j <= i + 12) {

                while (values[j - 4] !== null && values[j] === null) {
                    values[j] = values[j - 4];
                    values[j - 4] = null;
                    wasMoved = true;

                    if(j < i + 12) j += 4;
                }

                if (values[j] !== null && values[j] === values[j - 4]) {
                    values[j] *= 2;
                    values[j - 4] = null;
                    wasMoved = true;
                }
                j -= 4;
            }
        }

        return wasMoved;
    }

    moveUp(values) {
        let wasMoved = false;

        for (let i = 0; i < 4; i++) {

            let j = i;

            while (j < i + 12 && j >= i) {

                while (values[j + 4] !== null && values[j] === null) {
                    values[j] = values[j + 4];
                    values[j + 4] = null;
                    wasMoved = true;

                    if (j > i) j -= 4;
                }

                if (values[j] !== null && values[j] === values[j + 4]) {
                    values[j] *= 2;
                    values[j + 4] = null;
                    wasMoved = true;
                }
                j += 4;
            }
        }

        return wasMoved;
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
