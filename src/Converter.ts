import Pako from 'pako';
import { TextEncoder } from 'util';
import { BASE_BLUEPRINT } from './constants';
import { Blueprint, Entity } from './types';

export class Wordle {
  public parsedInput: string[][];

  public get blueprint(): Blueprint {
    return this.toJSON(this.parsedInput);
  }

  public get encoded(): string {
    return this.encode(this.blueprint);
  }

  constructor(input: string) {
    this.parsedInput = this.parseInput(input);
  }

  /**
   *
   * @param input Wordle copypaste
   * @returns 2d matrix of the wordle result
   */
  private parseInput = (input: string): string[][] => {
    const parsed: string[][] = input
      .split('\n')
      .map(line => line.trim())
      .filter(line =>
        ['🟩', '🟨', '⬜'].some(square => line.startsWith(square)),
      )
      .map(line =>
        line
          .replaceAll('🟩', 'G')
          .replaceAll('🟨', 'Y')
          .replaceAll('⬜', 'W')
          .split(''),
      );

    if (
      parsed.length === 0 ||
      !parsed.flat().every(square => ['G', 'Y', 'W'].includes(square)) ||
      !parsed.every(line => line.length === parsed[0].length)
    ) {
      throw new SyntaxError('Wordle is not valid');
    }

    return parsed;
  };
  /**
   *
   * @param input Parsed wordle input
   * @returns Object with the structure of a Factorio blueprint
   */
  private toJSON = (input: string[][]): Blueprint => {
    const res = BASE_BLUEPRINT;
    let entity_number = 1;
    const entities: Entity[] = [];

    input.forEach((row, idxRow) => {
      row.forEach((square, idxCol) => {
        const entity: Entity = {
          entity_number: entity_number++,
          name: '',
          position: {
            x: idxCol,
            y: idxRow,
          },
        };

        if (square === 'G') {
          entity.name = 'logistic-chest-buffer';
        } else if (square === 'Y') {
          entity.name = 'logistic-chest-storage';
        } else if (square === 'W') {
          entity.name = 'logistic-chest-passive-provider';
        } else {
          throw new SyntaxError('Wordle is not valid'); // TODO redundant?
        }
        entities.push(entity);
      });
    });
    res.blueprint.entities = entities;
    return res;
  };

  /**
   *
   * @param input Factorio blueprint JSON
   * @returns base64 encoded blueprint, ready to use in Factorio
   */
  private encode = (input: Blueprint): string => {
    const inputJSON = JSON.stringify(input);
    const enc = new TextEncoder().encode(inputJSON);
    const zip = Pako.deflate(enc, { level: 9 });
    const base64Text = Buffer.from(zip).toString('base64');
    return '0' + base64Text;
  };
}
