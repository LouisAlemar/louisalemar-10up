import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for a single page
type Page = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'trash' | 'auto-draft' | 'inherit';
  type: 'page';
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
  parent: number;
  menu_order: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  meta: any[];
};


// Entity Adapter
const pagesAdapter = createEntityAdapter<Page>();

// Initial state type
type PagesState = ReturnType<typeof pagesAdapter.getInitialState> & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Initial state
const initialState: PagesState = pagesAdapter.getInitialState({
  status: 'idle',
  error: null
});

// Thunks
export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
  const response = await axios.get<Page[]>('http://wp.skyloproductions.com/wp-json/wp/v2/pages');
  return response.data;
});

// Slice
const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Use the adapter to set the posts in the state
        pagesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

// Selectors
export const {
  selectAll: selectAllPages,
  selectById: selectPageById,
  selectIds: selectPageIds
} = pagesAdapter.getSelectors((state: { pages: PagesState }) => state.pages);

// Reducer
export default pagesSlice.reducer;
