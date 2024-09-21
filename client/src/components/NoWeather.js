import React from 'react'
import styles from '../styles/Home.module.css'

const NoWeather = () => {
  return (
    <main style={{ display: "flex" }}>
      <div className={styles.mainContainer}>
        <div className={styles.landingContainer}>
          <div className={styles.title}>
            <span>
              <img src="/icon.png" alt="mawesome logo" height="40px" />
            </span>
          </div>
          <div className={styles.weatherWidgetContainer}>
            <div className={styles.weatherWidgetLeft}>
              <h2>
                <div className={styles.ldsroller}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </h2>
            </div>
            <div className={styles.weatherWidgetRight}>
              <div>Loading weather...</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NoWeather