import { StellarFullLogo } from "@/assets/logo";
import { BaseScene } from "./base-scene";

export function IntroScreen() {
  return (
    <BaseScene
      backgroundImage="/backgrounds/black-grunge-bg.png"
      className="text-white w-full"
      isCenter
    >
      {/* Main Content */}
      <StellarFullLogo className="h-10 w-full" />
    </BaseScene>
  );
}
