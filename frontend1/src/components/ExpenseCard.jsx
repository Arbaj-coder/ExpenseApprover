export default function ExpenseCard({ expense }) {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{expense.description}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[expense.status]}`}>
          {expense.status}
        </span>
      </div>
      <p className="text-gray-600">{expense.category}</p>
      <p className="text-gray-800 font-semibold mt-1">₹{expense.amount}</p>
      <p className="text-sm text-gray-500 mt-1">{new Date(expense.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500 italic mt-1">{expense.remarks}</p>
      {expense.receipt && (
        <a
          href={`http://localhost:5000/${expense.receipt}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-2 block"
        >
          View Receipt
        </a>
      )}
    </div>
  );
}
