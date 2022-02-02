import { Blueprint } from './types';

export const BASE_BLUEPRINT: Blueprint = {
  blueprint: {
    icons: [
      {
        signal: {
          type: 'item',
          name: 'logistic-chest-buffer',
        },
        index: 1,
      },
      {
        signal: {
          type: 'item',
          name: 'logistic-chest-passive-provider',
        },
        index: 2,
      },
      {
        signal: {
          type: 'item',
          name: 'logistic-chest-storage',
        },
        index: 3,
      },
    ],
    entities: [],
    item: 'blueprint',
    version: 281479275151360,
  },
};
