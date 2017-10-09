/*
https://eprint.iacr.org/2016/1007.pdf
4.3 Multi-player games

An adversary can carry on an attack which always allows her to win a game.
To do that, the adversary impersonates the second player, and waits that the first
player makes his bet. Now, although the field players is private, the adversary
can infer the first player’s bet, by inspecting the blockchain transaction where
he joined the game. Then, the adversary can win the game by invoking play
with a suitable bet. This attack exploits the “keeping secrets” vulnerability.
*/

pragma solidity 0.4.15;

contract OddsAndEvens{
  struct Player {
    address addr;
    uint number;
  }

  Player[2] public players;         //public only for debug purpose

  uint8 tot;
  address owner;

  function OddsAndEvens() {
    owner = msg.sender;
  }

  function play(uint number) payable {
    if (msg.value != 1 ether) throw;

    players[tot] = Player(msg.sender, number);
    tot++;

    if (tot==2) andTheWinnerIs();
  }

  function andTheWinnerIs() private {
    bool res ;
    uint n = players[0].number+players[1].number;
    if (n%2==0) {
      res = players[0].addr.send(1800 finney);
    }
    else {
      res = players[1].addr.send(1800 finney);
    }

    delete players;
    tot=0;
  }

  function getProfit() {
    if(msg.sender!=owner) throw;
    bool res = msg.sender.send(this.balance);
  }
}