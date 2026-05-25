let prices = [];

Papa.parse('assets/prices.csv', {
  download: true,
  header: true,
  complete: function (results) {
    results.data.forEach((row) => {
      const priceObj = {
        dateStart: row.FROM,
        dateEnd: row.TO !== '' ? row.TO : undefined,
        prices: {
          allDayPrice: parseFloat(row['24h Tariff']),
          urbanDaySC: parseFloat(row['Urban 24H Standing Charge']),
          ruralDaySC: parseFloat(row['Rural 24h Standing Charge']),
          nightPrice: parseFloat(row['Night Tariff']),
          dayPrice: parseFloat(row['Day Tariff']),
          urbanNightsaverSC: parseFloat(row['Day/Night Urban Standing Charge']),
          ruralNightsaverSC: parseFloat(row['Day/Night Rural Standing Charge']),
          touNightPrice: parseFloat(row['TOU Night Tariff']),
          touDayPrice: parseFloat(row['TOU Day Tariff']),
          touPeakPrice: parseFloat(row['TOU Peak Tariff']),
          touUrbanSC: parseFloat(row['TOU Urban Standing Charge']),
          touRuralSC: parseFloat(row['TOU Rural Standing Charge']),
        },
      };
      prices.push(priceObj);
    });
  },
});

const broadbandPrices = {
  dateStart: '01/01/2022',
  dateEnd: '',
  prices: {
    FTTC: 1.74,
    FTTH150: 1.92,
    FTTH500: 2.04,
    FTTH1000: 2.24,
  },
};

export { prices, broadbandPrices };
