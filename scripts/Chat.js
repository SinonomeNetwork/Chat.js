import {world,system} from '@minecraft/server';
import {premission,TrueSound,TrueSoundConf,FalseSound} from './library/lib.js';

world.beforeEvents.chatSend.subscribe(event=>{
const {sender,message}=event;
const prefix='!';
let [command,...subCommand]=message.slice(prefix.length).split(/ /);

if(message.match("http","https")){
    event.cancel=true;
    system.run(()=>{
    sender.sendMessage("§l[§cSYZCH AntiCheat§f] §cURLは送信できません");
    sender.playSound(FalseSound)
    });
    return;
}

if(command==='help'){
    event.cancel=true;
    sender.sendMessage(
        '\n§6§l----------HELP----------\n'+
        '§l§6help §r§7今実行してるコマンド\n'+
        '§l§6general §r§7General\n'+
        '§l§2admin §r§7Admin'
    );
return;
}else
if(command==='general'){
    event.cancel=true;
    system.run(()=>{
        world.sendMessage('Hello World!!');//ワールド全体にメッセージが出る
        sender.playSound('random.levelup',{pitch:1,volume:50});
    });
return;
}else
if(sender.hasTag(premission)){
if(command==='admin'){
    event.cancel=true;
    system.run(()=>{
        world.sendMessage('Hello World!!');//ワールド全体にメッセージが出る
        sender.playSound('random.levelup',{pitch:1,volume:50});
    });
return;
};
event.cancel=true;
world.sendMessage(`§l§6[Admin] §r<${sender.name}> ${message}`);
return;
}/*else if(!sender.hasTag(premission)){
    event.cancel=true;
    system.run(()=>{
        sender.sendMessage('§c§l実行権限がありません');
        sender.playSound(FalseSound);
    });
return;
}*/

if(sender.hasTag("VIP")){
    event.cancel=true;
    world.sendMessage(`§l§a[VIP] §r<${sender.name}> ${message}`);
return;
}else 
if(!sender.hasTag(premission)||!sender.hasTag("VIP")){
    event.cancel=true;
    world.sendMessage(`§l§2[鯖民] §r<${sender.name}> ${message}`);
return;
}

})