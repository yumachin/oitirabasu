"use client";

import { NewSubject } from "@/types/types";

import { useState } from "react";

export default function registerSubject() {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [type, setType] = useState("1");
  const [span, setSpan] = useState("1");
  const [evaluate, setEvaluate] = useState("1");
  const [stars, setStars] = useState("0");
  const [other, setOther] = useState("");
  const [requ, setRequ] = useState("1");

  const postSubject = async (newSubject: NewSubject) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSubject)
    });
    const data = await res.json()
    console.log("dataは", data);
    setName("")
    setTeacher("")
    alert("送信できた")
    return data;
  };

  const newSubject = {
    name: name,
    teacher: teacher,
    type: Number(type),
    span: Number(span),
    evaluate: Number(evaluate),
    stars: Number(stars),
    other: other,
    requ: Number(requ)
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px'}}>
      <div style={{marginTop: '80px'}}>
        <span>名前: </span>
        <input style={{padding: '5px'}} onChange={(e) => setName(e.target.value)} value={name}></input> 
      </div>
      <div>
        <span>先生: </span>
        <input style={{padding: '5px'}} onChange={(e) => setTeacher(e.target.value)} value={teacher}></input> 
      </div>
      <div>
        <span>科目: </span>
        <input style={{padding: '5px'}} onChange={(e) => setType(e.target.value)} value={type}></input> 
      </div>
      <div>
        <span>期間: </span>
        <input style={{padding: '5px'}} onChange={(e) => setSpan(e.target.value)} value={span}></input> 
      </div>
      <div>
        <span>評価: </span>
        <input style={{padding: '5px'}} onChange={(e) => setEvaluate(e.target.value)} value={evaluate}></input> 
      </div>
      <div>
        <span>星数: </span>
        <input style={{padding: '5px'}} onChange={(e) => setStars(e.target.value)} value={stars}></input> 
      </div>
      <div>
        <span>そ他: </span>
        <input style={{padding: '5px'}} onChange={(e) => setOther(e.target.value)} value={other}></input> 
      </div>
      <div>
        <span>必修: </span>
        <input style={{padding: '5px'}} onChange={(e) => setRequ(e.target.value)} value={requ}></input> 
      </div>
      <button style={{padding: '25px', backgroundColor: "green", color: 'white'}} onClick={() => postSubject(newSubject)}>送信</button>
    </div>
  );
};