import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ dogsPerPage, allDogs, paginado, currentPage }) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= pageNumbers.length && page !== currentPage) {
      paginado(page);
      console.log(page);
    }
  };

  const prevPage = () => {
    const newPage = currentPage - 1;
    if (newPage >= 1) {
      paginado(newPage);
      console.log(newPage);
    }
  };

  return (
    <div className={styles.paginationDiv}>
      <nav>
        <ul className={styles.pagination}>
          <li>
            <button
              className={styles.prevNext}
              onClick={prevPage}
            >
              Prev
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number}>
              <button 
                className={`${styles.pageNumbers} ${number === currentPage ? styles.currentPage : ''}`}
                onClick={() => goToPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={currentPage === pageNumbers.length}
              onClick={() => goToPage(currentPage + 1)}
              className={styles.prevNext}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
