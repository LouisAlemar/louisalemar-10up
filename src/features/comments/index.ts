import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for a single comment in WordPress
type Comment = {
  id: number;
  author: number;
  author_name: string;
  content: {
    rendered: string;
  };
  date: string;
  date_gmt: string;
  link: string;
  parent: number;
  post: number;
  status: 'approved' | 'hold' | 'spam' | 'trash';
  type: string;
};

// Entity Adapter
const commentsAdapter = createEntityAdapter<Comment>();

// Initial state type
type CommentsState = ReturnType<typeof commentsAdapter.getInitialState> & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Initial state
const initialState: CommentsState = commentsAdapter.getInitialState({
  status: 'idle',
  error: null
});

// Thunks
export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId: number) => {
  const response = await axios.get<Comment[]>(`http://localhost:8080/wp-json/wp/v2/comments?post=${postId}`);
  return response.data;
});

// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        commentsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      });
  }
});

// Selectors
export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds
} = commentsAdapter.getSelectors((state: { comments: CommentsState }) => state.comments);

// Reducer
export default commentsSlice.reducer;
