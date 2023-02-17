import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import RiviewerList from './ReviewerList'

const ReviewPreference = ({reviewer,setReviewer}) => {

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 1000); // Blink for 1 second
    };


    const [modalIsOpen, setModalIsOpen] = useState(false);


  




    var [text,setText] = React.useState('');



    const openModal = () => {
if(reviewer.length===0){
    setModalIsOpen(true);
}
else{
  
    setText("You Can not Add more than one Reviewer")
    handleClick();

 
}
   
    };

    const handleChange = (e) => {
        setReviewer([...reviewer,e]);
        console.log('Hello',reviewer);
      };

    const closeModal = (e) => {
      setModalIsOpen(false);
      handleChange(e);
    };


    return (
        <div className='p-4'>
                     <fieldset  className=' border border-primary p-5' >
<legend className="float-none font-weight-bold border border-warning p-2 text-primary w-auto">Review Preference</legend>
         
           <hr></hr>
           <h5 className='text-info'>Please suggest potential reviewers for this submission and provide specific reasons for your suggestion in the comments box for each person.</h5>
           <br />
<h4 className='font-weight-bold text-danger'
 style={{ animation: clicked ? "blink 1s linear infinite" : "" }}>
        {text}
      </h4>
      <style>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

           <h3 className='border p-2 text-primary'> Your Selected Reviewer :
           <span className='text-success'>
            { reviewer}
           </span>
        </h3>
           <p></p>

           <button className='btn btn-secondary font-weight-bold'
            onClick={openModal}> 

  <FontAwesomeIcon  icon={faPlus}  /> 
Add Suggested Reviewer </button>


      <Modal

        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Select Your desirable Reviewer</h2>
     
<p></p>

        <div>
    
         <RiviewerList closeModal={closeModal}
         reviewer={reviewer} setReviewer={setReviewer}
         
         />
        </div>
      </Modal>

         
</fieldset>
        </div>
    );
};

export default ReviewPreference;