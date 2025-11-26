// import React, { useState, useEffect } from 'react'; 
// import { useNavigate } from 'react-router-dom';
//  import api from '../config/api.js';
//   import { Button } from '../components/ui/button.jsx'; 
//   import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'; 
//   import { Input } from '../components/ui/input.jsx'; 
//   import { Label } from '../components/ui/label.jsx';
//    import { Textarea } from '../components/ui/textarea.jsx'; 
//    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx'; 
//    import { UserPlus, Search, MoreVertical, X, Upload, Download } from 'lucide-react'; 
//    import DashboardHeader from '../components/DashboardHeader.jsx'; 
//    import Sidebar from '../components/Sidebar.jsx';
//     import { exportToExcel, exportToPDF } from '../utils/exportUtils.js'; 
//     import logo from "../assets/Foundation2.png"
// const LoginForm = ({ setCurrentUser }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//     idProof: null,
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle file upload change
//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, idProof: e.target.files[0] }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.role) {
//       setError("Please select your role before logging in.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Step 1: Login API call
//       const response = await axios.post("http://localhost:3000/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       });

//       const data = response.data;

//       // Step 2: Validate login response
//       if (!data.token || !data.user) {
//         setError("Invalid login credentials. Please try again.");
//         return; // STOP navigation
//       }

//       // Step 3: Fetch logged-in user data using token
//       const userResponse = await axios.get("http://localhost:3000/api/auth/me", {
//         headers: { Authorization: `Bearer ${data.token}` },
//       });

//       const userData = userResponse.data;

//       // Step 4: Update React state
//       setCurrentUser(userData);

//       // Step 5: Redirect to dashboard
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login failed:", error);

//       if (error.response) {
//         if (error.response.status === 404) {
//           setError("User not found. Please sign up first.");
//         } else if (error.response.status === 401) {
//           setError("Invalid email or password.");
//         } else {
//           setError(error.response.data?.message || "Something went wrong.");
//         }
//       } else {
//         setError("Network error. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (<>
//   <button className='bg-blue-600 text-white px-3 py-1 rounded-md m-5 ml-20' onClick={()=> navigate(-1)}>Back</button>
  
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl mt-10 p-6">
//       <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 ">
//         Login
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Email */}
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//           />
//         </div>

//         {/* Role Selection */}
//         <div>
//           <Label htmlFor="role">Select Role</Label>
//           <select
//             id="role"
//             name="role"
//             required
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md px-3 py-2"
//           >
//             <option value="">-- Select Role --</option>
//             <option value="donor">Donor</option>
//             <option value="beneficiary">Beneficiary</option>
//           </select>
//         </div>

//         {/* File Upload */}
//         <div className="space-y-2">
//           <Label htmlFor="idProof" className="text-sm font-medium text-gray-700">
//             Upload ID Proof (Optional)
//           </Label>

//           {/* Hidden input */}
//           <input
//             id="idProof"
//             name="idProof"
//             type="file"
//             accept=".pdf,.jpg,.jpeg,.png"
//             onChange={handleFileChange}
//             className="hidden"
//           />

//           {/* Custom Button */}
//           <Button
//             type="button"
//             onClick={() => document.getElementById("idProof").click()}
//             className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
//           >
//             <Upload className="h-4 w-4" />
//             Choose File
//           </Button>

//           {/* Show selected file name */}
//           {formData.idProof && (
//             <p className="text-sm text-gray-700 mt-1">
//               Selected file: <span className="font-medium">{formData.idProof.name}</span>
//             </p>
//           )}

//           <p className="text-xs text-gray-500">
//             Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB)
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default LoginForm;








import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Donor Data
const mockDonors = [
  {
    _id: "6904f3df63f05ebc674097d9",
    fullName: "Rajkumar",
    email: "raj@gmail.com",
    contactNumber: "+91 98765 43210",
    address: "123 Main Street",
    area: "Vijay Nagar",
    state: "Madhya Pradesh",
    memberId: "user1761932255136",
    role: "donor",
    areaOfVolunteering: "fieldWork",
    availability: "morning",
    organisationName: "Hope Foundation",
    createdAt: "2025-10-31T17:37:35.140Z"
  },
  {
    _id: "6904f3df63f05ebc674097d8",
    fullName: "Priya Sharma",
    email: "priya@gmail.com",
    contactNumber: "+91 98765 43211",
    address: "456 Park Avenue",
    area: "Palasia",
    state: "Madhya Pradesh",
    memberId: "user1761932255137",
    role: "donor",
    areaOfVolunteering: "onlineSupport",
    availability: "evening",
    organisationName: "Care India",
    createdAt: "2025-10-30T14:22:15.140Z"
  },
  {
    _id: "6904f3df63f05ebc674097d7",
    fullName: "Amit Patel",
    email: "amit@gmail.com",
    contactNumber: "+91 98765 43212",
    address: "789 Garden Road",
    area: "South Tukoganj",
    state: "Madhya Pradesh",
    memberId: "user1761932255138",
    role: "donor",
    areaOfVolunteering: "eventManagement",
    availability: "weekend",
    organisationName: "",
    createdAt: "2025-10-29T10:15:30.140Z"
  },
  {
    _id: "6904f3df63f05ebc674097d6",
    fullName: "Sneha Gupta",
    email: "sneha@gmail.com",
    contactNumber: "+91 98765 43213",
    address: "321 Lake View",
    area: "Scheme 54",
    state: "Madhya Pradesh",
    memberId: "user1761932255139",
    role: "donor",
    areaOfVolunteering: "fieldWork",
    availability: "afternoon",
    organisationName: "Helping Hands",
    createdAt: "2025-10-28T08:45:20.140Z"
  },
  {
    _id: "6904f3df63f05ebc674097d5",
    fullName: "Rahul Verma",
    email: "rahul@gmail.com",
    contactNumber: "+91 98765 43214",
    address: "555 River Side",
    area: "AB Road",
    state: "Madhya Pradesh",
    memberId: "user1761932255140",
    role: "donor",
    areaOfVolunteering: "teaching",
    availability: "morning",
    organisationName: "Education First",
    createdAt: "2025-10-27T16:30:45.140Z"
  },
  {
    _id: "6904f3df63f05ebc674097d4",
    fullName: "Kavita Singh",
    email: "kavita@gmail.com",
    contactNumber: "+91 98765 43215",
    address: "888 Hill View",
    area: "Sapna Sangeeta",
    state: "Madhya Pradesh",
    memberId: "user1761932255141",
    role: "donor",
    areaOfVolunteering: "healthcare",
    availability: "evening",
    organisationName: "Health for All",
    createdAt: "2025-10-26T12:20:10.140Z"
  }
];


// Donor Cards Component
const DonorCards = ({ onBack }) => {
  const [donors] = useState(mockDonors);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAvailabilityColor = (availability) => {
    const colors = {
      morning: 'bg-yellow-100 text-yellow-800',
      afternoon: 'bg-orange-100 text-orange-800',
      evening: 'bg-purple-100 text-purple-800',
      weekend: 'bg-blue-100 text-blue-800'
    };
    return colors[availability] || 'bg-gray-100 text-gray-800';
  };

  const formatAreaOfVolunteering = (area) => {
    return area.replace(/([A-Z])/g, ' $1').trim();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <button 
          className='bg-blue-600 text-white px-4 py-2 rounded-md mb-6 flex items-center gap-2 hover:bg-blue-700 transition-colors' 
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Donors</h1>
          <p className="text-gray-600">Thank you for your generous support</p>
          <div className="mt-2 text-sm text-gray-500">
            Total Donors: <span className="font-semibold text-indigo-600">{donors.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-full p-3">
                      <User className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{donor.fullName}</h2>
                      <p className="text-indigo-100 text-sm">{donor.memberId}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800 truncate">{donor.email}</p>
                  </div>
                </div>

                {donor.contactNumber && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="text-gray-800">{donor.contactNumber}</p>
                    </div>
                  </div>
                )}

                {(donor.address || donor.area || donor.state) && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-800 text-sm">
                        {[donor.address, donor.area, donor.state].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                {donor.organisationName && (
                  <div className="flex items-start space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Organisation</p>
                      <p className="text-gray-800">{donor.organisationName}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {donor.areaOfVolunteering && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Volunteering</span>
                      <span className="text-sm font-medium text-indigo-600 capitalize">
                        {formatAreaOfVolunteering(donor.areaOfVolunteering)}
                      </span>
                    </div>
                  )}

                  {donor.availability && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Availability</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getAvailabilityColor(donor.availability)}`}>
                        {donor.availability}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formatDate(donor.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = () => {
  const [showDonors, setShowDonors] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    idProof: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, idProof: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.role) {
      setError("Please select your role before logging in.");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      alert("Login successful! (This is a preview)");
    }, 1500);
  };
const navigate = useNavigate()

  if (showDonors) {
    return <DonorCards onBack={() => setShowDonors(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="flex justify-between items-center mx-8 mb-4">
        <button  onClick={()=>navigate(-1)}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2' 
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button 
          className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors' 
          onClick={() => setShowDonors(true)}
        >
          View Donors
        </button>
      </div>
      
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Login
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Select Role --</option>
              <option value="donor">Donor</option>
              <option value="beneficiary">Beneficiary</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload ID Proof (Optional)
            </label>

            <input
              id="idProof"
              name="idProof"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => document.getElementById("idProof").click()}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4" />
              Choose File
            </button>

            {formData.idProof && (
              <p className="text-sm text-gray-700 mt-1">
                Selected file: <span className="font-medium">{formData.idProof.name}</span>
              </p>
            )}

            <p className="text-xs text-gray-500">
              Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB)
            </p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;