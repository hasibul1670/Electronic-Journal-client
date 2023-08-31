import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden"></span>
      </div>
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Loading;
