import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, Link } from "react-router-dom";

const AddMedication: React.FC = () => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [schedule, setSchedule] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (schedule) {
      try {
        await axios.post(
          "https://medtrac-production.up.railway.app/api/medications",
          {
            name,
            dosage,
            schedule: schedule.toISOString(),
          }
        );
        navigate("/list");
      } catch (error) {
        console.error("Error adding medication:", error);
      }
    } else {
      console.error("Schedule is required");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto p-20 bg-white rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Medication Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter medication name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="dosage"
              className="block text-sm font-medium text-gray-700"
            >
              Dosage
            </label>
            <input
              type="text"
              id="dosage"
              placeholder="Enter dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="schedule"
              className="block text-sm font-medium text-gray-700"
            >
              Schedule (Select Date and Time)
            </label>
            <DatePicker
              selected={schedule}
              onChange={(date: Date | null) => setSchedule(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              placeholderText="Select a date and time"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center flex-col gap-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 transform hover:scale-105"
            >
              Add Medication
            </button>
            <Link
              to="/list"
              className="flex justify-center bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              View Medications
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedication;
