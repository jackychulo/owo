import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: '',
    activeTag: 'All',
    scrollDown: false,
    imgStatus: 'idle',
    breedsStatus: 'idle',
    error: '',
    breeds: [],
    images: []
  },
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload
    },
    emptySearch: state => {
      state.search = ''
    },
    submitSearch: state => {
      state.scrollDown = true
    },
    resetSearch: state => {
      state.scrollDown = false
      state.search = ''
    },
    updateTag: (state, action) => {
      state.activeTag = action.payload
    }
    /* postAdded: {
        reducer(state, action) {
          state.push(action.payload)
        },
        prepare(title, content) {
          return {
            payload: {
              id: nanoid(),
              title,
              content
            }
          }
        }
      } */

  },
  extraReducers(builder) {
    builder
      .addCase(fetchCatsByTags.pending, (state, action) => {
        state.imgStatus = 'loading'
      })
      .addCase(fetchCatsByTags.fulfilled, (state, action) => {
        state.imgStatus = 'succeeded'
        state.images = action.payload
      })
      .addCase(fetchCatsByTags.rejected, (state, action) => {
        state.imgStatus = 'failed'
        state.error = action.error.message
      }).addCase(fetchCatsByBreeds.pending, (state, action) => {
        state.breedsStatus = 'loading'
      })
      .addCase(fetchCatsByBreeds.fulfilled, (state, action) => {
        state.breedsStatus = 'succeeded'
        state.breeds = action.payload
      })
      .addCase(fetchCatsByBreeds.rejected, (state, action) => {
        state.breedsStatus = 'failed'
        state.error = action.error.message
      })
  }
})

//thunks, outside of the slice, need extraReducers to reduce these
export const fetchCatsByTags = createAsyncThunk('search/fetchCats', async (data) => {
  const { q } = data
  const result = q.trim().split(/\s+/)
  let tags = ''
  for (let index = 0; index < result.length; index++) {
    if (index !== 0) tags += ","
    tags += result[index]
  }
  const res = await fetch(`https://cataas.com/api/cats?tags=${tags}`)
    .then(res => res.json())
    .then(res => res)
    .catch(err => err)

  return res
});

export const fetchCatsByBreeds = createAsyncThunk('search/fetchBreeds', async (data) => {

  const { q } = data

  const res = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${q}`, {
    headers: {
      'x-api-key': process.env.REACT_APP_CAT_API
    }
  })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err)

  console.log(res);

  return res
});



//for components
export const {
  updateSearch, emptySearch, testSearch, submitSearch, resetSearch, updateTag
} = searchSlice.actions

//for store
export default searchSlice.reducer

/* export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
}) */