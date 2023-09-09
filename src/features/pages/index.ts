import { createSlice, createAsyncThunk, createEntityAdapter, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from "@/redux/store";
import { Page } from './page.type'

// Set up the entity adapter
const pagesAdapter = createEntityAdapter<Page>({
  selectId: (page) => page.slug,
});

// Define the initial state using the adapter's getInitialState method
const initialState = pagesAdapter.getInitialState({
  fetchPagesStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  fetchPagesError: null as string | null,
  fetchPageBySlugStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  fetchPageBySlugError: null as string | null,
});

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
  const response = await fetch("/api/pages/");
  return await response.json();
});

export const fetchPageBySlug = createAsyncThunk<any, string>('pages/fetchPageBySlug', async (pageSlug: string) => {
  const response = await fetch(`/api/pages/${pageSlug}`);
  return await response.json();
});

const selectSelf = (state: RootState) => state

export const fetchPagesStatus = createDraftSafeSelector(
  selectSelf,
  (state) => state.pages.fetchPagesStatus
)

export const fetchPagesError = createDraftSafeSelector(
  selectSelf,
  (state) => state.pages.fetchPagesError
)

// Define the slice
const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.fetchPagesStatus = 'loading';
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.fetchPagesStatus = 'succeeded';
        pagesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.fetchPagesStatus = 'failed';
        state.fetchPagesError = action.error.message ? action.error.message : null;
      })
      .addCase(fetchPageBySlug.pending, (state) => {
        state.fetchPageBySlugStatus = 'loading';
      })
      .addCase(fetchPageBySlug.fulfilled, (state, action) => {
        state.fetchPageBySlugStatus = 'succeeded';
        pagesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPageBySlug.rejected, (state, action) => {
        state.fetchPageBySlugStatus = 'failed';
        state.fetchPageBySlugError = action.error.message ? action.error.message : null;
      });
  },
});

// Export the auto-generated actions and the reducer
export default pagesSlice.reducer;

const projectSelectors = pagesAdapter.getSelectors(
  (state: RootState) => state.pages
);

export const { selectIds, selectEntities, selectById, selectTotal, selectAll } =
  projectSelectors;
export const selectPageBySlug = selectById;