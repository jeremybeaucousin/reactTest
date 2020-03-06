import React from 'react';

import Board from './Board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    moveIndex: null,
                }
            ],
            stepNumber: 0,
            xIsNext: true,
        }
    };

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat(
                [
                    {
                        squares: squares,
                        moveIndex: i,
                    }
                ]
            ),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            moveSelected: null,
        });
    };

    jumpTo(step, moveIndex) {
        this.setState(
            {
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                moveSelected: moveIndex,
            }
        );

    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const moveIndex = step.moveIndex;
            const moveValue = current.squares[moveIndex];

            let moveColumn = null;
            let moveRow = null;

            // Define the index column
            if ([0, 3, 6].includes(moveIndex)) {
                moveColumn = 1;
            } else if ([1, 4, 7].includes(moveIndex)) {
                moveColumn = 2;
            } else if ([2, 5, 8].includes(moveIndex)) {
                moveColumn = 3;
            }

            // Define the index row
            if (moveIndex > -1 && moveIndex < 3) {
                moveRow = 1;
            } else if (moveIndex < 6) {
                moveRow = 2;
            } else if (moveIndex < 9) {
                moveRow = 3;
            }

            const desc = move ?
                `Go to move #${move}` :
                'Go to game start';
            const label = move ? `The player ${moveValue} has played on (${moveColumn}, ${moveRow})` : 'Game start';
            const buttonId = `move-button-${move}`;
            return (
                <li key={move}>
                    <button id={buttonId} onClick={() => this.jumpTo(move, moveIndex)}>{desc}</button>
                    <label htmlFor={buttonId}>{label}</label>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Winner ${winner}`;
        } else {
            status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        moveSelected={this.state.moveSelected} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    };
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let index = 0; index < lines.length; index++) {
        const [a, b, c] = lines[index];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}