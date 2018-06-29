import React, { Component } from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.number,
            value: props.value
        };
    }

    render() {
        return (
            <div className="cell" >{ this.state.value }</div>
        )
    }
}

class Board extends Component {
    render() {
        return (
            <div className="board">
                <Cell number={1} value={null} />
                <Cell number={2} value={null} />
                <Cell number={3} value={null} />
                <Cell number={4} value={null} />

                <Cell number={5} value={null} />
                <Cell number={6} value={null} />
                <Cell number={7} value={null} />
                <Cell number={8} value={null} />

                <Cell number={9} value={null} />
                <Cell number={10} value={null} />
                <Cell number={11} value={null} />
                <Cell number={12} value={null} />

                <Cell number={13} value={null} />
                <Cell number={14} value={null} />
                <Cell number={15} value={null} />
                <Cell number={16} value={null} />
            </div>
        )
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
