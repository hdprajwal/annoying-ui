import type { ComponentType } from "react";
import AdvancedVolumeRadios from "./advanced-volume-radios";
import AlphabeticalMonths from "./alphabetical-months";
import AmPmFlipClock from "./am-pm-flip-clock";
import AreaCodeDropdowns from "./area-code-dropdowns";
import BadPhoneValidation from "./bad-phone-validation";
import BinarySearchBirthday from "./binary-search-birthday";
import ChineseIdeogramCaptcha from "./chinese-ideogram-captcha";
import ClickOnlyPhonePicker from "./click-only-phone-picker";
import CrankVolumeKnob from "./crank-volume-knob";
import DartThrowCountryPicker from "./dart-throw-country-picker";
import DayIncrementer from "./day-incrementer";
import DrawPhoneNumberCheckboxes from "./draw-phone-number-checkboxes";
import DriftColorPicker from "./drift-color-picker";
import GlassVsGlassesCaptcha from "./glass-vs-glasses-captcha";
import HorizontalVolumeSlider from "./horizontal-volume-slider";
import InvertedCookieBanner from "./inverted-cookie-banner";
import JpegNameEntry from "./jpeg-name-entry";
import OuijaEmailInput from "./ouija-email-input";
import PasswordRuleEscalator from "./password-rule-escalator";
import PiBirthdayPicker from "./pi-birthday-picker";
import PlusOnePhoneInput from "./plus-one-phone-input";
import PumpItVolume from "./pump-it-volume";
import QueueDatePicker from "./queue-date-picker";
import RandomPhoneGuesser from "./random-phone-guesser";
import RgbThreeQuestionQuiz from "./rgb-three-question-quiz";
import RotaryDialPhone from "./rotary-dial-phone";
import RunawayCancelButton from "./runaway-cancel-button";
import SchroedingerToggle from "./schroedinger-toggle";
import ScramblingKeyboard from "./scrambling-keyboard";
import SliderPhoneNumber from "./slider-phone-number";
import SlotMachinePhone from "./slot-machine-phone";
import SmallerBiggerPhone from "./smaller-bigger-phone";
import SpaceColorVolume from "./space-color-volume";
import SpinningLoadingText from "./spinning-loading-text";
import StopButtonPhone from "./stop-button-phone";
import TiltBoxVolume from "./tilt-box-volume";
import YesNoPhoneQuiz from "./yes-no-phone-quiz";

export type Span = 1 | 2 | 3;

export type AnnoyingComponent = {
  slug: string;
  title: string;
  description: string;
  file: string;
  Component: ComponentType;
  /** Column span on the home grid at lg breakpoint. Defaults to 1. */
  span?: Span;
  /** Mark when the component genuinely only works with mouse/keyboard. */
  desktopOnly?: boolean;
};

export const COMPONENTS: AnnoyingComponent[] = [
  {
    slug: "horizontal-volume-slider",
    title: "Volume slider that scrolls sideways",
    description:
      "A vertical-looking volume slider that only responds to horizontal scroll. Vertical scroll? Ignored.",
    file: "app/_annoying/horizontal-volume-slider.tsx",
    Component: HorizontalVolumeSlider,
    desktopOnly: true,
  },
  {
    slug: "alphabetical-months",
    title: "Months sorted alphabetically",
    description:
      "A month picker, helpfully sorted A → Z. April, August, December, February…",
    file: "app/_annoying/alphabetical-months.tsx",
    Component: AlphabeticalMonths,
  },
  {
    slug: "bad-phone-validation",
    title: "“Must be a number equal to 10”",
    description:
      "A contact-number field whose author clearly read the spec twice and the language once.",
    file: "app/_annoying/bad-phone-validation.tsx",
    Component: BadPhoneValidation,
  },
  {
    slug: "runaway-cancel-button",
    title: "Runaway Cancel button",
    description:
      "A Cancel button that dodges your cursor whenever you try to click it.",
    file: "app/_annoying/runaway-cancel-button.tsx",
    Component: RunawayCancelButton,
    desktopOnly: true,
  },
  {
    slug: "click-only-phone-picker",
    title: "Click-only phone number picker",
    description:
      "Enter your 10-digit phone number — one ▲/▼ click at a time. Typing not permitted.",
    file: "app/_annoying/click-only-phone-picker.tsx",
    Component: ClickOnlyPhonePicker,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "plus-one-phone-input",
    title: "Phone number with a single + button",
    description:
      "Enter your phone number by incrementing the displayed value one at a time. Bring snacks.",
    file: "app/_annoying/plus-one-phone-input.tsx",
    Component: PlusOnePhoneInput,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "rotary-dial-phone",
    title: "Rotary dial phone input",
    description:
      "Click a digit, watch the dial rotate to the stop and back, then repeat. Ten times.",
    file: "app/_annoying/rotary-dial-phone.tsx",
    Component: RotaryDialPhone,
    desktopOnly: true,
  },
  {
    slug: "tilt-box-volume",
    title: "Tilt the box to set the volume",
    description:
      "Drag the box to tilt it. Tilt angle is the volume. The slider inside is decorative.",
    file: "app/_annoying/tilt-box-volume.tsx",
    Component: TiltBoxVolume,
    desktopOnly: true,
  },
  {
    slug: "random-phone-guesser",
    title: "Random 10-digit phone guesser",
    description:
      "We guess your phone number. If we're wrong, we try another random one. Yes / No only.",
    file: "app/_annoying/random-phone-guesser.tsx",
    Component: RandomPhoneGuesser,
    desktopOnly: true,
  },
  {
    slug: "crank-volume-knob",
    title: "Car-window crank for volume",
    description:
      "Drag the knob in circles, like cranking down a car window. Four full turns to reach max.",
    file: "app/_annoying/crank-volume-knob.tsx",
    Component: CrankVolumeKnob,
    desktopOnly: true,
  },
  {
    slug: "stop-button-phone",
    title: "Three runaway counters with stop buttons",
    description:
      "Your phone number is three little counters racing past you. Hit stop three times — hopefully on the right digits.",
    file: "app/_annoying/stop-button-phone.tsx",
    Component: StopButtonPhone,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "yes-no-phone-quiz",
    title: "Yes/No phone-number quiz",
    description:
      "We guess each digit one position at a time. You answer yes or no. Forever.",
    file: "app/_annoying/yes-no-phone-quiz.tsx",
    Component: YesNoPhoneQuiz,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "space-color-volume",
    title: "Press <space> for a random color action",
    description:
      "A marker scrolls across a red/green bar. Press space to fire the action under the marker. Red zeroes the volume.",
    file: "app/_annoying/space-color-volume.tsx",
    Component: SpaceColorVolume,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "slot-machine-phone",
    title: "Slot-machine phone number",
    description:
      "Ten reels spin together. Click Set to freeze the leftmost. Time it ten times in a row.",
    file: "app/_annoying/slot-machine-phone.tsx",
    Component: SlotMachinePhone,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "advanced-volume-radios",
    title: "Advanced Volume Control (100 radios)",
    description:
      "Pick your volume from a grid of 100 radio buttons. Plus a Mute checkbox, in case.",
    file: "app/_annoying/advanced-volume-radios.tsx",
    Component: AdvancedVolumeRadios,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "draw-phone-number-checkboxes",
    title: "Draw your phone number with checkboxes",
    description:
      "Ten 3×5 checkbox pads. Draw each digit as pixel art. We guess the closest match.",
    file: "app/_annoying/draw-phone-number-checkboxes.tsx",
    Component: DrawPhoneNumberCheckboxes,
    span: 3,
  },
  {
    slug: "smaller-bigger-phone",
    title: "smaller / bigger / submit",
    description:
      "The number is fixed. The buttons resize it. Submit submits whatever you started with.",
    file: "app/_annoying/smaller-bigger-phone.tsx",
    Component: SmallerBiggerPhone,
  },
  {
    slug: "area-code-dropdowns",
    title: "Three dropdowns, one with 10,000 options",
    description:
      "Area code, prefix, line number — all as <select>s. The last one lists every possible 4-digit suffix.",
    file: "app/_annoying/area-code-dropdowns.tsx",
    Component: AreaCodeDropdowns,
  },
  {
    slug: "binary-search-birthday",
    title: "Binary-search birthday picker",
    description:
      "Earlier or Later. No Yes button. Narrow ~84 years down to one day — should take about 15 clicks.",
    file: "app/_annoying/binary-search-birthday.tsx",
    Component: BinarySearchBirthday,
    span: 2,
  },
  {
    slug: "slider-phone-number",
    title: "Slide to your 10-digit phone number",
    description:
      "One range input. Min 0, max 9,999,999,999, step 1. Each pixel is millions of numbers wide.",
    file: "app/_annoying/slider-phone-number.tsx",
    Component: SliderPhoneNumber,
    span: 2,
  },
  {
    slug: "pi-birthday-picker",
    title: "Find your birthday inside π",
    description:
      "Locate your MMDDYY birthday somewhere in the first 5,000 digits of π. Ctrl+F is your only friend.",
    file: "app/_annoying/pi-birthday-picker.tsx",
    Component: PiBirthdayPicker,
    span: 2,
  },
  {
    slug: "day-incrementer",
    title: "Date of birth: +1 / −1 day",
    description:
      "A date field with only +1 / −1 day buttons, starting at 1900-01-01. Key-repeat does nothing.",
    file: "app/_annoying/day-incrementer.tsx",
    Component: DayIncrementer,
    span: 2,
  },
  {
    slug: "queue-date-picker",
    title: "Date picker with a queue",
    description:
      "Pick a date, then wait in line behind several thousand others before it commits.",
    file: "app/_annoying/queue-date-picker.tsx",
    Component: QueueDatePicker,
  },
  {
    slug: "am-pm-flip-clock",
    title: "Self-flipping AM/PM clock",
    description:
      "Click the face to set the hour. The AM/PM toggle flips itself every 8 seconds.",
    file: "app/_annoying/am-pm-flip-clock.tsx",
    Component: AmPmFlipClock,
  },
  {
    slug: "ouija-email-input",
    title: "Ouija-board email input",
    description:
      "Drag your cursor across a letter board. Hover each letter for a full second to commit it.",
    file: "app/_annoying/ouija-email-input.tsx",
    Component: OuijaEmailInput,
    span: 2,
    desktopOnly: true,
  },
  {
    slug: "jpeg-name-entry",
    title: "Spell your name by uploading JPEGs",
    description:
      "One file picker. The first letter of each filename you upload is appended to your name.",
    file: "app/_annoying/jpeg-name-entry.tsx",
    Component: JpegNameEntry,
  },
  {
    slug: "spinning-loading-text",
    title: "Spinner that says “Loading”",
    description:
      "A loading spinner with the word “Loading…” baked into the ring. Spins with the ring. Unreadable.",
    file: "app/_annoying/spinning-loading-text.tsx",
    Component: SpinningLoadingText,
  },
  {
    slug: "scrambling-keyboard",
    title: "Self-scrambling on-screen keyboard",
    description:
      "Type your name on an on-screen keyboard whose keys reshuffle after every press. Backspace shuffles too.",
    file: "app/_annoying/scrambling-keyboard.tsx",
    Component: ScramblingKeyboard,
    span: 2,
  },
  {
    slug: "rgb-three-question-quiz",
    title: "RGB picker via 24 yes/no questions",
    description:
      "Binary-searches each of the R, G, B channels in 8 questions each. 24 clicks to a color.",
    file: "app/_annoying/rgb-three-question-quiz.tsx",
    Component: RgbThreeQuestionQuiz,
  },
  {
    slug: "drift-color-picker",
    title: "Drifting-cursor color picker",
    description:
      "Standard HSL square, but the cursor drifts on its own. Hold still for 2 seconds to commit.",
    file: "app/_annoying/drift-color-picker.tsx",
    Component: DriftColorPicker,
    desktopOnly: true,
  },
  {
    slug: "pump-it-volume",
    title: "Pump-action volume control",
    description:
      "Volume only rises while you pump fast. It bleeds out the moment you stop.",
    file: "app/_annoying/pump-it-volume.tsx",
    Component: PumpItVolume,
  },
  {
    slug: "schroedinger-toggle",
    title: "Schrödinger's toggle",
    description:
      "On hover it shows the opposite of its real state. No animation on click. Trust nothing.",
    file: "app/_annoying/schroedinger-toggle.tsx",
    Component: SchroedingerToggle,
    desktopOnly: true,
  },
  {
    slug: "chinese-ideogram-captcha",
    title: "CAPTCHA with un-typable glyphs",
    description:
      "A captcha made of rare CJK characters. Paste disabled. Hope you have an IME.",
    file: "app/_annoying/chinese-ideogram-captcha.tsx",
    Component: ChineseIdeogramCaptcha,
  },
  {
    slug: "dart-throw-country-picker",
    title: "Dart-throw country picker",
    description:
      "A spinning wheel of countries. Throw a dart. Hope you don't live in Luxembourg.",
    file: "app/_annoying/dart-throw-country-picker.tsx",
    Component: DartThrowCountryPicker,
  },
  {
    slug: "inverted-cookie-banner",
    title: "Inverted-dark-pattern cookie banner",
    description:
      "Giant green “I do NOT accept” that accepts. Real reject is 4 menus deep with 29 pre-checked vendors.",
    file: "app/_annoying/inverted-cookie-banner.tsx",
    Component: InvertedCookieBanner,
    span: 2,
  },
  {
    slug: "password-rule-escalator",
    title: "Escalating password rules",
    description:
      "Every failed submit adds a new rule. The last rule cannot be satisfied. By design.",
    file: "app/_annoying/password-rule-escalator.tsx",
    Component: PasswordRuleEscalator,
  },
  {
    slug: "glass-vs-glasses-captcha",
    title: "“Select all images with glasses”",
    description:
      "Wine glasses, eyeglasses, magnifying glasses, hourglasses. Wrong every time. Grid grows by one.",
    file: "app/_annoying/glass-vs-glasses-captcha.tsx",
    Component: GlassVsGlassesCaptcha,
    span: 2,
  },
];

export function getComponent(slug: string): AnnoyingComponent | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}

export function spanClass(span: Span | undefined): string {
  switch (span) {
    case 3:
      return "lg:col-span-3 xl:col-span-4";
    case 2:
      return "md:col-span-2 lg:col-span-2 xl:col-span-2";
    default:
      return "";
  }
}
