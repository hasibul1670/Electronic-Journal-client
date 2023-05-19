import { useEffect, useState } from "react";


const useReviewer= (email) => {
    const [isReviewer, setIsReviewer] = useState(false);
     const [isReviewerLoading, setIsReviewerLoading] = useState(true);
    
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:4000/users/reviewer/${email}`)
        .then((res) => res.json())
          .then((data) => {      
          setIsReviewer(data.isReviewer);
              setIsReviewerLoading(false);

           
        
        });
    }
  }, [email]);
      
  return [isReviewer, setIsReviewerLoading];
};

export default useReviewer;
