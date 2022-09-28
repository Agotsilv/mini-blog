import styles from './About.module.css'

import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto consite em um blog feito com React no front-end e firebase no back-end </p>

      <p>
        <Link to='/posts/create' className="btn">Criar Post</Link> 
      </p>
    </div>
  );
};

export default About;
