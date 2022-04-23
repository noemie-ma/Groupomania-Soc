<template>
  <main class="container">
    <section id="filPrincipal">
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
          <div id="feed">
            <h1>Fil d'actualités</h1>
            <p>
              Si vous souhaitez publier un message, c'est par
              <a href="/JourNal">ici</a>!
            </p>
            <div v-bind="message in messages" class="message">
              {{ getMessages }}:
              <span class="lighten">
                <span v-html="id"></span>{{ userId }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

  <script>
import axios from "axios";
// import "../main.css";

/*axios.defaults.headers.common["Authorization"] = `token ${localStorage.getItem(
  "token"
)}`;*/
export default {
  name: "JourNal",
  data() {
    return {
      messages: [],
      id: "",
      nom: "",
      prenom: "",
      message: "",
      image: "",
    };
  },
  methods: {
    getMessages: function () {
      axios
        .get("http://localhost:3000/api/messages/all", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        })
        .then((response) => (this.messages = response.data));
    },
  },
};
</script>