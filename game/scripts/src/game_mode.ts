import { reloadable } from "./lib/tstl-utils";

const heroSelectionTime = 10;

declare global {
    interface CDOTAGamerules {
        Addon: GameMode;
    }
}

@reloadable
export class GameMode {
    
    public static Precache(this: void, context: CScriptPrecacheContext) {
        PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
        PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);        
    }

    public static Activate(this: void) {
        GameRules.Addon = new GameMode();
    }

    constructor() {
        
        this.configure();
        ListenToGameEvent('npc_spawned',(event)=>this.npc_spawned(event),undefined)
        ListenToGameEvent('dota_player_used_ability',(event)=>this.gCD(event),undefined)
        // ListenToGameEvent("game_rules_state_change",()=>this.state_change(),undefined)  //绑定快捷键新增
        

        // ListenToGameEvent("game_rules_state_change", () => this.game_rules_state_change(), undefined);
        // DOTA_GameState.DOTA_GAMERULES_STATE_INIT
        // DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP

    }

    private configure(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, 3);
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, 3);

        GameRules.SetShowcaseTime(0);     // 是不做一个阶段的展示，就是那个选英雄之后的双方英雄展示
        GameRules.SetHeroSelectionTime(45);    // 是英雄选择时间
    }


    public Reload() {
        print("Script reloaded!");
    }

    npc_spawned(event){
        const hero = EntIndexToHScript(event.entindex ) as CDOTA_BaseNPC_Hero
        for(let i = 1 ; i < 25 ; i++){
            hero.HeroLevelUp(false);
        }
        for(let i = 0 ; i < 25 ; i++){
            const ability = hero.GetAbilityByIndex(i)
            if(ability !=null){
                ability.SetLevel(4)
            }
        }
    }
    gCD(event:GameEventProvidedProperties & DotaPlayerUsedAbilityEvent) {
        const hero = EntIndexToHScript(event.caster_entindex) as CDOTA_BaseNPC_Hero
        for(let i = 0 ; i <=10 ; i++){
            const ability = hero.GetAbilityByIndex(i)
            let abilitycd = ability.GetCooldownTimeRemaining()
            if(abilitycd < 1.5){
                const abilitycdx = 1.5 - abilitycd;
                ability.StartCooldown(abilitycdx);
            }
        }
    }
	
    // 绑定快捷键新增
	state_change(){
       const gamestate = GameRules.State_Get()
       if(gamestate == DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME){
           CustomGameEventManager.Send_ServerToAllClients("gameStart",{})
       }
    }

}