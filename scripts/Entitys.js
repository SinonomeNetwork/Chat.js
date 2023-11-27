import {world,system} from '@minecraft/server';
import {MessageFormData,ModalFormData,ActionFormData} from '@minecraft/server-ui';

function testForm(source){
const testForm=new ActionFormData();
testForm.title('TestModal');
testForm.body('ここ説明くるよ');
testForm.button('ボタン1');
testForm.button('ボタン2');
testForm.button('ボタン3');
testForm.button('ボタン4');
testForm.button('ボタン5');
testForm.show(source).then(response=>{
    if(response.canceled)return;
    if(response.selection===0){
        source.sendMessage('ボタン1が押されました');
    };
    if(response.selection===1){
        source.sendMessage('ボタン2が押されました');
    };
    if(response.selection===2){
        source.sendMessage('ボタン3が押されました');
    };
    if(response.selection===3){
        source.sendMessage('ボタン4が押されました');
    };
    if(response.selection===4){
        source.sendMessage('ボタン5が押されました');
    };
});
};

world.afterEvents.entityHitEntity.subscribe(event=>{//殴り検知[エンティティを左クリック(殴り)]
const {damagingEntity,hitEntity}=event;

if(damagingEntity.typeId==='minecraft:player'){
    if(hitEntity.typeId==='minecraft:zombie')testForm(damagingEntity);
};
});

world.afterEvents.playerInteractWithEntity.subscribe(event=>{//右クリ検知[エンティティを右クリック]
const {player,target,itemStack}=event;

if(target.typeId==='minecraft:zombie'){
    system.run(()=>{testForm(player)})
}
});

world.afterEvents.entityDie.subscribe(event=>{//キル検知[scoreboardでkillというスコアを作る必要あり(作らないと動かない)]
const {damageSource,deadEntity}=event;
    
    if(damageSource.damagingEntity?.typeId=="minecraft:player"){
        if(deadEntity.typeId==="minecraft:player"){
            damageSource.damagingEntity.runCommandAsync("scoreboard players add @s kill 1");
            deadEntity.runCommandAsync("scoreboard players add @s death 1")
            world.sendMessage(`§a${damageSource.damagingEntity.name} §r=> ${deadEntity.name}`);
        }
        if(deadEntity.typeId==="minecraft:zombie"){
            damageSource.damagingEntity.runCommandAsync("scoreboard players add @s kill 1");
            world.sendMessage(`§a${damageSource.damagingEntity.name} §r=> §cZombie`);
        }
    }
})