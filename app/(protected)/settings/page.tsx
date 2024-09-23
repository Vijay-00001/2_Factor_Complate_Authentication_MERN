import { auth } from "@/auth";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};

export default React.memo(SettingsPage);

/**
 * 12 Thrushday // TODO : brackFast : 25 for the single bhakhari and tea
 * 13 Friday // TODO : brackFast : Not Present
 * 14 Saturday // Go to the Surat
 * 15 Sunday // TODO : brackFast : 35 to sevkhamani
 * 16 Monday // Go to the Surat
 * 17 Tuesday // Come to the Surat
 * 18 Wednesday // breakFast : 30 for the ghee vaali bhakhari and tea, 35 for the dabeli, 20 soda
 * 19 Thursday // breakFast : 45 for the ghee vaali bhakhari and tea,  60 dinner
 * 20 Friday // breakFast : 30 for the ghee vaali bhakhari and tea, 10 sev mamara,  60 dinner
 * 21 Saturday // breakFast : 30 for the ghee vaali bhakhari and tea, 10 sev mamara,  60 dinner
 * 22 Sunday // breakFast: 30 for the ghee vaali bhakhari and tea, 10 sev mamara,  60 dinner
 *
 * total money invest : 25 + 35 + 30 + 35 + 20 + 45 + 60 + 30 + 10 + 60 + 30 + 10 + 60 + 30 + 10 + 60 = 360 *
 */
