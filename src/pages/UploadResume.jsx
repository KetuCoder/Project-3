import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../Api/api";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    await uploadResume(file);
    setTimeout(() => {
      setLoading(false);
      navigate("/report");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg flex flex-col items-center border border-gray-200">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
          Upload Candidate Resume
        </h2>

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
        <input
          id="resumeFile"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`mt-6 w-full py-3 rounded-lg text-white font-bold text-lg transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105"
          }`}
        >
          {loading ? "⏳ Processing, please wait..." : "🚀 Upload Resume"}
        </button>

        {loading && (
          <div className="mt-4 text-sm text-gray-600 animate-pulse">
            Extracting skills and matching designation... 🔍
          </div>
        )}
      </div>
    </div>
  );
}





// import React, { useState } from "react";
// import { uploadResumeToS3 } from "../Api/api";
// import { useNavigate } from "react-router-dom";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file first.");
//       return;
//     }

//     setUploading(true);
//     setMessage("⏳ Uploading your resume... please wait...");

//     try {
//       const email = localStorage.getItem("recruiterEmail") || "unknown";
//       const result = await uploadResumeToS3(file, email);

//       if (result?.message === "Upload successful") {
//         setMessage("✅ Resume uploaded successfully!");
//         setTimeout(() => navigate("/report"), 2000);
//       } else {
//         setMessage("❌ Upload failed. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Something went wrong during upload.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex flex-col justify-center items-center">
//       <h2 className="text-3xl font-bold text-purple-700 mb-6">
//         Upload Candidate Resume
//       </h2>

//       <div className="bg-white rounded-2xl shadow-xl p-8 w-96 flex flex-col items-center">
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="mb-4 border border-purple-400 rounded-lg w-full p-2 cursor-pointer hover:border-blue-500 transition"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-all ${
//             uploading ? "opacity-60 cursor-not-allowed" : ""
//           }`}
//         >
//           {uploading ? "Uploading..." : "📤 Upload Resume"}
//         </button>

//         {message && <p className="mt-4 text-gray-700 text-center">{message}</p>}
//       </div>
//     </div>
//   );
// }
