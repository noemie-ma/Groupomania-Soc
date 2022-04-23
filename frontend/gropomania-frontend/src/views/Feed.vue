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
            <div class="cards">
              <div class="message-header">
                <div class="message-header-left">
                  <img src="" alt="" />
                </div>
                <div class="message-header-right">
                  <p>{{ messages.UserId }}</p>
                  <p>{{ messages.CreatedAt }}</p>
                </div>
              </div>
              <div class="message-content">
                <p>{{ messages.message }}</p>
              </div>
              {{ messages }}
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

  <script>
import axios from "axios";
import router from "../router";
// import "../main.css";

/*axios.defaults.headers.common["Authorization"] = `token ${localStorage.getItem(
  "token"
)}`;*/
export default {
  name: "JourNal",
  data() {
    return {
      messages: [],
      UserId: "userId",
      createdAt: "createdAt",
      message: "message",
      image: "null",
    };
  },
  async created() {
    this.messages = await axios
      .get("http://localhost:3000/api/messages/all", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      })
      .then((response) => (this.messages = response.data.list))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    localClear() {
      localStorage.clear();
      router.push({ path: "/" });
    },
  },
};
</script>