# Waccamaw River Campground

CSCI 343 - Assignment 08 (Livingston)

Campground reservation app made with React Native / Expo. The home screen lets you pick a
check in and check out date and time, the number of guests (1-15) and the number of
campsites (1-5). Hitting Reserve Now shows your selections under the button.

## Running it

```
npm install
npx expo start
```

Then press `a` to open it on the Android emulator (tested layout for Pixel 7 and Pixel Tablet,
portrait and landscape).

## Folders

- `assets/fonts` - Bitter Bold and Lato fonts
- `assets/images` - splash screen image, home screen background, icons
- `components` - Title, ReserveButton, WheelSelector
- `screens` - HomeScreen
- `constants` - colors
- `docs` - app mock up (app_mockup.png)

## Packages used

- expo-font / expo-splash-screen
- @react-native-community/datetimepicker + react-native-modal-datetime-picker
- @quidone/react-native-wheel-picker
- react-native-safe-area-context
