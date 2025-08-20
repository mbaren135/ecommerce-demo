import { User } from "@/lib/types/user";


export function ProfileContent({user, content}: {user: User, content: 'details' | 'cart' | 'delete'}) {
    if (content === "details") {
        return <div>{JSON.stringify(user)}</div>
    }

    if (content === "cart") {
        return <div>Shopping Cart</div>
    }

    if (content === "delete") {
        return <div>Boo hoo</div>
    }
}