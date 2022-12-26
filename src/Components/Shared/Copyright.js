import React from 'react';
import Navbar from './Navbar';

const Copyright = () => {
    return (
        <div>
            <Navbar/>
                <div className=' container p-4 container-fluid '>

              <h4 className='text-primary'> Copyright and Permissions
                </h4> 
                <hr />

All material published by World Scientific Publishing and Imperial College Press is protected under International copyright and intellectual property laws.

Written permission is required if you wish to reproduce any of our material. In some cases, permission fees may be charged when our copyrighted material is to be reproduced.
<h6 className='text-danger'> Please note:</h6>

<ul>
    <li>Permissions cannot be granted verbally.</li>
    <li>Electronic permissions (excluding e-books) can only be granted for one year or semester depending on the request. As a precaution, the material must be protected by security software that protects the work from being copied, downloaded or printed.</li>
    <li>
Please note that permission will not be granted if you wish to reproduce more than 20 percent of our original material.</li>
</ul>




<h6 className='text-danger'>Reprint Permission / Reproduction of copyrighted materials</h6>

<ul>
    <li>If you are requesting for permission to reproduce book chapters/articles, excerpts, image/photo/illustration/table/figure of World Scientific Publishing Co. Pte. Ltd. and Imperial College Press books or journals, please apply via Copyright Clearance Center Inc.'s Website.</li>
    <li>Please contact us at rights@wspc.com.sg for the below mentioned requests:</li>
    <ul>
        <li>permission to reproduce our content in your print and e-course pack use</li>
        <li>permission to upload our copyrighted material onto your institutional repository site</li>
        <li>request for electronic text files for students with disability</li>
    </ul>
    <li>
You may also like to visit our Author Rights page for information on author's rights and related information.</li>
</ul>
                </div>
        </div>
    );
};

export default Copyright;