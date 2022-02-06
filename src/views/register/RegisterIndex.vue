<template>
  <div class="wrapper">
    <v-row justify="center" class="form" align="center">
      <v-card class="px-5 py-5 card">
        <h2 class="my-3 text-center">Create Account</h2>
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
          <v-text-field
            rounded
            outlined
            label="confirm Password"
            v-model="confirmPassword"
            :error-messages="confirmPasswordErrors"
            type="password"
            class="my-1 py-0"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
          />
          <v-btn
            @click="register()"
            :loading="loading"
            block
            color="primary"
            :disabled="$v.$invalid || loading"
            >Register</v-btn
          >
          <v-divider class="my-5" />
          <p class="text-center">
            Already registered?
            <v-btn color="primary" small text link to="/">SigIn</v-btn>
          </p>
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      confirmPassword: "",
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
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push("Password confirmation is required");
      !this.$v.confirmPassword.sameAs &&
        errors.push("Password confirmation is not the same as password");
      return errors;
    },
  },
  methods: {
    async register() {
      const { email, password } = this;
      this.loading = true;
      try {
        const { data } = await this.axios.post("/rest-auth/registration/", {
          email,
          password,
        });
        this.$v.$reset();
        localStorage.setItem("token", data.key);
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        this.$toast.success(
          "Sign up successful!"
        );
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        this.$toast.error(
            error.response?.data?.email || error.message || 'Something went wrong'
        );
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
    confirmPassword: {
      required,
      sameAs: sameAs("password"),
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
