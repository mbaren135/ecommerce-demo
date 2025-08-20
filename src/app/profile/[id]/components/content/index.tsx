import { User } from "@/lib/types/user";
import ProfileDetails from "./details-panel";


export function ProfileContent({user, content}: {user: User, content: 'details' | 'cart' | 'delete'}) {
    if (content === "details") {
        return <ProfileDetails user={user} />
    }

    if (content === "cart") {
        return <div>Shopping Cart</div>
    }

    if (content === "delete") {
        return <div>Boo hoo</div>
    }
}