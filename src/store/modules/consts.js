const state = {
  swissCantons: [
    {
      'value': 'AG',
      'label': 'Aargau',
      'lang': 'DE'
    },
    {
      'value': 'AR',
      'label': 'Appenzell Ausserhoden',
      'lang': 'DE'
    },
    {
      'value': 'AI',
      'label': 'Appenzell Innerhoden',
      'lang': 'DE'
    },
    {
      'value': 'BS',
      'label': 'Basel-Stadt',
      'lang': 'DE'
    },
    {
      'value': 'BL',
      'label': 'Basel-Land',
      'lang': 'DE'
    },
    {
      'value': 'BE',
      'label': 'Bern',
      'lang': 'DE'
    },
    {
      'value': 'FR',
      'label': 'Freiburg',
      'lang': 'DE'
    },
    {
      'value': 'GL',
      'label': 'Glarus',
      'lang': 'DE'
    },
    {
      'value': 'GR',
      'label': 'Graubunden',
      'lang': 'RM'
    },
    {
      'value': 'JU',
      'label': 'Jura',
      'lang': 'FR'
    },
    {
      'value': 'LU',
      'label': 'Luzern',
      'lang': 'DE'
    },
    {
      'value': 'SG',
      'label': 'St. Gallen',
      'lang': 'DE'
    },
    {
      'value': 'SZ',
      'label': 'Schwyz',
      'lang': 'DE'
    },
    {
      'value': 'SH',
      'label': 'Schaffhausen',
      'lang': 'DE'

    },
    {
      'value': 'SO',
      'label': 'Solothun',
      'lang': 'DE'
    },
    {
      'value': 'TI',
      'label': 'Ticino',
      'lang': 'IT'
    },
    {
      'value': 'TG',
      'label': 'Thurgau',
      'lang': 'DE'
    },
    {
      'value': 'UR',
      'label': 'Uri',
      'lang': 'DE'
    },
    {
      'value': 'NW',
      'label': 'Unterwalden Nidwalden',
      'lang': 'DE'
    },
    {
      'value': 'OW',
      'label': 'Unterwalden Obwalden',
      'lang': 'DE'
    },
    {
      'value': 'VD',
      'label': 'Vaud',
      'lang': 'FR'
    },
    {
      'value': 'VS',
      'label': 'Valais',
      'lang': 'DE'
    },
    {
      'value': 'ZG',
      'label': 'Zug',
      'lang': 'DE'
    },
    {
      'value': 'ZH',
      'label': 'Zurich',
      'lang': 'DE'
    }
  ],
  otherRegions: [
    {
      'value': 'ANDERES',
      'label': 'Anderes Land',
      'lang': '?'
    },
    {
      'value': 'GE',
      'label': 'Geneva',
      'lang': 'FR'
    },
    {
      'value': 'NE',
      'label': 'Neuchatel',
      'lang': 'FR'
    }
  ],
  ageRange: [
    {
      'value': '0-11',
      'label': 'Unter 12'
    },
    {
      'value': '12-17',
      'label': 'Zwischen 12 und 17'
    },
    {
      'value': '18-24',
      'label': 'Zwischen 18 und 24'
    },
    {
      'value': '25-34',
      'label': 'Zwischen 25 und 34'
    },
    {
      'value': '35-44',
      'label': 'Zwischen 35 und 44'
    },
    {
      'value': '45-54',
      'label': 'Zwischen 45 und 54'
    },
    {
      'value': '55-64',
      'label': 'Zwischen 55 und 64'
    },
    {
      'value': '65-74',
      'label': 'Zwischen 65 und 74'
    },
    {
      'value': '75+',
      'label': 'Über 75'
    }
  ],
  specialChars: [ "e̊", "ĕ", "nbsp;͜" ,"i̇̄", "üö", "öü", "'", "ạ̈", "m̄", ">", "&", "e̍", "eh", "e̥", "?", "!" ]
  // specialChars: [ "e̊", "ĕ", "nbsp" ,"i̇̄,", "üö", "öü", "ạ̈", "m̄", "e̥" ]
}

export default {
  namespaced: true,
  state
}
