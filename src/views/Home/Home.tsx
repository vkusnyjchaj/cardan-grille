import { useState } from 'react';
import Counter from '../../components/Counter/Counter';
import Layout from '../../components/Layout/Layout';
import Warning from '../../components/Warning/Warning';
import styles from './Home.module.css';
import { DEFAULT_GRILLE_SIZE, GRILLE_FILE_NAME } from '../../constants';
import Button from '../../components/Button/Button';
import { generate } from '../../utils/generator';
import Grille from '../../components/Grille/Grille';
import TextArea from '../../components/TextArea/TextArea';
import { encrypt } from '../../utils/encrypter';
import DataTable from '../../components/DataTable/DataTable';
import Section from '../../components/Section/Section';
import Step from '../../components/Step/Step';
import { downloadFile, openFile } from '../../utils/file';
import { enqueueSnackbar } from 'notistack';

export default function Home() {
  const [size, setSize] = useState<number>(DEFAULT_GRILLE_SIZE);
  const [grille, setGrille] = useState<Array<Array<boolean>> | null>(null);
  const [message, setMessage] = useState<string>('');
  const [encryptedMessage, setEncryptedMessage] = useState<string[][][] | null>(
    null,
  );

  const onSizeChange = (size: number) => setSize(size);

  const onGenerateClick = () => setGrille(generate(size));

  const onImportClick = async () => {
    const file = await openFile();

    try {
      const obj = JSON.parse(file);
      setGrille(obj);
      enqueueSnackbar('Successfully imported.', { variant: 'success' });
    } catch {
      enqueueSnackbar('Import failed. Check the file is not corrupted.', {
        variant: 'error',
      });
    }
  };

  const onExportGrilleClick = () => {
    downloadFile(JSON.stringify(grille), GRILLE_FILE_NAME, 'application/json');
    enqueueSnackbar('Successfully exported.', { variant: 'success' });
  };

  const onPrintGrilleClick = () => {
    window.open(
      `/print?${grille ? 'grille=' + JSON.stringify(grille) : ''}`,
      '_blank',
    );
  };

  const onMessageChange = (message: string) => setMessage(message);

  const onEncryptMessageClick = () => {
    if (grille) {
      setEncryptedMessage(encrypt(message, grille));
    }
  };

  const onPrintTablesClick = () => {
    window.open(
      `/print?${encryptedMessage ? 'data=' + JSON.stringify(encryptedMessage) : ''}`,
      '_blank',
    );
  };

  return (
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to Cardan grille generator & encrypter
        </h1>
      </header>
      <Section className={styles.section} title="What is Cardan grille?">
        <p>
          A grille cipher was a technique for encrypting a plaintext by writing
          it onto a sheet of paper through a pierced sheet (of paper or
          cardboard or similar). The earliest known description is due to the
          polymath Girolamo Cardano in 1550. His proposal was for a rectangular
          stencil allowing single letters, syllables, or words to be written,
          then later read, through its various apertures. The written fragments
          of the plaintext could be further disguised by filling the gaps
          between the fragments with anodyne words or letters.
        </p>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Tangiers1.png"
          />
          <img
            className={styles.image}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Tangiers2.png"
          />
        </div>
      </Section>
      <Section className={styles.section} title="How it can be useful for me?">
        <p>
          The app is useful if you need to send a private message on paper and
          want to ensure that only the intended recipient can read it. Although
          the encryption algorithm is not as reliable as modern algorithms, it
          has a valuable advantage: the recipient can easily decrypt the message
          using only a small sheet of paper, without any calculations.
        </p>
        <Warning>
          If you need something highly secure, please consider using modern
          encryption algorithms. The Cardan grille is simply a method to avoid
          the curiosity of random people.
        </Warning>
      </Section>
      <Section className={styles.section} title="Get started!">
        <Step
          className={styles.step}
          step={1}
          message="First, you need to generate a Cardan grille. You can choose the size: a larger size means more reliable encryption, but it also requires a larger piece of paper to hand over privately to the recipient. Normally, an 8x8 size is a good balance. Alternatively, you can import it from a file."
        >
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
          {grille && (
            <div className={styles.grilleContainer}>
              <Grille id="grille" grille={grille} />
            </div>
          )}
        </Step>

        {grille && (
          <Step
            className={styles.step}
            step={2}
            message="Now you are ready to encrypt your message using the generated grille. If you plan to use the grille multiple times, you may want to export it. Otherwise, you can skip this step. You can also print the grille or draw it on paper yourself."
          >
            <Warning>
              If you choose the manual drawing option, make sure the grille is
              the same size as the encrypted message tables.
            </Warning>
            <div className={styles.controls}>
              <Button
                className={styles.exportButton}
                onClick={onExportGrilleClick}
              >
                Export
              </Button>
              <Button
                className={styles.printGrilleButton}
                onClick={onPrintGrilleClick}
              >
                Print
              </Button>
            </div>
          </Step>
        )}
        {grille && (
          <Step
            className={styles.step}
            step={3}
            message="You can enter the message in the textarea below. By default, Latin and Cyrillic alphabets are supported, but you can add a new one by updating the constants file.

"
          >
            <TextArea
              className={styles.textarea}
              rows={8}
              placeholder="Enter the message here..."
              value={message}
              onChange={onMessageChange}
            />
            <Button
              className={styles.encryptButton}
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
          </Step>
        )}
        {encryptedMessage && (
          <Step
            className={styles.step}
            step={4}
            message="Your message is encrypted, and you can print the encrypted data tables or draw them yourself."
          >
            <Warning>
              If you choose the manual drawing option, make sure the encrypted
              message tables are the same size as the grille.
            </Warning>
            <Button
              className={styles.printTablesButton}
              onClick={onPrintTablesClick}
            >
              Print
            </Button>
          </Step>
        )}
      </Section>
      <Section className={styles.section} title="How to decrypt the message?">
        <p>
          To decrypt the message, you need a paper grille with holes in the
          required cells. Place the grille over the message table, read the
          message, then rotate the grille 90 degrees and read again until the
          grille returns to its initial angle.
        </p>
      </Section>
    </Layout>
  );
}
