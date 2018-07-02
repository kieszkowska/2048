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
        console.log('left');
    }

    handleKeyDown(e) {
        if (e.keyCode === 37){
            this.moveLeft();
        } else if (e.keyCode === 38){
            console.log('up');
        } else if (e.keyCode === 39){
            console.log('right');
        } else if (e.keyCode === 40){
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
