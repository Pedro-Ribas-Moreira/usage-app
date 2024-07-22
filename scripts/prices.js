// let prices = [
//   {
//     dateStart: '01/07/2022',
//     dateEnd: '30/09/2022',
//     prices: {
//       // 24h
//       allDayPrice: 0.302,
//       urbanDaySC: 1.4365,
//       ruralDaySC: 1.6918,
//       //NIGHTSAVER
//       nightPrice: 0.1629,
//       dayPrice: 0.3298,
//       urbanNightsaverSC: 1.7123,
//       ruralNightsaverSC: 1.9155,
//       //TOU
//       touNightPrice: 0.1384,
//       touDayPrice: 0.2663,
//       touPeakPrice: 0.293,
//       touUrbanSC: 1.4621,
//       touRuralSC: 1.7267,
//     },
//   },
//   //OCTOBER INCREASE
//   {
//     dateStart: '01/10/2022',
//     dateEnd: '30/11/2022',
//     prices: {
//       // 24h
//       allDayPrice: 0.3673,
//       urbanDaySC: 1.4621,
//       ruralDaySC: 1.7725,
//       //NIGHTSAVER
//       nightPrice: 0.198,
//       dayPrice: 0.401,
//       urbanNightsaverSC: 1.7975,
//       ruralNightsaverSC: 2.0446,
//       //TOU
//       touNightPrice: 0.1987,
//       touDayPrice: 0.3832,
//       touPeakPrice: 0.387,
//       touUrbanSC: 1.4422,
//       touRuralSC: 1.765,
//     },
//   },
//   //DECEMBER INCREASE
//   {
//     dateStart: '01/12/2022',
//     dateEnd: '28/02/2023',
//     prices: {
//       // 24h
//       allDayPrice: 0.4154,
//       urbanDaySC: 1.4621,
//       ruralDaySC: 1.7725,
//       //NIGHTSAVER
//       nightPrice: 0.2271,
//       dayPrice: 0.46,
//       urbanNightsaverSC: 1.7975,
//       ruralNightsaverSC: 2.0446,
//       //TOU
//       touNightPrice: 0.2247,
//       touDayPrice: 0.4334,
//       touPeakPrice: 0.4376,
//       touUrbanSC: 1.4422,
//       touRuralSC: 1.7725,
//     },
//   },
//   //MARCH - GOV DISCOUNT ON PSO LEVY
//   {
//     dateStart: '01/03/2023',
//     dateEnd: '30/09/2023',
//     prices: {
//       // 24h
//       allDayPrice: 0.4154,
//       urbanDaySC: 1.0083,
//       ruralDaySC: 1.3187,
//       //NIGHTSAVER
//       nightPrice: 0.2271,
//       dayPrice: 0.46,
//       urbanNightsaverSC: 1.3437,
//       ruralNightsaverSC: 1.5908,
//       //TOU
//       touNightPrice: 0.2383,
//       touDayPrice: 0.4595,
//       touPeakPrice: 0.5164,
//       touUrbanSC: 1.0083,
//       touRuralSC: 1.3187,
//     },
//   },
//   {
//     dateStart: '01/10/2023',
//     dateEnd: '31/10/2023',
//     prices: {
//       // 24h
//       allDayPrice: 0.4154,
//       urbanDaySC: 1.4621,
//       ruralDaySC: 1.7726,
//       //NIGHTSAVER
//       nightPrice: 0.2271,
//       dayPrice: 0.46,
//       urbanNightsaverSC: 1.7975,
//       ruralNightsaverSC: 2.0446,
//       //TOU
//       touNightPrice: 0.2383,
//       touDayPrice: 0.4595,
//       touPeakPrice: 0.5164,
//       touUrbanSC: 1.4621,
//       touRuralSC: 1.7726,
//     },
//   },
//   {
//     dateStart: '01/11/2023',
//     dateEnd: undefined,
//     prices: {
//       // 24h
//       allDayPrice: 0.3622,
//       urbanDaySC: 1.4621,
//       ruralDaySC: 1.7726,
//       //NIGHTSAVER
//       nightPrice: 0.1981,
//       dayPrice: 0.4011,
//       urbanNightsaverSC: 1.7975,
//       ruralNightsaverSC: 2.0446,
//       //TOU
//       touNightPrice: 0.4132,
//       touDayPrice: 0.4007,
//       touPeakPrice: 0.4503,
//       touUrbanSC: 1.4621,
//       touRuralSC: 1.7726,
//     },
//   },
// ];

let prices = [];

Papa.parse('assets/prices.csv', {
  download: true,
  header: true,
  complete: function (results) {
    results.data.forEach((row) => {
      let priceObj = {
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
    console.log(prices);
  },
});

let BBprices = {
  dateStart: '01/01/2022',
  dateEnd: '',
  prices: {
    // BB Connections speed
    FTTC: 1.74,
    FTTH150: 1.92,
    FTTH500: 2.04,
    FTTH1000: 2.24,
  },
};

export { prices, BBprices };
