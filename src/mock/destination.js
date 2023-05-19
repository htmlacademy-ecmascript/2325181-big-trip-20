const mockDestinations = [
  {
    id: '1Ams',
    description: 'Amsterdam was founded at the mouth of the Amstel River that was dammed to control flooding; the city\'s name derives from the a local linguistic variation of the word dam. Originally a small fishing village in the late 12th century, Amsterdam became a major world port during the Dutch Golden Age of the 17th century, when the Netherlands was an economic powerhouse. ',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://loremflickr.com/320/240/Amsterdam,panorama,night/all',
        description: 'City at night',
      },
      {
        src: 'https://loremflickr.com/320/240/Amsterdam,panorama/all',
        description: 'City at daylight',
      },
    ]
  },
  {
    id: '2Cham',
    description: 'Situated to the north of Mont Blanc, between the peaks of the Aiguilles Rouges and the notable Aiguille du Midi, Chamonix is one of the oldest ski resorts in France. The Chamonix commune is popular with skiers and mountain enthusiasts. Via the cable car lift to the Aiguille du Midi it is possible to access the off-piste (backcountry) ski run of the Vallée Blanche.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://loremflickr.com/320/240/Chamonix,panorama,night',
        description: 'City at night',
      },
      {
        src: 'https://loremflickr.com/320/240/Chamonix,panorama',
        description: 'City at daylight',
      },
    ]
  },
  {
    id: '3Gen',
    description: 'Geneva is a global city, a financial centre, and a worldwide centre for diplomacy due to the presence of numerous international organizations, including the headquarters of many agencies of the United Nations and the Red Cross. Geneva hosts the highest number of international organizations in the world. It is also where the Geneva Conventions were signed, which chiefly concern the treatment of wartime non-combatants and prisoners of war. ',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://loremflickr.com/320/240/Geneva,panorama,night',
        description: 'City at night',
      },
      {
        src: 'https://loremflickr.com/320/240/Geneva,panorama',
        description: 'City at daylight',
      },
    ]
  }
];

function getAllDestinations () {
  return mockDestinations;
}

export {getAllDestinations};
