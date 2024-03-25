// import { prices } from './prices.js';

// const pricesBtn = document.querySelector('#prices-button');
// const pricesModal = document.querySelector('#prices-modal-container');

// function renderPricesTable(prices) {
//   pricesBtn.addEventListener('click', () => {
//     pricesModal.classList.remove('hidden');
//   });

//   //   const tableContainer = document.getElementById('prices-table-container');
//   //   const table = document.createElement('table');
//   //   table.classList.add('prices-table');

//   //   // Create table header
//   //   const headerRow = document.createElement('tr');
//   //   const headers = [
//   //     'Date Start',
//   //     'Date End',
//   //     'All Day Price',
//   //     'Urban Day SC',
//   //     'Rural Day SC',
//   //     'Night Price',
//   //     'Day Price',
//   //     'Urban Nightsaver SC',
//   //     'Rural Nightsaver SC',
//   //     'TOU Night Price',
//   //     'TOU Day Price',
//   //     'TOU Peak Price',
//   //     'TOU Urban SC',
//   //     'TOU Rural SC',
//   //   ];
//   //   headers.forEach((headerText) => {
//   //     const header = document.createElement('th');
//   //     header.textContent = headerText;
//   //     headerRow.appendChild(header);
//   //   });
//   //   table.appendChild(headerRow);

//   //   // Create table rows
//   //   prices.forEach((price) => {
//   //     const row = document.createElement('tr');
//   //     for (const key in price) {
//   //       if (key !== 'prices') {
//   //         const cell = document.createElement('td');
//   //         cell.textContent = price[key];
//   //         row.appendChild(cell);
//   //       } else {
//   //         for (const priceKey in price.prices) {
//   //           const cell = document.createElement('td');
//   //           cell.textContent = price.prices[priceKey];
//   //           row.appendChild(cell);
//   //         }
//   //       }
//   //     }
//   //     table.appendChild(row);
//   //   });

//   //   tableContainer.appendChild(table);
// }

// // Usage example: Call renderPricesTable() with the prices array
// renderPricesTable(prices);

// export default renderPricesTable;
