import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearObject, setObject } from "../../utils/localStorage";

// api
import authApi from "./authApi";

// interface
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode?: string;
  mobileNumber?: string;
  emailVerified: boolean;
  mobileVerified: boolean;
}

interface AuthState {
  loggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
};

// extra reducers
export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (payload: any, thunkApi) => {
    const res = await authApi.authenticate(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const googleAuthentication = createAsyncThunk(
  "auth/googleAuthentication",
  async (payload: any, thunkApi) => {
    const res = await authApi.googleAuth(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const facebookAuthentication = createAsyncThunk(
  "auth/facebookAuthentication",
  async (payload: any, thunkApi) => {
    const res = await authApi.facebookAuth(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload: any, thunkApi) => {
    const res = await authApi.verify(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload: any, thunkApi) => {
    const res = await authApi.signup(payload);
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const validateUser = createAsyncThunk(
  "auth/validateUser",
  async (_, thunkApi) => {
    const res = await authApi.validate();
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkApi) => {
    const res = await authApi.logout();
    if (res.isSuccessful) {
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = action.payload.loggedIn;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(["Method Name"].fulfilled, (state, action) => {});
    builder.addCase(authenticateUser.fulfilled, (state, action) => {});
    builder.addCase(authenticateUser.rejected, (state, action) => {});
    builder.addCase(googleAuthentication.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        setObject("accessToken", JSON.stringify(action.payload));
        state.loggedIn = true;
      }
    });
    builder.addCase(googleAuthentication.rejected, (state, action) => {});
    builder.addCase(facebookAuthentication.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        setObject("accessToken", JSON.stringify(action.payload));
        state.loggedIn = true;
      }
    });
    builder.addCase(facebookAuthentication.rejected, (state, action) => {});
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        setObject("accessToken", JSON.stringify(action.payload));
        state.loggedIn = true;
      }
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {});
    builder.addCase(signupUser.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        setObject("accessToken", JSON.stringify(action.payload));
        state.loggedIn = true;
      }
    });
    builder.addCase(signupUser.rejected, (state, action) => {});
    builder.addCase(validateUser.fulfilled, (state, action) => {
      state.user = action.payload as User;
      state.loggedIn = true;
    });
    builder.addCase(validateUser.rejected, (state, action) => {
      state.user = null;
      state.loggedIn = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
      state.loggedIn = false;
      clearObject("accessToken")
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
    });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
