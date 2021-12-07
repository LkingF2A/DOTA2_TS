import { Timers } from "../lib/timers";

export class winter {
    constructor() {
        this.register_timer();
    };

    register_timer() {
        Timers.CreateTimer(() => {
            this.time++;

            for (let i = 0; i < 24; i++) {
                const player = PlayerResource.GetPlayer(i as PlayerID);
                if (player) {
                    const team = player.GetTeam();
                }
            }

            if (this.time = 900) {
                let tianhui = 0;
                let yeyan = 0;
                for (let i = 0; i < 24; i++) {
                    const player = PlayerResource.GetPlayer(i as PlayerID);
                    if (player) {
                        const team = player.GetTeam();
                        const hero = player.GetAssignedHero();
                        if (team == DOTATeam_t.DOTA_TEAM_BADGUYS && hero.IsAlive()) {
                            yeyan ++;
                        }
                        if (team == DOTATeam_t.DOTA_TEAM_GOODGUYS && hero.IsAlive()) {
                            tianhui ++;
                        }
                    }
                }
                if (yeyan > tianhui ) {
                    GameRules.SetGameWinner(DOTATeam_t.DOTA_TEAM_BADGUYS);
                } else {
                    GameRules.SetGameWinner(DOTATeam_t.DOTA_TEAM_GOODGUYS);
                }
            }

            if(){}

            return 1;
        });
    };
    time: number = 0;
}