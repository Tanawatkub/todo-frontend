// ✅ Import Axios
import axios from "axios";

// ----------------------------
// 🌐 ตั้งค่า API URL
// ----------------------------
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flask-todo-app-3r5b.onrender.com/api";

console.log("[DEBUG] API_URL =", API_URL);

// ----------------------------
// ⚙️ ตั้งค่า Axios Instance
// ----------------------------
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // ป้องกันค้าง
});

// ----------------------------
// 🚨 Interceptor จัดการ Error
// ----------------------------
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response
      ? `${err.response.status} ${err.response.statusText}`
      : err.message;
    console.error("❌ API Error:", msg);
    return Promise.reject(err);
  }
);

// ----------------------------
// ✅ รวมทุกฟังก์ชัน CRUD ของ Todo API
// ----------------------------
export const todoAPI = {
  // 🩺 Health Check
  healthCheck: async () => {
    const res = await api.get("/health");
    return res.data;
  },

  // 📋 ดึงรายการทั้งหมด
  getTodos: async () => {
    const res = await api.get("/todos");
    return res.data;
  },

  // ➕ เพิ่มรายการใหม่
  createTodo: async (todo) => {
    const res = await api.post("/todos", todo, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  // 🔄 อัปเดตสถานะ (Toggle Done / Update Data)
  updateTodo: async (id, updates) => {
    const res = await api.put(`/todos/${id}`, updates, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },

  // 🗑️ ลบรายการ
  deleteTodo: async (id) => {
    const res = await api.delete(`/todos/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },
};

export default api;
