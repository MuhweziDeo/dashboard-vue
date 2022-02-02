<template>
  <div class="wrapper">
    <v-row justify="center" class="form" align="center">
      <v-card class="px-5 py-5 card">
        <h2 class="my-3 text-center">Welcome Back</h2>
        <h3 class="my-3 text-center">Login</h3>

        <v-form>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            rounded
            outlined
            label="email"
          />
          <v-text-field
            rounded
            outlined
            label="Password"
            v-model="password"
            :error-messages="passwordErrors"
            type="password"
            class="my-1 py-0"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          />
          <v-btn
            @click="login()"
            :loading="loading"
            block
            color="primary"
            :disabled="$v.$invalid || loading"
            >Login</v-btn
          >
           <p class="mt-2">
            Forgot your password?
            <v-btn color="primary"  small text link to="/reset-password"
              >Reset</v-btn
            >
          </p>
          <v-divider class="my-3" />
         

         
            <v-btn color="primary" block  link to="/register"
              >Dont have an Account? Register</v-btn
            >
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 6 characters");
      return errors;
    },
  },
  methods: {
    async login() {
      const { email, password } = this;
      this.loading = true;
      try {
        const { data } = await this.axios.post("/rest-auth/login/", {
          email,
          password,
        });
        console.log(data);
        localStorage.setItem("token", data.key);
        this.$toast.success("Login Successful");
        this.email = "";
        this.password = "";
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
};
</script>

<style lang="scss">
.form {
  min-height: 90vh;
}
.card {
  width: 25rem;
}
</style>