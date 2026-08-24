export default defineEventHandler(() => {
  throw createError({
    statusCode: 404,
  });
});
