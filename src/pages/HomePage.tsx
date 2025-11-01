import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RatelimitedUi from "../components/RatelimitedUi";
import axios from "axios";
import NoteCard from "../components/NoteCard";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          "https://notesbackend-wbye.onrender.com/api/notes"
        );
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);

        // Handle rate-limit status (HTTP 429)
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {rateLimited ? (
        <RatelimitedUi />
      ) : (
        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading notes...</p>
          ) : notes.length === 0 ? (
            <p className="text-center text-gray-500">No notes available.</p>
          ) : (
            <ul className="space-y-4">
              {notes.map((note) => (
                <li key={note._id}>
                  <NoteCard note={note} setNotes={setNotes} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
