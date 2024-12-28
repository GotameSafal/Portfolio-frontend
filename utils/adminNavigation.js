import {
    Activity,
    BarChart2,
    Book,
    BookOpen,
    GraduationCap,
    LayoutDashboard,
    Settings,
    TrendingUp,
    UserPlus,
    Users
  } from 'lucide-react';
  export const statsData = [
    {
      icon: Users,
      title: "Total Students",
      value: "24,589",
      change: "+12.5%",
      color: "text-blue-500",
    },
    {
      icon: Book,
      title: "Active Courses",
      value: "156",
      change: "+8.2%",
      color: "text-green-500",
    },
    {
      icon: Activity,
      title: "Course Completion",
      value: "68.3%",
      change: "+5.1%",
      color: "text-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Revenue",
      value: "$456,789",
      change: "+15.7%",
      color: "text-emerald-500",
    },
  ];
  export const navigation = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      section: "dashboard",
      link: "/admin",
    },
    // {
    //   icon: Users,
    //   title: "Students",
    //   section: "students",
    //   link: "/admin/users",
    // },
    // {
    //   icon: Book,
    //   title: "Courses",
    //   section: "courses",
    //   link: "/admin/courses",
    // },
    // {
    //   icon: BarChart2,
    //   title: "Analytics",
    //   section: "analytics",
    // },
    {
      icon: Settings,
      title: "Settings",
      section: "settings",
    },
  ];
  export const recentActivities = [
    {
      icon: UserPlus,
      title: "New Student Enrollment",
      description: "Sarah Johnson enrolled in AI Fundamentals Course",
      time: "2 mins ago",
    },
    {
      icon: BookOpen,
      title: "Course Completed",
      description: "Mike Thompson completed Python Programming",
      time: "15 mins ago",
    },
    {
      icon: GraduationCap,
      title: "Certificate Issued",
      description: "Emma Williams received Data Science Certificate",
      time: "1 hour ago",
    },
  ];
  