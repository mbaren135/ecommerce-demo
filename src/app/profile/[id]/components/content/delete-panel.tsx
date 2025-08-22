import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import AuthContext from "@/components/auth/context";
import BrandButton from "@/components/ui/button";

export default function ProfileDelete({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`relative h-full p-6 ${isOpen && "bg-brand-light-100"}`}>
      <div className={`${isOpen && "opacity-50"}`}>
        <div className="flex justify-between">
          <h1 className="text-brand-primary text-3xl font-bold">
            Delete Account
          </h1>
          <BrandButton
            className="min-w-1/7"
            variant="delete"
            onClick={() => setIsOpen(true)}
          >
            Delete
          </BrandButton>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        userId={userId}
      />
    </div>
  );
}

function ConfirmationModal({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  if (!isOpen) return null;

  const confirmed = input === "I wish to delete my account";

  const handleConfirmation = async () => {
    const resp = await fetch(`/api/users/${userId}`, { method: "DELETE" });
    if (!resp.ok) {
      setError("Bad Request: Could not delete your account");
      return;
    }

    onClose();
    router.push("/");
    logout();
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-2/5 rounded-md border-1 border-brand-primary overflow-auto bg-white">
      <div
        className="flex flex-col w-full h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="self-end text-brand-accent rounded-sm hover:outline-1 hover:cursor-pointer"
          onClick={() => onClose()}
        >
          <X />
        </button>
        <div className="flex flex-col justify-between gap-4 h-full w-full">
          <p className="font-sans text-sm lg:text-lg text-brand-primary">
            To confirm this action, please type <br />
            <span className="text-brand-accent bg-brand-light-100 p-0.5 rounded-md">
              &ldquo;I wish to delete my account&rdquo;
            </span>{" "}
            in the space provided. Upon confirmation, your account will be
            removed and you will be logged out.
          </p>
          <input
            className="border-1 border-brand-primary rounded-md p-2 focus:border-2 focus:bg-brand-primary-100 focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
            placeholder="I wish to delete my account"
          />
          {error && (
            <p className="font-sans text-sm lg:text-lg text-brand-accent">
              {error}
            </p>
          )}
          <BrandButton
            onClick={async () => await handleConfirmation()}
            disabled={!confirmed}
          >
            Confirm
          </BrandButton>
        </div>
      </div>
    </div>
  );
}
