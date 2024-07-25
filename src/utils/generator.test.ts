import { expect, test } from 'vitest';
import { testExports } from './generator';

test('Generates correct grille with predefined seed of top left and bottom right corners for size 4', () => {
  const size = 4;
  const seed1 = [0, 0, 0, 0];
  const seed2 = [2, 2, 2, 2];

  expect(testExports.generateGrille(size, seed1)).toEqual([
    [true, true, false, false],
    [true, true, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  expect(testExports.generateGrille(size, seed2)).toEqual([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, true, true],
    [false, false, true, true],
  ]);
});

test('Generates correct grille with predefined seed', () => {
  const size = 4;
  const seed1 = [0, 1, 2, 3];
  const seed2 = [3, 2, 1, 0];

  expect(testExports.generateGrille(size, seed1)).toEqual([
    [true, false, false, false],
    [false, false, false, true],
    [false, true, false, true],
    [false, false, false, false],
  ]);

  expect(testExports.generateGrille(size, seed2)).toEqual([
    [false, false, true, false],
    [false, true, false, false],
    [false, false, false, false],
    [true, false, true, false],
  ]);
});
