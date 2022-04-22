import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    activeEditorInstance: "editorInstanceOne",
    editorInstancesIds: ["editorInstanceOne"],
    editorInstancesDelta: {},
    editorInstances: {}, 
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
   pushEditorInstanceId: (state,actions) => {
       console.log("pushEditorInstanceId");
       const { editorInstanceId } = actions.payload;
       console.log("editorInstanceId",editorInstanceId);
       state.editorInstancesIds.push(editorInstanceId);
       state.activeEditorInstance = editorInstanceId;
   },   
   insertEditorInstancesDelta: (state,{payload}) => {
       const {editorInstanceId,editorInstanceDelta} = payload;
       state.editorInstancesDelta[editorInstanceId] = editorInstanceDelta;
   },
   updateActiveEditor: (state, actions) => {
       console.log("update active editor reducer");
       const {activeEditorInstance} = actions.payload;
       state.activeEditorInstance = activeEditorInstance;
   }
  },
})

export const { pushEditorInstanceId,insertEditorInstancesDelta,updateActiveEditor } = editorSlice.actions
export default editorSlice.reducer