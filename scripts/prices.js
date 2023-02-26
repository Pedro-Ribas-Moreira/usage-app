//CASE DATE BETWEEN
let prices = [
  {
    dateStart: "01/07/2022",
    dateEnd: "30/09/2022",
    prices: {
      // 24h
      alldayPrice: 0.302,
      urbanDaySC: 1.4365,
      ruralDaySC: 1.6918,
      //NIGHTSAVER
      nighPrice: 0.1629,
      dayPrice: 0.3298,
      urbanNightsaverSC: 1.7123,
      ruralNightsaverSC: 1.9155,
      //TOU
      touNightPrice: 0.1384,
      touDayPrice: 0.2663,
      touPeakPrice: 0.293,
      touUrbanSC: 1.4621,
      touRuralSC: 1.7267,
    },
  },
  //OCTOBER INCREASE
  {
    dateStart: "01/10/2022",
    dateEnd: "30/11/2022",
    prices: {
      // 24h
      alldayPrice: 0.3673,
      urbanDaySC: 1.4621,
      ruralDaySC: 1.7725,
      //NIGHTSAVER
      nighPrice: 0.198,
      dayPrice: 0.401,
      urbanNightsaverSC: 1.7975,
      ruralNightsaverSC: 2.0446,
      //TOU
      touNightPrice: 0.1967,
      touDayPrice: 0.3833,
      touPeakPrice: 0.3869,
      touUrbanSC: 1.4422,
      touRuralSC: 1.765,
    },
  },
  //DECEMBER INCREASE
  {
    dateStart: "01/12/2022",
    dateEnd: "28/02/2023",
    prices: {
      // 24h
      alldayPrice: 0.4154,
      urbanDaySC: 1.4621,
      ruralDaySC: 1.7725,
      //NIGHTSAVER
      nighPrice: 0.2271,
      dayPrice: 0.46,
      urbanNightsaverSC: 1.7975,
      ruralNightsaverSC: 2.0446,
      //TOU
      touNightPrice: 0.2383,
      touDayPrice: 0.4595,
      touPeakPrice: 0.5164,
      touUrbanSC: 1.4621,
      touRuralSC: 1.7725,
    },
  },
  //MARCH - GOV DISCOUNT ON PSO LEVY
  {
    dateStart: "01/03/2023",
    dateEnd: "",
    prices: {
      // 24h
      alldayPrice: 0.4154,
      urbanDaySC: 1.0421,
      ruralDaySC: 1.3525,
      //NIGHTSAVER
      nighPrice: 0.2271,
      dayPrice: 0.46,
      urbanNightsaverSC: 1.3775,
      ruralNightsaverSC: 1.6246,
      //TOU
      touNightPrice: 0.2383,
      touDayPrice: 0.4595,
      touPeakPrice: 0.5164,
      touUrbanSC: 1.0421,
      touRuralSC: 1.3525,
    },
  },
];

let BBprices = {
  dateStart: "01/01/2022",
  dateEnd: "",
  prices: {
    // BB Connections speed
    FTTC: 1.74,
    FTTH150: 1.92,
    FTTH300: 2.04,
    FTTH1000: 2.24,
  },
};

export { prices, BBprices };
