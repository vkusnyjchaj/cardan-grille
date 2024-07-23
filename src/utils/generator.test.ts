import { expect, test } from 'vitest';
import { testExports } from './generator';

test('Generates correct grille with predefined seed for size 4', () => {
  const size = 4;
  const seed = [0, 0, 0, 0];

  expect(testExports.generateGrille(size, seed)).toEqual([
    [true, true, false, false],
    [true, true, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);
})