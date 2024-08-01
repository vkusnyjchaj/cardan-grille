# Introduction

A grille cipher was a technique for encrypting a plaintext by writing it onto a sheet of paper through a pierced sheet (of paper or cardboard or similar). The earliest known description is due to the polymath Girolamo Cardano in 1550. His proposal was for a rectangular stencil allowing single letters, syllables, or words to be written, then later read, through its various apertures. The written fragments of the plaintext could be further disguised by filling the gaps between the fragments with anodyne words or letters.

![code](https://upload.wikimedia.org/wikipedia/commons/8/8a/Tangiers1.png)
![grille](https://upload.wikimedia.org/wikipedia/commons/b/b9/Tangiers2.png)

# Application features

- Square grille generation
- Text encryption
- Latin and Cyrillic alphabets support out of the box (extendable)
- Print/Export to PDF

# Requirements

- [NodeJS v20.15.0 (LTS) or newer](https://nodejs.org/en/download/package-manager)
- [Local web server](https://www.npmjs.com/package/local-web-server)

# Use Cases

1. Sender ---> Some persons ---> Receiver | Some unwanted person(s) can intercept your private message.
2. Sender ---> Receiver (Some persons) | Some unwanted person(s) have access to the receiver's messages.
3. Sender ---> Transmitter ---> Receiver | You need to transmit your private message through an unreliable person.

**IMPORTANT**: You need once to be able to transmit the grille using a secure channel or directly.

# Running

1. Open the command line/terminal.
2. Navigate to the project directory (cardan-grille).
3. Run `npm i` to install dependencies.
4. Run `npm run build` to build the project.
5. Navigate to `dist/` folder.
6. Run `ws --spa index.html` (you will get an address, normally http://127.0.0.1:8000).
7. Open the address in the browser.
8. If you have done all correctly, then you should see the app interface.

# Usage

1. Scroll to the "Get Started" section. Read the description of each step to get more information.
2. Choose the size of the grille (4-16).
3. Click the `Generate` button until you get a satisfying result.

![grille generation](https://github.com/tastyteadev/cardan-grille/blob/main/screenshots/grille.png)

4. Click the `Export` button to back up the generated grille.
5. Click `Print` to open the print page in a new tab.
6. On the print page, choose how many copies of the grille you need (normally, you need two — one for you and one for the receiver) and print it.

![grille print](https://github.com/tastyteadev/cardan-grille/blob/main/screenshots/print.png)

7. Return to the app tab.
8. Paste or type your message in the textarea (step 3). By default, the app supports Latin, Cyrillic, or mixed Latin/Cyrillic alphabets.

![message encryption](https://github.com/tastyteadev/cardan-grille/blob/main/screenshots/encryption.png)

9. Click the `Encrypt` button to encrypt the message. The app will create encrypted data tables for you.
10. Click `Print` to open the print page in a new tab.
11. On the print page, follow the instructions to print data tables.
12. Cut the grille and optionally the data tables to get small papers.
13. Use a stationery knife to cut holes in grille cells marked with a dot in the center of each cell. Do this for all grilles you have. Optionally, you can cover the paper with transparent tape to make the grid more rigid.
14. Securely transfer one grille instance to the target person. The target person should keep the grille safe.
15. Now you can transfer encrypted data tables securely. If you need to encrypt one more message, you can use the `Import` button to import the grille and follow this guide from step 5.

# Decryption

Place the grid with holes over the encrypted table with text. Read the text visible through the holes as usual, then turn the grid clockwise. Repeat until the grid returns to its original position, then repeat with the next table.
