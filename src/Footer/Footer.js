import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <React.Fragment>
      <footer>
        <div className={styles['inner-footer']}>
          {/* <div className={styles['footer-links']}>Created by Charlie Kim</div> */}
          <div className={styles['footer-links']}>
            <span>
              <a href="http://www.github.com/" target="_blank" rel="noopener noreferrer">
                <img src={require('../../src/githubIcon.png')} alt="github" />
              </a>
            </span>
            <span>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <img src={require('../../src/linkedInIcon.png')} alt="linkedin" />
              </a>
            </span>
          </div>
          <div className={styles['footer-copyright']}>
            <span>Copyright © 2020 All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
