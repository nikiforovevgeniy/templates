import {
  delay,
  http,
  HttpResponse,
  type ResponseResolverReturnType,
} from 'msw';
import type { ExampleResource } from '../api/generated/types';

export const exampleHandlers = [
  // GET /example
  http.get(
    '/example',
    async (): Promise<ResponseResolverReturnType<ExampleResource[]>> => {
      await delay(500);
      return HttpResponse.json([
        {
          id: 1,
          label: 'Адын',
        },
        {
          id: 2,
          label: 'Два',
        },
      ]);
    }
  ),
];
