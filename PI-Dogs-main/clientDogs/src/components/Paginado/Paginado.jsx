import styles from './Paginado.module.css'

export default function Paginado ({totalPages, page, prevPage, nextPage, pageNumber}){
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
    }
    return (
        <div>
            <button onClick={() => prevPage()} disabled={page <= 1} className={styles.notSelected}>Back</button>
            {pages.length > 0
            &&
            pages.map(pag => (
                <button 
                onClick={() => pageNumber(pag)}
                key={`page ${pag}`} className={pag === page?styles.selected : styles.notSelected}>
                    {pag}
                </button>
            ))}
            <button  onClick={() => nextPage()} disabled={page >= totalPages} className={styles.notSelected}>Soon</button>
        </div>
    )
}