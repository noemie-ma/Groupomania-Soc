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
          <div class="card-body">
            <!-- L'auteur est-il admin ? -->
            <div id="compteButton" class="text-center">
              <router-link v-if="isAdmin" to="/Administration"
                ><button type="button" class="admin-button">
                  Administration
                  <button class="delete">
                    <img
                      src="../assets/poubelle.svg"
                      alt="suppression de message"
                    />
                  </button></button
              ></router-link>
            </div>
          </div>
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
              <input type="hidden" name="MAX_FILE_SIZE" value="4194304" />

              <input type="file" /><br />
              <router-link to="/Feed">
                <button
                  type="submit"
                  @onclick="createMessage()"
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
      name: "",
      creation: "",
      image: "",
    };
  },
  methods: {
    createMessage: function () {
      axios
        .post("http://localhost:3000/api/messages/create", {
          message: this.message,
          userId: this.userId,
          createdAt: this.createdAt,
          messageUrl: this.image,
        })
        .then(() => {
          const formData = new FormData();
          formData.append("image", this.file);
          formData.append("UserId", localStorage.getItem("userId"));
          formData.append("message", this.message);
          alert("publication réussie!");
          router.push({ path: "JourNal" });
        })
        .catch((error) => {
          console.log(error);
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