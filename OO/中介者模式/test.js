function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
}

Player.prototype.win = function () {
  console.log(this.name + ' won ');
};

Player.prototype.lose = function () {
  console.log(this.name + ' lost ');
};

// 玩家死亡
Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.reciveMessage('playerDead', this);
};

// 移除玩家
Player.prototype.remove = function () {
  playerDirector.reciveMessage('removePlayer', this);
};

// 玩家换队
Player.prototype.changeTeam = function (color) {
  playerDirector.reciveMessage('changeTeam', this, color);
};

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor);
  playerDirector.reciveMessage('addPlayer', newPlayer);

  return newPlayer;
};

var playerDirector = (function () {
  var players = {},  // 保存所有玩家
    operations = {};  // 中介者可执行的操作

  // 新增一个玩家
  operations.addPlayer = function (player) {
    var teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || []; // 如果该颜色玩家 还没有成立队伍 则成立一支新队伍
    players[teamColor].push(player);   // 添加进玩家队伍
  };

  // 移除一个玩家
  operations.removePlayer = function (player) {
    var teamColor = player.teamColor, // 该玩家队伍颜色
      teamPlayers = players[teamColor] || []; // 该队所有成员
    for (var i = teamPlayers.length - 1; i >= 0; i--) {
      // 遍历删除
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };

  // 玩家换队
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  };

  // 玩家死亡
  operations.playerDead = function (player) {
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor];
    var all_dead = true;

    for (var i = 0, player; player = teamPlayers[i++];) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead === true) {
      for (var i = 0, player; player = teamPlayers[i++];) {
        player.lose();
      }

      for (color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color];
          for (var i = 0, player; player = teamPlayers[i++];) {
            player.win();
          }
        }
      }
    }

  };

  var reciveMessage = function () {
    var message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };

  return {
    reciveMessage: reciveMessage
  };

})();

var player1 = playerFactory('1', 'red');
var player2 = playerFactory('2', 'red');
var player3 = playerFactory('3', 'red');
var player4 = playerFactory('4', 'red');
var player5 = playerFactory('5', 'blue');
var player6 = playerFactory('6', 'blue');
var player7 = playerFactory('7', 'blue');
var player8 = playerFactory('8', 'blue');



player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();













