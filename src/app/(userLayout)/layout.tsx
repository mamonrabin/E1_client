import UserPanelLayout from "@/src/components/userPanel/UserPanelLayout";


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <UserPanelLayout>{children}</UserPanelLayout>
    </div>
  );
}
