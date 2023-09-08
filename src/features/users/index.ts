import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for a single user in WordPress
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  link: string;
  avatar_urls: {
    [key: string]: string;
  };
  description: string;
  slug: string;
  roles: string[];
  registered_date: string;
};

// Entity Adapter
const usersAdapter = createEntityAdapter<User>();

// Initial state type
type UsersState = ReturnType<typeof usersAdapter.getInitialState> & {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// Initial state
const initialState: UsersState = usersAdapter.getInitialState({
  status: 'idle',
  error: null
});

// Thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('http://wp.skyloproductions.com/wp-json/wp/v2/users');
  return response.data;
});

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      });
  }
});

// Selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors((state: { users: UsersState }) => state.users);

// Reducer
export default usersSlice.reducer;
