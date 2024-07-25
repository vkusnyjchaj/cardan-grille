import { useState } from 'react';
import Counter from '../../components/Counter/Counter';
import Layout from '../../components/Layout/Layout';
import Warning from '../../components/Warning/Warning';
import styles from './Home.module.css';
import { DEFAULT_GRILLE_SIZE } from '../../constants';
import Button from '../../components/Button/Button';
import { generate } from '../../utils/generator';
import Grille from '../../components/Grille/Grille';
import TextArea from '../../components/TextArea/TextArea';
import { encrypt } from '../../utils/encrypter';
import DataTable from '../../components/DataTable/DataTable';

export default function Home() {
  const [size, setSize] = useState<number>(DEFAULT_GRILLE_SIZE);
  const [grille, setGrille] = useState<Array<Array<boolean>> | null>(null);
  const [message, setMessage] = useState<string>('');
  const [encryptedMessage, setEncryptedMessage] = useState<string[][][] | null>(
    null,
  );

  const onSizeChange = (size: number) => {
    setSize(size);
  };

  const onGenerateClick = () => {
    const grille = generate(size);
    setGrille(grille);
  };

  const onImportClick = () => {};

  const onMessageChange = (message: string) => {
    setMessage(message);
  };

  const onEncryptMessageClick = () => {
    if (!grille) return;
    const encryptedMessage = encrypt(message, grille);
    console.log(encryptedMessage);
    setEncryptedMessage(encryptedMessage);
  };

  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Welcome to Cardan grille generator & encrypter
        </h1>
      </div>
      <h2 className={styles.subtitle}>What is Cardan grille?</h2>
      <p>
        A grille cipher was a technique for encrypting a plaintext by writing it
        onto a sheet of paper through a pierced sheet (of paper or cardboard or
        similar). The earliest known description is due to the polymath Girolamo
        Cardano in 1550. His proposal was for a rectangular stencil allowing
        single letters, syllables, or words to be written, then later read,
        through its various apertures. The written fragments of the plaintext
        could be further disguised by filling the gaps between the fragments
        with anodyne words or letters.
      </p>
      <div className={styles.imageContainer}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Tangiers1.png" />
        <img
          className={styles.grilleImage}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Tangiers2.png"
        />
      </div>
      <h2 className={styles.subtitle}>How it can be useful for me?</h2>
      <p>
        The app can be useful if you need to send a private message on a paper
        and you don't want to allow somebody to read it except of recipient. The
        encryption algorithm is not reliable as modern algorithms, but it has a
        valuable advantage - recipient can easily decrypt the message only using
        a small list of paper without any calculations.
      </p>
      <Warning>
        If you need something really secured, please look at modern ecryption
        algorithms. Cardan grille is just a way to avoid the curiosity of random
        people.
      </Warning>
      <h2 className={styles.subtitle}>Get started!</h2>
      <p>
        <span className={styles.step}>STEP 1</span> First of all you need to{' '}
        <span className={styles.attention}>generate a Cardan grille</span>. You
        can choose the size.{' '}
        <span className={styles.attention}>
          Larger size means more reliable encryption, but also a larger peace of
          paper
        </span>{' '}
        you need to privately hand over to the recipient. Normally 8x8 size is a
        good balance. Of course you can just import it from a file.
      </p>
      <div className={styles.controls}>
        <Counter
          value={size}
          step={2}
          min={4}
          max={16}
          onChange={onSizeChange}
        />
        <Button className={styles.generateButton} onClick={onGenerateClick}>
          Generate
        </Button>
        <Button className={styles.importButton} onClick={onImportClick}>
          Import
        </Button>
      </div>
      <div className={styles.grilleContainer}>
        {grille && <Grille className={styles.grille} grille={grille} />}
      </div>
      {grille && (
        <div>
          <p>
            <span className={styles.step}>STEP 2</span> Now you are ready to{' '}
            <span className={styles.attention}>encode your message</span> using
            the generated grille. If you are going to use the grille multiple
            times, then you probably want to{' '}
            <span className={styles.attention}>export</span> it. If not, then
            just skip this step. Also you can{' '}
            <span className={styles.attention}>print</span> a grille or just
            draw it on a paper on your own.
          </p>
          <Warning>
            If you choice the manual drawing option, make sure grille has the
            same size as ecrypted message tables.
          </Warning>
          <div className={styles.controls}>
            <Button className={styles.exportButton} onClick={() => {}}>
              Export
            </Button>
            <Button className={styles.printGrilleButton} onClick={() => {}}>
              Print
            </Button>
          </div>
          <p>
            You can enter the message in the textarea below. By default{' '}
            <span className={styles.attention}>latin and cyrillic</span>{' '}
            alphabets are supported, but you can add a new one by putting it to
            the constants file.
          </p>
          <TextArea
            className={styles.textarea}
            rows={8}
            placeholder="Enter the message here..."
            value={message}
            onChange={onMessageChange}
          />
          <Button
            className={styles.exportButton}
            disabled={grille === null}
            onClick={onEncryptMessageClick}
          >
            Encrypt
          </Button>
          <div className={styles.tableContainer}>
            {encryptedMessage?.map((table, key) => (
              <DataTable className={styles.table} key={key} table={table} />
            ))}
          </div>
        </div>
      )}
      {encryptedMessage && (
        <div>
          <p>
            <span className={styles.step}>STEP 3</span> Your message is
            encrypted and you can{' '}
            <span className={styles.attention}>print</span> encrypted data
            tables or draw it on your own.
          </p>
          <Warning>
            If you choice the manual drawing option, make sure ecrypted message
            tables has the same size as grille.
          </Warning>
          <Button className={styles.printTablesButton} onClick={() => {}}>
            Print
          </Button>
        </div>
      )}
      <h2 className={styles.subtitle}>How to decrypt the message?</h2>
      <p>
        To decrypt the message you need to have a paper grille with holes in
        required cells. You need to impose the grille to the message table, read
        the message, then rotate the grille 90 degress and read again while
        grille is not at initial angle.
      </p>
    </Layout>
  );
}
