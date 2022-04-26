<template>
  <main class="container">
    <!-- Profil auteur + nav -->
    <article>
      <div class="cards">
        <div class="card-header">
          <div class="details-profil">
            <p>Bienvenue</p>
          </div>
          <nav>
            <li><a href="/Feed">Accueil</a></li>
            <li><a href="/userProfile">Profil</a></li>
            <li>
              <a href="/login">
                <button @click="localClear()">Déconnexion</button>
              </a>
            </li>
          </nav>
        </div>
        <div class="card">
          <div class="container">
            <h4>Bienvenue sur votre profil {{ prenom }} {{ nom }} !</h4>
            <p>
              <img src="public/img/profil.png" alt="Photo de profil" /><br />
              Vous êtes membre depuis le {{ createdAt }}
            </p>
            <p>
              Vous voulez nous quitter ? Quelle tristesse quand même ! A la
              revoyure.
            </p>
            <button class="delbtn" @click="deleteLocalStorage()">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </article>
  </main>
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
      createdAt: "",
    };
  },
  async created() {
    let id = localStorage.getItem("id");
    axios
      .get("http://localhost:3000/api/users/" + id, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.nom = res.data.nom;
        (this.prenom = res.data.prenom),
          (this.email = res.data.email),
          (this.createdAt = res.data.createdAt);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteMyAccount(n) {
      let id = n;
      let confirmUserDeletion = confirm(
        "voulez-vous vraiment supprimer votre compte ?"
      );
      if (confirmUserDeletion == true) {
        axios
          .delete("http://localhost:3000/api/users/del/" + id, {
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
    localClear() {
      localStorage.clear();
      router.push({ path: "/" });
    },
  },
};
</script>