# War of Cards (JS - Web App)   

This is a game whose concept originated from an exercise in Joyce Farrell's 2015 C# book.   
The implementation, however, is completely mine.   
You can play this game online at
[dharmeshsujeeun.com/WarOfCards](http://dharmeshsujeeun.com/WarOfCards)

## This is how the game works:   
1. The user chooses to play against the computer or another person.
2. The name of the two players are entered. If the user is playing against the computer
       then player 2's name is automatically set to 'Computer'.
3. The game is played with a standard 52-card deck. There are 26 rounds in total. In each
       round, both players are dealt a card. The player holding the card with the higher rank
       wins 2 points, and the other player gains 0 points. If both players hold two cards
       having the same rank, then both players are awarded 1 point.
4. At the end of the game, the player with the higher score wins. Of course, a tie is also
       a possibility.   
5. `ACE` is considered the lowest ranked card in the game, while `KING` is the highest.
