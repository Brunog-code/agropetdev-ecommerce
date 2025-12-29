"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { useAuth } from "@/app/contexts/AuthCont";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { updateDataUser } from "../../actions/update-data-user";

export const CardUserData = () => {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(() => {
    return user?.name ? user.name : "";
  });
  const [userEmail, setUserEmail] = useState(() => {
    return user?.email ? user.email : "";
  });

  function handleButtonEditing() {
    if (!isEditing && user) {
      setUserName(user.name ?? "");
      setUserEmail(user.email ?? "");
    }

    setIsEditing(!isEditing);
  }

  async function handleButtonupdateUser() {
    //atualizar db
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
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro inesperado ao atualizar dados");
      }
    } finally {
      setIsEditing(!isEditing);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg border-b">Dados Cadastrados</CardTitle>
      </CardHeader>

      <CardContent className="relative">
        {!isEditing ? (
          <div className="absolute right-5 -top-5">
            <Button
              className="bg-blue-500 hover:bg-blue-500 hover:opacity-85 cursor-pointer"
              onClick={handleButtonEditing}
            >
              <FiEdit size={14} color="#fff" />
              Alterar dados
            </Button>
          </div>
        ) : (
          <div className="absolute right-5 -top-5">
            <Button
              className="bg-blue-500 hover:bg-blue-500 hover:opacity-85 cursor-pointer"
              onClick={handleButtonupdateUser}
            >
              <FaCheck size={14} color="#fff" />
              Salvar dados
            </Button>
          </div>
        )}
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
          <div className="space-y-2">
            <p className="font-semibold">
              Nome:{" "}
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </p>
            <p className="font-semibold">
              Email:{" "}
              <Input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
