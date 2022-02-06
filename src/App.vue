<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">
        App
      </div>

      <v-spacer></v-spacer>

    <template v-if="!loading">
      <v-menu offset-y v-if="isAuthenticated">
        <template v-slot:activator="{ on, attrs }">

                <v-avatar   v-bind="attrs"
                            v-on="on" v-if="isAuthenticated" color="indigo">
                <span>{{avatar}}</span>
              </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
      this.$router.push('/');
    } else {
      try {
        const { data } = await this.axios.get("/rest-auth/user/");
        this.setAuthSuccess(data);
      } catch (error) {
        localStorage.removeItem("token");
        this.$router.push('/');
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
    ...mapMutations({ setAuthSuccess: "auth/SET_AUTH_SUCCESS", setLogOut: 'auth/SET_AUTH_LOGOUT' }),
    logout() {
      const confirm = window.confirm('Are u sure you want to logout')
      if (confirm) {
        this.setLogOut();
        this.$toast.success('Logout successful');
        this.$router.push('/');
      }
    }
  },
  computed: {
    ...mapGetters({ isAuthenticated: "auth/GET_IS_AUTHENTICATED", user: "auth/GET_USER"  }),
    avatar() {
      return this.user.email?.charAt(0)?.toUpperCase()
    }
  },
};
</script>

<style lang="scss">
.loader {
  min-height: 90vh;
  margin: 0 auto;
}
</style>
