"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const router = useRouter();

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setStudents([]); // Limpia el estado de los estudiantes
    router.push("/");
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/candidates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStudents(data); // Asegúrate de que la respuesta sea un array de estudiantes
        } else {
          console.error("Error al obtener los estudiantes:", res.status);
        }
      } catch (error) {
        console.error("Error obteniendo estudiantes:", error);
      }
    };

    fetchStudents(); // Llamar a la función cuando el componente se monta
  }, [router]); // Asegúrate de que el efecto se ejecute si cambia el `router`

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token en localStorage:", token);

      if (!token) {
        console.log("Token no encontrado, redirigiendo...");
        router.push("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/users/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          console.log("Usuario no autorizado, redirigiendo...");
          router.push("/");
          return;
        }

        const data = await res.json();
        console.log("Datos recibidos del servidor:", data);
      } catch (error) {
        console.error("Error en la autenticación:", error);
      }
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:4000/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newStudent),
      });
      if (res.ok) {
        const student = await res.json();
        setStudents([...students, student]);
        setNewStudent({ firstName: "", lastName: "", email: "" });
      } else {
        console.error("Error al crear el estudiante:", res.status);
      }
    } catch (error) {
      console.error("Error creando estudiante:", error);
    }
  };

  // const handleSendTestLink = (email) => {
  //   const testLink = `${window.location.origin}/start`;
  //   alert(`Test link sent to ${email}: ${testLink}`);
  // };

  const handleSendTestLink = async (email) => {
    // const token = localStorage.getItem("token");
    const testLink = `${window.location.origin}/start`;

    try {
      const res = await fetch(
        "http://localhost:4000/api/candidates/send-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, testLink }),
        }
      );

      if (res.ok) {
        alert(`Test link sent to ${email}`);
      } else {
        console.error("Error sending email:", res.status);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Botón de Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded mb-6"
      >
        Logout
      </button>

      <form onSubmit={handleCreateStudent} className="mb-6">
        <input
          type="text"
          name="firstName"
          value={newStudent.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="border p-2 mb-2"
        />
        <input
          type="text"
          name="lastName"
          value={newStudent.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="border p-2 mb-2"
        />
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border p-2 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Student
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Students</h2>

      {students && students.length === 0 ? (
        <p className="text-lg">There are no students registered yet.</p>
      ) : (
        students && (
          <ul className="w-full max-w-md">
            {students.map((student) => (
              <li
                key={student.uuid}
                className="flex justify-between items-center mb-4"
              >
                <span>
                  {student.firstName} {student.lastName}
                </span>
                <button
                  onClick={() => handleSendTestLink(student.email)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Send Test Link
                </button>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
