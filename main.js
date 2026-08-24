/* AutoSoft PL: small UI interactions only. */
const leadForm = document.querySelector("#lead-form");
const formSuccess = document.querySelector("#form-success");

if (leadForm && formSuccess) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSuccess.classList.add("is-visible");
  });
}
