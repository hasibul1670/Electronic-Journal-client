import { useEffect, useState } from "react";
import JSZip from "jszip";
import axios from "axios";
import * as docx from 'docx';
import { saveAs } from 'file-saver';

function Test(docxFile ) {
 

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/submittedData')
      .then(response => {
        setData(response.data);
        console.log('Hello',response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  return (
    <div>
    <h1>hello world</h1>
    <ul>
      {data.map(item => (
        <li>
 <p>{item.fileName}</p>
 <p>{item.keyword}</p>
 <p>rev:{item.reviewer}</p>
 <p>{item._id}</p>

<a href={item.url}>download link</a>
        </li>
       
        
      ))}
    </ul>
 

    </div>
  );
};
            export default Test;