const quests = [
  {
    id: 0,
    name: 'Helping Hand',
    description: 'Get $ / $ / $ assists in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_6.jpg',
    // completed: {
    //   completedTimestamp: ,
    //   matchid: ,
    //   playerid: ,
    //   completionLevel: 
    // },
    // dataPaths: [],
    requirements: [
      {
        type: 'more than',
        displayValues: [15, 20, 25],
        values: [15, 20, 25],
        path: 'participants/$participantIndex/stats/assists'
      },
    ],
    // nextQuests: []
  },
  {
    id: 1,
    name: 'Hellrazer',
    description: 'Deal $ / $ / $ damage to objectives in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shyvana_0.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: ['10k', '15k', '20k'],
        values: [10000, 15000, 20000],
        path: 'participants/$participantIndex/stats/damageDealtToObjectives'
      }
    ],
  },
  {
    id: 2,
    name: 'The Fields Have Eyes',
    description: 'Place $ / $ / $ wards in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_0.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [25, 35, 45],
        values: [25, 35, 45],
        path: 'participants/$participantIndex/stats/wardsPlaced'
      }
    ],
  },
  {
    id: 3,
    name: 'Lights Out',
    description: 'Kill $ / $ / $ wards in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 1
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nocturne_2.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [10, 15, 20],
        values: [10, 15, 20],
        path: 'participants/$participantIndex/stats/wardsKilled'
      }
    ],
  },
  {
    id: 4,
    name: 'Have a Banana',
    description: 'Heal champions for $ / $ / $ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 1
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kennen_4.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: ['10k', '15k', '20k'],
        values: [10000, 15000, 20000],
        path: 'participants/$participantIndex/stats/totalHeal'
      }
    ],
  },
  {
    id: 5,
    name: 'Hold Em Steady!',
    description: 'Crowd control enemies for $ / $ / $ seconds in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 1
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_3.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [60, 90, 120],
        values: [60, 90, 120],
        path: 'participants/$participantIndex/stats/timeCCingOthers'
      }
    ],
  },
  {
    id: 6,
    name: 'Deuces!',
    description: 'Get $ / $ / $ Double Kills in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 2
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_6.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [1, 2, 3],
        values: [1, 2, 3],
        path: 'participants/$participantIndex/stats/doubleKills'
      }
    ],
  },
  {
    id: 7,
    name: 'Bullets N Blades',
    description: 'Deal $ / $ / $ physical damage to champions in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 2
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_6.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: ['25k', '30k', '35k'],
        values: [25000, 30000, 35000],
        path: 'participants/$participantIndex/stats/physicalDamageDealtToChampions'
      }
    ],
  },
  {
    id: 8,
    name: 'Demolition Man',
    description: 'Last hit $ / $ / $ turrets in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 2
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_2.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [2, 3, 4],
        values: [2, 3, 4],
        path: 'participants/$participantIndex/stats/turretKills'
      }
    ],
  },
  {
    id: 9,
    name: 'Dragon Slayer',
    description: 'As a team, kill $ / $ / $ dragons in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 3
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_2.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [1, 2, 3],
        values: [1, 2, 3],
        path: 'teams/$team/dragonKills'
      }
    ],
  },
  {
    id: 10,
    name: 'Hella Buff',
    description: 'As a team, get $ / $ / $ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 3
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_4.jpg',
    requirements: [
      {
        type: 'multipath bool',
        displayValues: ['First Herald', 'First Dragon', 'First Baron'],
        values: ['firstHerald', 'firstDragon', 'firstBaron'],
        paths: [
          'teams/$team/'
        ]
      }
    ],
  },
  {
    id: 11,
    name: 'Flat Earth Society',
    description: 'Flatten $ / $ / $ enemy turrets in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 3
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_1.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [7, 9, 'all'],
        values: [7, 9, 11],
        path: 'teams/$team/towerKills'
      }
    ]
  },
  {
    id: 12,
    name: 'Legendary Loot',
    description: 'End the game with $ / $ / $ items',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_3.jpg',
    requirements: [
      {
        type: 'multipath bool',
        displayValues: [4, 5, 6],
        values: [4, 5, 6],
        path: ''
      }
    ],
  },
  {
    id: 13,
    name: 'Spellbound',
    description: 'Deal $ / $ / $ magic damage to champions in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg',
    // completed: {
    //   completedTimestamp: ,
    //   matchid: ,
    //   playerid: ,
    //   completionLevel: 
    // },
    // dataPaths: [],
    requirements: [
      {
        type: 'more than',
        displayValues: ['25k', '30k', '35k'],
        values: [25000, 30000, 35000],
        path: 'participants/$participantIndex/stats/magicDamageDealtToChampions'
      }
    ],
    // nextQuests: []
  },
  {
    id: 14,
    name: 'Powder Keg',
    description: 'Deal $ / $ / $ true damage to champions in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_1.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: ['5k', '10k', '15k'],
        values: [5000, 10000, 15000],
        path: 'participants/$participantIndex/stats/trueDamageDealtToChampions'
      }
    ],
  },
  {
    id: 15,
    name: 'Do You Feel Lucky?',
    description: 'Get a critical strike over $ / $ / $ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 1
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Graves_1.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [800, 1000, 1200],
        values: [800, 1000, 1200],
        path: 'participants/$participantIndex/stats/largestCriticalStrike'
      }
    ],
  },
  {
    id: 16,
    name: 'Midas Touch',
    description: 'Earn $ / $ / $ gold in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 1
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_2.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: ['15k', '18k', '20k'],
        values: [15000, 18000, 20000],
        path: 'participants/$participantIndex/stats/goldEarned'
      }
    ],
  },
  {
    id: 17,
    name: 'Monster Hunter',
    description: 'Kill $ / $ / $ neutral monsters in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 1
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Chogath_6.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [75, 100, 125],
        values: [75, 100, 125],
        path: 'participants/$participantIndex/stats/neutralMinionsKilled'
      }
    ],
  },
  {
    id: 18,
    name: 'Bling Bling, Mother Clucker!',
    description: 'Get $ / $ / $ gold per minute in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 2
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Anivia_7.jpg',
    requirements: [
      {
        type: 'division',
        displayValues: [300, 400, 500],
        values: [300, 400, 500],
        paths: [
          'participants/$participantIndex/stats/goldEarned',
          'gameDuration'
        ]
      }
    ],
  },
  {
    id: 19,
    name: 'Highway Robbery',
    description: 'Get more than $ / $ / $ CS in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 2
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_1.jpg',
    requirements: [
      {
        type: 'addition',
        displayValues: [200, 275, 350],
        values: [200, 275, 350],
        paths: [
          'participants/$participantIndex/stats/totalMinionsKilled',
          'participants/$participantIndex/stats/neutralMinionsKilled'
        ]
      }
    ],
  },
  {
    id: 20,
    name: 'Headhunter',
    description: 'Get more than $ / $ / $ kills in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 2
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_5.jpg',
    // completed: {
    //   completedTimestamp: ,
    //   matchid: ,
    //   playerid: ,
    //   completionLevel: 
    // },
    // dataPaths: [],
    requirements: [
      {
        type: 'more than',
        displayValues: [9, 12, 16],
        values: [9, 12, 16],
        path: 'participants/$participantIndex/stats/kills'
      }
    ],
    // nextQuests: []
  },
  {
    id: 21,
    name: 'Hoarder',
    description: 'Win the game with $ / $ / $ unspent gold',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 3
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_4.jpg',
    requirements: [
      {
        type: 'subtraction',
        displayValues: [800, 1400, 2000],
        values: [800, 1400, 2000],
        paths: [
          'participants/$participantIndex/stats/goldEarned',
          'participants/$participantIndex/stats/goldSpent'
        ]
      }
    ],
  },
  {
    id: 22,
    name: 'Knock Knock!',
    description: 'Personally get $ / $ / $ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 3
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Graves_4.jpg',
    requirements: [
      {
        type: 'multipath bool',
        displayValues: ['First Blood', 'First Tower', 'First Inhib'],
        values: ['firstBlood', 'firstTower', 'firstInhib'],
        path: 'participants/$participantIndex/stats/'
      }
    ],
  },
  {
    id: 23,
    name: 'Can\'t Touch This!',
    description: 'Die no more than $ / $ / $ times in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 3
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_2.jpg',
    requirements: [
      {
        type: 'less than',
        displayValues: [4, 2, 0],
        values: [4, 2, 0],
        path: 'participants/$participantIndex/stats/deaths'
      }
    ],
  },
  {
    id: 24,
    name: 'Sharing Is Caring',
    description: 'Heal $ / $ / $ units in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rakan_0.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [10, 15, 20],
        values: [10, 15, 20],
        path: 'participants/$participantIndex/stats/totalUnitsHealed'
      }
    ],
  },
  {
    id: 25,
    name: 'This Won\'t Hurt, I Promise',
    description: 'Take $ / $ / $ damage in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_4.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: ['30k', '40k', '50k'],
        values: [30000, 40000, 50000],
        path: 'participants/$participantIndex/stats/totalDamageTaken'
      }
    ],
  },
  {
    id: 26,
    name: 'Definitely Not a Fighter',
    description: 'Stay alive for $ / $ / $ consecutive minutes without dying',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 2,
      left: 0
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_5.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [10, 15, 20],
        values: [600, 900, 1200],
        path: 'participants/$participantIndex/stats/longestTimeSpentLiving'
      }
    ],
  },
  {
    id: 27,
    name: 'Un-Inhibited',
    description: 'As a team, kill $ / $ / $ enemy inhibitors in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 0,
      left: 1
    },
    backgroundImg: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taric_2.jpg',
    requirements: [
      {
        type: 'more than',
        displayValues: [3, 5, 7],
        values: [3, 5, 7],
        path: 'teams/$team/inhibitorKills'
      }
    ],
  },
  {
    id: 28,
    name: 'What Lies Beneath',
    description: 'As a team, kill Baron Nashor $ / $ / $ times in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 1,
      left: 1
    },
    backgroundImg: 'https://na.leagueoflegends.com/sites/default/files/styles/scale_large/public/upload/art/akali_vs_baron_3.jpg?itok=dTIf4Bj1',
    requirements: [
      {
        type: 'more than',
        displayValues: [1, 2, 3],
        values: [1, 2, 3],
        path: 'teams/$team/baronKills'
      }
    ],
  },
]

const tristanasQuests = {
  cardTitle: 'Tristana\'s Buckaneers',
  cardBackground: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Tristana_6.jpg',
  cardColor: '#1f1f3d',
  quests: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11]
}

const nocturnesQuests = {
  cardTitle: 'Nocturne\'s Nightwatch',
  cardBackground: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nocturne_5.jpg',
  cardColor: '#5b0e0e',
  quests: [13, 14, 15, 16, 17, 20, 23]
}

const singedsQuests = {
  cardTitle: 'Nami\'s Tidecallers',
  cardBackground: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nami_0.jpg',
  cardColor: '#193700',
  quests: [24, 25, 26, 27, 28]
}

const stubQuestList = {
  questCards: [
    tristanasQuests,
    nocturnesQuests,
    singedsQuests 
  ],
  quests
}

export {
  stubQuestList
}