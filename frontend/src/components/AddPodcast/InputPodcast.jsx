// import React, { useState } from "react";

// const InputPodcast = () => {
//   const [frontImage, setfrontImage] = useState(null);
//   const [Dragging, setDragging] = useState(false);

//   const handleChangeImage = (e) => {
//     e.preventDefault();
//     const file = e.target.files[0];
//     setfrontImage(file);
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragging(false);
//   };

//   const handleDropImage = (e) => {
//     console.log("Dropped");
//     e.preventDefault();
//     setDragging(false);
//     const file = e.dataTransfers.files[0];
//     setfrontImage(file);
//   };

//   return (
//     <div className="my-4 px-4 lg:px-12">
//       <h1 className="text-2xl font-semibold">Create Your Podcast</h1>
//       <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
//         <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
//           <div
//             className="size-[20vh] lg:size-[60vh] flex items-center justify-center hover:bg-slate-50 transition-all duration-300"
//             style={{ border: "1px dashed black" }}
//             onDragEnter={handleDragEnter}
//             onDragLeave={handleDragOver}
//             onDrop={handleChangeImage}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               id="file"
//               name="frontImage"
//               className="hidden"
//               onChange={handleChangeImage}
//             />

//             {frontImage ? (
//               <img
//                 src={URL.createObjectURL(frontImage)}
//                 alt="thumbnail"
//                 className="h-[100%] w-[100%] object-cover"
//               />
//             ) : (
//               <>
//                 <label
//                   htmlFor="file"
//                   className={`text-xl h-[100%] w-[100%] hover:cursor-pointer flex items-center justify-center ${
//                     Dragging ? "bg-blue-200" : ""
//                   } hover:bg-zinc-200 transition-all duration-300 p-4`}
//                 >
//                   <div className="text-center">
//                     Drag and Drop the thumbnail or Click to browse
//                   </div>
//                 </label>
//               </>
//             )}
//           </div>
//           <div className="w-full lg:w-4/6">
//             <div className="flex flex-col">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 placeholder="Title for your podcast"
//                 className="mt-4 px-4 py-2 border outline-none border-zinc-800 rounded"
//               />
//             </div>
//             <div className="flex flex-col mt-4">
//               <label htmlFor="title">Description</label>
//               <textarea
//                 type="text"
//                 id="description"
//                 name="description"
//                 placeholder="Description for your podcast"
//                 className="mt-4 px-4 py-2 border outline-none border-zinc-800 rounded"
//                 rows={4}
//               />
//             </div>
//             <div className="flex flex-col mt-4">
//               <div className="flex flex-col w-2/6">
//                 <label htmlFor="audioFile">Select Audio</label>
//                 <input
//                   type="file"
//                   accept=".mp3, .wav, .m4a, .ogg "
//                   id="audioFile"
//                   className="mt-4"
//                 />
//               </div>
//               <div className="flex flex-col w-4/6">
//                 <label htmlFor="audioFile">Select Audio</label>
//                 <select
//                   name="category"
//                   id="category"
//                   className="border border-zinc-900 rounded mt-4 outline-none px-4 py-2"
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Comedy">Comedy</option>
//                   <option value="Hobbies">Hobbies</option>
//                   <option value="Government">Government</option>
//                   <option value="Education">Education</option>
//                   <option value="Bussiness">Bussiness</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mt-8 lg:mt-6 flex">
//               <button className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-800 transition-all duration-300">
//                 Create Podcast
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InputPodcast;

import React, { useState } from "react";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify";

const InputPodcast = () => {
  const [frontImage, setfrontImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [Dragging, setDragging] = useState(false);
  const [Inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChangeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setfrontImage(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDropImage = (e) => {
    console.log("Dropped");
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setfrontImage(file);
  };

  const handleAudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const handleSubmitPodcast = async () => {
    // console.log(Inputs,frontImage,audioFile);
    const data = new FormData();
    data.append("title", Inputs.title);
    data.append("description", Inputs.description);
    data.append("category", Inputs.category);
    data.append("frontImage", frontImage);
    data.append("audioFile", audioFile);

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/add-podcast",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },

          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally{
      setInputs({
        title: "",
        description: "",
        category: "",
      });
      setfrontImage(null);
      setAudioFile(null);
    }
  };

  return (
    <div className="my-8 px-6 lg:px-16 max-w-4xl mx-auto">
      <ToastContainer/>
      <h1 className="text-3xl font-bold text-center">Create Your Podcast</h1>
      <div className="mt-8 flex flex-col lg:flex-row items-start justify-between gap-8">
        <div
          className={`w-full lg:w-2/5 p-4 border-2 border-dashed rounded-md ${
            Dragging ? "border-blue-300 bg-blue-50" : "border-gray-300"
          } flex items-center justify-center`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragOver}
          onDrop={handleDropImage}
        >
          <input
            type="file"
            accept="image/*"
            id="file"
            name="frontImage"
            className="hidden"
            onChange={handleChangeImage}
          />
          {frontImage ? (
            <img
              src={URL.createObjectURL(frontImage)}
              alt="thumbnail"
              className="h-full w-full object-cover rounded-md"
            />
          ) : (
            <label
              htmlFor="file"
              className="text-center text-gray-500 cursor-pointer flex flex-col items-center justify-center w-full h-full"
            >
              <div className="text-lg">
                Drag and Drop the thumbnail or Click to browse
              </div>
            </label>
          )}
        </div>

        <div className="w-full lg:w-3/5 space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title for your podcast"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Inputs.title}
              onChange={onChangeInputs}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description for your podcast"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={Inputs.description}
              onChange={onChangeInputs}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="audioFile" className="text-lg font-medium">
              Select Audio
            </label>
            <input
              type="file"
              accept=".mp3, .wav, .m4a, .ogg"
              id="audioFile"
              className="mt-2 focus:outline-none"
              onChange={handleAudioFile}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-lg font-medium">
              Select Category
            </label>
            <select
              name="category"
              id="category"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Inputs.category}
              onChange={onChangeInputs}
            >
              <option value="">Select Category</option>
              <option value="Comedy">Comedy</option>
              <option value="Hobbies">Hobbies</option>
              <option value="Government">Government</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="flex">
            <button
              className="w-full py-3 text-lg font-semibold text-white bg-black rounded-md hover:bg-zinc-700 transition duration-300"
              onClick={handleSubmitPodcast}
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
