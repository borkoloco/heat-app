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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setStudents([]);
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
        const res = await fetch(
          "http://localhost:4000/api/candidates/results",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        } else {
          console.error("Error fetching students:", res.status);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [router]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
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
          router.push("/");
          return;
        }

        const data = await res.json();
        console.log("Dashboard data:", data);
      } catch (error) {
        console.error("Error checking authentication:", error);
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
        console.error("Error creating student:", res.status);
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const updateStudentReminder = (studentId, newReminderValue) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.uuid === studentId
          ? { ...student, reminder: newReminderValue }
          : student
      )
    );
  };

  const handleSendTestLink = async (student) => {
    const testLink = `${window.location.origin}/start?candidateId=${student.uuid}`;

    try {
      const res = await fetch(
        "http://localhost:4000/api/candidates/send-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: student.email,
            testLink,
            candidateId: student.uuid,
          }),
        }
      );

      if (res.ok) {
        alert(`Test link sent to ${student.email}`);
        const updatedReminderValue = student.reminder === null ? false : true;
        updateStudentReminder(student.uuid, updatedReminderValue);
      } else {
        console.error("Error sending test link email:", res.status);
      }
    } catch (error) {
      console.error("Error sending test link email:", error);
    }
  };

  const handleSendResults = async (student) => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/candidates/send-results",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: student.email,
            testScore: student.testScore,
            audioScore: student.audioScore,
            finalResult: student.finalResult,
          }),
        }
      );

      if (res.ok) {
        alert(`Test results sent to ${student.email}`);
      } else {
        console.error("Error sending results email:", res.status);
      }
    } catch (error) {
      console.error("Error sending results email:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

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
                <span>
                  {student.finalResult
                    ? `${student.finalResult} (${parseFloat(
                        student.testScore || 0
                      ).toFixed(1)}% / ${parseFloat(
                        student.audioScore || 0
                      ).toFixed(1)}%)`
                    : "No test score yet"}{" "}
                  - Status: {student.status || "None"}
                </span>

                {student.finalResult ? (
                  <button
                    onClick={() => handleSendResults(student)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Send Results
                  </button>
                ) : (
                  <button
                    onClick={() => handleSendTestLink(student)}
                    className={`p-2 rounded ${
                      student.reminder === null
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {student.reminder === null
                      ? "Send Test Link"
                      : "Resend Email Link"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
