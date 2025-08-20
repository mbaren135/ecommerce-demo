import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye } from "lucide-react";

import BrandButton from "@/components/ui/button";
import { User } from "@/lib/types/user";
import formatName from "@/lib/utils/format-user-name";
import { formatUserAddress } from "@/lib/utils/user-address";

export default function ProfileDetails({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center space-y-12 w-full text-brand-primary">
      <div className="flex flex-col justify-start w-full gap-2">
        <h1 className="text-3xl font-bold">Welcome {formatName(user.name)}!</h1>
        <p className="text-lg">
          This is your home base. You can view and edit all your account details
          here.
        </p>
        <hr />
        {/* {JSON.stringify(user)} */}
      </div>
      <DetailsForm user={user} />
    </div>
  );
}

function DetailsForm({ user }: { user: User }) {
  const { number, street, city } = user.address;
  const defaultValues = {
    username: user.username,
    password: user.password,
    address: formatUserAddress({ number, street, city }),
    phone: user.phone,
    email: user.email,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit(async () => {
        setIsSaving(true);
        await new Promise((r) => setTimeout(r, 2000));
        setIsSaving(false);
        setIsEditing(false);
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
      <FormInput
        label="Phone"
        register={register("phone")}
        isEditing={isEditing}
      />
      <FormInput
        label="Address"
        register={register("address")}
        isEditing={isEditing}
      />
    </form>
  );
}

function FormInput({
  label,
  register,
  isEditing,
}: {
  label: string;
  register: {};
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
  register: {};
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
