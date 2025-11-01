import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // ✅ Correct import

const CreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate(); // ✅ useNavigate hook
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading before async work

    try {
      // Simulate API call or Supabase insert here
      // await supabase.from("notes").insert([{ title, content }]);
      await axios.post("http://localhost:3000/api/notes", { title, content });
      toast.success("Note created successfully!");
      console.log("Note created:", { title, content });
      navigate("/"); // ✅ Navigate to home after creation

      // Reset fields after successful creation
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error creating note:", err);
    } finally {
      setLoading(false); // ✅ Stop loading when done
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-4">
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-2xl mb-4">Create New Note</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
