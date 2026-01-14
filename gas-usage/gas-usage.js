console.log("Gas Usage Connected")

const gasBtn = document.getElementById("gas-button");
const modal = document.getElementById("myModal");
const results = document.getElementById("results");
const gasForm = document.getElementById("submit-form");

// Get the values from the input fields
gasForm.addEventListener("click", function (event) {
    // Get the values from the input fields
    event.preventDefault()
    modal.style.display = "block";
    const mrConsumptionInput = document.getElementById("mr-consumption").value;

    const firstDateInput = document.getElementById("first-date");
    const secondDateInput = document.getElementById("second-date");

    // Split the date strings into year, month, and day components
    const [firstYear, firstMonth, firstDay] = firstDateInput.value.split("-");
    const [secondYear, secondMonth, secondDay] = secondDateInput.value.split("-");

    // Create Date objects with the components
    const firstDate = new Date(firstYear, firstMonth - 1, firstDay);
    const secondDate = new Date(secondYear, secondMonth - 1, secondDay);

    // Calculate the difference in time in milliseconds
    const timeDifferenceMs = secondDate - firstDate;

    // Constants
    const unitRate = 0.1133
    const carbonTaxRate = 0.01251 
    const standingChargeRate = 0.43
    const prepayServiceChargeRate = 0.1942
    const dailyChargeRate = standingChargeRate + prepayServiceChargeRate
    const nationalAverageUnitsYearly = 11000
    const nationalAverageUnitsDaily = nationalAverageUnitsYearly / 365
    const nationalAverageSpendDaily = ((nationalAverageUnitsDaily * (unitRate + carbonTaxRate)) + dailyChargeRate)

    // Variables
    const daysDifference = timeDifferenceMs / (1000 * 60 * 60 * 24);
    const carbonTaxTotal = carbonTaxRate * daysDifference;
    const unitsTotal = mrConsumptionInput * (unitRate + carbonTaxRate)

    // Standing charge breakdown (fix + clarity)
    const gniStandingChargeTotal = standingChargeRate * daysDifference
    const prepayServiceChargeTotal = prepayServiceChargeRate * daysDifference
    const combinedDailyChargesTotal = dailyChargeRate * daysDifference

    const totalSpend = combinedDailyChargesTotal + unitsTotal

    // Formatting helpers
    const euro = (n) => `€${Number(n).toFixed(2)}`;
    const units = (n) => Number(n).toFixed(2);

    const perDay = (n) => `€${Number(n).toFixed(2)} per day`;
    const money = (n) => `€${Number(n).toFixed(2)}`;

    results.innerHTML = `
    <h3 class="scriptHeader">Figures</h3>

    <div class="results-groups">

      <div class="results-card">
        <h4 class="results-section-title">This Customer</h4>

        <div class="results-highlight">
          <div class="results-row">
            <span class="results-label">Total spend</span>
            <span class="results-value">${euro(totalSpend)}</span>
          </div>
          <div class="results-row">
            <span class="results-label">Average daily spend</span>
            <span class="results-value">${euro(totalSpend / daysDifference)} <span class="results-pill">per day</span></span>
          </div>
        </div>

        <div class="results-section">
          <p class="results-section-title">Usage</p>
          <div class="results-row"><span class="results-label">Days between reads</span><span class="results-value">${daysDifference}</span></div>
          <div class="results-row"><span class="results-label">Units used</span><span class="results-value">${mrConsumptionInput}</span></div>
        </div>

        <div class="results-section">
          <p class="results-section-title">Unit Costs</p>
          <div class="results-row"><span class="results-label">Unit rate</span><span class="results-value">${euro(unitRate)} <span class="results-pill">per unit</span></span></div>
          <div class="results-row"><span class="results-label">Carbon tax</span><span class="results-value">${euro(carbonTaxRate)} <span class="results-pill">per unit</span></span></div>
          <div class="results-row"><span class="results-label">Total unit costs</span><span class="results-value">${euro(unitsTotal)}</span></div>
        </div>

        <div class="results-section">
          <p class="results-section-title">Daily Charges</p>
          <div class="results-row"><span class="results-label">GNI standing charge</span><span class="results-value">${euro(standingChargeRate)} <span class="results-pill">per day</span></span></div>
          <div class="results-row"><span class="results-label">Prepay service charge</span><span class="results-value">${euro(prepayServiceChargeRate)} <span class="results-pill">per day</span></span></div>
          <div class="results-row"><span class="results-label">Combined daily charges</span><span class="results-value">${euro(dailyChargeRate)} <span class="results-pill">per day</span></span></div>
       </div>
          <div class ="results-highlight">
          <div class="results-row"><span class="results-label">Total GNI standing charge</span><span class="results-value">${euro(gniStandingChargeTotal)}</span></div>
          <div class="results-row"><span class="results-label">Total prepay service charge</span><span class="results-value">${euro(prepayServiceChargeTotal)}</span></div>
          <div class="results-row"><span class="results-label">Total combined daily charges</span><span class="results-value">${euro(combinedDailyChargesTotal)}</span></div>
        </div>
      </div>

      <div class="results-card">
        <h4>National Average</h4>

        <div class="results-highlight">
          <div class="results-row">
            <span class="results-label">Daily spend estimate</span>
            <span class="results-value">${euro(nationalAverageSpendDaily)} <span class="results-pill">per day</span></span>
          </div>
          <div class="results-row">
            <span class="results-label">Difference</span>
            <span class="results-value">${euro((totalSpend / daysDifference) - nationalAverageSpendDaily)} <span class="results-pill">per day</span></span>
          </div>
        </div>

        <div class="results-section">
          <p class="results-section-title">Usage</p>
          <div class="results-row"><span class="results-label">Yearly average units</span><span class="results-value">${units(nationalAverageUnitsYearly)}</span></div>
          <div class="results-row"><span class="results-label">Daily average units</span><span class="results-value">${units(nationalAverageUnitsDaily)}</span></div>
        </div>
      </div>

    </div>

    <br>
   <hr>
    <h3 class="script">Scripting</h3>

    <div class="script-wrap">
    <div class="script-grid">

        <details class="script-card" open>
        <summary>
            <span>Units</span>
            <span class="script-meta">${mrConsumptionInput} units over ${daysDifference} days</span>
        </summary>
        <div class="script-body">
            <p>
            So, we're doing a read for ${daysDifference} days, in that time you used a total of
            ${mrConsumptionInput} Kilowatt Hours, or "units".
            With our Gas Unit rate of €${unitRate}c and the carbon tax per unit of €${carbonTaxRate}c,
            this means you spent ${money(unitsTotal)} on your gas in this period.
            </p>
            <div class="script-callout">
            <strong>Quick summary:</strong> ${mrConsumptionInput} units, ${money(unitsTotal)} total unit costs.
            </div>
        </div>
        </details>

        <details class="script-card" open>
        <summary>
            <span>Standing Charges</span>
            <span class="script-meta">${money(combinedDailyChargesTotal)} total for this period</span>
        </summary>
        <div class="script-body">
            <p>
            In addition to this there is a standing charge applied by GNI to all gas customers in Ireland.
            This is charged at ${perDay(standingChargeRate)}.
            There is also a prepay service charge of ${perDay(prepayServiceChargeRate)}.
            Your combined daily charges are ${perDay(dailyChargeRate)}, which comes to
            ${money(combinedDailyChargesTotal)} in total for this time period.
            </p>
            <div class="script-callout">
            <strong>Breakdown:</strong>
            GNI ${money(gniStandingChargeTotal)}, prepay ${money(prepayServiceChargeTotal)}, combined ${money(combinedDailyChargesTotal)}.
            </div>
        </div>
        </details>

        <details class="script-card">
        <summary>
            <span>Standing Charge Dispute</span>
            <span class="script-meta">How charges apply</span>
        </summary>
        <div class="script-body">
            <p>
            Standing charges are applied to all gas customers in Ireland by GNI and go towards maintaining the network.
            They are applied by all suppliers, both prepay and billpay. The prepay service charge is applied by all prepay
            suppliers and goes towards the service we provide. Standing charges are charged daily so even if you are not
            using your gas you still need to pay the standing charge. If your meter runs out of credit the standing charge
            will be taken off future top ups at a rate of 55% towards gas and 45% towards paying off any standing charge
            debt you have accrued. So you will always get a minimum of 55% of your top ups towards your gas.
            </p>
        </div>
        </details>

        <details class="script-card">
        <summary>
            <span>National Average</span>
            <span class="script-meta">${money(nationalAverageSpendDaily)} estimated daily spend</span>
        </summary>
        <div class="script-body">
            <p>
            Now we can compare this to the average customer's usage. The average household in Ireland will use
            ${nationalAverageUnitsYearly} units per year according to the CRU.
            Bear in mind that people usually use significantly more gas in winter and very low usage in summer.
            Based on our rates, the daily cost would be ${money(nationalAverageSpendDaily)} per day on average.
            </p>
        </div>
        </details>

        <details class="script-card" open>
        <summary>
            <span>Comparison</span>
            <span class="script-meta">Customer vs average</span>
        </summary>
        <div class="script-body">
            <p>
            So if we take these average figures we can see that in the same time period the average customer would use
            ${nationalAverageUnitsDaily.toFixed(2)} units per day and pay ${money(dailyChargeRate)} per day in combined daily charges.
            Comparing yourself to them,
            ${
                nationalAverageSpendDaily < totalSpend / daysDifference
                ? `you're ${money((totalSpend / daysDifference) - nationalAverageSpendDaily)} per day above the average`
                : `you're ${money(nationalAverageSpendDaily - (totalSpend / daysDifference))} per day below the average`
            }.
            </p>
            <div class="script-callout">
            <strong>Your average daily spend:</strong> ${money(totalSpend / daysDifference)}
            <br>
            <strong>National daily estimate:</strong> ${money(nationalAverageSpendDaily)}
            </div>
        </div>
        </details>

    </div>
    </div>
           <hr>
    <h3 class="script">Next Steps</h3>
    <p class="script">
    The links below are useful follow-up steps the customer can take to reduce their gas usage.
    </p>

    <div class="links-grid">

    <div class="link-card">
        <p class="link-title">Gas Usage Tips</p>
        <p class="link-text">View practical advice on reducing gas usage.</p>
        <a class="link-action" target="_blank"
        href="https://yuno.shelf-eu.com/read/93860c86-9221-4e9a-914d-a5c3599ae60b/?searchEventId=01J6EHJ249W37941BGK1EG7MXB&source=shelf&trigger=title&view=snippet-view#gas-savings-usage-tips">
        View Tips
        </a>
    </div>

    <div class="link-card">
        <p class="link-title">Gas Statement</p>
        <p class="link-text">Generate a detailed gas statement for the customer.</p>
        <a class="link-action" target="_blank"
        href="http://crmnext:8181/Finance/CustomerStatement.aspx?id=ContentPlaceHolder1_StatementTypeList_ddlStatementType&value=2">
        Generate Statement
        </a>
    </div>

    <div class="link-card">
        <p class="link-title">BER Report</p>
        <p class="link-text">Check whether the property has a BER rating.</p>
        <a class="link-action" target="_blank"
        href="https://ndber.seai.ie/PASS/BER/Search.aspx">
        BER Check
        </a>
    </div>

    <div class="link-card">
        <p class="link-title">Energy Saving Kits</p>
        <p class="link-text">Find local libraries offering energy saving kits.</p>
        <a class="link-action" target="_blank"
        href="https://www.google.com/search?q=library+energy+kit">
        Find Kits
        </a>
    </div>

    </div>
    `
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
gasBtn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
