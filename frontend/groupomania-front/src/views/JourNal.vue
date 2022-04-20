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
              <li><a href="/JourNal">Accueil</a></li>
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
              <router-link to="/JourNal">
                <button type="submit" class="btn btn-primary">Publier</button>
              </router-link>
            </form>
          </div>
        </div>
      </article>
      <!-- Affichage message-->
      <div id="timeline">
        <h1 v-if="this.messages.length !== 0">Dernières Publications</h1>
        <h1 v-else>
          Aucune publication pour l'instant, soyez le premier à en créer une !
        </h1>
      </div>
      <!-- bloc avec tous le(s) message(s) -->
      <sub class="Affichage">
        <div class="messages" v-for="message in messages" :key="message.id">
          <div class="box-messages">
            <span class="indication">
              Posté par
              {{
                message.userName.charAt(0).toUpperCase() +
                message.userName.slice(1)
              }}
              le
              {{
                message.createdAt.slice(0, 10).split("-").reverse().join(".") +
                " à " +
                message.createdAt.slice(11, 16)
              }}
            </span>
            <div class="id-message">ref # {{ message.id }}</div>
          </div>
          <div class="btn-comments" @click="commentPage(message.id)">
            <img
              :src="message.messageUrl"
              v-if="message.messageUrl !== ''"
              class="border messImage"
              alt="image postée par un utilisateur"
            />
          </div>
          <div class="isAdmin-affichage">
            <p v-if="isAdmin || message.id == id">
              {{ message.message }}
            </p>
          </div>
          <div class="bloc-comments">
            <button @click="commentPage(message.id)" class="publish-comms">
              <img
                src="../assets/boutoncommenter.svg"
                alt="bouton d'envoi pour publier un commentaire"
              />
            </button>
            <div v-if="isAdmin || message.UserId == id">
              <button
                @click="deleteMessage(message.id, message.UserId, id)"
                class="delete-comms"
              >
                <img
                  src="../assets/poubelle.svg"
                  alt="bouton de suppression d'un commentaire"
                />
              </button>
            </div>
          </div>
        </div>
      </sub>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import router from "../router";
// import "../main.css";
export default {
  name: "JourNal",
  data() {
    return {
      messages: [],
      id: "",
      name: "",
      creation: "",
    };
  },
  created: function () {
    let id = localStorage.getItem("id");
    axios
      .get("http://localhost:3000/api/messages/all", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (res) {
          const rep = res.data.list;
          this.messages = rep;
          rep.splice(10);
          localStorage.setItem("message.id", rep[0].id);
          console.log(this.messages);
        } else {
          console.log("aucun message");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3000/api/users/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        this.id = res.data.id;
        this.nom = res.data.nom.charAt(0).toUpperCase() + res.data.nom.slice(1);
        this.prenom =
          res.data.prenom.charAt(0).toUpperCase() + res.data.prenom.slice(1);
        this.create = res.data.createdAt
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        this.isAdmin = res.data.isAdmin;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
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