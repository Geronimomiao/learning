// 宏命令 一组命令组合集

let closeDoorCommand = {
  execute() {
    console.log('closeDoor');
  }
};

let openPcCommand = {
  execute() {
    setTimeout(() => {
      console.log('openPc');
    } ,1000);
  }
};

let openQQCommand = {
  execute() {
    console.log('openQQ');
  }
};

let MacroCommand = function () {
  return {
    commandList: [],
    add(command) {
      this.commandList.push(command);
    },
    execute() {
      for (let i = 0, command; command = this.commandList[i++]; ) {
        command.execute();
      }
    }
  };
};

let macroCommand = MacroCommand();

macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
