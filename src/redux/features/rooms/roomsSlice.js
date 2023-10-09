import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// http://127.0.0.1:3000/api/v1/rooms

const initialState = {
    rooms: {},
    error: '',
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', ()=> axios.get())