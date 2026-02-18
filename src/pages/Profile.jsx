import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createProfile, updateProfile } from "../services/profileServices.js";
import { FiMail, FiUser } from "react-icons/fi";
import {
  FaBed,
  FaClock,
  FaFile,
  FaHotel,
  FaMobile,
  FaRegIdCard,
} from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useProfile } from "../context/ProfileContext.jsx";
import Alert from "../components/layouts/Alert.jsx";

const Profile = () => {
  const { user , loading} = useAuth();
if (loading) {
  return <div>Loading...</div>;
}

if (!user) {
  return <div>Please login</div>;
}
  console.log("Authenticated user:", user);
  const { profile, updateProfileContext } = useProfile();

  const [formData, setFormData] = useState({
    rollNumber: "",
    phone: "",
    role: "Hosteller",
    dayScholarInfo: { location: "", availableTime: "" },
    hostellerInfo: { hostelName: "", roomNumber: "" },
  });

  const [idCard, setIdCard] = useState(null);
  const [preview, setPreview] = useState("");
  const [loaading, setLoaading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const isDayScholar = formData.role === "DayScholar";
  const isHosteller = formData.role === "Hosteller";

  
  useEffect(() => {
    if (profile) {
      setFormData({
        rollNumber: profile.rollNumber || "",
        phone: profile.phone || "",
        role: profile.role || "Hosteller",
        dayScholarInfo: {
          location: profile.dayScholarInfo?.location || "",
          availableTime: profile.dayScholarInfo?.availableTime || "",
        },
        hostellerInfo: {
          hostelName: profile.hostellerInfo?.hostelName || "",
          roomNumber: profile.hostellerInfo?.roomNumber || "",
        },
      });

      if (profile.idCardUrl) setPreview(profile.idCardUrl);
    }
  }, [ profile]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview); 
    }

    setIdCard(file);
    setPreview(URL.createObjectURL(file));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaading(true);
    setAlert({});

    try {
      const data = new FormData();
      data.append("rollNumber", formData.rollNumber);
      data.append("phone", formData.phone);
      data.append("role", formData.role);

      if (idCard) data.append("idCard", idCard);
      if (isDayScholar)
        data.append("dayScholarInfo", JSON.stringify(formData.dayScholarInfo));
      if (isHosteller)
        data.append("hostellerInfo", JSON.stringify(formData.hostellerInfo));

      const response = profile
        ? await updateProfile(data)
        : await createProfile(data);

      updateProfileContext(response.profile);

      setAlert({
        type: "success",
        message: profile
          ? "Profile updated successfully"
          : "Profile created successfully",
      });

      if (response.profile?.idCardUrl) {
        setPreview(response.profile.idCardUrl);
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoaading(false);
    }
  };


  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-5xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

        {alert.message && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({})}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input icon={<FiUser />} value={user?.name} name="name" autoComplete="name" readOnly />
          <Input icon={<FiMail />} value={user?.email} name="email" autoComplete="email" readOnly />

          <Input
            icon={<FaRegIdCard />}
            placeholder="Roll Number"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />

          <Input
            icon={<FaMobile />}
            placeholder="Phone Number"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />

          {/* Role (locked after creation) */}
          <div className="flex gap-6 justify-center col-span-full">
            <Radio
              label="Day Scholar"
              checked={isDayScholar}
            
              onChange={() =>
                setFormData((p) => ({
                  ...p,
                  role: "DayScholar",
                  hostellerInfo: { hostelName: "", roomNumber: "" },
                }))
              }
            />
            <Radio
              label="Hosteller"
              checked={isHosteller}
          
              onChange={() =>
                setFormData((p) => ({
                  ...p,
                  role: "Hosteller",
                  dayScholarInfo: { location: "", availableTime: "" },
                }))
              }
            />
          </div>

          {isDayScholar && (
            <>
              <Input
                icon={<MdLocationPin />}
                placeholder="Location"
                name="location"
                value={formData.dayScholarInfo.location}
                onChange={(e) =>
                  handleNestedChange(
                    "dayScholarInfo",
                    "location",
                    e.target.value
                  )
                }
              />
              <Input
                icon={<FaClock />}
                placeholder="Available Time"
                name="availableTime"
                value={formData.dayScholarInfo.availableTime}
                onChange={(e) =>
                  handleNestedChange(
                    "dayScholarInfo",
                    "availableTime",
                    e.target.value
                  )
                }
              />
            </>
          )}

          {isHosteller && (
            <>
              <Input
                icon={<FaHotel />}
                placeholder="Hostel Name"
                name="hostelName"
                value={formData.hostellerInfo.hostelName}
                onChange={(e) =>
                  handleNestedChange(
                    "hostellerInfo",
                    "hostelName",
                    e.target.value
                  )
                }
              />
              <Input
                icon={<FaBed />}
                placeholder="Room Number"
                name="roomNumber"
                value={formData.hostellerInfo.roomNumber}
                onChange={(e) =>
                  handleNestedChange(
                    "hostellerInfo",
                    "roomNumber",
                    e.target.value
                  )
                }
              />
            </>
          )}

          <div className="col-span-full flex justify-center items-center gap-4">
            <label className="flex items-center gap-2 border px-4 py-2 rounded cursor-pointer h-12">
              <FaFile /> Upload ID Card
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </label>

            {preview && (
              <img
                src={preview}
                alt="ID Preview"
                className="w-40 h-24 object-cover rounded"
              />
            )}
          </div>

          <div className="col-span-full flex justify-center">
            <button
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-lg"
            >
              {loaading
                ? "Saving..."
                : profile
                ? "Update Profile"
                : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ icon, ...props }) => (
  <div className="flex items-center border-b-2 border-orange-600">
    <span className="px-3 text-xl text-orange-500">{icon}</span>
    <input {...props} className="flex-1 py-2 outline-none text-gray-700" />
  </div>
);

const Radio = ({ label, checked, onChange, disabled }) => (
  <label className={`flex items-center gap-2 font-semibold ${disabled && "opacity-60"}`}>
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    {label}
  </label>
);

export default Profile;