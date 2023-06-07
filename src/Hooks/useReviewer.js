import { useEffect, useState } from "react";

const useReviewer = (email) => {
  const [isReviewer, setIsReviewer] = useState(false);
  const [isReviewerLoading, setIsReviewerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(
        `https://electronic-journal-server-hasibul1670.vercel.app/users/reviewer/${email}`
      )
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
