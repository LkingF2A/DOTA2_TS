import React from 'react';
import { render } from 'react-panorama';
import { ReactLogo } from './components/react_panorama';
import { KuaiJieJianKongZhiQi } from './react_kuaijiejiankongzhiqi';

render(<KuaiJieJianKongZhiQi />, $.GetContextPanel()); // 默认在中间渲染的红色REACT-PANORAMA标志，从这里开始修改为你自己喜欢的

(() => {

    //绑定快捷键测试
    const excuteAbility1 = (i:number) => {
        // $.Msg("press Q")
        const player = Players.GetLocalPlayer() //找到本地玩家 
        const hero = Players.GetPlayerHeroEntityIndex(player) // 将本地玩家的英雄索引赋值给hero
        const ability = Entities.GetAbility(hero,i)  //将hero的第0个技能索引赋值给ability
        return () => Abilities.ExecuteAbility(ability,hero,false)  //尝试释放ABILITY
    }

    $.Schedule(40,()=>{
        for(let i = 0;i<=11;i++){
            $.Msg("press XXXXX")
            Game.AddCommand("+Ability" + i,excuteAbility1(i),"",0)
        }
    // Game.AddCommand("+Ability1",excuteAbility1(i),"",0)
    // $.Msg("press XXXXX")
    })

    // GameEvents.Subscribe("gameStart",()=>{
    //     $.Msg("打印测试")
    //     Game.AddCommand("+Ability1",excuteAbility1,"",0)
    //     $.Msg("press XXXXX")
    // })

    // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false); // 你也可以按你之前喜欢的方式写代码
    // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);

    //【新增】屏蔽天赋
    function hidePanel(PanelID:string){
        return $.GetContextPanel().GetParent()?.GetParent()?.GetParent()?.FindChildTraverse(PanelID)
    } 
    const panel = hidePanel("StatBranch") as Panel
    const mojing = hidePanel("AghsStatusContainer") as Panel
    panel.style.visibility = "collapse"
    mojing.style.visibility = 'collapse'
})();



// $.Schedule(10,()=>{
//     Game.AddCommand("+Ability1",excuteAbility1,"",0)
//     $.Msg("press XXXXX")
// })



// ()=>{Abilities.ExecuteAbility("Ability1",{cuurent:ture})}
