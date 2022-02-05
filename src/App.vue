<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

    <template v-if="!loading">
      <v-avatar v-if="isAuthenticated" color="indigo">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <template v-else>
      <v-btn color="primary" small link to="/" v-if="$route.name !== 'login'">Login</v-btn>
      <v-btn color="primary" small link v-if="$route.name !== 'register'" to="/register">Register</v-btn>
    </template>
    </template>

    <template v-else>
      <v-progress-circular color="white" size="40" indeterminate/>
    </template>

    </v-app-bar>

    <v-main>
      <v-row v-if="loading" class="loader" justify="center" align-content="center" >
            <v-progress-circular color="primary" size="40" indeterminate/>

      </v-row>
    <router-view v-else></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "App",
  async mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.loading = false;
    } else {
      try {
        const { data } = await this.axios.get("/rest-auth/user/");
        // add a guard to prevent authenticated user from viewing this page
        this.setAuthSucess(data);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        this.loading = false;
      }
    }
  },
  components: {},

  data: () => ({
    loading: true,
  }),
  methods: {
    ...mapMutations({ setAuthSucess: "auth/SET_AUTH_SUCCESS" }),
  },
  computed: {
    ...mapGetters({ isAuthenticated: "auth/GET_IS_AUTHENTICATED" }),
  },
};
</script>

<style lang="scss">
.loader {
  min-height: 90vh;
  margin: 0 auto;
}
</style>