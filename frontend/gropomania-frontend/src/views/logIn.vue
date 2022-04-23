<template>
  <div id="form-zone">
    <div class="explanation-login">
      <p>Vous possédez déjà un compte ? Connectez-vous !</p>
    </div>

    <div class="formulaire">
      <form class="form2" action="/connexion" method="post">
        <div>
          <label for="username">Email:</label>
          <input type="text" v-model="inputEmail" name="emailLogin" />
        </div>

        <div>
          <label for="password">Mot de passe:</label>
          <input
            type="password"
            v-model="inputPassword"
            name="passwordLogin"
            minlength="8"
            required
          />
        </div>
      </form>
    </div>
    <div class="button">
      <button @click="login()">Se connecter</button>
    </div>
    <div class="explanation">
      <p>
        Vous ne possédez pas de compte ? Vous pouvez vous inscrire
        <a href="/">ici </a> !
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
//import router from "../router";
import "../style.css";

export default {
  name: "logIn",
  data() {
    return {
      inputEmail: "inputEmail",
      inputPassword: "inputPassword",
      isInvalid: false,
    };
  },
  methods: {
    login() {
      console.log("login");
      if (!this.inputEmail || !this.inputPassword) {
        return (this.isInvalid = true);
      }
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.inputEmail,
          password: this.inputPassword,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        })
        .then(function (res) {
          console.log(res.data);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          localStorage.setItem("nom", res.data.nom);
          localStorage.setItem("prenom", res.data.prenom);
          localStorage.setItem("token", res.data.token);
          window.alert("La connexion a réussie");
          window.location.href = "/Feed";
        })
        .catch((error) => {
          this.isInvalid = true;
          console.log(error);
        });
    },
  },
};
</script>
