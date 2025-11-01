import axios from "axios";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // ✅ Correct import

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, setNotes }) => {
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // prevent navigation
    e.stopPropagation(); // ✅ stops Link click from firing

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      console.log("Note deleted:", id);

      // ✅ Remove note from state
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Link to={`/note/${note._id}`}>
      <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
        <p className="mb-2">{note.content}</p>
        <span className="text-sm text-gray-500 block mb-2">
          Created at: {new Date(note.createdAt).toLocaleString()}
        </span>

        <div className="flex items-center gap-2">
          <Link
            to={`/edit/${note._id}`}
            className="btn btn-ghost btn-xs text-primary flex items-center gap-1"
            onClick={(e) => e.stopPropagation()} // ✅ stops parent Link
          >
            <PenSquareIcon className="size-4" />
            Edit
          </Link>

          <button
            className="btn btn-ghost btn-xs text-error flex items-center gap-1"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className="size-4" />
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
