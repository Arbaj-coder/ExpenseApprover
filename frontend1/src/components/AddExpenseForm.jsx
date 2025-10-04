import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddExpenseForm({ onExpenseAdded }) {
  const [form, setForm] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
    remarks: "",
    receipt: null, // store file here
  });
  const [submitting, setSubmitting] = useState(false);

  // handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handle file selection
  const handleFileChange = (e) => setForm({ ...form, receipt: e.target.files[0] });

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      const { data } = await axios.post(
        "http://localhost:5000/api/expenses",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Expense added successfully!");
      onExpenseAdded(data);
      setForm({ description: "", category: "", date: "", amount: "", remarks: "", receipt: null });
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expense");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <textarea
        name="remarks"
        value={form.remarks}
        onChange={handleChange}
        placeholder="Remarks (optional)"
        className="border rounded-md p-2 mt-4 w-full focus:ring-2 focus:ring-blue-400"
      />

      {/* Receipt Upload */}
      <label className="block mt-4">
        <span className="text-gray-700">Attach Receipt (optional)</span>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
