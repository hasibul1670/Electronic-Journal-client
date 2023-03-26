import React, { useState } from "react";
import app from "../LoginInfo/firebase.config";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

function UpdateProfile() {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updateProfile, updating, error] = useUpdateProfile(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (updating) {
    return <p>Updating...</p>;
  }
  console.log("Hello", user);
  return (
    <div className="App">
      <label className="text-primary font-weight-bold mr-4 " htmlFor="">
        Display Name:
      </label>
      <input
        className="from-control"
        type="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <br />

      {/* <input
    type="photoURL"
    value={photoURL}
    onChange={(e) => setPhotoURL(e.target.value)}
  /> */}
      <br />
      <button
        className="btn btn-primary"
        onClick={async () => {
          if (displayName.length > 4) {
            const success = await updateProfile({ displayName, photoURL });
            if (success) {
              toast.success("Updated profile successfully!");
            }
          } else {
            toast.error(" Choose a 5 letter Name!");
          }
        }}
      >
        Update profile
      </button>
    </div>
  );
}

export default UpdateProfile;
