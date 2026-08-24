<template>
  <div>
    <pre>{{ session.data?.user }}</pre>
    <button class="border p-1 cursor-pointer" @click="logout">logout</button>
  </div>
</template>

<script lang="ts" setup>
import { authClient } from '@/shared/api/auth-client';

definePageMeta({ middleware: 'auth' });

const session = authClient.useSession();

const logout = async () => {
  await authClient.signOut();
  navigateTo('/login', { external: true });
};
</script>
