export default function Profile() {
  const employee = { name:"John Doe", email:"john@example.com", department:"Finance", joinedOn:"2021-06-10" };
  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Joined On:</strong> {employee.joinedOn}</p>
      </div>
    </div>
  );
}
