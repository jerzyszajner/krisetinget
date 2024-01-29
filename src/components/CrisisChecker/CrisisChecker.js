import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './CrisisChecker.module.scss';

const CrisisChecker = () => {
    const [buttonText, setButtonText] = useState('Sjekk!');
    const [searchResults, setSearchResults] = useState(null);

    const checkForCrisis = () => {
        if (searchResults) {
            setButtonText('Oppdater');
        }

        const apiKey = process.env.REACT_APP_BING_API_KEY;
        const searchPhrase = 'potetgull krise';
        const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchPhrase)}&mkt=no-NO&safeSearch=Moderate&responseFilter=Webpages,Images`;

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
                setButtonText('Oppdater');
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    };

    const renderSearchResults = () => {
        if (!searchResults) return null;

        const filteredResults = searchResults.webPages?.value.filter((page, index) =>
            searchResults.images?.value[index]
        );

        const limitedResults = filteredResults.slice(0, 9);

        return (
            <div className={styles.searchResultsContainer}>
                {limitedResults.map((page, index) => (
                    <a key={index} href={page.url} target="_blank" rel="noopener noreferrer" className={styles.fullWidthLink}>
                        <img src={searchResults.images.value[index].thumbnailUrl} alt="" className={styles.resultImage} />
                        <div className={styles.caption}>{page.name}</div>
                    </a>
                ))}
            </div>
        );
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
                        variant="secondary">
                        {buttonText}
                    </Button>
                    <div className="searchResultsContainer">
                        {renderSearchResults()}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CrisisChecker;