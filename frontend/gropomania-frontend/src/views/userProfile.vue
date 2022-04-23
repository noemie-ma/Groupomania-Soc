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
        <div class="profile">
          <div v-bind="(user, index) in users" class="user">
            {{ user }}
            <h1 class="title">
              Bienvenue sur votre profil {{ prenom }} {{ nom }} !
            </h1>
            <p>
              Si vous souhaitez changer des détails sur votre profil, c'est
              ci-dessous.
            </p>
            <p>{{ email }} {{ bio }} {{ createdAt }}</p>
            <div class="options">
              <button @click="update()">Modifier mon compte</button>
              <button @click="deleteLocalStorage()">
                Supprimer mon compte
              </button>
              <button @click="logout()" class="button">Déconnexion</button>
            </div>
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
      nom: null,
      prenom: null,
      email: null,
      bio: null,
      createdAt: "",
    };
  },
  async created() {
    let id = localStorage.getItem("id");
    this.user = await axios
      .get("http://localhost:3000/api/users" + id, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      })
      .then((response) => (this.user = response.data));
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
    localClear() {
      localStorage.clear();
      router.push({ path: "/" });
    },
  },
};
</script>