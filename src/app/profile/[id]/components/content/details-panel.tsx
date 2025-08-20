import { Dispatch, SetStateAction, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { Eye } from "lucide-react";

import BrandButton from "@/components/ui/button";
import { MutableUser } from "@/lib/types";
import formatName from "@/lib/utils/format-user-name";

export default function ProfileDetails({
  user,
  setUser,
}: {
  user: MutableUser;
  setUser: Dispatch<SetStateAction<MutableUser | null>>;
}) {
  return (
    <div className="flex flex-col items-center space-y-12 w-full text-brand-primary">
      <div className="flex flex-col justify-start w-full gap-2">
        <h1 className="text-3xl font-bold">Welcome {formatName(user.name)}!</h1>
        <p className="text-lg">
          This is your home base. You can view and edit all your account details
          here.
        </p>
        <hr />
      </div>
      <DetailsForm user={user} setUser={setUser} />
    </div>
  );
}

function DetailsForm({
  user,
  setUser,
}: {
  user: Omit<MutableUser, "name">;
  setUser: Dispatch<SetStateAction<MutableUser | null>>;
}) {
  const defaultValues = {
    username: user.username,
    password: user.password,
    email: user.email,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = async (values: Omit<MutableUser, "name">) => {
    setIsSaving(true);
    const resp = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!resp.ok) {
      setError("Bad Request: Could not modify user");
      setIsSaving(false);
      return;
    }

    const data = await resp.json();
    setUser((prev) => {
      return { ...prev, ...data.updatedUser };
    });
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        onSubmit({
          id: user.id,
          username: data.username,
          password: data.password,
          email: data.email,
        });
      })}
      className="flex flex-col w-2/3 items-start gap-6"
    >
      <div className="flex items-center w-full">
        <p className="text-xl mr-auto">Manage your account</p>
        {isEditing ? (
          <BrandButton type="submit" className="min-w-16">
            {isSaving ? "Saving..." : "Save"}
          </BrandButton>
        ) : (
          <BrandButton
            className="min-w-16"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              console.log("clicked");
              setIsEditing(true);
              console.log({ isEditing });
            }}
          >
            Edit
          </BrandButton>
        )}
      </div>
      {error && (
        <p className="text-lg font-semibold text-brand-accent">{error}</p>
      )}
      <FormInput
        label="Email"
        register={register("email")}
        isEditing={isEditing}
      />
      <FormInput
        label="Username"
        register={register("username")}
        isEditing={isEditing}
      />
      <PasswordInput register={register("password")} isEditing={isEditing} />
    </form>
  );
}

function FormInput({
  label,
  register,
  isEditing,
}: {
  label: string;
  register: UseFormRegisterReturn;
  isEditing: boolean;
}) {
  return (
    <div className="flex justify-between items-center w-1/2">
      <p className="text-md min-w-20">{label}:</p>

      <input
        className="flex-1 ml-4 px-3 py-2 border border-brand-primary rounded-md text-sm disabled:border-transparent focus:border-2 focus:bg-brand-primary-100 focus:outline-none"
        {...register}
        disabled={!isEditing}
      />
    </div>
  );
}

function PasswordInput({
  register,
  isEditing,
}: {
  register: UseFormRegisterReturn;
  isEditing: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    setShowPassword(true);
    await new Promise((r) => setTimeout(r, 2000));
    setShowPassword(false);
  };

  return (
    <div className="flex justify-between items-center w-1/2">
      <p className="text-md min-w-20">Password:</p>
      <div className="flex-1 ml-4 relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 pr-10 border border-brand-primary rounded-md text-sm disabled:border-transparent focus:border-2 focus:bg-brand-primary-100 focus:outline-none"
          {...register}
          disabled={!isEditing}
        />
        {isEditing && (
          <BrandButton
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            <Eye className="h-4 w-4" />
          </BrandButton>
        )}
      </div>
    </div>
  );
}
