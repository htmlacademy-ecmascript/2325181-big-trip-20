const mockDestinations = [
  {
    id: '1Ams',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://loremflickr.com/320/240/Amsterdam',
        description: 'City at night',
      },
      {
        src: 'https://loremflickr.com/320/240/Amsterdam',
        description: 'City at daylight',
      },
    ]
  },
  {
    id: '2Cham',
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://loremflickr.com/320/240/Chamonix',
        description: 'City at night',
      },
      {
        src: 'https://loremflickr.com/320/240/Chamonix',
        description: 'City at daylight',
      },
    ]
  },
  {
    id: '3Gen',
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://loremflickr.com/320/240/Geneva',
        description: 'City at night',
      },
      {
        src: 'https://loremflickr.com/320/240/Geneva',
        description: 'City at daylight',
      },
    ]
  }
];

function getAllDestinations () {
  return mockDestinations;
}

export {getAllDestinations};
