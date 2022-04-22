import React, { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import  classes from './Editor.module.css';
import Quill from 'quill';
import { pushEditorInstanceId,updateActiveEditorInstance} from "../../app/EditorSlice";


const instanceMap = new Map();


const Editor = ({quillId}) => {
  

  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const editorIdArr = useSelector((state) => state.editor.editorInstancesIds);
  const activeEditorInstance = useSelector((state) => state.editor.activeEditorInstance);
  

  const Parchment = Quill.import('parchment');
  const lineHeightArr = [
    '1.0',
    '1.2',
    '1.5',
    '1.6',
    '1.8',
    '2.0',
    '2.4',
    '2.8',
    '3.0',
    '4.0',
    '5.0'
  ];
    const lineHeightConfig = {
      scope: Parchment.Scope.INLINE,
      whitelist: lineHeightArr
    };

    const lineHeightClass = new Parchment.Attributor.Class('lineheight', 'ql-line-height', lineHeightConfig);
    const lineHeightStyle = new Parchment.Attributor.Style('lineheight', 'line-height', lineHeightConfig);
    Parchment.register(lineHeightClass);
    Parchment.register(lineHeightStyle);
    

const fontFamilyArr = ["Roboto","Raleway","Roboto Condensed", "Times New Roman", "Calibri", "Calibri Light","Cambria", "Georgia", "Verdana", "Sans-Serif"];
let fonts = Quill.import("attributors/style/font");
fonts.whitelist = fontFamilyArr;
Quill.register(fonts, true);

const fontSizeArr = ['10px', '11px', '12px', '14px','16px', '18px','20px','22px', '24px','26px','28px','30px', '32px','34px', '36px','38px',false,'42px','44px','46px','48px','50px','52px','54px','56px','58px','60px','62px','64px','72px', '96px'];
var Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);


  const toolbarConfig = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link"],
    [{'lineheight': lineHeightArr}],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
   [{ 'size': fontSizeArr }], // custom dropdown
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ 'font': fontFamilyArr }],
    [{ align: [] }],
    
    ["clean"], // remove formatting button
  ];
 // const currentSlideId = '1';
 // const textBox = useSelector((state) => state.slide.slides[state.slide.currentSlideId].textBox[quillId]);
  //const [deltaState, setDeltaState]= useState();
  //const [checkCurrentSlideId, setCurrentSlideId] = useState();
  //const dispatch = useDispatch();
  //const quillRef = useRef();

  const createNewEditorInstance = () => {
    const editorInstanceId = "editor" + (Math.random() * 99999).toFixed();      
    const newInstance = instanceMap.get(editorInstanceId)
    dispatch(pushEditorInstanceId({editorInstanceId}));
    if (!newInstance) {
      console.log("inside if statement create new editor instance")
      newInstance.focus();
      // dispatch(updateActiveEditorInstance({editorInstanceId}));
    }
  }

   useEffect(()=>{
  //   if((currentSlideId && currentSlideId !== checkCurrentSlideId)){
    let globalToolbarContainer = document.querySelector('#quillToolbar');

      const quill = new Quill(`#${quillId}`, {
        theme: "snow",
        modules: {toolbar: toolbarConfig},
      })

      if (!instanceMap.get(quillId)) {
        instanceMap.set(quillId,quill);
        console.log(instanceMap);
      }

      quill.focus(true);  
      //Checks if the editor Id is already available, if it is it doesn't dispatch.
      //Case added for the hardcoded first editor Instance.
      // editorIdArr.map((id) => {
      //   if (id !== quillId) {
      //     return dispatch(pushEditorInstanceId({editorInstanceId:quillId}));
      //   }
      // })


      quill.on("text-change",(delta,source) => {
        console.log("delta",delta);
        console.log("scrollHeight:",quillRef.current.firstChild.scrollHeight);
        const quillContainer = quillRef.current.firstChild;
        const scrollHeight = quillRef.current.firstChild.scrollHeight;
        
        if (scrollHeight >= 1076 && scrollHeight <= 1100) {
          createNewEditorInstance();
          quill.focus(true);
        }
    
      })
  //     if(quill.editor.delta.ops[0].insert.slice(0,8) !== "Click to"){
  //       quill.container.classList.remove("border");
  //     }
  //     if((quill.editor.delta.ops[0].insert === "\n" || quill.editor.delta.ops[0].insert.slice(0,8) === "Click to")){
  //       quill.container.classList.add("border");
  //     }
  //      quill.on('text-change', function(delta, oldDelta, source){
  //       if(source === "listener") {
  //         quill.setSelection(null);
  //         return
  //       }
  //       if(quill.editor.delta.ops[0].insert.slice(0,8) !== "Click to"){
  //               quill.container.classList.remove("border");
  //         }else if(quill.editor.delta.ops[0].insert.slice(0,8) === "Click to"){
  //           quill.container.classList.add("border");
  //         }
  //         !quill.getText().includes(" ") && quill.container.addEventListener('keydown',function(e){
  //               if(e.key === " " || e.key === "enter"){
  //                 let firstWord = quill.editor.delta.ops[0].insert.split('');
  //                 let firstChar = firstWord[0].toUpperCase();
  //                 firstWord[0] = firstChar;
  //                 // firstWord[firstWord.length] = " ";
  //                 quill.deleteText(0, firstWord.length-1);
  //                 quill.insertText(0,firstWord.join(''));
  //                 quill.deleteText(firstWord.length-1,1);
  //               }
  //           },{once: true});
          
  //         setDeltaState({content:quill.getContents(), activeQuillInstanceId: quillId, activeQuill: quill})
        
  //       })
         quill.on('selection-change', function(range, oldRange, source){
          if(range){
          //   if(quill.getContents().ops[0].insert.slice(0,8) === "Click to"){
          //     quill.setContents({ops: [{insert: "\n"}]});
          //   }
            globalToolbarContainer.appendChild(toolbar.container);
            
          //   toolbar.container.addEventListener('mousedown', function(e){
          //     e.preventDefault();
          //   },false);
          // }else if(range === null || !quill.hasFocus){
        
          }
      })
      let toolbar = quill.getModule('toolbar'); 
      globalToolbarContainer.appendChild(toolbar.container);
      // globalToolbarContainer.removeChild(toolbar.container);
      
  //   }
  //   else if(currentSlideId && currentSlideId === checkCurrentSlideId && !quillRef.current.getSelection()){
  //     quillRef.current.setContents(textBox.delta, 'listener');
  //   }
   },[])

  useEffect(() =>{
    const globalToolbarContainer = document.querySelector('#quillToolbar');
  
      if(globalToolbarContainer.children.length > 1 && editorIdArr.length >= 1){
        globalToolbarContainer.firstElementChild.remove();

      }
  },[activeEditorInstance,editorIdArr]);

  const handleOnClick = (e) => {
    const element = e.target;
    console.log("handle on click")
    const id = findParentElement(element);
    console.log(id,"parentId");
  }

  const findParentElement = (element) => {
    console.log("findParentElement")
    const parentFound = false;
    let parentElement;
    let id;

    while (!parentFound) {
      parentElement = element.parentNode;
      if (parentElement.id) {
        parentFound = true;
        id = parentElement.id;
        console.log("id",id);
        return id;
      } else {
        findParentElement(parentElement);
      }
    }
  }
  //   const handleOnBlur = (e) =>{
  //     let globalToolbarContainer = document.querySelector('#quillToolbar');
  //     globalToolbarContainer.children.length !== 0 &&  globalToolbarContainer.children[0].remove();
  //   }

  //   const handleOnFocus = (element) => {
      
  //   }

  return (
    <div ref={quillRef} className={classes.editor} tabIndex="0" id={quillId} key={quillId} onClick={handleOnClick}/>
  );
};

export default React.memo(Editor);
