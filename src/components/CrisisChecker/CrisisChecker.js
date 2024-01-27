import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './CrisisChecker.module.scss';

const CrisisChecker = () => {
    const [buttonText, setButtonText] = useState('Sjekk!');

    const handleMouseEnter = () => setButtonText('JA!');
    const handleMouseLeave = () => setButtonText('Sjekk!');

    const checkForCrisis = () => {

        window.open('https://e24.no/naeringsliv/i/gEo909/fare-for-potetgull-krise-i-norge-tiltak-fra-myndighetene', '_blank');
    };

    return (
        <Container fluid className={styles.crisisChecker}>
            <Row className="justify-content-md-center">
                <Col md={12} className="text-center">
                    <h1 className={styles.title}>Er det krise i Norge nå?</h1>
                    <Button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={checkForCrisis}
                        size="lg"
                        className={styles.button}
                        variant="secondary">
                        {buttonText}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CrisisChecker;