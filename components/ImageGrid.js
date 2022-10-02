import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { motion } from "framer-motion";
const ImageGrid = ({ setSelectedImg }) => {
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
          <motion.div
            className="img-wrap"
            key={doc.id}
            onClick={() => setSelectedImg(doc.url)}
            layout
            whileHover={{ opacity: 1 }}
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              src={doc.url}
              alt="uploaded img"
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
