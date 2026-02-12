<template>
  <pre>{{ data }}</pre>
</template>

<script lang="ts" setup>
import { exampleApiRouteQuery } from '@/shared/api/generated/@pinia/colada.gen';
import { useQuery } from '@pinia/colada';

const { data } = useQuery(exampleApiRouteQuery);
</script>
