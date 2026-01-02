"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { useAuth } from "@/app/contexts/AuthCont";
import { updateDataUser } from "@/app/pedido/identificacao/actions/update-data-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [userName, setUserName] = useState(user?.name ?? "");
  const [userEmail, setUserEmail] = useState(user?.email ?? "");
  const [isEditing, setIsEditing] = useState(false);

  function handleButtonEditing() {
    if (!isEditing) {
      setUserName(user?.name ?? "");
      setUserEmail(user?.email ?? "");
    }
    setIsEditing(!isEditing);
  }

  async function handleUpdateDataUser() {
    try {
      const dataUpdateUser = {
        id: user!.id,
        name: userName,
        email: userEmail,
      };

      const responseUpdate = await updateDataUser(dataUpdateUser);
      if (responseUpdate.success && responseUpdate.data) {
        setUser(responseUpdate.data);
        toast.success("Dados alterados");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar dados");
    } finally {
      setIsEditing(false);
    }
  }

  return (
    <div className="space-y-4">
      {!isEditing ? (
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Nome:</p>
            <span className="font-normal"> {user?.name}</span>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <span className="font-normal"> {user?.email}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Nome:</p>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <Input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
        </div>
      )}

      {!isEditing ? (
        <Button
          className="bg-blue-500 hover:bg-blue-500 hover:opacity-85 cursor-pointer w-full"
          onClick={handleButtonEditing}
        >
          <FiEdit size={14} color="#fff" />
          Alterar dados
        </Button>
      ) : (
        <Button
          className="bg-blue-500 hover:bg-blue-500 hover:opacity-85 cursor-pointer w-full"
          onClick={handleUpdateDataUser}
        >
          <FaCheck size={14} color="#fff" />
          Salvar dados
        </Button>
      )}
    </div>
  );
};
