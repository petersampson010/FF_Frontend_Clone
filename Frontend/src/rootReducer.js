import { ActivityIndicator } from "react-native";
import { playersObjToArray } from "./functions/reusable";

const initialState = {
    spinner: false,
    endUser: {
        adminUser: {
            active: false,
            aUser: {},  
            allUsers: [],
        },
        user: {},
    },
    players: {
        clubPlayers: [],
        // latest info, changes that havent been 'confirmed' will not be displayed here
        latest: {
            starters: [],
            subs: [],
            captain: null,
            vCaptain: null
        }, 
        // if any subs or transfers are being made, this is where it will be reflected
        transferring: {
            starters: [],
            subs: [],
            captain: null,
            vCaptain: null,
            budget: null
        },
        // last gw's players
        lastGw: {
            starters: [],
            subs: [],
            captain: null,
            vCaptain: null
        }
    },
    joiners: {
        records: [],
        pgJoiners: [],
        latestUG: null,
    },
    gameweek: {
        games: [],
        gwSelect: null,
        gwLatest: null,
    },
    homeGraphics: {
        league: [],
        topPlayer: null,
        topUser: null
    },
    loginComplete: false,
}


const rootReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'LOGINUSER':
            console.log('here');
            console.log(action.records[0]);
            return {
                ...state,
                endUser: {
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser
                    },
                    user: action.user,
                },
                players: {
                    clubPlayers: action.clubPlayers,
                    latest: {
                        starters: action.latestStarters,
                        subs: action.latestSubs, 
                    },
                    transferring: {
                        starters: action.latestStarters,
                        subs: action.latestSubs, 
                        budget: action.user.budget
                    },
                    lastGw: {
                        starters: action.lastGwStarters,
                        subs: action.lastGwSubs, 
                    }
                },
                joiners: {
                    records: action.records,
                    pgJoiners: action.pgJoiners,
                    ugJoiners: action.ugJoiners,
                    latestUG: action.latestUG,
                },
                gameweek: {
                    ...state.gameweeks,
                    gwLatest: action.gameweek,
                },
                homeGraphics: {
                    league: action.league,
                    topPlayer: action.topPlayer,
                    topUser: action.topUser
                },
                loginComplete: true,
            };
        case 'LOGINADMINUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser,
                        allUsers: action.allUsers
                    }
                },
                players: {
                    ...state.players,
                    clubPlayers: action.clubPlayers
                },
                gameweek: {
                    ...state.gameweek,
                    games: action.games,
                },
                loginComplete: true
            };
        case 'NTS2LOGIN':
            return {
                ...state,
                endUser: {
                    ...state.endUser,
                    user: action.user
                },
                players: {
                    ...state.players,
                    latest: {
                        starters: action.starters,
                        subs: action.subs
                    },
                    transferring: {
                        starters: action.starters,
                        subs: action.subs,
                        budget: action.user.budget
                    }
                },
                joiners: {
                    ...state.joiners,
                    records: action.records
                }
            };
        case 'SETADMINUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser
                    }
                }
            };
        case 'SETCLUBPLAYERS':
            return {
                ...state, 
                players: {
                    ...state.players,
                    clubPlayers: action.players
                }
            };
        case 'SETUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser, 
                    user: action.user
                },
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        budget: action.user.budget
                    }
                }
            };
        case 'RESETTEAMPLAYERS':
            return {
                ...state, 
                players: {
                    ...state.players,
                    latest: {
                        starters: [],
                        subs: []
                    }, 
                    lastGw: {
                        starters: [],
                        subs: []
                    }
                }
            };
        case 'PICKTEAMUPDATE':
            return {
                ...state, 
                players: {
                    ...state.players,
                    starters: playersObjToArray(action.team), 
                    subs: action.subs
                }
            };
        case 'SETGWSELECT':
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    gwSelect: action.game
                }
            };
        case 'COMPLETEGAME':
            let newGames = state.gameweek.games.map(game=>{
                if (game.gameweek_id===action.id) {
                    return {...game, complete: true};
                } else {
                    return game;
                }
            });
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    games: newGames
                }
            };
        case 'ADDGAME':
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    games: [...state.gameweek.games, action.game]
                }
            };
        case 'SETTRANSFERS':
            let starters = action.team.filter(player=>player.sub===false);
            let subs = action.team.filter(player=>player.sub===true);
            return {
                ...state, 
                players: {
                    ...state.players, 
                    latest: {
                        starters, 
                        subs
                    }
                }
            };
        case 'ADDSPINNER':
            return {
                ...state, 
                spinner: true
            }
        case "REMOVESPINNER":
            return {
                ...state, 
                spinner: false
            }
        case "SUBIN":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: [...state.players.transferring.starters, action.player],
                        subs: state.players.transferring.subs.filter(x=>x!==action.player)
                    }
                }
            }
        case "SUBOUT":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: state.players.transferring.starters.filter(x=>x!==action.player),
                        subs: [...state.players.transferring.subs, action.player]
                    }
                }
            }
        case "TRANSFERIN":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: [...state.players.transferring.starters, action.player],
                        budget: state.players.transferring.budget-action.player.price
                    }
                }
            }
        case "TRANSFEROUT":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.transferring,
                        starters: state.players.transferring.starters.filter(x=>x!==action.player),
                        subs: state.players.transferring.subs.filter(x=>x!==action.player),
                        budget: state.players.transferring.budget+action.player.price
                    }
                }
            }
        case "SETCAPTAIN":
            return {
                ...state,
                players: {
                    ...state.players,
                    latest: {
                        ...state.players.latest,
                        captain: action.player
                    }
                }
            }
        case "SETVCAPTAIN":
            return {
                ...state,
                players: {
                    ...state.players,
                    latest: {
                        ...state.players.latest,
                        captain: action.player
                    }
                }
            }
        case "SETTRANSFERRINGBACKTOLATEST":
            return {
                ...state,
                players: {
                    ...state.players,
                    transferring: {
                        ...state.players.latest,
                        budget: state.endUser.user.budget
                    }
                }
            };
        case "SETLATESTTOTRANSFERRING":
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    user: {
                        ...state.user,
                        budget: state.players.transferring.budget
                    }
                },
                players: {
                    ...state.players,
                    latest: state.players.transferring
                }
            }
        default:
            return state;
    }
}

export default rootReducer;