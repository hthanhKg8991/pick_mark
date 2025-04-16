import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    isConnected: boolean;
    appState: null | string;
    isIntroduce: boolean;
  }
  const initialState: IInitialState = {
    isConnected: true,
    appState: null,
    isIntroduce: false,
  };
  const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      setAppState: (state: any, action) => {
        state.appState = action.payload;
      },
      setIsConnected: (state, action) => {
        state.isConnected = action.payload;
      },
      setIsIntroduce: (state, action) => {
        state.isIntroduce = action.payload;
      },
    },
  });

const appActions = appSlice.actions;

export { appActions };
export type { IInitialState };
export default appSlice.reducer;
