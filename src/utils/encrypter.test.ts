import { expect, test } from 'vitest';
import { testExports } from './encrypter';

test('Encrypter should correctly encrypt the message if message length is a multiple of chunk size', () => {
  const message = "Test message is her";
  const grille = [
    [true, false, false, false],
    [false, false, false, true],
    [false, true, false, true],
    [false, false, false, false]
  ];

  expect(testExports.encryptMessage(message, grille)).toEqual([
    [
      ['T','S','H','M'],
      ['A','E','G','E'],
      ['E','S','E','T'],
      ['R','S','S','I']
    ]
  ]);
});

test('Encrypter should correctly encrypt the message if message length is not a multiple of chunk size', () => {
  const message = "Test message находится здесь";
  const grille = [
    [true, false, false, false],
    [false, false, false, true],
    [false, true, false, true],
    [false, false, false, false]
  ];

  expect(testExports.encryptMessage(message, grille, '0000000')).toEqual([
    [
      ['T','А','Х','M'],
      ['A','E','G','E'],
      ['E','S','О','T'],
      ['Д','S','S','Н']
    ],
    [
      ['И','0','0','З'],
      ['Ь','Д','0','Т'],
      ['0','С','0','Я'],
      ['0','Е','С','0']
    ]
  ]);
});
