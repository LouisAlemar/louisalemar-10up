import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Post type
export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    footnotes: string;
  };
  categories: number[];
  tags: any[];
  _links: {
    self: Link[];
    collection: Link[];
    about: Link[];
    author: LinkEmbeddable[];
    replies: LinkEmbeddable[];
    "version-history": VersionHistory[];
    "wp:attachment": Link[];
    "wp:term": WpTerm[];
    curies: Curies[];
  };
}

interface Link {
  href: string;
}

interface LinkEmbeddable {
  embeddable: boolean;
  href: string;
}

interface VersionHistory {
  count: number;
  href: string;
}

interface WpTerm {
  taxonomy: string;
  embeddable: true;
  href: string;
}

interface Curies {
  name: string;
  href: string;
  templated: true;
}

// Set up the entity adapter
const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
});

// Define the initial state using the adapter's getInitialState method
const initialState = postsAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
});

// Define the thunk
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Post[]>('http://wp.skyloproductions.com/wp-json/wp/v2/posts');
      return response.data;
    } catch (err: any) {
      // If there's an error, it will be passed into the rejected action
      return rejectWithValue(err.response.data);
    }
  }
);

// Define the slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Use the adapter to set the posts in the state
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

// Export the auto-generated actions and the reducer
export default postsSlice.reducer;

// Export the selector functions from the adapter, which allow us to query the state
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: { posts: ReturnType<typeof postsSlice.reducer> }) => state.posts);
