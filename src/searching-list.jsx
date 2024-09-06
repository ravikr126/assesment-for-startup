import React, { useState } from "react";
import data from "./data.json"; 
const SearchListWithAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null); 
  const [localData, setLocalData] = useState(data); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleAccordion = (index) => {
    if (editIndex === null) { // Only allow toggling if not in edit mode
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  const startEdit = (index) => {
    if (calculateAge(localData[index].dob) >= 18) {
      setEditIndex(index);
      setActiveIndex(index); 
    } else {
      alert("You can only edit details of adults.");
    }
  };

  const handleChange = (e, field) => {
    const updatedData = [...localData];
    updatedData[editIndex] = { ...updatedData[editIndex], [field]: e.target.value };
    setLocalData(updatedData);
  };

  const handleSave = () => {
    setEditIndex(null);
   
  };

  const handleCancel = () => {
    setEditIndex(null); 
    setLocalData(data); 
  };

  const handleDeleteRequest = (index) => {
    setShowDeleteModal(true);
    setDeleteIndex(index);
  };

  const handleDelete = () => {
    const updatedData = localData.filter((_, i) => i !== deleteIndex);
    setLocalData(updatedData);
    setShowDeleteModal(false);
    setActiveIndex(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const filteredData = localData.filter((user) =>
    `${user.first} ${user.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 w-[800px]">
      <h1 className="text-xl font-bold mb-4">List View</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search user"
        className="border p-2 rounded w-full mb-4"
      />

      {/* List of Users */}
      <div className="space-y-4">
        {filteredData.map((user, index) => (
          <div key={user.id} className="border rounded-lg p-4 shadow ">
            {/* Accordion Header start here */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center">
                <img
                  src={user.picture}
                  alt={`${user.first} ${user.last}`}
                  className="rounded-full h-10 w-10 mr-4"
                />
                <span className="font-medium text-lg">
                  {user.first} {user.last}
                </span>
              </div>
              <span className="text-[45px]">{activeIndex === index ? "-" : "+"}</span>
            </div>

            {/* Accordion Content start here */}
            {activeIndex === index && (
              <div className="mt-4 ">
                {editIndex === index ? (
                  <div>
                    <div className="flex flex-col gap-3 mb-4 justify-between">
                    <div className="flex justify-between">

                      <label className="flex flex-col gap-2 ">
                        <strong>Age:</strong>
                        <input
                          type="date"
                          value={user.dob}
                          onChange={(e) => handleChange(e, "dob")}
                          className="border p-2 rounded mt-1 w-fit"
                        />
                      </label>
                      <label className="flex flex-col gap-2 ">
                        <strong>Gender:</strong>
                        <select
                          value={user.gender}
                          onChange={(e) => handleChange(e, "gender")}
                          className="border p-2 rounded mt-1"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                          <option value="Rather not say">Rather not say</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 ">
                        <strong>Country:</strong>
                        <input
                          type="text"
                          value={user.country}
                          onChange={(e) => handleChange(e, "country")}
                          className="border p-2 rounded mt-1"
                        />
                      </label>
                  
                      </div>
                      <label className="flex flex-col gap-2 ">
                        <strong>Description:</strong>
                        <textarea
                          value={user.description}
                          onChange={(e) => handleChange(e, "description")}
                          className="border p-2 rounded mt-1"
                          rows="4"
                        />
                      </label>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleSave}
                        className="text-green-500 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-500 mr-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between">
                      <p>
                        <strong>Age:</strong> {calculateAge(user.dob)} Years
                      </p>
                      <p>
                        <strong>Gender:</strong> {user.gender}
                      </p>
                      <p>
                        <strong>Country:</strong> {user.country}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p>
                        <strong>Description:</strong>
                      </p>
                      <p>{user.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleDeleteRequest(index)}
                        className="text-red-500 mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => startEdit(index)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed  inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-[600px] border p-4 rounded-[8px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={cancelDelete}
                className="text-gray-500 mr-2 px-6 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-white px-6 py-2 border bg-red-500 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate age from dob
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default SearchListWithAccordion;
