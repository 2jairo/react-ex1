import { useState, useEffect } from "react"
import './Conecta4.css'


export const Conecta4 = ({ gridW, gridH, conecta, players, setInGame }) => {
    const [grid, setGrid] = useState(new Array(gridW * gridH).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState(players[0].name)
    const [winner, setWinner] = useState(null)
    const [winningCells, setWinningCells] = useState([])

    useEffect(() => {
        for (let i = 0; i < grid.length; i++) {
            const cell = grid[i]
            if (cell === null) {
                continue
            }

            const win = checkWin(i)
            if (win !== null) {
                const player = players.find(p => p.name === win.value)
                setWinner(player)
                setWinningCells(win.cells)
                break
            }
        }
    }, [grid])

    const checkWin = (cellIdx) => {
        const col = cellIdx % gridW
        const row = Math.floor(cellIdx / gridW)

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue;
                const prevValue = grid[cellIdx]
                const cells = []

                for (let i = 0; i < conecta; i++) {
                    const newCol = col + i * x
                    const newRow = row + i * y

                    if (newCol < 0 || newCol >= gridW || newRow < 0 || newRow >= gridH) {
                        break
                    }


                    const idx = newRow * gridW + newCol
                    const value = grid[idx]
                    // console.log({ row: row + (i * y),  col: col + (i * x), idx, value })
                    if (value !== prevValue) {
                        break
                    }
                    cells.push((idx))

                    if (i === conecta - 1) {
                        console.log('WIN', { from: cellIdx, to: idx })
                        return { cells, value }
                    }
                }
            }
        }
        return null
    }

    const getBackgroundColor = (g) => {
        if (g === null) return "#f0f0f0"
        return players.find(p => p.name === g).background
    }

    const handleClickGridCell = (cellIdx) => {
        if (winner) return

        const lowest = findLowestEmptyCell(cellIdx)
        if (lowest === null) {
            return //TODO msg error
        }

        fillCell(lowest)
    }

    const findLowestEmptyCell = (cellIdx) => {
        const col = cellIdx % gridW

        for (let j = gridH - 1; j >= 0; j--) {
            const row = j * gridW

            if (grid[row + col] === null) {
                return row + col
            }
        }
        return null
    }

    const fillCell = (cellIdx) => {
        setGrid((prev) => {
            const newGrid = [...prev]
            newGrid[cellIdx] = currentPlayer
            return newGrid
        })
        setCurrentPlayer((prev) => {
            const current = players.findIndex(p => p.name === prev)
            const newIdx = current === players.length - 1 ? 0 : current + 1
            return players[newIdx].name
        })
    }

    const resetGame = () => {
        setGrid(new Array(gridW * gridH).fill(null))
        setCurrentPlayer(players[0].name)
        setWinningCells([])
        setWinner(null)
    }

    return (
        <div className="conecta4-container">
            <div className="controls">
                {winner ? (
                    <h2 style={{ color: winner.background }}>
                        🎉 {winner.name} wins!
                    </h2>
                ) : (
                    <h3 style={{ color: players.find((p) => p.name === currentPlayer).background }}>
                        Turn: {currentPlayer}
                    </h3>
                )}
                <button onClick={resetGame}>🔁 Reset</button>
                <button onClick={() => setInGame(false)}>&larr; back</button>
            </div>

            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${gridW}, 1fr)`,
                    gridTemplateRows: `repeat(${gridH}, 1fr)`,
                    pointerEvents: winner ? "none" : "auto", // stop clicks if game over
                }}
            >
                {grid.map((g, i) => (
                    <div
                        key={i}
                        className={`cell ${winningCells.includes(i) ? "cell-winning" : ""}`}
                        onClick={() => handleClickGridCell(i)}
                        style={{
                            background: getBackgroundColor(g),
                        }}
                    />
                ))}
            </div>
        </div>
    )

    // return (
    //     <div
    //         className="grid"
    //         style={{
    //             gridTemplateColumns: `repeat(${gridW}, 1fr)`,
    //             gridTemplateRows: `repeat(${gridH}, 1fr)`,
    //         }}
    //     >
    //         {grid.map((g, i) => (
    //             <div
    //                 key={i}
    //                 onClick={() => handleClickGridCell(i)}
    //                 style={{ background: getBackgroundColor(g) }}
    //             />
    //         ))}
    //     </div>
    // )
}