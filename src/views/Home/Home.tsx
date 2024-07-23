import { useState } from "react";
import Counter from "../../components/Counter/Counter";
import Layout from "../../components/Layout/Layout";
import Warning from "../../components/Warning/Warning";
import styles from './Home.module.css';
import { DEFAULT_GRILLE_SIZE } from "../../constants";
import Button from "../../components/Button/Button";

export default function Home() {
  const [size, setSize] = useState<number>(DEFAULT_GRILLE_SIZE);
  const onSizeChange = (size: number) => {
    setSize(size);
  }
  
  return (
    <Layout>
      <div className={styles.titleContainer}><h1 className={styles.title}>Welcome to Cardan grille generator & encrypter</h1></div>
      <h2 className={styles.subtitle}>What is Cardan grille?</h2> 
      <p>A grille cipher was a technique for encrypting a plaintext by writing it onto a sheet of paper through a pierced sheet (of paper or cardboard or similar). The earliest known description is due to the polymath Girolamo Cardano in 1550. His proposal was for a rectangular stencil allowing single letters, syllables, or words to be written, then later read, through its various apertures. The written fragments of the plaintext could be further disguised by filling the gaps between the fragments with anodyne words or letters.</p>
      <div className={styles.imageContainer}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Tangiers1.png" />
        <img className={styles.grilleImage} src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Tangiers2.png" />
      </div>
      <h2 className={styles.subtitle}>How it can be useful for me?</h2>
      <p>The app can be useful if you need to send a private message on a paper and you don't want to allow somebody to read it except of recipient. The encryption algorithm is not reliable as modern algorithms, but it has a valuable advantage - recipient can easily decrypt the message only using a small list of paper without any calculations.</p>
      <Warning>If you need something really secured, please look at modern ecryption algorithms. Cardan grille is just a way to avoid the curiosity of random people.</Warning>
      <h2 className={styles.subtitle}>Get started!</h2>
      <p>First of all you need a <span className={styles.attention}>Cardan grille</span>. You can choice the size. <span className={styles.attention}>Larger size means more reliable encryption, but also a larger peace of paper</span> you need to privately hand over to the recipient. Normally 8x8 size is a good balance. Of course you can just import it from a file.</p>
      <div className={styles.controls}>
        <Counter value={size} step={2} min={4} max={16} onChange={onSizeChange} />
        <Button className={styles.generateButton}>Generate</Button>
        <Button className={styles.importButton}>Import</Button>
      </div>
    </Layout>
  );
}