import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '@/features/posts';
import pagesReducer from '@/features/pages';
import commentsReducer from '@/features/comments';
import usersReducer from '@/features/users';

const store = configureStore({
    reducer: {
        pages: pagesReducer,
        posts: postsReducer,
        comments: commentsReducer,
        users: usersReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
