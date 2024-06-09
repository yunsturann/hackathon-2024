import Container from "@/components/shared/Container";
import Input from "@/components/ui/Input";
import { useUserStore } from "@/store/use-user-store";
import React from "react";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div>
      <Container>
        <header>
          <h2 className="header_title">Profile</h2>
          <p className="header_desc">Manage your profile settings here.</p>
        </header>

        {/*  */}
        <form className="mt-6 flex flex-col gap-y-4">
          <Input label="Company Email" value={user?.company_email} disabled />
          <Input label="Company Phone" value={user?.company_phone} disabled />
          <Input
            label="Supervisor Name"
            value={user?.supervisor_name}
            disabled
          />
          <Input
            label="Supervisor Surname"
            value={user?.supervisor_surname}
            disabled
          />
        </form>
      </Container>
    </div>
  );
};

export default ProfilePage;
