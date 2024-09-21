import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      mawesome |&nbsp;
      <a className={styles.link} href="https://github.com/Ken-1219/mawesome">
        Source Code on Github
      </a>
    </footer>
  );
}
