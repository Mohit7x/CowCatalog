import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cow } from '../../utils/Utility';
import uuid from 'react-native-uuid';

interface CowState {
  cows: Cow[];
}

const initialState: CowState = {
  cows: [],
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
  },
});

export const { addCow } = cowsSlice.actions;
export default cowsSlice.reducer;