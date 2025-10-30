'use client';

export default function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  if (!total) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-xl text-center shadow">
        <p className="text-2xl font-bold text-blue-600">{total}</p>
        <p className="text-gray-600 text-sm">Total</p>
      </div>
      <div className="bg-green-50 p-4 rounded-xl text-center shadow">
        <p className="text-2xl font-bold text-green-600">{completed}</p>
        <p className="text-gray-600 text-sm">Completed</p>
      </div>
      <div className="bg-orange-50 p-4 rounded-xl text-center shadow">
        <p className="text-2xl font-bold text-orange-600">{pending}</p>
        <p className="text-gray-600 text-sm">Pending</p>
      </div>
    </div>
  );
}
