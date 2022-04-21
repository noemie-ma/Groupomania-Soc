<template>
  <div class="profile">
    <h1 class="title">Bienvenue sur votre profil {{ prenom }} {{ nom }} !</h1>
    <p>
      Si vous souhaitez changer des détails sur votre profil, c'est ci-dessous.
    </p>
    <img :src="user.photo" />
    <p>{{ email }} {{ bio }} {{ createdAt }}</p>
    <div class="options">
      <button @click="update()">Modifier mon compte</button>
      <button @click="deleteLocalStorage()">Supprimer mon compte</button>
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
//import "../style.css";
export default {
  name: "userProfile",
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      bio: "",
      createdAt: "",
    };
  },
  createdAccount() {
    let id = localStorage.getItem("id");
    // let thing  = this;
    axios
      .get("http://localhost:3000/api/users/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        //thing.id = res.data.id;
        this.nom = res.data.nom.charAt(0).toUpperCase() + res.data.nom.slice(1);
        this.prenom =
          res.data.prenom.charAt(0).toUpperCase() + res.data.prenom.slice(1);
        this.email =
          res.data.email.charAt(0).toUpperCase() + res.data.email.slice(1);
        this.isAdmin = res.data.isAdmin;
        this.createdAt = res.data.createdAt
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    update() {
      let id = localStorage.getItem("id");
      axios.put(
        "http://localhost:3000/api/users/" + id,
        {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          bio: this.bio,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
    },
    deleteMyAccount(n) {
      let id = n;
      let confirmUserDeletion = confirm(
        "voulez-vous vraiment supprimer votre compte ?"
      );
      if (confirmUserDeletion == true) {
        axios
          .delete("http://localhost:3000/api/users/del" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res);
            alert(
              "Dommage de vous voir partir. Cliquez sur OK afin de finaliser votre démarche."
            );
            router.replace("http://localhost:8080/api/");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    deleteLocalStorage() {
      localStorage.clear();
      router.push({ path: "/" });
    },
  },
};
</script>