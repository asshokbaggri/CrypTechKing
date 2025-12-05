CrypTechKing/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── chains.js
│   │   │
│   │   ├── services/
│   │   │   ├── whale/
│   │   │   │   ├── whale.listener.js
│   │   │   │   └── whale.parser.js
│   │   │   │
│   │   │   ├── pump/
│   │   │   │   ├── pump.scanner.js
│   │   │   │   └── pump.score.js
│   │   │   │
│   │   │   └── alerts/
│   │   │       ├── telegram.bot.js
│   │   │       └── twitter.bot.js
│   │   │
│   │   ├── api/
│   │   │   ├── whales.api.js
│   │   │   ├── pump.api.js
│   │   │   └── coin.api.js
│   │   │
│   │   ├── database/
│   │   │   ├── models/
│   │   │   │   ├── WhaleTx.model.js
│   │   │   │   ├── PumpTrend.model.js
│   │   │   │   └── TokenMeta.model.js
│   │   │   │
│   │   │   ├── queries/
│   │   │   └── db.js
│   │   │
│   │   ├── utils/
│   │   │   ├── redis.js
│   │   │   ├── websocket.js
│   │   │   └── helpers.js
│   │   │
│   │   └── index.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.jsx
│   │   │   ├── whales.jsx
│   │   │   ├── pump.jsx
│   │   │   └── coin.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── WhaleCard.jsx
│   │   │   ├── PumpCard.jsx
│   │   │   └── TokenStats.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useLiveFeed.js
│   │   │
│   │   ├── styles/
│   │   │   └── main.css
│   │   │
│   │   └── utils/
│   │       └── api.js
│   │
│   └── package.json
│
├── bots/
│   ├── telegram/
│   │   └── whale.alert.js
│   │
│   └── twitter/
│       └── autopost.js
│
├── README.md
└── .gitignore
