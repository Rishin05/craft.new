const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAiCode = model.startChat({
  CodeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Create To-do App\nGenerate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n  \"/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,\"firebase\",\"@google/generative-ai\" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"projectTitle\": \"React To-Do App with Tailwind CSS\",\n  \"explanation\": \"This React project implements a To-Do application using Tailwind CSS for styling. It features components for task creation, display, and filtering. The application allows users to add, delete, and mark tasks as completed. Lucide-react icons enhance the user interface, and the architecture promotes modularity and maintainability.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React, { useState, useEffect } from 'react';\\nimport TaskList from './components/TaskList';\\nimport TaskForm from './components/TaskForm';\\nimport Header from './components/Header';\\nimport Footer from './components/Footer';\\n\\nfunction App() {\\n  const [tasks, setTasks] = useState(() => {\\n    const storedTasks = localStorage.getItem('tasks');\\n    return storedTasks ? JSON.parse(storedTasks) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('tasks', JSON.stringify(tasks));\\n  }, [tasks]);\\n\\n  const addTask = (text) => {\\n    setTasks([...tasks, { id: Date.now(), text, completed: false }]);\\n  };\\n\\n  const deleteTask = (id) => {\\n    setTasks(tasks.filter((task) => task.id !== id));\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTasks(\\n      tasks.map((task) =>\\n        task.id === id ? { ...task, completed: !task.completed } : task\\n      )\\n    );\\n  };\\n\\n  return (\\n    <div className=\\\"min-h-screen bg-gray-100\\\">\\n      <Header />\\n      <div className=\\\"container mx-auto p-4\\\">\\n        <TaskForm addTask={addTask} />\\n        <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />\\n      </div>\\n      <Footer />\\n    </div>\\n  );\\n}\\n\\nexport default App;\"\n    },\n    \"/components/TaskList.js\": {\n      \"code\": \"import React from 'react';\\nimport { Trash, Check } from 'lucide-react';\\n\\nfunction TaskList({ tasks, deleteTask, toggleComplete }) {\\n  return (\\n    <ul className=\\\"mt-4\\\">\\n      {tasks.map((task) => (\\n        <li key={task.id} className=\\\"flex justify-between items-center bg-white shadow-md rounded-md p-4 mb-2\\\">\\n          <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>\\n            {task.text}\\n          </span>\\n          <div>\\n            <button onClick={() => toggleComplete(task.id)} className=\\\"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mr-2\\\">\\n              <Check className=\\\"h-4 w-4\\\"/>\\n            </button>\\n            <button onClick={() => deleteTask(task.id)} className=\\\"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded\\\">\\n              <Trash className=\\\"h-4 w-4\\\"/>\\n            </button>\\n          </div>\\n        </li>\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TaskList;\"\n    },\n    \"/components/TaskForm.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction TaskForm({ addTask }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim() !== '') {\\n      addTask(text);\\n      setText('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\\"flex items-center\\\">\\n      <input\\n        type=\\\"text\\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n        placeholder=\\\"Add a task...\\\"   \\n        className=\\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n      />\\n      <button type=\\\"submit\\\" className=\\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2\\\">\\n        <Plus className=\\\"h-4 w-4\\\"/> Add\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default TaskForm;\"\n    },\n    \"/components/Header.js\": {\n      \"code\": \"import React from 'react';\\n\\nfunction Header() {\\n  return (\\n    <header className=\\\"bg-blue-500 text-white py-4\\\">\\n      <div className=\\\"container mx-auto\\\">\\n        <h1 className=\\\"text-3xl font-bold text-center\\\">📝 My To-Do List </h1>\\n      </div>\\n    </header>\\n  );\\n}\\n\\nexport default Header;\"\n    },\n    \"/components/Footer.js\": {\n      \"code\": \"import React from 'react';\\n\\nfunction Footer() {\\n  return (\\n    <footer className=\\\"bg-gray-200 text-gray-600 py-4 text-center\\\">\\n      <p>&copy; {new Date().getFullYear()} To-Do App</p>\\n    </footer>\\n  );\\n}\\n\\nexport default Footer;\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/TaskList.js\",\n    \"/components/TaskForm.js\",\n    \"/components/Header.js\",\n    \"/components/Footer.js\"\n  ]\n}\n```"},
      ],
    },
  ],
});
// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
