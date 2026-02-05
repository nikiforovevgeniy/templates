<template>
  <pre>{{ data }}</pre>
</template>

<script lang="ts" setup>
import { ExampleApi } from '@/shared/api';

const { data } = ExampleApi.useExampleApiRoute();
</script>
