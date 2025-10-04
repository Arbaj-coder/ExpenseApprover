import { useEffect, useState } from "react";
import ExpenseCard from "../Components/ExpenseCard.jsx";
import AddExpenseForm from "../Components/AddExpenseForm.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch expenses");
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Add Expense Form */}
      <Navbar/>
      <AddExpenseForm onExpenseAdded={(newExpense) => setExpenses([newExpense, ...expenses])} />

      {/* Expenses List */}
      <h2 className="text-2xl font-bold mb-4 m-10">Your Expenses</h2>
      {loading ? (
        <p className="text-gray-600 m-10">Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-600 m-10">No expenses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {expenses.map((exp) => (
            <ExpenseCard key={exp._id} expense={exp} />
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
}
