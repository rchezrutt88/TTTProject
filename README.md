## A (Very Simple) Tic-Tac-Toe Game

Contained in this repo is a basic browser implementation of the timelessly brainless game tic-tac-toe. The program is broken into three parts: the game logic, the html/css, and the 'main' file that responds to events in the browser and updates the board using jquery.

### The Game Logic

Inside the game-engine, there are two constructers, one for a player object and the other for a player object.

The player object is merely a wrapper for either an 'X' or 'O' symbol.

The Board object consists of a two dimensional array representing the state of the game (with strings--'X' and 'O'--for marked squares, and undefined for unmarked squares) and two methods: makeMove and checkForTie.

The makeMove method is called from the main file with three arguments: A row integer and column integer, indicating the address of the square clicked on by the user, and a current player object, representing the user making the move. After checking if that the square is unmarked and the move is legal, the method updates the state of the board. Finally, the method calls the checkBoardForWin method, which calls the submethods checkRowForWin, checkColumnForWin, and checkDiagonalForWin. If any of these return true, the makeMove function returns true.

### The Main File

The main file invokes a game object and two player objects when the DOM is ready and then listens for events within the browser.

There are currently only two events that trigger any action: a click on the board and a click on the reset button.

### TODO

Add functionality that enables the tic-tac-toe game to communicate with a server, allowing users to create accounts, login, and store their games.
