import {
  ShoppingCart,
  Ellipsis,
  UserRound,
  CreditCard,
} from "lucide-react";

export function getUsermenuList(pathname: string) {
  return [
    {
      groupLabel: "",
      groupIcon: undefined, // ✅ instead of ""
      menus: [
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: UserRound,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      groupIcon: Ellipsis,
      menus: [
        {
          href: "/purchasedItems",
          label: "Purchased Items",
          active: pathname.includes("/purchasedItems"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/order",
          label: "Orders",
          active: pathname.includes("/order"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/payment",
          label: "Payment",
          active: pathname.includes("/payment"),
          icon: CreditCard,
          submenus: [],
        },
      ],
    },
  ];
}
