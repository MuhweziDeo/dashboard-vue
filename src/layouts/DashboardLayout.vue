<template>
  <v-row>
    <v-col cols="2">
      <v-navigation-drawer v-model="isOpen" absolute permanent>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="primary">
              <span class="white--text text-h5">{{user.email.charAt(0)}}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- </v-card> -->
    </v-col>
    <v-col cols="8" class="ml-10">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", link: '/home'},
        { title: "Apps", icon: "mdi-account", link: '/apps'},
        // { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
  computed: {
    ...mapGetters({ isOpen: "drawer/GET_DRAWER_OPEN", user: "auth/GET_USER" }),
  },
  methods: {
    ...mapMutations({ setDrawerOpen: "drawer/SET_DRAWER_OPEN" }),
  },
};
</script>