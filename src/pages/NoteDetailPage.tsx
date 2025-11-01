import axios from "axios";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // ✅ Correct import

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const NoteDetailPage: React.FC = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setSaving(true);
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      console.log("Note deleted:", id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!note) return;
    setSaving(true);
    try {
      await axios.put(`http://localhost:3000/api/notes/${id}`, note);
      console.log("Note updated:", note);
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!note) {
    return (
      <div className="text-center mt-10 text-red-500">
        Note not found or deleted.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-7">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-4 mr-2" />
            Back to Home
          </Link>
          <button
            className="btn btn-error btn-outline"
            onClick={handleDelete}
            disabled={saving}
          >
            <Trash2Icon className="size-4 mr-2" />
            {saving ? "Deleting..." : "Delete Note"}
          </button>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-40"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                required
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
