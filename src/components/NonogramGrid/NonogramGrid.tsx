import "components/NonogramGrid//NonogramGrid.scss";
import { Nonogram } from "modules/Nonogram";
import React, { useState, useMemo } from "react";

interface IHintsProps {
    hintLines: number[][];
    finishedLines: boolean[];
    gameRunning: boolean;
    classIdentifier: string;
}

const Hints = ({
    hintLines,
    finishedLines,
    gameRunning,
    classIdentifier,
}: IHintsProps) => {
    return (
        <div className={classIdentifier}>
            {hintLines.map((hintLine, i) => {
                return (
                    <div key={i}>
                        {!gameRunning || finishedLines[i] ? (
                            <div></div>
                        ) : (
                            hintLine.map((hint, index) => (
                                <div
                                    key={index}
                                    className={
                                        finishedLines[i] ? "solved" : "number"
                                    }
                                >
                                    {hint}
                                </div>
                            ))
                        )}
                    </div>
                );
            })}
        </div>
    );
};

interface INonogramGridProps {
    nonogram: Nonogram;
    onMouseDownHandler: (x: number, y: number) => void;
    onMouseOverHandler: (x: number, y: number) => void;
    gameRunning: boolean;
}

const NonogramRows = ({ selectedCell, gameRunning, nonogram, handleMouseDown, handleMouseOver, handleMouseLeave }) => {
    console.log("render Rows component")
    const sizedArray = useMemo(() => {
        console.log("render sized array")
        return Array.from({ length: nonogram.size })
    }, [nonogram.size])

    const rows = useMemo(() => {
        console.log("render rows")
        return sizedArray.map((_, row) => (
            <tr key={row} className="row">
                <NonogramCells
                    selectedCell={selectedCell}
                    gameRunning={gameRunning}
                    handleMouseDown={handleMouseDown}
                    handleMouseOver={handleMouseOver}
                    handleMouseLeave={handleMouseLeave}
                    row={row}
                    nonogram={nonogram}
                />
            </tr>
        )) 
    }, [sizedArray, selectedCell, gameRunning, handleMouseDown, handleMouseOver, handleMouseLeave])

    return rows
}

const NonogramCells = ({ selectedCell, gameRunning, nonogram, handleMouseDown, handleMouseOver, handleMouseLeave, row }) => {
    const sizedArray = useMemo(() => {
        console.log("render sized array in cells")
        return Array.from({ length: nonogram.size })
    }, [nonogram.size])

    const cells = useMemo(() => {
        console.log("create cells")
        return sizedArray.map((_, col) => {
            const fifthRowBorder =
                row === 4 ? "fifth-row" : "";
            const highlighted =
                selectedCell.row === row ||
                selectedCell.column === col
                    ? "highlighted"
                    : "";
            const hideCell = gameRunning
                ? ""
                : "hide-cell";
            const gameWon = nonogram.progress.isWon
                ? "game-won"
                : "";
            let colored = "empty";
            switch (nonogram.grid[row][col]) {
                case 1:
                    colored = "colored";
                    break;
                case 2:
                    colored = "crossed";
                    break;
                case 3:
                    colored = "wrongColored";
                    break;
                case 4:
                    colored = "wrongCrossed";
                    break;
                                        }
            return (
                <td
                    key={col}
                    className={`cell ${fifthRowBorder}`}
                    onMouseDown={handleMouseDown(
                        row,
                        col
                    )}
                    onMouseOver={handleMouseOver(
                        row,
                        col
                    )}
                    onMouseLeave={handleMouseLeave}
                >
                    {row > 0 && row % 5 === 0 && (
                        <div className="fifth-row-border"></div>
                    )}
                    {col > 0 && col % 5 === 0 && (
                        <div className="fifth-col-border"></div>
                    )}
                    <div
                        id="cell"
                        className={`${colored} ${highlighted} ${hideCell} ${gameWon}`}
                    ></div>
            </td>
            )
        })
    }, [gameRunning, selectedCell, row, nonogram, handleMouseDown, handleMouseLeave, handleMouseOver, sizedArray])

    return cells
}

const NonogramGrid = ({
    nonogram,
    onMouseDownHandler,
    onMouseOverHandler,
    gameRunning,
}: INonogramGridProps) => {
    const [selectedCell, setSelectedCell] = useState<{
        row: number;
        column: number;
    }>({ row: -1, column: -1 });

    const handleMouseDown =
        (row: number, col: number) => (e: React.MouseEvent) => {
            e.preventDefault();
            if (!gameRunning || nonogram.progress.isWon) return;
            onMouseDownHandler(row, col);
        };

    const handleMouseOver =
        (row: number, col: number) => (e: React.MouseEvent) => {
            e.preventDefault();
            if (!gameRunning || nonogram.progress.isWon) return;
            setSelectedCell({ row, column: col });
            onMouseOverHandler(row, col);
        };

    const handleMouseLeave = () => {
        console.log("mouseLeave")
        setSelectedCell({ row: -1, column: -1 });
    };

    const validSizes = [5, 10, 15, 20, 25];
    const sizeClass = validSizes.includes(nonogram.size)
        ? `grid-${nonogram.size}x${nonogram.size}`
        : "grid-15x15";

    

    return (
        <div className={`content ${sizeClass}`}>
            <Hints
                hintLines={nonogram.hints.rows}
                finishedLines={nonogram.finishedLines.rows}
                gameRunning={gameRunning && !nonogram.progress.isWon}
                classIdentifier={"left-hints"}
            />
            <table>
                <Hints
                    hintLines={nonogram.hints.columns}
                    finishedLines={nonogram.finishedLines.columns}
                    gameRunning={gameRunning && !nonogram.progress.isWon}
                    classIdentifier={"top-hints"}
                />
                <tbody className="table">
                    <NonogramRows
                        selectedCell={selectedCell}
                        gameRunning={gameRunning}
                        nonogram={nonogram}
                        handleMouseDown={handleMouseDown}
                        handleMouseOver={handleMouseOver}
                        handleMouseLeave={handleMouseLeave}
                    />
                    {/* {Array.from({ length: nonogram.size }).map((_, row) => {
                        return (
                            <tr key={row} className="row">
                                {Array.from({ length: nonogram.size }).map(
                                    (_, col) => {
                                        const fifthRowBorder =
                                            row === 4 ? "fifth-row" : "";
                                        const highlighted =
                                            selectedCell.row === row ||
                                            selectedCell.column === col
                                                ? "highlighted"
                                                : "";
                                        const hideCell = gameRunning
                                            ? ""
                                            : "hide-cell";
                                        const gameWon = nonogram.progress.isWon
                                            ? "game-won"
                                            : "";
                                        let colored = "empty";
                                        switch (nonogram.grid[row][col]) {
                                            case 1:
                                                colored = "colored";
                                                break;
                                            case 2:
                                                colored = "crossed";
                                                break;
                                            case 3:
                                                colored = "wrongColored";
                                                break;
                                            case 4:
                                                colored = "wrongCrossed";
                                                break;
                                        }
                                        return (
                                            <td
                                                key={col}
                                                className={`cell ${fifthRowBorder}`}
                                                onMouseDown={handleMouseDown(
                                                    row,
                                                    col
                                                )}
                                                onMouseOver={handleMouseOver(
                                                    row,
                                                    col
                                                )}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                {row > 0 && row % 5 === 0 && (
                                                    <div className="fifth-row-border"></div>
                                                )}
                                                {col > 0 && col % 5 === 0 && (
                                                    <div className="fifth-col-border"></div>
                                                )}
                                                <div
                                                    id="cell"
                                                    className={`${colored} ${highlighted} ${hideCell} ${gameWon}`}
                                                ></div>
                                            </td>
                                        );
                                    }
                                )}
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>
        </div>
    );
};

export default NonogramGrid;
