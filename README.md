## A (Very Simple) Tic-Tac-Toe Game

Contained in this repo is a basic browser implementation of the timelessly brainless game tic-tac-toe. The program is broken into three parts: the game logic, the html/css, and the 'main' file that responds to events in the browser and updates the board using jquery.

###The Game Logic
Inside the game-engine, there are two constructers, one for a player object and the other for a player object.

The player object is trivial and is merely a wrapper for either an 'X' or 'O' symbol.

The Board object consists of a two dimensional array representing the state of the game (with strings--'X' and 'O'--for marked squares, and undefined for unmarked squares) and two methods: makeMove and checkForTie.

The make 
