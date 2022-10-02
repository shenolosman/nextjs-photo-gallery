import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

const ImageGrid = () => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const ref = collection(db, "images");
    ref = query(ref, orderBy("createdDate", "desc"));
    onSnapshot(ref, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });
  }, []);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wrap" key={doc.id}>
            <img src={doc.url} alt="uploaded img" />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
