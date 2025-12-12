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
    const standingChargeTotal = dailyChargeRate * daysDifference
    const totalSpend = standingChargeTotal + unitsTotal


    results.innerHTML = `
    <h3 class="script">Figures</h3>
    <div class="results-groups">
    <div class="results-group">
    <p>Days between Reads: ${daysDifference}</p>
    <p>Units Used: ${mrConsumptionInput}</p>
    <p>Cost per Unit: €${unitRate}c</p>
    <p>Carbon Tax per Unit: €${carbonTaxRate}c</p>
    <p>Total Carbon Tax: €${carbonTaxTotal}c</p>
    <p>Total Unit Costs: €${unitsTotal}c</p>
    <p>Standing Charge: €${standingChargeRate}c</p>
    <p>Total Standing Charge: €${standingChargeTotal.toFixed(2)}</p>
    <p> Total Spend: ${totalSpend.toFixed(2)}</p>
    <p> Average Daily Spend (This Customer): €${(totalSpend / daysDifference).toFixed(2)}</p>
    </div>
    <div class="results-group">
    <p>National Yearly Average Units: ${nationalAverageUnitsYearly.toFixed(2)} </p>
    <p>National Daily Average: ${nationalAverageUnitsDaily.toFixed(2)} Units</p>
    <p>National Average Gas Unit Cost: €${(nationalAverageUnitsDaily * daysDifference * unitRate).toFixed(2)}</p>
    <p>National Average Gas Carbon Tax: €${daysDifference * carbonTaxRate}</p>
    <p>Standing Charges for the period: €${daysDifference * standingChargeRate}</p>
    <p>National Average Total Cost for this period: €${((nationalAverageUnitsDaily * unitRate) + (daysDifference * standingChargeTotal)).toFixed(2)}</p>
    <p>Difference between this customer and national average: €${
        (totalSpend / daysDifference).toFixed(2) -
        (nationalAverageUnitsDaily * unitRate + daysDifference * standingChargeTotal).toFixed(2)
      } </p>
    </div>
    </div>
    <br>
    <hr>
    <h3 class="script">Scripting</h3>
    <p class="script"><strong>Units</strong></p><p class="script">So, we're doing a read for ${daysDifference} days, in that time you used a total of ${mrConsumptionInput} Kilowatt Hours or "units". 
    With our Gas Unit rate of €${unitRate}c and the carbon tax per unit of €${carbonTaxRate}c this means you spent €${unitsTotal} on your gas in this period. </p>
    
    <p class="script"><strong>Standing Charges</strong></p>
    <p class="script">
    In addition to this there is
    a standing charge, this is a charge applied by GNI to all gas customers in Ireland and it's charged at a rate of €${standingChargeRate}c per day. There
    is also a prepay service charge of €${prepayServiceChargeRate} per day so your combined daily charges are €${dailyChargeRate} per day which would be
    €${standingChargeTotal.toFixed(2)} in total for this time period.</p>
    <p class="script"><strong>Standing Charge Dispute</strong></p>
    <p class="script">
    Standing charges are applied to all gas customers in Ireland by GNI and go towards maintaining the network. They are applied by all suppliers, both prepay and billpay. The prepay service charge is applied
    by all prepay suppliers and goes towards the service we provide. Standing charges are charged daily so even if you are not using your gas you still need to pay the standing charge. If your meter runs out of 
    credit the standing charge will be taken off future top ups at a rate of 55% towards gas and 45% towards paying off any standing charge debt you have accrued. So you will always get a minimum of 55% of your top 
    ups towards your gas.
    </p>

    <p class="script"><strong>National Average</strong></p>
    <p class="script">Now we can actually compare this to the average customer's uage. The average household in Ireland will use ${nationalAverageUnitsYearly} which on our rates would be €1902.03
        kwh of Gas per year according to the CRU. Bear in mind that people would usually use significantly more gas in
        winter and we would usually see very low gas usage in the summer, or even some poeple would turn their gas off
        for sevearl months. So the daily cost would be €${nationalAverageSpendDaily.toFixed(2)}c per day but to get this average you may use
        approximately €${(nationalAverageSpendDaily * 2).toFixed(2)}c  per day in the winter and none in the summer.</p>
    
    <p class="script"><strong>Comparison</strong></p>
     <p class="script">So if we take this average figures we can see that in the same time period the average customer would use ${nationalAverageUnitsDaily.toFixed(2)}
        Units per day which would cost them €${(nationalAverageUnitsDaily * (unitRate + carbonTaxRate)).toFixed(2)}c for their Gas and pay €${dailyChargeRate.toFixed(2)}c in the combined daily charges for a total of €${nationalAverageSpendDaily.toFixed(2)}c. 
        So comparing yourself to them 
        ${nationalAverageSpendDaily < totalSpend / daysDifference ? `you're €${((totalSpend/daysDifference)-nationalAverageSpendDaily).toFixed(2)}c per day above the average` : `you're €${(nationalAverageSpendDaily-((totalSpend/daysDifference))).toFixed(2)}c per day below the average`}.</p>
        
    <h3 class="script">Links</h3>
    <p class="script">The below links will be useful follow up steps that the customer can take to reduce their usage on Gas</p>
        <div class="gas-links">
        <div class="gas-card">
        <p>Click here to view Gas Usage Tips on the Knowledge Base</p>
        <a class="gas-link" target="_blank" href="https://yuno.shelf-eu.com/read/93860c86-9221-4e9a-914d-a5c3599ae60b/?searchEventId=01J6EHJ249W37941BGK1EG7MXB&source=shelf&trigger=title&view=snippet-view#gas-savings-usage-tips">Gas Usage Tips</a>
        </div><div class="gas-card">
        <p>Click here to Generate a Gas Statement</p>
        <a class="gas-link" target="_blank" href="http://crmnext:8181/Finance/CustomerStatement.aspx?id=ContentPlaceHolder1_StatementTypeList_ddlStatementType&value=2">Gas Statement</a>
        </div>
        <div class="gas-card">
        <p>Click here to check if the customer has a BER report</p>
        <a class="gas-link" target="_blank" href="https://ndber.seai.ie/PASS/BER/Search.aspx">BER Check</a>
        </div>
        <div class="gas-card">
        <p>Click here to get details on Energy Saving Kits from a library</p>
        <a class="gas-link" target="_blank" href="https://www.google.com/search?q=library+energy+kit&rlz=1C1GCEU_enIE1013IE1013&oq=library+energy+kit&aqs=chrome..69i57j0i22i30j69i60l2.2665j0j7&sourceid=chrome&ie=UTF-8">Energy Saving Kits</a>
        </div></div>
        `
});


// Get the button that opens the modal

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

