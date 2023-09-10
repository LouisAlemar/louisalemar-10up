import { createSlice, createAsyncThunk, createEntityAdapter, createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from "@/redux/store";
import { Media } from './media.type'

// Set up the entity adapter
const mediaAdapter = createEntityAdapter<Media>({
  selectId: (media) => media.id,
});

// Define the initial state using the adapter's getInitialState method
const initialState = mediaAdapter.getInitialState({
  fetchMediaStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  fetchMediaError: null as string | null,
});

export const fetchMedia = createAsyncThunk('media/fetchMedia', async () => {
  const response = await fetch("/api/media/");
  return await response.json();
});

const selectSelf = (state: RootState) => state

export const fetchMediaStatus = createDraftSafeSelector(
  selectSelf,
  (state) => state.media.fetchMediaStatus
)

export const fetchMediaError = createDraftSafeSelector(
  selectSelf,
  (state) => state.media.fetchMediaError
)

// Define the slice
const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.fetchMediaStatus = 'loading';
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.fetchMediaStatus = 'succeeded';
        mediaAdapter.setAll(state, action.payload);
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.fetchMediaStatus = 'failed';
        state.fetchMediaError = action.error.message ? action.error.message : null;
      })
  },
});

// Export the auto-generated actions and the reducer
export default mediaSlice.reducer;

const mediaSelectors = mediaAdapter.getSelectors(
  (state: RootState) => state.media
);

export const { selectIds, selectEntities, selectById, selectTotal, selectAll: selectAllMedia } =
  mediaSelectors;
// export const selectPageBySlug = selectById;