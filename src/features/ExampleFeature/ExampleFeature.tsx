import { ExampleApi } from '@/shared/api';

export const ExampleFeature = () => {
  const { data } = ExampleApi.useExampleApiRoute();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
