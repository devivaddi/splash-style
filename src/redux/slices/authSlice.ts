import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  loginMethod: 'email' | 'google' | 'facebook' | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  loginMethod: null,
};

/**
 * Async thunk for email/password login
 */
export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }: { email: string; password: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    if (email && password) {
      return {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
    }
    throw new Error('Invalid credentials');
  }
);

/**
 * Async thunk for social login (Google/Facebook)
 */
export const loginWithSocial = createAsyncThunk(
  'auth/loginWithSocial',
  async ({ provider }: { provider: 'google' | 'facebook' }) => {
    // Simulate social login API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: '1',
      email: `user@${provider}.com`,
      name: `${provider} User`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginMethod = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Email login
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loginMethod = 'email';
        state.error = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
        state.user = null;
      });

    // Social login
    builder
      .addCase(loginWithSocial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithSocial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loginMethod = action.meta.arg.provider;
        state.error = null;
      })
      .addCase(loginWithSocial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Social login failed';
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;