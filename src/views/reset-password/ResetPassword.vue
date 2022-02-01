<template>
  <div class="wrapper">
    <v-row justify="center" class="form" align="center">
      <v-card class="px-5 py-5 card">
        <h2 class="my-3 text-center">Reset Password</h2>
        <p class="my-3 text-center">We get it. It happens sometimes</p>
        <p class="my-3 text-center">
          Enter email and we shall send you a link to reset your password
        </p>

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
          <v-btn
            @click="resetPassword()"
            :loading="loading"
            block
            color="primary"
            :disabled="$v.$invalid || loading"
            >Reset</v-btn
          >
          <v-divider class="my-5" />
          <p class="text-center">
            Remember the password ?
            <v-btn color="primary" small text link to="/">Login</v-btn>
          </p>
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      loading: false,
      email: "",
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
  },
  methods: {
    async resetPassword() {
      const { email } = this;
      this.loading = true;
      try {
        await this.axios.post("/rest-auth/password/reset/", {
          email,
        });
        this.$v.$reset();
        this.$toast.success("A password reset link has been sent to your email");
        this.email = "";
      } catch (error) {
        this.$toast.error(error.response?.data?.email?.email[0] || error.message || "Something went wrong");

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