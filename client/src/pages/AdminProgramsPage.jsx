import React, { useEffect, useState } from "react";
import { useProgramStore } from "../store/programStore";
import AdminProgramList from "../components/AdminProgramlist";
import AdminProgramForm from "../components/AdminProgramForm";
import toast from "react-hot-toast";

export default function AdminProgramsPage() {
  const { programs, fetchPrograms, error } = useProgramStore();
  const [editingProgram, setEditingProgram] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  React.useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#f9fafa] rounded-2xl border  shadow-lg mt-8 text-white">
      <h1 className="text-3xl font-bold text-[#255876] mb-6 text-center">
        Admin Dashboard - Programs
      </h1>

      <AdminProgramForm
        key={editingProgram ? editingProgram._id : "new"}
        editingProgram={editingProgram}
        setEditingProgram={setEditingProgram}
      />

      <AdminProgramList
        programs={programs}
        setEditingProgram={setEditingProgram}
      />
    </div>
  );
}
