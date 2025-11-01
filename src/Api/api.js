export const saveRecruiter = async (data) => {
  console.log("Recruiter saved:", data);
  // Simulate saving to DynamoDB
  localStorage.setItem("recruiter", JSON.stringify(data));
  return Promise.resolve({ message: "Recruiter saved successfully" });
};

// Simulated S3 Upload
export const uploadResume = async (file) => {
  console.log("Uploading file:", file.name);
  
  // Simulate delay like AWS upload
  await new Promise((res) => setTimeout(res, 3000));

  // Mocked response like real S3 upload
  const response = {
    message: "Upload successful",
    file_url: `https://fake-s3.amazonaws.com/uploads/${Date.now()}_${file.name}`,
    file_key: `uploads/${Date.now()}_${file.name}`,
  };

  // Store mock candidate in local storage to simulate parsed data later
  const candidate = {
    resume_id: Date.now(),
    name: "John Doe",
    predicted_role: "Software Engineer",
    experience: "3",
    skills: ["React", "Node.js", "AWS", "JavaScript"],
    confidence: 0.87,
  };
  localStorage.setItem("candidate", JSON.stringify(candidate));

  return response;
};

// Simulated DynamoDB Fetch
export const fetchParsedResumes = async () => {
  // Simulate API call delay
  await new Promise((res) => setTimeout(res, 1000));

  const candidate = JSON.parse(localStorage.getItem("candidate"));
  return candidate ? [candidate] : [];
};

export const verifyRecruiter = async (data) => {
  // Simulate backend login check
  // Later, connect to DynamoDB Lambda API
  console.log("Verifying recruiter:", data);
  
  // mock valid recruiter
  if (data.email === "admin@test.com" && data.password === "12345") {
    return { message: "Login successful" };
  } else {
    return { message: "Invalid credentials" };
  }
};

// Mock upload function for testing only
export const uploadResumeToS3 = async (file, email) => {
  return new Promise((resolve) => {
    console.log("🧪 Mock upload started...");
    console.log("File name:", file.name);
    console.log("Email:", email);

    // Simulate async upload delay
    setTimeout(() => {
      console.log("✅ Mock upload complete!");
      resolve({
        message: "Mock upload successful (test only)",
        fileUrl: `https://mock-s3-bucket.local/${encodeURIComponent(file.name)}`,
        email,
        timestamp: new Date().toISOString(),
      });
    }, 1000); // 1 second delay to mimic real upload
  });
};
