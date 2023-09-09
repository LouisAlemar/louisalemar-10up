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
});

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
  const response = await fetch("/api/pages/");
  // console.log('response', response)
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