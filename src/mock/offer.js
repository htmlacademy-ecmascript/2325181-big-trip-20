import {getRandomValue} from '../utils.js';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Upgrade taxi one',
        price: getRandomValue(200),
      },
      {
        id: '2',
        title: 'Upgrade taxi two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '1',
        title: 'Upgrade bus one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade bus two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '1',
        title: 'Upgrade train one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade train two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: '1',
        title: 'Upgrade ship one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade ship two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '1',
        title: 'Upgrade drive one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade drive two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '1',
        title: 'Upgrade flight one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade flight two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '1',
        title: 'Upgrade check-in one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade check-in two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '1',
        title: 'Upgrade sightseeing one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade sightseeing two',
        price: getRandomValue(200)
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '1',
        title: 'Upgrade restaurant one',
        price: getRandomValue(200)
      },
      {
        id: '2',
        title: 'Upgrade restaurant two',
        price: getRandomValue(200)
      }
    ]
  }
];

function getAllOffers () {
  return mockOffers;
}

export {getAllOffers};
