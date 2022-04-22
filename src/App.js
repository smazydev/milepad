import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import Editor from './components/editor/Editor';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import { Toolbar } from './components/Toolbar/Toolbar';

function App() {

  const editorIdArr = useSelector((state) => state.editor.editorInstancesIds);

  return (
    <div className="App">
      <Header/>
      <Toolbar />
      <div className='EditorContainer'>
      {
        editorIdArr.map((id) => {
          return <Editor key={id} quillId={id}/>
        })
      }
      </div>
    </div>
  );
}

export default App;
