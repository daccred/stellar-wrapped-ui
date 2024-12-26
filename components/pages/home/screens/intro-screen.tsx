import { StellarFullLogo } from "@/assets/logo";
import { BaseScene } from "./base-scene";

export function IntroScreen() {
  return (
    <BaseScene
      backgroundImage="/backgrounds/black-grunge-bg.png"
      className="text-white"
      isCenter
    >
      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center p-6 z-10 ">
        <StellarFullLogo />
      </div>
    </BaseScene>
  );
}
