import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <div className="w-full flex flex-col gap-3">
      <Link href="/user-profile" className="text-pink-500 hover:text-pink-800">
        User Profile
      </Link>

      <Link
        href="/manage-restaurant"
        className="text-pink-500 hover:text-pink-800"
      >
        Manage Reataurant
      </Link>
      <Link href="/order-status" className="text-pink-500 hover:text-pink-800">
        Order Status
      </Link>
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="flex-1 font-bold bg-pink-500"
      >
        Log Out
      </Button>
    </div>
  );
};

export default MobileNavLinks;
