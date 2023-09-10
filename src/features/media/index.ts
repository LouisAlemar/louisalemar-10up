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
  fetchMediaByIdStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  fetchMediaByIdError: null as string | null,
});

export const fetchMedia = createAsyncThunk('media/fetchMedia', async () => {
  const response = await fetch("/api/media/");
  return await response.json();
});

export const fetchMediaById = createAsyncThunk<any, any>('media/fetchMediaById', async (postId: any) => {
  const mediaResponse = await fetch(`/api/media/${postId}`);
  const mediaData = await mediaResponse.json();

  return mediaData;
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

export const fetchMediaByIdStatus = createDraftSafeSelector(
  selectSelf,
  (state) => state.media.fetchMediaByIdStatus
)

export const fetchMediaByIdError = createDraftSafeSelector(
  selectSelf,
  (state) => state.media.fetchMediaByIdError
)

// Define the slice
const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setAllMedia: mediaAdapter.setAll,
  },
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
      .addCase(fetchMediaById.pending, (state) => {
        state.fetchMediaByIdStatus = 'loading';
      })
      .addCase(fetchMediaById.fulfilled, (state, action) => {
        state.fetchMediaByIdStatus = 'succeeded';
        // mediaAdapter.setAll(state, action.payload);
        state.entities[action.payload.id] = action.payload
      })
      .addCase(fetchMediaById.rejected, (state, action) => {
        state.fetchMediaByIdStatus = 'failed';
        state.fetchMediaByIdError = action.error.message ? action.error.message : null;
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

export const selectMediaById = selectById;
