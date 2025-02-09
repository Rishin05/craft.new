"use client"

import { MessagesContext } from "@/context/MessagesContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";

function Hero() {
  const [userInput, setUserInput]= useState();
  const {messages,setMessages}=useContext(MessagesContext);
  const onGenerate=(input)=>{
    setMessages({
      role:'user',
      content:input
    })
  }


  return (
    <div className="flex flex-col items-center mt-36 gap-2 xl:mt-52">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3 scroll-smooth"
      style={{
        backgroundColor:Colors.BACKGROUND
      }}>
        <div className="flex gap-2">
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
          onChange={(event)=>setUserInput(event.target.value)}
          className="outline-none bg-transparent w-full h-32 max-h-48 resize-none"/>
          {userInput&& <ArrowRight
          onClick={()=>onGenerate(userInput)}
           className=" bg-[#2ba6ff] p-2 h-8 w-8 rounded-md cursor-pointer" />}
        </div>
        <div>
          <Link className="h-5 w-5"/>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion,index)=>(
          <h2 key={index}
          className="p-1 px-2 border rounded-full text-sm text-gray-400 cursor-pointer hover:text-white"
          onClick={()=>onGenerate(suggestion)}
          >{suggestion}</h2>
        ))}
      </div>
    </div>
  );
}

export default Hero;
