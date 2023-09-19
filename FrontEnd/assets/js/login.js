import { getLogin } from "./services.js";

const elFormLogin = document.getElementById("login");

elFormLogin.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();

    const loginFormData = new FormData(elFormLogin);

    const mail = loginFormData.get("mail");
    const password = loginFormData.get("password");
    const elErrorIndication = document.querySelector(".error-login");

    if (mail && password) {
      const response = await getLogin(mail, password);
      if (!response.ok) {
        elErrorIndication.innerHTML =
          "Le mot de passe ou l'email n'est pas correct";
        elErrorIndication.focus();
      } else {
        localStorage.setItem("auth", JSON.stringify(await response.json()));
        elErrorIndication.innerHTML = "";
        location.href = "/frontend/index.html";
      }
    }
  }

  //   const { token } = await getLogin("sophie.bluel@test.tld", "S0phie");
);
