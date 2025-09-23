import {
  Tag,
  LayoutGrid,
  ShoppingCart,
  Shapes,
  Package2,
  TicketPercent,
  FlameKindling,
  Images,
  BookOpen,
  FilePenLine,
  Ellipsis,
  ShieldCheck,
  Siren,
  MessageSquarePlus,
  MapPin,
  Contact,
  UserRound,
  CreditCard,
} from "lucide-react";

export function getSmenuList(pathname: string) {
  return [
    {
      groupLabel: "",
      groupIcon: "",
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

        // {
        //   href: "",
        //   label: "Category",
        //   active: pathname.includes("/category"),
        //   icon: Shapes,
        //   submenus: [
        //     {
        //       href: "/category/category",
        //       label: "Category",
        //       active: pathname === "/category/category",
        //     },
        //     {
        //       href: "/category/subcategory",
        //       label: "Subcategory",
        //       active: pathname === "/category/subcategory",
        //     },
        //     {
        //       href: "/category/childcategory",
        //       label: "Childcategory",
        //       active: pathname === "/category/childcategory",
        //     },
        //   ],
        // },
        // {
        //   href: "/products",
        //   label: "Products",
        //   active: pathname.includes("/products"),
        //   icon: Package2,
        //   submenus: [],
        // },
        // {
        //   href: "/coupon",
        //   label: "Coupon",
        //   active: pathname.includes("/coupon"),
        //   icon: TicketPercent,
        //   submenus: [],
        // },
        // {
        //   href: "/campaign",
        //   label: "Campaign",
        //   active: pathname.includes("/campaign"),
        //   icon: FlameKindling,
        //   submenus: [],
        // },
      ],
    },
    // {
    //   groupLabel: "Pages",
    //   groupIcon: Ellipsis,
    //   menus: [
    //     {
    //       href: "/banners",
    //       label: "Banners",
    //       active: pathname.includes("/banners"),
    //       icon: Images,
    //       submenus: [],
    //     },
    //     {
    //       href: "/about",
    //       label: "About",
    //       active: pathname.includes("/about"),
    //       icon: BookOpen,
    //       submenus: [],
    //     },
    //     {
    //       href: "/blogs",
    //       label: "Blogs",
    //       active: pathname.includes("/blogs"),
    //       icon: FilePenLine,
    //       submenus: [],
    //     },
    //     {
    //       href: "/chooseUs",
    //       label: "Choose Us",
    //       active: pathname.includes("/chooseUs"),
    //       icon: ShieldCheck,
    //       submenus: [],
    //     },
    //     {
    //       href: "",
    //       label: "Policy",
    //       active: pathname.includes("/policy"),
    //       icon: Siren,
    //       submenus: [
    //         {
    //           href: "/policy/orderPolicy",
    //           label: "Order Policy",
    //           active: pathname === "/policy/orderPolicy",
    //         },
    //         {
    //           href: "/policy/privicyPolicy",
    //           label: "Privicy Policy",
    //           active: pathname === "/policy/privicyPolicy",
    //         },
    //         {
    //           href: "/policy/returnPolicy",
    //           label: "Return Policy",
    //           active: pathname === "/policy/returnPolicy",
    //         },
    //         {
    //           href: "/policy/termsCondition",
    //           label: "Terms & condition",
    //           active: pathname === "/policy/termsCondition",
    //         },
    //       ],
    //     },
    //     {
    //       href: "/media",
    //       label: "Media",
    //       active: pathname.includes("/media"),
    //       icon: MessageSquarePlus,
    //       submenus: [],
    //     },
    //     {
    //       href: "/map",
    //       label: "Map",
    //       active: pathname.includes("/map"),
    //       icon: MapPin,
    //       submenus: [],
    //     },
    //     {
    //       href: "/contact",
    //       label: "Contacts",
    //       active: pathname.includes("/contact"),
    //       icon: Contact,
    //       submenus: [],
    //     },
    //   ],
    // },
  ];
}
