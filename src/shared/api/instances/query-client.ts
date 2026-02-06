import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';

export const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false, // Окно перефокусировано
      // refetchOnMount: false, // Новые экземпляры запроса монтирования
      // retry: false, // повтор в случае неудачи
    },
  },
};

export const queryClient = new QueryClient(config);
