import React, { useEffect, useState, useRef } from "react";
import CandidateCard from "../components/CandidateCard";
import { fetchParsedResumes } from "../Api/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Report() {
  const [candidates, setCandidates] = useState([]);
  const reportRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      // For testing — show 4 fake candidates
      const data = await fetchParsedResumes();
      if (data.length > 0) {
        const fakeList = Array(4)
          .fill(0)
          .map((_, i) => ({
            ...data[0],
            resume_id: data[0].resume_id + i,
            predicted_role: i % 2 === 0 ? "Frontend Developer" : "Backend Engineer",
            confidence: 0.8 + i * 0.04,
          }));
        setCandidates(fakeList);
      }
    };
    loadData();
  }, []);

  const handleDownloadPDF = async () => {
  if (!reportRef.current) return;

  const report = reportRef.current;
  
  // Use html2canvas with higher scale for better resolution
  const canvas = await html2canvas(report, { scale: 3, useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Handle multiple pages
  let heightLeft = pdfHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pdf.internal.pageSize.getHeight();

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
  }

  pdf.save("CandidateReports.pdf");
};

// <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-500 p-6 flex flex-col items-center">

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Candidate Reports
      </h2>

      <div ref={reportRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.resume_id} candidate={candidate} />
        ))}
      </div>

      {candidates.length > 0 && (
        // <button
        //   onClick={handleDownloadPDF}
        //   className="mt-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
        // >
        //   📥 Download All Reports
        // </button>
        <button
  onClick={handleDownloadPDF}
  className="mt-10 bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
>
  📥 Download All Reports
</button>
        // <button className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white px-6 py-3 rounded-lg">
        //     Download PDF
        // </button>

      )}
    </div>
  );
}

