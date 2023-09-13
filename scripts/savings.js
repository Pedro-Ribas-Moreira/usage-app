const savingsBtn = document.getElementById("savings-button");
const contentDiv = document.getElementById("savings-modal");
const closeSavingsModal = document.getElementById("savings-modal-close");
const savingsModalContent = document.getElementById("savings-modal-content");

savingsBtn.addEventListener("click", () => {
  contentDiv.classList.toggle("hidden");
  // Get the current date
  const currentDate = new Date();

  // Get the date for Christmas of the current year
  const christmasDate = new Date(currentDate.getFullYear(), 11, 25);

  // Calculate the time difference in milliseconds
  const timeDifference = christmasDate - currentDate;

  // Convert milliseconds to weeks
  const weeksUntilChristmas = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24 * 7)
  );

  // Output the result
  console.log(`There are ${weeksUntilChristmas} weeks until Christmas!`);

  savingsModalContent.innerHTML = `There are ${weeksUntilChristmas} weeks until Christmas, so if you set up your Savings feature now to put aside €5 per week, you'll have €${
    weeksUntilChristmas * 5
  } of credit to cover your Christmas energy spend.`;
});

// When the user clicks on <span> (x), close the modal
closeSavingsModal.onclick = function () {
  contentDiv.classList.toggle("hidden");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == contentDiv) {
    contentDiv.classList.toggle("hidden");
  }
};
