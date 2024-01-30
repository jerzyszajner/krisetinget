import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import useCrisisData from '../../hooks/useCrisisData';
import RenderSearchResults from '../RenderSearchResults/RenderSearchResults';
import styles from './CrisisChecker.module.scss';

const CrisisChecker = () => {
    const { data: searchResults, isLoading, error, fetchData } = useCrisisData();
    const [buttonText, setButtonText] = useState('Sjekk!');

    useEffect(() => {
        if (searchResults) {
            setButtonText('Oppdater');
        }
    }, [searchResults]);

    const checkForCrisis = () => {
        fetchData('potetgull krise');
    };

    return (
        <Container fluid className={`${styles.crisisChecker} d-flex justify-content-center align-items-center`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/photo1.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <Row className="justify-content-md-center">
                <Col md={12} className="text-center">
                    <h1 className="text-center mb-5">Dagens krise i Norge</h1>
                    <Button
                        onClick={checkForCrisis}
                        size="lg"
                        className={styles.button}
                        variant="secondary"
                        disabled={isLoading}>
                        {isLoading ? 'Laster...' : buttonText}
                    </Button>
                    {error && <div className="error">{error.message}</div>}
                    <div className="searchResultsContainer">
                        <RenderSearchResults searchResults={searchResults} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CrisisChecker;