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
          <!-- Zone de publication de messages-->
          <div id="post">
            <form method="post" action="publish">
              <textarea
                rows="5"
                cols="20"
                wrap="physique"
                v-model="message"
                name="messages"
              >
Ecrivez un message ici</textarea
              ><br />
              <input type="hidden" v-model="image" name="MAX_FILE_SIZE" />

              <input type="file" /><br />
              <router-link to="/Feed">
                <button
                  type="submit"
                  v-on:click="createMessage()"
                  class="btn btn-primary"
                >
                  Publier
                </button>
              </router-link>
            </form>
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

axios.defaults.headers.common["Authorization"] = `token ${localStorage.getItem(
  "token"
)}`;
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
    createMessage: function () {
      axios
        .post("http://localhost:3000/api/messages/create", {
          message: this.message,
          image: this.image,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        })
        .then((response) => {
          console.log(response.data);

          if (response.status == 201) {
            window.location.href = "/Feed";
            alert("La publication est réussie !");
          } else {
            alert(
              "Une erreur est survenue lors de la publication, contactez l'administrateur"
            );
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    commentPage(m) {
      console.log(m);
      localStorage.setItem("message.id", m);
      router.push({ path: "/Commentaires" });
    },
    deleteMessage(a, b, c) {
      console.log(typeof a, typeof b, typeof c);
      let confirmMessageDeletion = confirm(
        "voulez-vous vraiment supprimer cette image ?, tous les commentaires associés seront également supprimés."
      );
      if (confirmMessageDeletion == true) {
        axios
          .delete("http://localhost:3000/api/messages/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: {
              messageId: a,
              messageUid: b,
              uid: c,
            },
          })
          .then((res) => console.log(res))
          .catch((error) => {
            location.reload();
            console.log("ligne 133 " + error);
          });
      } else {
        return;
      }
    },
    localClear() {
      localStorage.clear();
      router.push({ path: "/" });
    },
  },
};
</script>