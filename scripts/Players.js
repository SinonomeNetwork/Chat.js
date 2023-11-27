import {world,system} from "@minecraft/server";
import {MessageFormData,ModalFormData,ActionFormData} from "@minecraft/server-ui";
import {premission,dimension,TrueSound,TrueSoundConf,FalseSound} from './library/lib.js';

world.beforeEvents.playerBreakBlock.subscribe(event=>{
    const {player,itemStack,block} = event;
    if(block.typeId&&!player.hasTag(premission)){
        event.cancel=true;
        system.run(()=>{
            player.sendMessage("§cHey! §7Sorry, but you can't break that block here.");
            player.playSound(FalseSound,{pitch:1.0,volume:50});
        });
    };

});

world.beforeEvents.playerInteractWithBlock.subscribe(event=>{//右クリでGUIが出てくるのを阻止
    const {player,block,itemStack,blockFace,faceLocation}=event;

    const blocks=[
        "minecraft:crafting_table",
        "minecraft:cartography_table",
        "minecraft:smithing_table",
        "minecraft:campfire",
        "minecraft:soul_campfire",
        "minecraft:furnace",
        "minecraft:blast_furnace",
        "minecraft:smoker",
        "minecraft:respawn_anchor",
        "minecraft:brewing_stand",
        "minecraft:anvil",
        "minecraft:grindstone",
        "minecraft:enchanting_table",
        "minecraft:chiseled_bookshelf",
        "minecraft:cauldron",
        "minecraft:composter",
        "minecraft:stonecutter_block",
        "minecraft:hopper",
        "minecraft:dropper",
        "minecraft:dispenser",
        "minecraft:loom",
        "minecraft:mob_spawner",
        "minecraft:lodestone",
        "minecraft:daylight_detector",
        "minecraft:wooden_door",//ドア
        "minecraft:spruce_door",
        "minecraft:birch_door",
        "minecraft:jungle_door",
        "minecraft:acacia_door",
        "minecraft:dark_oak_door",
        "minecraft:mangrove_door",
        "minecraft:cherry_door",
        "minecraft:bamboo_door",
        "minecraft:crimson_door",
        "minecraft:warped_door",
        "minecraft:trapdoor",//トラップドア
        "minecraft:spruce_trapdoor",
        "minecraft:birch_trapdoor",
        "minecraft:jungle_trapdoor",
        "minecraft:acacia_trapdoor",
        "minecraft:dark_oak_trapdoor",
        "minecraft:mangrove_trapdoor",
        "minecraft:cherry_trapdoor",
        "minecraft:bamboo_trapdoor",
        "minecraft:crimson_trapdoor",
        "minecraft:warped_trapdoor",
        "minecraft:fence_gate",//フェンスゲート
        "minecraft:spruce_fence_gate",
        "minecraft:birch_fence_gate",
        "minecraft:jungle_fence_gate",
        "minecraft:acacia_fence_gate",
        "minecraft:dark_oak_fence_gate",
        "minecraft:mangrove_fence_gate",
        "minecraft:cherry_fence_gate",
        "minecraft:bamboo_fence_gate",
        "minecraft:crimson_fence_gate",
        "minecraft:warped_fence_gate"
    ]
    if(!player.hasTag(premission)){
        if(blocks.includes(block.typeId))event.cancel=true;
    }
});