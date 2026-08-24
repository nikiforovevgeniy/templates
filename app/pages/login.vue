<template>
  <div class="flex items-center justify-center h-dvh">
    <form @submit.prevent="login">
      <div class="flex flex-col gap-1">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border p-1"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border p-1"
          />
        </div>
        <div>
          <button type="submit" class="border p-1 cursor-pointer">login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { authClient } from '@/shared/api/auth-client';

definePageMeta({ middleware: 'guest' });

const email = ref();
const password = ref();

const login = () => {
  authClient.signIn.email({
    email: email.value,
    password: password.value,
    callbackURL: '/profile',
  });
};
</script>
