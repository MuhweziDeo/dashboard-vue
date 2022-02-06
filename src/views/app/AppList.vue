<template>
  <div class="wrapper">
      <h1>Apps</h1>

    <v-btn class="my-5" color="primary" small link to="/apps/create">Create App</v-btn>
    <v-data-table
        :headers="headers"
        :items="apps"
        class="elevation-1"
        :disable-pagination="true"
        :loading="loading"
    >

      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:item.subscription="{item}">
       <v-btn link x-small rounded color="primary" :to="`/apps/${item.id}/edit?tab=subscription`">Upgrade</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  data () {
    return {
      loading: false,
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Framework', value: 'framework' },
        { text: 'Domain Name', value: 'domain_name' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: 'Subscription', value: 'subscription', sortable: false },

      ],
      apps: [],
    }
  },
  async mounted() {
    this.loading = true;
    try{
      const{data} = await this.axios.get('/api/v1/apps/');
      this.apps = data;
    }catch (e) {
      this.$toast.error(e.message || 'Something went wrong')
    }finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapMutations({
      setEditItem: 'app/SET_EDIT_ITEM',
    }),
    editItem(item) {
      console.log(item);
      this.setEditItem(item);
      this.$router.push(`/apps/${item.id}/edit`)
    },
    async deleteItem(item) {
      const confirm = window.confirm('Are sure you want to delete this')
       if(confirm) {
         try {
           this.loading = true;
           await this.axios.delete(`/api/v1/apps/${item.id}`);
           this.apps = this.apps.filter((app) => app.id !== item.id);
           this.$toast.success('App has been deleted');
         }catch (e) {
           this.$toast.error(e.message || 'Something went wrong');
         }finally {
           this.loading = false;
         }

       }
    }
  }
}
</script>

<style>

</style>
