import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './CrisisChecker.module.scss';

const CrisisChecker = () => {

  const checkForCrisis = () => {

    alert('Checking for crisis in Norway...');
  };

  return (
    <Container fluid className={styles.crisisChecker}>
      <Row className="justify-content-md-center">
        <Col md={12} className="text-center">
          <h1 className={styles.title}>Er det krise i Norge nå?</h1>
          <Button onClick={checkForCrisis} size="lg" className={styles.button} variant="secondary">
            Sjekk
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CrisisChecker;