import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { db } from "../firebase";
import "./Todo.css";
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase';


export default function Todo({user}) {
  const [text, setText] = useState({
    title: "",
    todo: "",
  });
  const navigate = useNavigate()
  const [myTodos, setMyTodos] = useState([]);

  const getData = async ()=>{
    if(user){
      var docRef = db.collection("todos").doc(user.uid);
      docRef.onSnapshot(docSnap=>{
        if(docSnap.exists){
          setMyTodos(docSnap.data().todos)
        }else{
          console.log("sorry")
        }
      })
    }else{
      console.log("")
    }
  }
  useEffect(() => {
     getData()
  }, [user]);

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if(user){
        if(text.title.length >=3 && text.title.length >=3){
          db.collection("todos")
          .doc(user.uid)
          .set({
            todos: [...myTodos, text],
          });
          setText({
            title: "",
            todo: "",
          })
        }else{
          window.M.toast({html: `Minimum 3 letters reaquired for each fields`, classes:"red"})
        }
      }else{
        setTimeout(() => {
          navigate('/login');
        window.M.toast({html: `Please Login for Adding Notes`, classes:"red"})
        }, 200);
        
      }
  };

  const handleDelete =(deleteItem)=>{
    const docRef = db.collection('todos').doc(user.uid)
      docRef.get().then(docSnap=>{
         let data1 =  docSnap.data().todos
         let finalData = data1.filter((item)=>{
           return item.title !== deleteItem.title
          })
        docRef.update({
         todos: finalData
        })
      })
  }
  return (
    <>
      <div className="todo-main-div center">
        <div>
          <form style={{ padding: "0px 30px" }}>
            <h5>Add Todos</h5>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={text.title}
              onChange={handleChange}
              minLength="3"
              maxLength="20"
              required
            />
            <input
              type="text"
              name="todo"
              placeholder="add Todos"
              value={text.todo}
              onChange={handleChange}
              minLength="3"
              maxLength="40"
              required
            />
            <button
              className="btn #2979ff blue accent-3"
              onClick={handleSubmit}
            >
              ADD
            </button>
          </form>
        </div>
        {
          user ?
          <div style={{ marginTop: "10px" }}>
          <h6>Todos List</h6>
          <Scrollbars
            style={{
              width: "auto",
              height: 200,
              margin: "20px auto",
              padding: "50px",
            }}
          >
            {myTodos &&
              myTodos.map((todos, e) => (
                <div className="list-div #e8eaf6 indigo lighten-5" key={e}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>{todos.title}</span>
                    <br />
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      {todos.todo}
                    </span>
                  </p>
                  <p style={{ color: "red", cursor: "pointer" }}  onClick={()=>handleDelete(todos)}>
                    <i className="material-icons">delete</i>
                  </p>
                </div>
              ))}
          </Scrollbars>
        </div>:
        null
        }
       
      </div>
    </>
  );
}
