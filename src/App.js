import { Container } from 'react-bootstrap';
import styles from '../src/App.module.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
      </Container>
    </div>
  );
}

export default App;
