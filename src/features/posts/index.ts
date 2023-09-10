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
  fetchPostBySlugStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  fetchPostBySlugError: null as string | null,
  fetchImageByIdStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  fetchImageByIdError: null as string | null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch("/api/posts/");
  return await response.json();
});

export const fetchPostBySlug = createAsyncThunk<any, string>('posts/fetchPostBySlug', async (postSlug: string) => {
  const postResponse = await fetch(`/api/posts/${postSlug}`);
  const postData = await postResponse.json();

  // const imageId = postData[0].featured_media;
  // const imageResponse = await fetch(`http://wp.skyloproductions.com/wp-json/wp/v2/media/${imageId}`);
  // const imageData = await imageResponse.json();

  return postData;
  // return {
  //   ...postData,
  //   ...imageData
  // }
});

export const fetchImageById = createAsyncThunk<any, string>('posts/fetchImageById', async (imageId: string) => {
  const imageResponse = await fetch(`http://wp.skyloproductions.com/wp-json/wp/v2/media/${imageId}`);
  const imageData = await imageResponse.json();
  return imageData
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
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostsStatus = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPostsStatus = 'succeeded';
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsStatus = 'failed';
        state.fetchPostsError = action.error.message ? action.error.message : null;
      })
      // Fetch Post By Slug
      .addCase(fetchPostBySlug.pending, (state) => {
        state.fetchPostBySlugStatus = 'loading';
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.fetchPostBySlugStatus = 'succeeded';
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.fetchPostBySlugStatus = 'failed';
        state.fetchPostBySlugError = action.error.message ? action.error.message : null;
      })
      // Fetch Image By ID
      .addCase(fetchImageById.pending, (state) => {
        state.fetchImageByIdStatus = 'loading';
      })
      .addCase(fetchImageById.fulfilled, (state, action) => {
        state.fetchImageByIdStatus = 'succeeded';
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchImageById.rejected, (state, action) => {
        state.fetchImageByIdStatus = 'failed';
        state.fetchImageByIdError = action.error.message ? action.error.message : null;
      });
  },
});


// Export the auto-generated actions and the reducer
export default postsSlice.reducer;

const postSelector = postsAdapter.getSelectors(
  (state: RootState) => state.posts
);

export const { selectIds, selectEntities, selectById, selectTotal, selectAll: selectAllPosts } =
  postSelector;

export const selectPostBySlug = selectById;
