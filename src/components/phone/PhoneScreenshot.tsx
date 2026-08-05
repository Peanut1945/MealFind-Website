import Image from 'next/image';

/**
 * A real screenshot of the app, sized to fill a `<PhoneMockup>` screen.
 *
 * The screenshots include iOS's own status bar, which is why the frame keeps
 * drawing its dynamic island on top: on a real device the island sits in the
 * gap the status bar leaves in the middle, so the two compose into the picture
 * of a phone rather than fighting each other.
 *
 * `alt=""` throughout — `<PhoneMockup>` carries the accessible description for
 * the whole device, and the screenshot inside it is a detail of that, not a
 * separate thing to announce.
 */
export function PhoneScreenshot({
  src,
  priority = false,
}: {
  /** Path under `/screens/`. */
  src: string;
  /** Set on the hero screenshot only — it's part of the LCP. */
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={443}
      height={960}
      // The frame is at most ~340px wide, and never more than half the viewport
      // on the layouts that show two.
      sizes="(max-width: 640px) 80vw, 340px"
      className="size-full object-cover"
      priority={priority}
    />
  );
}

/**
 * The screens the marketing pages show, in one place so a re-export only has to
 * be renamed once. Descriptions are the frame's accessible label — they say
 * what the screen shows, not "a screenshot of the app".
 */
export const SCREENS = {
  weeklyPlan: {
    src: '/screens/weekly-plan.jpg',
    label:
      'The MealFind home screen: Breakfast, Lunch and Dinner tabs over a seven-day meal planner, then a swipeable Shakshuka with Feta recipe card showing 16 ingredients, 5 steps and its calorie, protein, fibre and carb figures.',
  },
  discover: {
    src: '/screens/discover.jpg',
    label:
      'The MealFind search screen: rows of recipe cards under Top Recipes, New Recipes and High Protein, each showing its ingredient count.',
  },
  shoppingListPrices: {
    src: '/screens/shopping-list-prices.jpg',
    label:
      'A MealFind shopping list priced by supermarket: tabs for Cheapest, ASDA, Sainsbury’s and Tesco, a note that Sainsbury’s is cheapest for the whole list, an estimated total of £4.00, and each ingredient of the Classic Beef Bolognaise priced individually.',
  },
  shoppingListAisles: {
    src: '/screens/shopping-list-aisles.jpg',
    label:
      'The same MealFind shopping list grouped by aisle (Meat & Fish, then Dairy), with each item showing the recipe it belongs to and its price.',
  },
} as const;
