import React from 'react';
import Navbar from './Navbar';

const openAccess = () => {
    return (
        <div>
        <Navbar/>
        <div className=' container p-4 container-fluid '>
        
          <h3> About WorldScientificOpen </h3> 
          
            <p>
At World Scientific, we are committed to disseminating high quality research to as wide an audience as possible. Leveraging on the open access movement, WorldScientificOpen gives you unprecedented access to top-tier journals, books and proceedings.
</p>
<br />
WorldScientificOpen is in full compliance with the latest open access mandates so authors can ensure their research is freely available online, freely redistributed and reused.
<p></p>
<h3>
Benefits of World Scientific Open Access
</h3>
<ul>
    <li>Accepted articles can choose to be on fast track publishing</li>
    <li>
Copyright of the articles are retained by the authors</li>
    <li>Higher visibility and discoverability of the published articles on search engines and the major indexing services, with the possibility of being highly cited </li>
    <li>Published articles</li>
    <ul>
        <li>are freely available online for everyone to access, read and download</li>
        <li>are fully peer reviewed</li>
        <li>can be freely redistributed and reused under the terms of Creative Commons Attribution license (CC BY) or any Creative Commons License that the author has chosen.</li>
    </ul>

    <li>Long term preservation of the published articles in the scientific record, in services like PORTICO</li>
    <li>Compatibility with most open access policies globally</li>
    <li>On-going engagement with the global scientific community to work out practical solutions which will increase access to research and preserve the integrity of the scientific record</li>
</ul>


<br />

        </div>

        </div>
    );
};

export default openAccess;