<template>
<div class="wrapper my-5">
  <v-btn small color="primary" link to="/apps">Back to List</v-btn>
  <h1 class="mt-4">Add New</h1>
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

</div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators';

export default {
  name: "AppCreate",
  data() {
    return {
      loading: false,
      name: '',
      description: '',
      type: '',
      types: ['Mobile', 'Web'],
      domainName: '',
      framework: '',
      frameworks: ['Django', 'React Native']
    }
  },
  computed: {
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
    }
  },
  methods: {
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
        await this.axios.post('/api/v1/apps', data);
        this.loading = false;
        this.$toast.success('App has been created');
        this.$v.$reset();
        this.name = '';
        this.description = '';
        this.framework = '';
        this.domainName = '';
        this.type = '';
      }catch (e) {
        this.$toast.error(e.message || 'Something went wrong when creating app');
      }finally {
        this.loading = false
      }
    }
  },
  validations: {
    name: {required, minLength: minLength(2)},
    type: {required},
    framework: {required}
  }
}
</script>

<style scoped lang="scss">
.form{
  width: 30rem;
}
</style>
