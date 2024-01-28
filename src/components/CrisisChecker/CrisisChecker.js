import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './CrisisChecker.module.scss';

const CrisisChecker = () => {
    const [buttonText, setButtonText] = useState('Sjekk!');
    const [searchResults, setSearchResults] = useState(null);

    const handleMouseEnter = () => setButtonText('JA!');
    const handleMouseLeave = () => setButtonText('Sjekk!');

    const checkForCrisis = () => {
        const apiKey = process.env.REACT_APP_BING_API_KEY;
        const searchPhrase = 'potetgull krise';

        const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchPhrase)}`;

        const headers = {
            'Ocp-Apim-Subscription-Key': apiKey,
        };

        fetch(apiUrl, {
            method: 'GET',
            headers: headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSearchResults(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Wystąpił błąd:', error);
            });
    };

    const renderSearchResults = () => {
        if (!searchResults) return null;
        return searchResults.webPages?.value.map((page, index) => (
            <div key={index}>
                <h3>{page.name}</h3>
                <p>{page.snippet}</p>
                <a href={page.url} target="_blank" rel="noopener noreferrer">Czytaj więcej</a>
            </div>
        ));
    };

    return (
        <Container fluid className={`${styles.crisisChecker} d-flex justify-content-center align-items-center`}>
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
                    {renderSearchResults()}
                </Col>
            </Row>
        </Container>
    );
};

export default CrisisChecker;
