import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ dogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPage = (page, currentPage) => {
    if (page >= 1 && page <= pageNumbers.length) {
      paginado(page, currentPage);
      console.log(page)
      console.log(currentPage)
    }
  };

  const prevPage = (page) =>{
    page = page -1
    console.log(page)
  }

  return (
    <div className={styles.paginationDiv}>
      <nav>
        <ul className={styles.pagination}>
          <li>
            <button
              //disabled={currentPage === 1}
              className={styles.prevNext}
              onClick={() => prevPage()}
            >
              Prev
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button className={styles.pageNumbers} onClick={() => goToPage(number)}>{number}</button>
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

