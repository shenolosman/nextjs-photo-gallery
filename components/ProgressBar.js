import React, { useEffect, useState } from "react";
import { storage, db } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ProgressBar = ({ file, setFile }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const collectionRef = collection(db, "images");
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        if (!cancel) {
          setProgress(percentage);
        }
      },
      (err) => {
        if (!cancel) {
          setError(err);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (!cancel) {
            // console.log(downloadURL);
            setUrl(downloadURL);
          }
          // console.log(url);
          if (url != null) {
            addDoc(collectionRef, { url: url, createdDate: serverTimestamp() });
          }
        });
      }
    );
    if (url) {
      // console.log(url)
      if (!cancel) {
        setFile(null);
      }
    }
    return () => setCancel(true);
  }, [url, setFile, file, cancel]);

  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;
