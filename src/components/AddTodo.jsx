'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddTodo({ onAdd, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('กรุณากรอกชื่อรายการก่อน');
      return;
    }

    setError('');

    try {
      await onAdd({ title, description });

      // ✅ Popup แจ้งเพิ่มงานสำเร็จ
      await Swal.fire({
        icon: 'success',
        title: 'เพิ่มงานสำเร็จ!',
        text: `"${title}" ถูกเพิ่มเข้ารายการเรียบร้อยแล้ว`,
        showConfirmButton: false,
        timer: 1500,
        background: '#f0fdf4', // สีพื้นหลังเขียวอ่อน
        color: '#065f46',
      });

      setTitle('');
      setDescription('');
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเพิ่มรายการได้ กรุณาลองอีกครั้ง',
        background: '#fef2f2',
        color: '#7f1d1d',
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-cyan-100">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gradient">
        <span className="text-3xl">➕</span> เพิ่มรายการใหม่
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-3 rounded-lg border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ชื่อรายการ"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 outline-none"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-sky-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-gradient hover:shadow-xl active:scale-[0.98]"
        >
          เพิ่มรายการ
        </button>
      </form>
    </div>
  );
}
