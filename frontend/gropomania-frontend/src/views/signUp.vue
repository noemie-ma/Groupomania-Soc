<template>
  <!-- Subscription -->
  <div id="form-zone">
    <div class="explanation-signup">
      <p>Inscrivez-vous afin de profiter de notre service</p>
    </div>
    <div class="formulaire">
      <form class="form" action="/signUp" method="post">
        <div>
          <label for="name">Nom :</label>
          <input type="text" v-model="inputNom" name="user_name" />
        </div>
        <div>
          <label for="surname">Prénom :</label>
          <input type="text" v-model="inputPrenom" name="user_surname" />
        </div>
        <div>
          <label for="mail">Email :</label>
          <input type="text" v-model="inputEmail" name="user_mail" />
        </div>
        <div>
          <label for="pass">Mot de passe (8 caractères minimum):</label>
          <input
            type="password"
            v-model="inputPassword"
            name="password"
            minlength="8"
            required
          />
        </div>
      </form>
    </div>
    <div class="button">
      <button @click="getSignedIn()">S'inscrire</button>
    </div>
    <div class="explanation">
      <p>
        Vous avez un compte ? Vous pouvez vous connecter
        <a href="/signUp">ici </a> !
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import "../style.css";

export default {
  name: "signUp",
  data() {
    return {
      inputNom: "inputNom",
      inputPrenom: "inputPrenom",
      inputEmail: "inputEmail",
      inputPassword: "inputPassword",
      invalid: false,
    };
  },
  methods: {
    getSignedIn() {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          nom: this.inputNom,
          prenom: this.inputPrenom,
          email: this.inputEmail,
          password: this.inputPassword,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        })
        .then((response) => {
          console.log(response.data);

          if (response.status == 201) {
            window.location.href = "/JourNal";
            alert("L'inscription est réussie ! Bienvenue parmi nous !");
          } else {
            alert(
              "Une erreur est survenue lors de l'inscription, contactez l'administrateur"
            );
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>