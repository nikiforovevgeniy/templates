import { queryClient } from '@/shared/api/instances/query-client';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';

export { VueQueryPlugin as VueQuery } from '@tanstack/vue-query';

export const VueQueryConfig: VueQueryPluginOptions = {
  queryClient,
};
