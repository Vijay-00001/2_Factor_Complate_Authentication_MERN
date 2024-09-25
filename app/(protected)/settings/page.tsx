import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <div className="text-red-500">
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button type="submit" variant={"destructive"} size={"lg"}>
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(SettingsPage);
