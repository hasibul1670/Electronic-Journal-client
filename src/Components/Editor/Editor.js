import React from 'react';
import { useContext } from 'react';
import { editorContext } from '../../App';

const Editor = () => {
const [editor] = useContext(editorContext);
    return (
        <div>
            <h1>Hello Editor</h1>
            <h1>hello dashbord:{editor.length}</h1>
       <ul>
        {
           editor.map(service=>(
                <li key = {service._id}>{service.authorEmail} , {service.authorName} 
               {service.name}
                </li>
            ))
        }
       </ul>
        </div>
    );
};

export default Editor;