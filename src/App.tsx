import React, { useState } from 'react';
import "./App.css"
const possibleMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2],
[1, -2], [1, 2], [2, -1], [2, 1]
];
const App: React.FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [possibleMovesList, setPossibleMovesList] = useState<[number, number][]>([]);

  const handleSquareClick = (x: number, y: number) => {
    setSelectedSquare([x, y]);
    setPossibleMovesList(findPossibleMoves(x, y));
  };

  const findPossibleMoves = (x: number, y: number) => {
    const moves: [number, number][] = [];
    for (const [dx,dy] of possibleMoves) {
      const newX = x + dx;
      const newY = y + dy;
      if (isValidMove(newX, newY)) {
        moves.push([newX, newY]);
      }
    }
    return moves;
  };
  const isValidMove = (x: number, y: number) => {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  };

  return (
  <div className='container'>
      <h1 className='heading'>Chessboard Knight Move</h1>
      <p><span className='instruction'>Click on the square to know the possibleMoves of Knight</span></p>
     <div className='chessboard-container'>
     <table className='chessboard'>
      <tbody>
        {Array.from({ length: 8 }, (_, x) =>
          <tr key={x}>
            {Array.from({ length: 8 }, (_, y) => {
              const isSelected = selectedSquare && selectedSquare[0] === x && selectedSquare[1] === y;
              const isPossibleMove = possibleMovesList.some(move => move[0] === x && move[1] === y);
              return (
                <td className='block'
                  key={y}
                  style={{
                    backgroundColor: isSelected ? 'slateblue' : isPossibleMove ? 'yellowgreen' :  '#07294D' ,
                  }}
                  onClick={() => handleSquareClick(x, y)}
                >
                  {/* {x.toString()+y} */}
                  {String.fromCharCode(65 + y) + (8 - x)}
                </td>
              );
            })}
          </tr>
        )}
      </tbody>
    </table>
   </div>
   <div className='footer'>
    <p>Copyright @RaftLab Assignment</p>
   </div>
  </div>
  );
};
export default App;