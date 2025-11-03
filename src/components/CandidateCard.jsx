// import React from "react";

// export default function CandidateCard({ candidate }) {
//   return (
//     <div className="relative bg-white rounded-2xl shadow-xl p-6 w-80 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
//       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl"></div>

//       <h3 className="text-xl font-bold text-purple-700 mt-3 mb-2 text-center">
//         {candidate.predicted_role}
//       </h3>

//       <div className="text-center mb-4">
//         <p className="text-gray-600">
//           <span className="font-semibold">Experience:</span> {candidate.experience} Years
//         </p>
//         <p className="text-green-600 font-bold mt-2">
//           Match Confidence: {(candidate.confidence * 100).toFixed(1)}%
//         </p>
//       </div>

//       <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 shadow-inner">
//         <h4 className="font-semibold text-gray-700 mb-2 text-center">
//           Key Skills
//         </h4>
//         <div className="flex flex-wrap justify-center gap-2">
//           {candidate.skills.map((skill, index) => (
//             <span
//               key={index}
//               className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:scale-110 transition-all duration-200"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }









import React from "react";
import JobMatchCard from "./JobMatchCard";

export default function CandidateCard({ candidate }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-6 w-80 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl"></div>

      <h3 className="text-xl font-bold text-purple-700 mt-3 mb-2 text-center">
        {candidate.predicted_role || "Unknown Role"}
      </h3>

      <div className="text-center mb-4">
        <p className="text-gray-600">
          <span className="font-semibold">Experience:</span> {candidate.experience || 0} Years
        </p>
        <p className="text-green-600 font-bold mt-2">
          Match Confidence: {(candidate.confidence * 100 || 0).toFixed(1)}%
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 shadow-inner mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 text-center">
          Key Skills
        </h4>
        <div className="flex flex-wrap justify-center gap-2">
          {candidate.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md hover:scale-110 transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Job Matches */}
      {candidate.jobMatches && candidate.jobMatches.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 text-center">Top Job Matches</h4>
          {candidate.jobMatches.map((match, idx) => (
            <JobMatchCard key={idx} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
