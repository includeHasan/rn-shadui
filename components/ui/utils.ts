import { View } from "@nativescript/core";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function measureHeight(view: View): number {
  return view.getMeasuredHeight();
}

export function animateHeight(view: View, toValue: number, duration: number = 200): void {
  view.animate({
    height: toValue,
    duration,
    curve: "easeInOut"
  });
}