import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Medication {
  _id: string;
  name: string;
  dosage: string;
  schedule: string;
}

const MedicationList: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get(
          "https://medtrac-production.up.railway.app/api/medications"
        );
        setMedications(response.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center px-4">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://medtrac-production.up.railway.app/api/medications/${id}`
      );
      setMedications((prev) =>
        prev.filter((medication) => medication._id !== id)
      );
      console.log("Medication deleted successfully.");
    } catch (error) {
      console.log("Error deleting medication:", error);
    }
  };

  const formatSchedule = (schedule: string) => {
    return format(new Date(schedule), "eeee, MMMM dd, yyyy, hh:mm a");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-8">
        <Link
          to="/add"
          className="bg-blue-600  text-xs text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Add Medications
        </Link>
        <h2 className="text-4xl font-extrabold text-blue-800 text-center mb-8">
          Your Medications
        </h2>
        <ul className="divide-y divide-gray-300">
          {medications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No medications found.
            </p>
          ) : (
            medications.map((medication) => (
              <li
                key={medication._id}
                className="py-4 flex items-center justify-between rounded-lg"
              >
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {medication.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Dosage:</span>{" "}
                    {medication.dosage}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Schedule:</span>{" "}
                    {formatSchedule(medication.schedule)}{" "}
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleDelete(medication._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MedicationList;
