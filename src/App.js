import React, { Component } from 'react';

function Cell(props) {
    return (
        <div className={ "cell cell-" + props.value}>
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
        let tmp =[];

        for (let i = 0; i < 4; i++) {
            let j = i * 4;
            tmp[i] = values.slice(j, j + 4);
        }

        console.log(tmp);

        if (e.keyCode === 37) {
            wasMoved = this.moveLeft(values);
        } else if (e.keyCode === 38) {
            wasMoved = this.moveUp(values);
        } else if (e.keyCode === 39) {
            wasMoved = this.moveRight(values);
        } else if (e.keyCode === 40) {
            wasMoved = this.moveDown(values);
        }

        values = [].concat.apply([], tmp);

        console.log(values);

        if (wasMoved) {
            this.setState({
                values: values
            });
            this.createBlock();
        }
    }

    moveLeft(values) {

    }

    moveRight(values) {

    }

    moveDown(values) {

    }

    moveUp(values) {

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

function rotate(deg, array) {
    let map = array;

    if (deg === 90) {

        map = map[0].map((col, i) => map.map(row => row[i]));

        map.forEach(function(row, y) {
            map[y].reverse();
        });

    } else if (deg === -90) {

        this.rotate(180);
        this.rotate(90);

    } else if (deg === 180 || deg === -180) {

        this.rotate(90);
        this.rotate(90);

    } else if (deg === 270) {

        this.rotate(-90);

    } else if (deg === -270) {

        this.rotate(90);
    }
}

export default App;
