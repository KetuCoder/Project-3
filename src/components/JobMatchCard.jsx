import React from 'react';

const JobMatchCard = ({ match }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 via-white to-yellow-50 p-5 rounded-2xl 
                    shadow-md hover:shadow-xl transition-all duration-300 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-green-700">{match.jobTitle}</h3>
        <span className="font-semibold text-green-800">{match.score}% Match</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {match.skills.map((skill, idx) => (
          <span key={idx} className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 
                                    text-white px-3 py-1 rounded-full text-sm font-semibold 
                                    hover:scale-105 transform transition-all">
            {skill}
          </span>
        ))}
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
        <div 
          className="h-2 bg-green-500 rounded-full transition-all duration-700"
          style={{ width: `${match.score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default JobMatchCard;
