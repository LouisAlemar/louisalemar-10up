import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '@/features/posts';
import pagesReducer from '@/features/pages';

const store = configureStore({
    reducer: {
        pages: pagesReducer,
        posts: postsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;


