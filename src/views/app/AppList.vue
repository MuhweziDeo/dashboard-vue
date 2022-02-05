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
    ></v-data-table>
  </div>
</template>

<script>
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

  }
}
</script>

<style>

</style>
