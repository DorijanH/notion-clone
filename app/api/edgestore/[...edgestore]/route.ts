import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStore } from '@edgestore/server';

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    /**
     * return `true` to allow delete
     * This function must be defined if you want to delete files directly from the client.
     */
    .beforeDelete(() => {
      return true;
    })
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;