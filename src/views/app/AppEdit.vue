<template>
  <div class="wrapper my-5">
    <v-btn small color="primary" link to="/apps">Back to List</v-btn>
    <v-progress-linear class="my-4" indeterminate v-if="fetchingDetails"/>
    <h1 class="mt-4">Edit {{app.name}}</h1>

    <v-tabs v-model="tab" @change="tabChange">
      <v-tab href="#details">Edit Details</v-tab>
      <v-tab  href="#subscription">Subscription</v-tab>
    </v-tabs>

    <v-tabs-items :value="tab">
      <v-tab-item value="details">
        <form class="form my-5">
          <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              rounded
              filled
              label="Name"
          />

          <v-select
              :items="types"
              label="Type"
              v-model="type"
              filled
              rounded
              @input="$v.type.$touch()"
              @blur="$v.type.$touch()"
              :error-messages="typeErrors"
          ></v-select>

          <v-select
              :items="frameworks"
              label="Framework"
              v-model="framework"
              @input="$v.framework.$touch()"
              @blur="$v.framework.$touch()"
              filled
              rounded
              :error-messages="frameworkErrors"
          ></v-select>

          <v-text-field
              v-model="domainName"
              required
              rounded
              filled
              label="Domain Name"
          />

          <v-textarea
              v-model="description"
              required
              rounded
              filled
              label="Description"
          />

          <v-btn @click="saveApp()" :loading="loading" color="primary" block rounded :disabled="$v.$invalid || loading">
            Save</v-btn>
        </form>
      </v-tab-item>

      <v-tab-item value="subscription">
        <v-progress-linear indeterminate v-if="loadingPlans" class="my-4"/>
        <v-row class="m-5 py-10">
          <v-progress-linear indeterminate v-if="savingSubscriptionLoading"/>
          <v-col v-for="plan in plans" :key="plan.id" cols="12" md="3" lg="3">
            <v-card class="px-2" min-height="12rem" min-width="12rem" >
              <v-card-title>{{plan.name}}</v-card-title>
              <v-card-subtitle>{{plan.price}} $ Per Month</v-card-subtitle>
              <v-card-text>{{plan.description}}</v-card-text>
              <v-btn :disabled="(savingSubscriptionLoading || (plan.id === currentSubscription.plan))" @click="saveSubscription(plan.id)" color="primary" small block>
                {{(plan.id === currentSubscription.plan)  ? 'Current' : 'Select'}}
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

      </v-tab-item>

    </v-tabs-items>


  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators';
import {mapGetters, mapMutations} from 'vuex';
export default {
  name: "AppEdit",
  data() {
    return {
      loading: false,
      name: '',
      description: '',
      type: '',
      types: ['Mobile', 'Web'],
      domainName: '',
      framework: '',
      frameworks: ['Django', 'React Native'],
      plans: [],
      loadingPlans: false,
      subscriptionDialog: false,
      savingSubscriptionLoading: false,
      fetchingDetails: false,
      currentSubscription: {},
      subscriptionId: null,
    }
  },
  computed: {
    ...mapGetters({app: 'app/GET_EDIT_ITEM'}),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required");
      !this.$v.name.minLength &&
      errors.push("Name must be at least 2 characters");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.type.$dirty) return errors;
      !this.$v.type.required && errors.push("Type is required");
      return errors;
    },
    frameworkErrors() {
      const errors = [];
      if (!this.$v.framework.$dirty) return errors;
      !this.$v.framework.required && errors.push("Framework is required");
      return errors;
    },
    tab: {
      set (tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      },
      get () {
        return this.$route.query.tab
      }
    }
  },
  methods: {
    ...mapMutations({setEditItem: 'app/SET_EDIT_ITEM'}),
    async saveApp() {
      try {
        this.loading = true;
        const{name, description, type, framework, domainName: domain_name} = this;
        const data = {
          name,
          description,
          type,
          framework,
          domain_name
        }
        await this.axios.patch(`/api/v1/apps/${this.app.id}`, data);
        this.loading = false;
        this.$toast.success('App has been updated');
        this.$v.$reset();
      }catch (e) {
        this.$toast.error(e.message || 'Something went wrong when creating app');
      }finally {
        this.loading = false
      }
    },
    async tabChange(tab) {
      if(tab === 'subscription' && !this.plans.length) {
        try {
          this.loadingPlans = true;
        const {data} =  await this.axios.get(`/api/v1/plans`);
          this.plans = data;
        }catch (e) {
          this.$toast.error(e.message || 'Something went wrong');
        }finally {
          this.loadingPlans = false;
        }
      }
    },
   async saveSubscription(id) {
     try {
        this.savingSubscriptionLoading = true;
        await this.axios.post(`/api/v1/subscriptions`, {
          plan: id,
          app: this.app.id,
          active: true,
        });
        this.currentSubscription = {...this.currentSubscription, plan: id}
       this.$toast.success('Subscription upgraded');
     }catch (e) {
       this.$toast.error(e.message || 'Something went wrong');
     } finally {
       this.savingSubscriptionLoading = false;

     }
    },
  },
  async mounted() {
    if(Object.keys(this.app).length) {
      this.name = this.app.name;
      this.type = this.app.type;
      this.description = this.app.description;
      this.domainName = this.app.domain_name;
      this.framework = this.app.framework;
      this.subscriptionId = this.app.subscriptionId;
    } else {
      try{
        this.fetchingDetails = true;
       const {data} = await this.axios.get(`/api/v1/apps/${this.$route.params.id}`);
        this.name = data.name;
        this.type = data.type;
        this.description = data.description;
        this.domainName = data.domain_name;
        this.framework = data.framework;
        this.subscriptionId = data.subscription;
      }catch (e) {
        this.$toast.error(e.message || 'Something went wrong')
      }finally {
        this.fetchingDetails = false;

      }
    }


    if(this.subscriptionId) {
      const {data} = await this.axios.get('/api/v1/subscriptions/' + this.subscriptionId);
      this.currentSubscription = data;
    }

  },
  validations: {
    name: {required, minLength: minLength(2)},
    type: {required},
    framework: {required}
  },
  beforeDestroy() {
    this.setEditItem({});
  }
}
</script>

<style scoped lang="scss">
.form{
  width: 30rem;
}
</style>
