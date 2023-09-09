import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

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


// Set up the entity adapter
const pagesAdapter = createEntityAdapter<Page>({
  selectId: (page) => page.id,
});

// Define the initial state using the adapter's getInitialState method
const initialState = pagesAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
});

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
  const response = await fetch("/api/pages/");
  // console.log('response', response)
  return await response.json();
});


// Define the slice
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
        pagesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

// Export the auto-generated actions and the reducer
export default pagesSlice.reducer;

// Export the selector functions from the adapter, which allow us to query the state
export const {
  selectAll: selectAllPages,
  selectById: selectPageById,
  selectIds: selectPageIds,
} = pagesAdapter.getSelectors((state: { pages: ReturnType<typeof pagesSlice.reducer> }) => state.pages);
