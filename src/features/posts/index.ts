import { createSlice, createAsyncThunk, createEntityAdapter, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from "@/redux/store";
import { Post } from './post.type'

// Set up the entity adapter
const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.slug,
});

// Define the initial state using the adapter's getInitialState method
const initialState = postsAdapter.getInitialState({
  fetchPostsStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  fetchPostsError: null as string | null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch("/api/posts/");
  // console.log('response', response)
  return await response.json();
});

const selectSelf = (state: RootState) => state

export const fetchPostsStatus = createDraftSafeSelector(
  selectSelf,
  (state) => state.posts.fetchPostsStatus
)

export const fetchPostsError = createDraftSafeSelector(
  selectSelf,
  (state) => state.posts.fetchPostsError
)

// Define the slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAllPosts: postsAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostsStatus = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPostsStatus = 'succeeded';
        // Use the adapter to set the posts in the state
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsStatus = 'failed';
        state.fetchPostsError = action.error.message ? action.error.message : null;
      });
  },
});


// Export the auto-generated actions and the reducer
export default postsSlice.reducer;

const postSelector = postsAdapter.getSelectors(
  (state: RootState) => state.posts
);

export const { selectIds, selectEntities, selectById, selectTotal, selectAll } =
  postSelector;

export const selectPostBySlug = selectById;