'use client';
import { useState } from 'react';
import { DailyGame, Hints } from '../types';
import { Board, BoardCell } from './Board';
import { ThemeWordReveal } from './ThemeWordReveals';
function getAllPositionsInGrid(width: number, height: number) {
    const positions = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            positions.push([i, j]);
        }
    }
    return positions;
}
export function BoardSection({
    game: { themeWords, startingBoard, clue, spangram, themeCoords },
    hints,
}: {
    game: DailyGame;
    hints: Hints;
}) {
    const [revealedWords, setRevealedWords] = useState({
        [spangram]: false,
        ...Object.fromEntries(themeWords.map((w) => [w, false])),
    });
    const revealLocation = (word: string) =>
        setRevealedWords((old) => ({ ...old, [word]: !old[word] }));

    const findWord = (i: number, j: number) =>
        Object.entries(themeCoords).findIndex(([word, coords]) =>
            coords.some(([x, y]) => x === i && y === j)
        ) + 1; //If a position doesn't have an entry in themeCoords, its in the spangram, since there are no unused letters
    return (
        <>
            <Board title={clue}>
                {startingBoard.flatMap((row, i) =>
                    row.split('').map((cell, j) => (
                        <BoardCell
                            key={`cell-${i}-${j}`}
                            revealed={
                                revealedWords[
                                    [spangram, ...themeWords][findWord(i, j)]
                                ]
                            }
                            shift={findWord(i, j) / themeWords.length}>
                            {cell}
                        </BoardCell>
                    ))
                )}
            </Board>
            <div className="flex flex-col gap-4">
                <ThemeWordReveal
                    key={spangram}
                    word={spangram}
                    hint={hints[spangram]}
                    isSpangram
                    revealLocation={revealLocation}
                />
                {themeWords.map((word) => (
                    <ThemeWordReveal
                        key={word}
                        word={word}
                        hint={hints[word]}
                        revealLocation={revealLocation}
                    />
                ))}
            </div>
        </>
    );
}
