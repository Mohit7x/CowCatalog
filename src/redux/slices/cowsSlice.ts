import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cow, FilterState } from '../../utils/Utility';
import uuid from 'react-native-uuid';

interface CowState {
  cows: Cow[];
  filters: FilterState;
}

const initialState: CowState = {
  cows: [],
  filters: {
    status: undefined,
    pen: undefined
  },
};

interface AddCowPayload {
  earTag: string;
  sex: Cow['sex'];
  pen: string;
  status?: Cow['status'];
  weight?: number;
}

const cowsSlice = createSlice({
  name: 'cows',
  initialState,
  reducers: {
    addCow: (state, action: PayloadAction<AddCowPayload>) => {
      const { earTag, sex, pen, status = 'Active', weight } = action.payload;
      // validate unique earTag
      const exists = state.cows.find(c => c.earTag.toLowerCase() === earTag.toLowerCase());
      if (exists) {
        throw new Error('Ear tag must be unique');
      }
      const newCow: Cow = {
        id: uuid.v4(),
        earTag,
        sex,
        pen,
        status,
        weight,
        createdAt: new Date().toISOString(),
        events: [],
        lastEventDate: undefined,
      };
      console.log('Adding cow', newCow);
      state.cows.unshift(newCow);
    },
    setStatusFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.status = action.payload;
    },
    setPenFilter(state, action: PayloadAction<string | undefined>) {
      state.filters.pen = action.payload;
    },
    clearFilters(state) {
      state.filters = { status: undefined, pen: undefined };
    },
  },
});

export const { addCow, setStatusFilter, setPenFilter, clearFilters } = cowsSlice.actions;
export default cowsSlice.reducer;