import React, { useEffect, useState } from "react";
import "./App.css";
import { onValue, ref, set, remove, update } from "firebase/database";
import { db } from "./firebase";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [tempUsers, setTempUsers] = useState([]);

  useEffect(() => {
    callData();
  }, []);

  // call data to firebase realtime database
  const callData = () => {
    try {
      const readData = ref(db, "users");
      onValue(readData, (snapshot) => {
        let records = [];
        snapshot.forEach((child) => {
          records.push({
            id: child.key,
            name: child.val().name,
            email: child.val().email,
            age: child.val().age,
          });
          setUsers(records);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // upload data to firebase realtime database
  const uploadData = async () => {
    const id = uuidv1();
    await set(ref(db, "users/" + id), {
      id: id,
      name: name,
      email: email,
      age: age,
    });
    setName("");
    setEmail("");
    setAge("");
  };

  // remove data from firebase realtime database
  const removeData = (user) => {
    remove(ref(db, `/users/${user}`));
  };

  // handleUpdate
  const handleUpdate = (users) => {
    setIsEdit(true);
    setTempUsers(users.id);
    setName(users.name);
    setEmail(users.email);
    setAge(users.age);
  };

  const submitChange = () => {
    update(ref(db, `/users/${tempUsers}`), {
      name: name,
      email: email,
      age: age,
    });
    setIsEdit(false);
    setName("");
    setEmail("");
    setAge("");
  };

  const xButton = () => {
    setIsEdit(false);
    setIsEdit(false);
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <div className="App">
      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={age}
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {isEdit ? (
        <>
          <button onClick={submitChange}>Submit Change</button>
          <button onClick={xButton}>X</button>
        </>
      ) : (
        <>
          <button onClick={uploadData}>Upload Data</button>
        </>
      )}

      <div>
        {users.map((user) => (
          <ul key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{user.age}</li>
            <button onClick={() => handleUpdate(user)}>Update Data</button>
            <button onClick={() => removeData(user.id)}>Delete Data</button>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
