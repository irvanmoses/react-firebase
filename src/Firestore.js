import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { v1 as uuidv1 } from "uuid";

const Firestore = () => {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const usersRef = collection(db, "users");

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(usersRef);
      setUser(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log(data);
    };

    getUser();
  }, []);

  const createUser = async () => {
    await addDoc(usersRef, { name: newName, age: newAge });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setNewAge(e.target.value)}
        />
        <button onClick={createUser}>Add Data</button>
      </div>

      {user.map((user) => {
        return (
          <ul>
            <li>{user.name}</li>
            <li>{user.age}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Firestore;
