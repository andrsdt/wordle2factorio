import each from 'jest-each';
import { Wordle } from '../Converter';
import { Blueprint } from '../types';

/**
 * @author andrsdt
 */
describe('Converter functionality', () => {
  let output: Blueprint;

  beforeAll(() => {
    output = {
      blueprint: {
        icons: [
          { signal: { type: 'item', name: 'logistic-chest-buffer' }, index: 1 },
          {
            signal: { type: 'item', name: 'logistic-chest-passive-provider' },
            index: 2,
          },
          {
            signal: { type: 'item', name: 'logistic-chest-storage' },
            index: 3,
          },
        ],
        entities: [
          {
            entity_number: 1,
            name: 'logistic-chest-buffer',
            position: { x: 0, y: 0 },
          },
          {
            entity_number: 2,
            name: 'logistic-chest-passive-provider',
            position: { x: 1, y: 0 },
          },
          {
            entity_number: 3,
            name: 'logistic-chest-passive-provider',
            position: { x: 2, y: 0 },
          },
          {
            entity_number: 4,
            name: 'logistic-chest-passive-provider',
            position: { x: 3, y: 0 },
          },
          {
            entity_number: 5,
            name: 'logistic-chest-buffer',
            position: { x: 4, y: 0 },
          },
          {
            entity_number: 6,
            name: 'logistic-chest-buffer',
            position: { x: 0, y: 1 },
          },
          {
            entity_number: 7,
            name: 'logistic-chest-buffer',
            position: { x: 1, y: 1 },
          },
          {
            entity_number: 8,
            name: 'logistic-chest-buffer',
            position: { x: 2, y: 1 },
          },
          {
            entity_number: 9,
            name: 'logistic-chest-passive-provider',
            position: { x: 3, y: 1 },
          },
          {
            entity_number: 10,
            name: 'logistic-chest-buffer',
            position: { x: 4, y: 1 },
          },
          {
            entity_number: 11,
            name: 'logistic-chest-buffer',
            position: { x: 0, y: 2 },
          },
          {
            entity_number: 12,
            name: 'logistic-chest-buffer',
            position: { x: 1, y: 2 },
          },
          {
            entity_number: 13,
            name: 'logistic-chest-storage',
            position: { x: 2, y: 2 },
          },
          {
            entity_number: 14,
            name: 'logistic-chest-passive-provider',
            position: { x: 3, y: 2 },
          },
          {
            entity_number: 15,
            name: 'logistic-chest-buffer',
            position: { x: 4, y: 2 },
          },
          {
            entity_number: 16,
            name: 'logistic-chest-buffer',
            position: { x: 0, y: 3 },
          },
          {
            entity_number: 17,
            name: 'logistic-chest-buffer',
            position: { x: 1, y: 3 },
          },
          {
            entity_number: 18,
            name: 'logistic-chest-buffer',
            position: { x: 2, y: 3 },
          },
          {
            entity_number: 19,
            name: 'logistic-chest-buffer',
            position: { x: 3, y: 3 },
          },
          {
            entity_number: 20,
            name: 'logistic-chest-buffer',
            position: { x: 4, y: 3 },
          },
        ],
        item: 'blueprint',
        version: 281479275151360,
      },
    };
  });

  it('should create a blueprint for a common wordle copypaste', () => {
    const input = `
    Wordle (ES) #27 4/6

    🟩⬜⬜⬜🟩
    🟩🟩🟩⬜🟩
    🟩🟩🟨⬜🟩
    🟩🟩🟩🟩🟩

    wordle.danielfrg.com
    `;

    const wordle = new Wordle(input);
    expect(wordle.blueprint).toEqual(output);
  });

  it('should create a blueprint from a wordle copypaste without header and footer', () => {
    const input = `
    🟩⬜⬜⬜🟩
    🟩🟩🟩⬜🟩
    🟩🟩🟨⬜🟩
    🟩🟩🟩🟩🟩
    `;

    const wordle = new Wordle(input);
    expect(wordle.blueprint).toEqual(output);
  });

  each([
    `
    🟩⬜⬜⬜🟩
    🟩🟩🟩⬜🟩
    🟩🟩🟨⬜🟩
    🟩🟩🟩🟩
    `,
    `
      ⬜⬜⬜🟩
    🟩🟩🟩⬜🟩
    🟩🟩🟨⬜🟩
    🟩🟩🟩🟩🟩
    `,
    `
    ⬜⬜⬜⬜🟩
    🟩🟩  ⬜🟩
    🟩🟩🟨⬜🟩
    `,
    `
    asdfg
    qwert
    zxcvb
    `,
  ]).it('should throw an error on a wordle with wrong format', input => {
    expect(() => new Wordle(input)).toThrow('Wordle is not valid');
  });
});
