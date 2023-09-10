import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '@/features/posts';
import pagesReducer from '@/features/pages';
import mediaReducer from '@/features/media';

const store = configureStore({
    reducer: {
        pages: pagesReducer,
        posts: postsReducer,
        media: mediaReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;


