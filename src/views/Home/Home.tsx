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
import { downloadFile, openFile, printElement } from '../../utils/file';

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
    } catch (error) {
      // TODO Handle error
    }
  };

  const onExportGrilleClick = () => {
    downloadFile(JSON.stringify(grille), GRILLE_FILE_NAME, 'application/json');
  };

  const onPrintGrilleClick = () => {
    // TODO
  };

  const onMessageChange = (message: string) => setMessage(message);

  const onEncryptMessageClick = () => {
    if (grille) {
      setEncryptedMessage(encrypt(message, grille));
    }
  };

  const onPrintTablesClick = () => {
    // TODO
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
          The app can be useful if you need to send a private message on a paper
          and you don't want to allow somebody to read it except of recipient.
          The encryption algorithm is not reliable as modern algorithms, but it
          has a valuable advantage - recipient can easily decrypt the message
          only using a small list of paper without any calculations.
        </p>
        <Warning>
          If you need something really secured, please look at modern ecryption
          algorithms. Cardan grille is just a way to avoid the curiosity of
          random people.
        </Warning>
      </Section>
      <Section className={styles.section} title="Get started!">
        <Step
          className={styles.step}
          step={1}
          message="First of all you need togenerate a Cardan grille. You can choose the
        size. Larger size means more reliable encryption, but also a larger
        peace of paper you need to privately hand over to the recipient.
        Normally 8x8 size is a good balance. Of course you can just import it
        from a file."
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
            message="Now you are ready to encrypt your message using the generated
              grille. If you are going to use the grille multiple times, then
              you probably want toexport it. If not, then just skip this step.
              Also you can print a grille or just draw it on a paper on your
              own."
          >
            <Warning>
              If you choice the manual drawing option, make sure grille has the
              same size as ecrypted message tables.
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
            message="You can enter the message in the textarea below. By default latin and cyrillic alphabets are supported, but you can add a new one by putting it to the constants file."
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
            message="Your message is
              encrypted and you can print encrypted data
              tables or draw it on your own."
          >
            <Warning>
              If you choice the manual drawing option, make sure ecrypted
              message tables has the same size as grille.
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
          To decrypt the message you need to have a paper grille with holes in
          required cells. You need to impose the grille to the message table,
          read the message, then rotate the grille 90 degress and read again
          while grille is not at initial angle.
        </p>
      </Section>
    </Layout>
  );
}
