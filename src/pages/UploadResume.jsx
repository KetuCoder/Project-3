// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { uploadResume } from "../Api/api";

// export default function UploadResume() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     await uploadResume(file);
//     setTimeout(() => {
//       setLoading(false);
//       navigate("/report");
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 flex flex-col justify-center items-center p-6">
//       <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg flex flex-col items-center border border-gray-200">
//         <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
//           Upload Candidate Resume
//         </h2>

//         <label
//           htmlFor="resumeFile"
//           className={`cursor-pointer w-full text-center py-3 rounded-lg font-semibold border-2 border-dashed transition duration-300 ${
//             file
//               ? "bg-green-100 border-green-400 text-green-600"
//               : "bg-purple-50 border-purple-400 text-purple-700 hover:bg-purple-100 hover:border-purple-600"
//           }`}
//         >
//           {file ? `📄 ${file.name}` : "Click to Choose a Resume File"}
//         </label>
//         <input
//           id="resumeFile"
//           type="file"
//           accept=".pdf"
//           className="hidden"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <button
//           onClick={handleUpload}
//           disabled={!file || loading}
//           className={`mt-6 w-full py-3 rounded-lg text-white font-bold text-lg transition duration-300 ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105"
//           }`}
//         >
//           {loading ? "⏳ Processing, please wait..." : "🚀 Upload Resume"}
//         </button>

//         {loading && (
//           <div className="mt-4 text-sm text-gray-600 animate-pulse">
//             Extracting skills and matching designation... 🔍
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// suucessfully run code
// import React, { useState } from "react";

// export default function UploadResume() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleUpload = () => {
//     if (!file) {
//       setMessage("❌ Please select a file first");
//       return;
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(file); // read as base64
//     reader.onload = async () => {
//       const base64Data = reader.result.split(",")[1]; // remove data prefix
//       setLoading(true);
//       setMessage("⏳ Uploading resume, please wait...");

//       try {
//         const response = await fetch(
//           "https://ukvcgy4aaf.execute-api.us-east-1.amazonaws.com/t/uploads3",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               filename: file.name,
//               fileData: base64Data,
//             }),
//           }
//         );

//         const result = await response.json();

//         if (response.ok) {
//           setMessage(`✅ ${result.message}`);
//         } else {
//           setMessage(`❌ Upload failed: ${result.error}`);
//         }
//       } catch (err) {
//         setMessage(`❌ Network or server error: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     reader.onerror = () => {
//       setMessage("❌ Failed to read file");
//     };
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
//       <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center border border-gray-200">
//         <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
//           Upload Candidate Resume
//         </h2>

//         <label
//           htmlFor="resumeFile"
//           className={`cursor-pointer w-full text-center py-3 rounded-lg font-semibold border-2 border-dashed transition duration-300 ${
//             file
//               ? "bg-green-100 border-green-400 text-green-600"
//               : "bg-purple-50 border-purple-400 text-purple-700 hover:bg-purple-100 hover:border-purple-600"
//           }`}
//         >
//           {file ? `📄 ${file.name}` : "Click to Choose a Resume File"}
//         </label>
//         <input
//           id="resumeFile"
//           type="file"
//           accept=".pdf"
//           className="hidden"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <button
//           onClick={handleUpload}
//           disabled={!file || loading}
//           className={`mt-6 w-full py-3 rounded-lg text-white font-bold text-lg transition duration-300 ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105"
//           }`}
//         >
//           {loading ? "⏳ Uploading..." : "🚀 Upload Resume"}
//         </button>

//         {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!file) {
      setMessage("⚠️ Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file); // convert to base64
    reader.onload = async () => {
      const base64Data = reader.result.split(",")[1]; // remove data prefix
      setLoading(true);
      setMessage("⏳ Uploading your resume...");

      try {
        const lambdaUrl =
          // "https://ukvcgy4aaf.execute-api.us-east-1.amazonaws.com/t/uploads3";
          "https://xhvcnwvchg.execute-api.eu-central-1.amazonaws.com/v1"

        const response = await fetch(lambdaUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: file.name,
            fileData: base64Data,
            email: localStorage.getItem("recruiterEmail") || "unknown",
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(`✅ ${data.message}`);
          // Redirect to /report after 2 seconds
          setTimeout(() => navigate("/report"), 2000);
        } else {
          setMessage(`❌ Upload failed: ${data.error || "Try again."}`);
        }
      } catch (err) {
        console.error(err);
        setMessage(`⚠️ Network or server error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setMessage("❌ Failed to read file.");
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg flex flex-col items-center border border-gray-200">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
          Upload Candidate Resume
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="resumeFile"
        />
        <label
          htmlFor="resumeFile"
          className={`cursor-pointer w-full text-center py-3 rounded-lg font-semibold border-2 border-dashed transition duration-300 ${
            file
              ? "bg-green-100 border-green-400 text-green-600"
              : "bg-purple-50 border-purple-400 text-purple-700 hover:bg-purple-100 hover:border-purple-600"
          }`}
        >
          {file ? `📄 ${file.name}` : "Click to Choose a Resume File"}
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`mt-6 w-full py-3 rounded-lg text-white font-bold text-lg transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105"
          }`}
        >
          {loading ? "⏳ Uploading..." : "🚀 Upload Resume"}
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
