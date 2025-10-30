'use client';

import { useEffect, useState } from 'react';
import { todoAPI } from '../lib/api';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import TodoStats from '../components/TodoStats';
import Swal from 'sweetalert2';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 โหลดข้อมูลตอนเริ่มต้น
  useEffect(() => {
    const init = async () => {
      try {
        const health = await todoAPI.healthCheck();
        if (health.status === 'healthy') setConnected(true);

        const data = await todoAPI.getTodos();
        setTodos(data);
      } catch (err) {
        console.error('❌ API Error:', err);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ➕ เพิ่ม Todo ใหม่
  const handleAdd = async (todo) => {
    try {
      const newTodo = await todoAPI.createTodo(todo);
      setTodos([...todos, newTodo]);

      Swal.fire({
        icon: 'success',
        title: 'เพิ่มรายการสำเร็จ!',
        text: `"${todo.title}" ถูกเพิ่มแล้ว 🎉`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Add todo failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มไม่สำเร็จ',
        text: 'กรุณาลองอีกครั้ง',
      });
    }
  };

  // ✅ Toggle Done / Undone
  const handleToggle = async (todo) => {
    try {
      const updated = await todoAPI.updateTodo(todo.id, { done: !todo.done });
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? updated : t))
      );

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: todo.done ? 'info' : 'success',
        title: todo.done
          ? `ยกเลิกทำ "${todo.title}" แล้ว`
          : `ทำเสร็จ "${todo.title}" ✅`,
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  };

  // 🗑️ ลบ Todo
  const handleDelete = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* HEADER */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
          ✨ My Todo List 📄
        </h1>
        <p className="text-gray-600 text-lg">Organize your tasks beautifully</p>

        <div className="mt-3">
          {connected ? (
            <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 border border-green-300">
              🟢 API Connected
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-red-100 text-red-600 border border-red-300">
              🔴 API Disconnected
            </span>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-2xl space-y-8">
        <AddTodo onAdd={handleAdd} loading={loading} />
        <TodoStats todos={todos} />
        <TodoList
          todos={todos}
          onUpdate={handleToggle} // ✅ เปลี่ยนจาก onToggle → onUpdate
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      {/* FOOTER */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          Made with 💖 using <b>Next.js</b> + <b>Flask</b>
        </p>
        <p className="text-gray-400">
          Frontend: GitHub Pages | Backend: Render | Database: PostgreSQL
        </p>
      </footer>
    </div>
  );
}
