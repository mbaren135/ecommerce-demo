import ProfileDetails from "./details/details-panel";
import ProfileDelete from "./delete/delete-panel";
import ProfileCart from "./cart/cart-panel";

export default function ProfileContent({
  userId,
  content,
}: {
  userId: string;
  content: "details" | "cart" | "delete";
}) {
  if (content === "details") {
    return <ProfileDetails userId={userId} />;
  }

  if (content === "cart") {
    return <ProfileCart userId={userId} />;
  }

  if (content === "delete") {
    return <ProfileDelete userId={userId} />;
  }

  return null;
}
