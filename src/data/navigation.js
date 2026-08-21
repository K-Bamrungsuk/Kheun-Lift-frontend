import { House, Trophy, Users, User } from "lucide-react";

const navigation = [
  {
    name: "Home",
    path: "/home",
    icon: House,
  },
  {
    name: "Rank",
    path: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Social",
    path: null,
    icon: Users,
    disabled: true,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

export default navigation;