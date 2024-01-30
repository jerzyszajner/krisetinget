import React from 'react';
import styles from './RenderSearchResults.module.scss';


const RenderSearchResults = ({ searchResults }) => {
    if (!searchResults) return null;

    const filteredResults = searchResults.webPages?.value.filter((page, index) =>
        searchResults.images?.value[index]
    );

    const limitedResults = filteredResults.slice(0, 1);

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

export default RenderSearchResults;
