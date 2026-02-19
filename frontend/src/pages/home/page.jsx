import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <section>
        <h1>Welcome to My Gastronomy</h1>

        <p>
          Hello and welcome to our special culinary corner, where Italian
          tradition dances with modern
        </p>
      </section>

      <section>
        <div>
          <i></i>
          <h4></h4>
          <p></p>
        </div>
      </section>
    </div>
  );
}
