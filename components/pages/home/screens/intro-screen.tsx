import { StellarLogo } from "@/assets/logo";
import { BaseScene } from "./base-scene";

export function IntroScreen() {
  return (
    <BaseScene
      backgroundImage="/backgrounds/welcome-bg.png"
      className="bg-black text-white p-6"
      isCenter
    >

      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center p-6 z-10 ">
        <StellarLogo />
      </div>
    </BaseScene>
  );
}
