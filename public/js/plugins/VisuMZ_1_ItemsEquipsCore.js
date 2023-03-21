//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.41;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.41] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"true","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x220c41=_0x11a9;(function(_0x10dd1d,_0x42b4a2){const _0x4f8a12=_0x11a9,_0x57db70=_0x10dd1d();while(!![]){try{const _0x1afab2=-parseInt(_0x4f8a12(0x596))/0x1+-parseInt(_0x4f8a12(0x2fd))/0x2*(-parseInt(_0x4f8a12(0x3a9))/0x3)+parseInt(_0x4f8a12(0x1d9))/0x4+parseInt(_0x4f8a12(0x525))/0x5+parseInt(_0x4f8a12(0x3c3))/0x6*(parseInt(_0x4f8a12(0x2e2))/0x7)+-parseInt(_0x4f8a12(0x3a6))/0x8*(-parseInt(_0x4f8a12(0x28b))/0x9)+parseInt(_0x4f8a12(0x226))/0xa*(-parseInt(_0x4f8a12(0x639))/0xb);if(_0x1afab2===_0x42b4a2)break;else _0x57db70['push'](_0x57db70['shift']());}catch(_0x4378e2){_0x57db70['push'](_0x57db70['shift']());}}}(_0x421a,0xba7d0));var label=_0x220c41(0x44d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x220c41(0x1b5)](function(_0x5de903){const _0x57511a=_0x220c41;return _0x5de903[_0x57511a(0x56a)]&&_0x5de903[_0x57511a(0x1d1)][_0x57511a(0x427)]('['+label+']');})[0x0];VisuMZ[label][_0x220c41(0x22a)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x220c41(0x4e8)]=function(_0x3c8aa0,_0x33549c){const _0x3763fb=_0x220c41;for(const _0x449561 in _0x33549c){if(_0x3763fb(0x3b4)==='FdknJ')_0x5847ca+=_0x437804(_0x5e34f6['$1']);else{if(_0x449561[_0x3763fb(0x17d)](/(.*):(.*)/i)){const _0x3f8b78=String(RegExp['$1']),_0x2d1b6a=String(RegExp['$2'])[_0x3763fb(0x1dc)]()['trim']();let _0x3732d5,_0x8be300,_0x2c37ad;switch(_0x2d1b6a){case'NUM':_0x3732d5=_0x33549c[_0x449561]!==''?Number(_0x33549c[_0x449561]):0x0;break;case _0x3763fb(0x1ad):_0x8be300=_0x33549c[_0x449561]!==''?JSON[_0x3763fb(0x636)](_0x33549c[_0x449561]):[],_0x3732d5=_0x8be300[_0x3763fb(0x3e9)](_0x13008f=>Number(_0x13008f));break;case _0x3763fb(0x34c):_0x3732d5=_0x33549c[_0x449561]!==''?eval(_0x33549c[_0x449561]):null;break;case _0x3763fb(0x490):_0x8be300=_0x33549c[_0x449561]!==''?JSON[_0x3763fb(0x636)](_0x33549c[_0x449561]):[],_0x3732d5=_0x8be300[_0x3763fb(0x3e9)](_0x89d624=>eval(_0x89d624));break;case _0x3763fb(0x423):_0x3732d5=_0x33549c[_0x449561]!==''?JSON['parse'](_0x33549c[_0x449561]):'';break;case _0x3763fb(0x18f):_0x8be300=_0x33549c[_0x449561]!==''?JSON[_0x3763fb(0x636)](_0x33549c[_0x449561]):[],_0x3732d5=_0x8be300[_0x3763fb(0x3e9)](_0x4feee2=>JSON[_0x3763fb(0x636)](_0x4feee2));break;case _0x3763fb(0x632):_0x3732d5=_0x33549c[_0x449561]!==''?new Function(JSON['parse'](_0x33549c[_0x449561])):new Function(_0x3763fb(0x237));break;case'ARRAYFUNC':_0x8be300=_0x33549c[_0x449561]!==''?JSON[_0x3763fb(0x636)](_0x33549c[_0x449561]):[],_0x3732d5=_0x8be300[_0x3763fb(0x3e9)](_0x523f2a=>new Function(JSON[_0x3763fb(0x636)](_0x523f2a)));break;case _0x3763fb(0x547):_0x3732d5=_0x33549c[_0x449561]!==''?String(_0x33549c[_0x449561]):'';break;case'ARRAYSTR':_0x8be300=_0x33549c[_0x449561]!==''?JSON[_0x3763fb(0x636)](_0x33549c[_0x449561]):[],_0x3732d5=_0x8be300[_0x3763fb(0x3e9)](_0x5a04af=>String(_0x5a04af));break;case'STRUCT':_0x2c37ad=_0x33549c[_0x449561]!==''?JSON['parse'](_0x33549c[_0x449561]):{},_0x3c8aa0[_0x3f8b78]={},VisuMZ[_0x3763fb(0x4e8)](_0x3c8aa0[_0x3f8b78],_0x2c37ad);continue;case'ARRAYSTRUCT':_0x8be300=_0x33549c[_0x449561]!==''?JSON[_0x3763fb(0x636)](_0x33549c[_0x449561]):[],_0x3732d5=_0x8be300['map'](_0x3a9123=>VisuMZ[_0x3763fb(0x4e8)]({},JSON[_0x3763fb(0x636)](_0x3a9123)));break;default:continue;}_0x3c8aa0[_0x3f8b78]=_0x3732d5;}}}return _0x3c8aa0;},(_0x252f95=>{const _0x8fd7a8=_0x220c41,_0x5ae7a3=_0x252f95[_0x8fd7a8(0x443)];for(const _0x165388 of dependencies){if(!Imported[_0x165388]){if(_0x8fd7a8(0x227)===_0x8fd7a8(0x227)){alert(_0x8fd7a8(0x3f7)[_0x8fd7a8(0x22d)](_0x5ae7a3,_0x165388)),SceneManager[_0x8fd7a8(0x2fe)]();break;}else for(const _0x565201 of _0x340f09[_0x8fd7a8(0x4c3)]){if(_0x565201)_0x565201[_0x8fd7a8(0x2ee)]();}}}const _0x3b4f9a=_0x252f95[_0x8fd7a8(0x1d1)];if(_0x3b4f9a['match'](/\[Version[ ](.*?)\]/i)){const _0xdabc2f=Number(RegExp['$1']);if(_0xdabc2f!==VisuMZ[label][_0x8fd7a8(0x586)]){if(_0x8fd7a8(0x581)==='apbWK'){const _0x566897=this['index']();return _0x4a8fd3[_0x8fd7a8(0x32f)](_0x8fd7a8(0x185))?this['cursorPagedown']():this[_0x8fd7a8(0x1db)](_0x225525[_0x8fd7a8(0x45c)](_0x8fd7a8(0x50d))),this[_0x8fd7a8(0x468)]()!==_0x566897&&this[_0x8fd7a8(0x5a4)](),!![];}else alert(_0x8fd7a8(0x4b4)[_0x8fd7a8(0x22d)](_0x5ae7a3,_0xdabc2f)),SceneManager[_0x8fd7a8(0x2fe)]();}}if(_0x3b4f9a[_0x8fd7a8(0x17d)](/\[Tier[ ](\d+)\]/i)){if(_0x8fd7a8(0x21d)!==_0x8fd7a8(0x21e)){const _0x429fc5=Number(RegExp['$1']);_0x429fc5<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x8fd7a8(0x22d)](_0x5ae7a3,_0x429fc5,tier)),SceneManager['exit']()):tier=Math[_0x8fd7a8(0x39b)](_0x429fc5,tier);}else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x8fd7a8(0x2b0)]():_0x2c201f['ItemsEquipsCore'][_0x8fd7a8(0x22a)]['EquipScene'][_0x8fd7a8(0x2d4)];}VisuMZ[_0x8fd7a8(0x4e8)](VisuMZ[label][_0x8fd7a8(0x22a)],_0x252f95[_0x8fd7a8(0x298)]);})(pluginData),PluginManager[_0x220c41(0x395)](pluginData[_0x220c41(0x443)],_0x220c41(0x3f0),_0x49a4a4=>{const _0x991f2f=_0x220c41;VisuMZ['ConvertParams'](_0x49a4a4,_0x49a4a4);const _0x43af46=_0x49a4a4[_0x991f2f(0x4cc)][_0x991f2f(0x3e9)](_0x46db31=>$gameActors[_0x991f2f(0x3c5)](_0x46db31)),_0x3e2a04=_0x49a4a4['Slots'][_0x991f2f(0x3e9)](_0x4a0a16=>$dataSystem['equipTypes'][_0x991f2f(0x4bd)](_0x4a0a16[_0x991f2f(0x31d)]()));for(const _0x5017b7 of _0x43af46){if(!_0x5017b7)continue;_0x5017b7['forceChangeEquipSlots'](_0x3e2a04);}}),PluginManager[_0x220c41(0x395)](pluginData[_0x220c41(0x443)],_0x220c41(0x47a),_0x19365d=>{const _0x3e3bc3=_0x220c41;VisuMZ[_0x3e3bc3(0x4e8)](_0x19365d,_0x19365d);const _0x2d6eb6=_0x19365d[_0x3e3bc3(0x4cc)]['map'](_0x3faf84=>$gameActors[_0x3e3bc3(0x3c5)](_0x3faf84));for(const _0x28380a of _0x2d6eb6){if(!_0x28380a)continue;_0x28380a[_0x3e3bc3(0x5f0)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x220c41(0x535),_0x10fa6f=>{const _0x4c74b2=_0x220c41;VisuMZ['ConvertParams'](_0x10fa6f,_0x10fa6f);const _0x2fa75f=[],_0x186766=_0x10fa6f[_0x4c74b2(0x45a)]['map'](_0x5c8ea1=>_0x5c8ea1[_0x4c74b2(0x1dc)]()[_0x4c74b2(0x31d)]()),_0x493316=_0x10fa6f[_0x4c74b2(0x5ce)][_0x4c74b2(0x3e9)](_0x289443=>_0x289443[_0x4c74b2(0x1dc)]()[_0x4c74b2(0x31d)]()),_0x439f5a=_0x10fa6f[_0x4c74b2(0x242)]>=_0x10fa6f[_0x4c74b2(0x5c3)]?_0x10fa6f[_0x4c74b2(0x5c3)]:_0x10fa6f['Step1End'],_0x13fe9a=_0x10fa6f[_0x4c74b2(0x242)]>=_0x10fa6f[_0x4c74b2(0x5c3)]?_0x10fa6f[_0x4c74b2(0x242)]:_0x10fa6f[_0x4c74b2(0x5c3)],_0x5e82e5=Array(_0x13fe9a-_0x439f5a+0x1)['fill']()[_0x4c74b2(0x3e9)]((_0x283ab0,_0x21b99e)=>_0x439f5a+_0x21b99e);for(const _0x1b540b of _0x5e82e5){if(_0x4c74b2(0x3b2)!==_0x4c74b2(0x4c0)){const _0xb52712=$dataItems[_0x1b540b];if(!_0xb52712)continue;if(!VisuMZ['ItemsEquipsCore'][_0x4c74b2(0x19c)](_0xb52712,_0x186766,_0x493316))continue;_0x2fa75f[_0x4c74b2(0x349)]([0x0,_0x1b540b,0x0,_0xb52712['price']]);}else return _0x2c0c1a[_0x4c74b2(0x44d)][_0x4c74b2(0x22a)][_0x4c74b2(0x58c)]['MaxItems'];}const _0x3be2f7=_0x10fa6f[_0x4c74b2(0x247)]>=_0x10fa6f[_0x4c74b2(0x5f5)]?_0x10fa6f[_0x4c74b2(0x5f5)]:_0x10fa6f['Step2End'],_0xc83d8d=_0x10fa6f[_0x4c74b2(0x247)]>=_0x10fa6f[_0x4c74b2(0x5f5)]?_0x10fa6f[_0x4c74b2(0x247)]:_0x10fa6f['Step2Start'],_0x5492a6=Array(_0xc83d8d-_0x3be2f7+0x1)['fill']()['map']((_0x4c99e1,_0x173f6)=>_0x3be2f7+_0x173f6);for(const _0x21cb7c of _0x5492a6){const _0x464628=$dataWeapons[_0x21cb7c];if(!_0x464628)continue;if(!VisuMZ[_0x4c74b2(0x44d)][_0x4c74b2(0x19c)](_0x464628,_0x186766,_0x493316))continue;_0x2fa75f[_0x4c74b2(0x349)]([0x1,_0x21cb7c,0x0,_0x464628['price']]);}const _0x33ecb1=_0x10fa6f[_0x4c74b2(0x473)]>=_0x10fa6f['Step3Start']?_0x10fa6f[_0x4c74b2(0x602)]:_0x10fa6f[_0x4c74b2(0x473)],_0x498c1b=_0x10fa6f[_0x4c74b2(0x473)]>=_0x10fa6f[_0x4c74b2(0x602)]?_0x10fa6f[_0x4c74b2(0x473)]:_0x10fa6f[_0x4c74b2(0x602)],_0x16764b=Array(_0x498c1b-_0x33ecb1+0x1)[_0x4c74b2(0x49a)]()[_0x4c74b2(0x3e9)]((_0x98f120,_0x39b93a)=>_0x33ecb1+_0x39b93a);for(const _0x288d8f of _0x16764b){if(_0x4c74b2(0x63f)!==_0x4c74b2(0x392)){const _0x1abdbf=$dataArmors[_0x288d8f];if(!_0x1abdbf)continue;if(!VisuMZ[_0x4c74b2(0x44d)][_0x4c74b2(0x19c)](_0x1abdbf,_0x186766,_0x493316))continue;_0x2fa75f[_0x4c74b2(0x349)]([0x2,_0x288d8f,0x0,_0x1abdbf[_0x4c74b2(0x51d)]]);}else return this[_0x4c74b2(0x523)]();}SceneManager[_0x4c74b2(0x349)](Scene_Shop),SceneManager[_0x4c74b2(0x187)](_0x2fa75f,_0x10fa6f[_0x4c74b2(0x3d4)]);}),VisuMZ[_0x220c41(0x44d)][_0x220c41(0x19c)]=function(_0x23c035,_0x2dfb51,_0x31d802){const _0x5ccf6e=_0x220c41;if(_0x23c035[_0x5ccf6e(0x443)][_0x5ccf6e(0x31d)]()==='')return![];if(_0x23c035[_0x5ccf6e(0x443)][_0x5ccf6e(0x17d)](/-----/i))return![];const _0x376811=_0x23c035[_0x5ccf6e(0x1bb)];if(_0x2dfb51[_0x5ccf6e(0x5ff)]>0x0){if(_0x5ccf6e(0x1ec)===_0x5ccf6e(0x447))_0x1a168d=_0x451192['weapon'];else for(const _0x169e5a of _0x2dfb51){if(_0x5ccf6e(0x21a)===_0x5ccf6e(0x453)){const _0x318727=this[_0x5ccf6e(0x430)](),_0x16fb53=this[_0x5ccf6e(0x258)][_0x5ccf6e(0x4d7)],_0x3957bb=this[_0x5ccf6e(0x359)]()?0x0:_0x401c6c[_0x5ccf6e(0x3b8)]-this[_0x5ccf6e(0x430)](),_0x44a9de=this['_itemWindow']['y'];return new _0x10bf33(_0x3957bb,_0x44a9de,_0x318727,_0x16fb53);}else{if(!_0x169e5a)continue;if(_0x376811[_0x5ccf6e(0x427)](_0x169e5a))return![];}}}if(_0x31d802[_0x5ccf6e(0x5ff)]>0x0){if(_0x5ccf6e(0x2df)===_0x5ccf6e(0x2df)){for(const _0x47838b of _0x31d802){if('kyXtg'==='ugiUA'){_0x272c69=_0x57e667||this['lineHeight'](),this['contentsBack']['paintOpacity']=0xa0;const _0x1aeb5f=_0x1ee728[_0x5ccf6e(0x259)]();this['contentsBack'][_0x5ccf6e(0x284)](_0x46c192+0x1,_0x3d4d26+0x1,_0x116d65-0x2,_0x29fa0e-0x2,_0x1aeb5f),this[_0x5ccf6e(0x228)]['paintOpacity']=0xff;}else{if(!_0x47838b)continue;if(_0x376811[_0x5ccf6e(0x427)](_0x47838b))return!![];}}return![];}else return _0x3c096d['ItemsEquipsCore'][_0x5ccf6e(0x22a)][_0x5ccf6e(0x315)]['LabelSuccessRate'];}return!![];},VisuMZ['ItemsEquipsCore'][_0x220c41(0x466)]=Scene_Boot[_0x220c41(0x4a1)][_0x220c41(0x2f0)],Scene_Boot[_0x220c41(0x4a1)]['onDatabaseLoaded']=function(){const _0x32c6d0=_0x220c41;this[_0x32c6d0(0x279)](),VisuMZ[_0x32c6d0(0x44d)]['Scene_Boot_onDatabaseLoaded'][_0x32c6d0(0x36e)](this),this[_0x32c6d0(0x18d)](),VisuMZ[_0x32c6d0(0x44d)][_0x32c6d0(0x486)]();},Scene_Boot['prototype'][_0x220c41(0x279)]=function(){const _0x1b8c9f=_0x220c41;VisuMZ[_0x1b8c9f(0x44d)][_0x1b8c9f(0x428)]={},VisuMZ['ItemsEquipsCore'][_0x1b8c9f(0x428)][_0x1b8c9f(0x41d)]=[],VisuMZ[_0x1b8c9f(0x44d)][_0x1b8c9f(0x428)]['BorderRegExp']=[];const _0x476b66=[_0x1b8c9f(0x442),_0x1b8c9f(0x463),'ATK',_0x1b8c9f(0x4fb),_0x1b8c9f(0x650),_0x1b8c9f(0x3e6),_0x1b8c9f(0x1d0),_0x1b8c9f(0x512)];for(const _0x417137 of _0x476b66){if(_0x1b8c9f(0x575)===_0x1b8c9f(0x575)){const _0x3dce52=_0x1b8c9f(0x398)[_0x1b8c9f(0x22d)](_0x417137);VisuMZ[_0x1b8c9f(0x44d)]['RegExp'][_0x1b8c9f(0x41d)][_0x1b8c9f(0x349)](new RegExp(_0x3dce52,'i'));const _0x658fc6=_0x1b8c9f(0x2c4)[_0x1b8c9f(0x22d)](_0x417137);VisuMZ[_0x1b8c9f(0x44d)][_0x1b8c9f(0x428)][_0x1b8c9f(0x58f)][_0x1b8c9f(0x349)](new RegExp(_0x658fc6,'g'));}else this[_0x1b8c9f(0x312)]['show'](),this[_0x1b8c9f(0x4a8)][_0x1b8c9f(0x437)]();}},Scene_Boot[_0x220c41(0x4a1)][_0x220c41(0x18d)]=function(){const _0x48b828=_0x220c41;if(VisuMZ['ParseAllNotetags'])return;this[_0x48b828(0x1c5)]();const _0xe4538d=[$dataItems,$dataWeapons,$dataArmors];for(const _0x6b3b89 of _0xe4538d){if(_0x48b828(0x51e)==='nsJLO')for(const _0x52bbc4 of _0x6b3b89){if('yJUHo'===_0x48b828(0x216)){if(!_0x52bbc4)continue;VisuMZ[_0x48b828(0x44d)][_0x48b828(0x469)](_0x52bbc4,_0x6b3b89),VisuMZ[_0x48b828(0x44d)][_0x48b828(0x43a)](_0x52bbc4,_0x6b3b89),VisuMZ[_0x48b828(0x44d)][_0x48b828(0x4ec)](_0x52bbc4,_0x6b3b89),VisuMZ[_0x48b828(0x44d)]['Parse_Notetags_ParamJS'](_0x52bbc4,_0x6b3b89),VisuMZ[_0x48b828(0x44d)][_0x48b828(0x360)](_0x52bbc4,_0x6b3b89);}else return this[_0x48b828(0x517)]();}else this[_0x48b828(0x1c4)](),_0x44ed1f['ItemsEquipsCore']['Window_Selectable_update'][_0x48b828(0x36e)](this);}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x5e8256=_0x220c41;for(const _0x3baaf5 of $dataClasses){if(_0x5e8256(0x38d)===_0x5e8256(0x385))return _0x5e8256(0x5c5)['format'](_0x3b8756['round'](_0x3c3b4e*0x64));else{if(!_0x3baaf5)continue;VisuMZ['ItemsEquipsCore'][_0x5e8256(0x402)](_0x3baaf5);}}},VisuMZ[_0x220c41(0x44d)]['ParseClassNotetags']=VisuMZ[_0x220c41(0x1b0)],VisuMZ[_0x220c41(0x1b0)]=function(_0x798248){const _0xc5db9f=_0x220c41;VisuMZ['ItemsEquipsCore'][_0xc5db9f(0x1b0)][_0xc5db9f(0x36e)](this,_0x798248),VisuMZ[_0xc5db9f(0x44d)][_0xc5db9f(0x402)](_0x798248);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x3f2)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x220c41(0x3f2)]=function(_0x334d37){const _0x43fa77=_0x220c41;VisuMZ[_0x43fa77(0x44d)][_0x43fa77(0x3f2)]['call'](this,_0x334d37),VisuMZ[_0x43fa77(0x44d)][_0x43fa77(0x616)](_0x334d37,$dataItems);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x336)]=VisuMZ[_0x220c41(0x336)],VisuMZ[_0x220c41(0x336)]=function(_0x2dc628){const _0x594062=_0x220c41;VisuMZ[_0x594062(0x44d)]['ParseWeaponNotetags'][_0x594062(0x36e)](this,_0x2dc628),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Batch'](_0x2dc628,$dataWeapons);},VisuMZ['ItemsEquipsCore']['ParseArmorNotetags']=VisuMZ[_0x220c41(0x47e)],VisuMZ['ParseArmorNotetags']=function(_0x4162fd){const _0x540787=_0x220c41;VisuMZ['ItemsEquipsCore'][_0x540787(0x47e)]['call'](this,_0x4162fd),VisuMZ[_0x540787(0x44d)][_0x540787(0x616)](_0x4162fd,$dataArmors);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x402)]=function(_0x111843){const _0x5b54c9=_0x220c41;_0x111843[_0x5b54c9(0x544)]=[];if(!BattleManager[_0x5b54c9(0x611)]()&&_0x111843[_0x5b54c9(0x366)][_0x5b54c9(0x17d)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if(_0x5b54c9(0x194)!==_0x5b54c9(0x194)){const _0x1bb83b=new _0x28478b(0x0,0x0,_0x4bb6c4[_0x5b54c9(0x2c3)],_0x572fa4[_0x5b54c9(0x4d7)]);this[_0x5b54c9(0x644)]=new _0x51398d(_0x1bb83b),this[_0x5b54c9(0x644)]['opacity']=0x0,this[_0x5b54c9(0x1b4)](this[_0x5b54c9(0x644)]),this[_0x5b54c9(0x5d7)]();}else{const _0x21a122=String(RegExp['$1'])[_0x5b54c9(0x5d4)](/[\r\n]+/);for(const _0x4fdc25 of _0x21a122){if(_0x5b54c9(0x3d9)===_0x5b54c9(0x3d9)){const _0x450f6a=$dataSystem['equipTypes'][_0x5b54c9(0x4bd)](_0x4fdc25[_0x5b54c9(0x31d)]());if(_0x450f6a>0x0)_0x111843[_0x5b54c9(0x544)][_0x5b54c9(0x349)](_0x450f6a);}else{if(!this[_0x5b54c9(0x328)])return![];if(!this[_0x5b54c9(0x328)][_0x5b54c9(0x5c7)])return![];return this[_0x5b54c9(0x328)]['isShiftRemoveShortcutEnabled']();}}}}else for(const _0x403c19 of $dataSystem[_0x5b54c9(0x5af)]){const _0x53e9af=$dataSystem[_0x5b54c9(0x5af)][_0x5b54c9(0x4bd)](_0x403c19[_0x5b54c9(0x31d)]());if(_0x53e9af>0x0)_0x111843[_0x5b54c9(0x544)][_0x5b54c9(0x349)](_0x53e9af);}},VisuMZ[_0x220c41(0x44d)]['Parse_Notetags_Batch']=function(_0x23a997,_0x543e5f){const _0x22afd5=_0x220c41;VisuMZ['ItemsEquipsCore'][_0x22afd5(0x469)](_0x23a997,_0x543e5f),VisuMZ[_0x22afd5(0x44d)]['Parse_Notetags_Prices'](_0x23a997,_0x543e5f),VisuMZ[_0x22afd5(0x44d)][_0x22afd5(0x4ec)](_0x23a997,_0x543e5f),VisuMZ[_0x22afd5(0x44d)][_0x22afd5(0x371)](_0x23a997,_0x543e5f),VisuMZ['ItemsEquipsCore'][_0x22afd5(0x360)](_0x23a997,_0x543e5f);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x469)]=function(_0x3631fe,_0x307294){const _0x18c9b8=_0x220c41;_0x3631fe[_0x18c9b8(0x1bb)]=[];const _0x34743a=_0x3631fe[_0x18c9b8(0x366)],_0x3b5690=_0x34743a[_0x18c9b8(0x17d)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x3b5690)for(const _0x2235d3 of _0x3b5690){_0x2235d3[_0x18c9b8(0x17d)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x406931=String(RegExp['$1'])[_0x18c9b8(0x1dc)]()[_0x18c9b8(0x31d)]()['split'](',');for(const _0xf3f7f3 of _0x406931){_0x3631fe[_0x18c9b8(0x1bb)]['push'](_0xf3f7f3[_0x18c9b8(0x31d)]());}}if(_0x34743a['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x18c9b8(0x29b)==='ySjwy'){const _0x29f3c4=RegExp['$1'][_0x18c9b8(0x5d4)](/[\r\n]+/);for(const _0x2338f2 of _0x29f3c4){_0x3631fe['categories'][_0x18c9b8(0x349)](_0x2338f2[_0x18c9b8(0x1dc)]()[_0x18c9b8(0x31d)]());}}else _0x5a04e5(_0x18c9b8(0x59d)['format'](_0x303028,_0x1aabf4,_0xb40477)),_0x144240['exit']();}},VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices']=function(_0xa2ac8b,_0x276e6f){const _0x394a8b=_0x220c41;_0xa2ac8b['note'][_0x394a8b(0x17d)](/<PRICE:[ ](\d+)>/i)&&(_0xa2ac8b[_0x394a8b(0x51d)]=Number(RegExp['$1']));},VisuMZ['ItemsEquipsCore'][_0x220c41(0x4ec)]=function(_0x3b1ec7,_0x42e0cb){const _0x279272=_0x220c41;if(_0x42e0cb===$dataItems)return;for(let _0x12fd2d=0x0;_0x12fd2d<0x8;_0x12fd2d++){if(_0x279272(0x56b)==='pclTY'){const _0x1c1887='SUCCESS\x20RATE';if(this[_0x279272(0x51f)][_0x1c1887])return this[_0x279272(0x51f)][_0x1c1887];if(_0x304f8f[_0x279272(0x5b3)]){const _0x5b35ae=this[_0x279272(0x1e6)][_0x279272(0x366)];if(_0x5b35ae[_0x279272(0x17d)](/<ALWAYS HIT>/i))return'100%';else{if(_0x5b35ae[_0x279272(0x17d)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x279272(0x5c5)[_0x279272(0x22d)](_0xaa7d7(_0x22fa15['$1']));}}return _0x279272(0x5c5)[_0x279272(0x22d)](this['_item'][_0x279272(0x46f)]);}else{const _0x381df5=VisuMZ['ItemsEquipsCore']['RegExp'][_0x279272(0x41d)][_0x12fd2d];_0x3b1ec7[_0x279272(0x366)][_0x279272(0x17d)](_0x381df5)&&(_0x3b1ec7['params'][_0x12fd2d]=parseInt(RegExp['$1']));}}},VisuMZ['ItemsEquipsCore']['paramJS']={},VisuMZ[_0x220c41(0x44d)]['Parse_Notetags_ParamJS']=function(_0x392e25,_0x27b037){const _0x1a2cc8=_0x220c41;if(_0x27b037===$dataItems)return;if(_0x392e25['note']['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0x1a2cc8(0x3e7)!==_0x1a2cc8(0x3e7)){const _0x454034=_0x347c13[_0x1a2cc8(0x636)]('['+_0x5cd106['$1']['match'](/\d+/g)+']');for(const _0x4b8538 of _0x454034){if(!_0x255d63['value'](_0x4b8538))return![];}return!![];}else{const _0xe0a9bc=String(RegExp['$1']),_0x5c125d=(_0x27b037===$dataWeapons?_0x1a2cc8(0x53a):_0x1a2cc8(0x1f8))[_0x1a2cc8(0x22d)](_0x392e25['id']),_0x21da1e=_0x1a2cc8(0x1f6)[_0x1a2cc8(0x22d)](_0xe0a9bc);for(let _0x5afc82=0x0;_0x5afc82<0x8;_0x5afc82++){if('mrIug'!==_0x1a2cc8(0x325)){if(_0xe0a9bc[_0x1a2cc8(0x17d)](VisuMZ[_0x1a2cc8(0x44d)]['RegExp'][_0x1a2cc8(0x58f)][_0x5afc82])){const _0x5bb47c='%1-%2'[_0x1a2cc8(0x22d)](_0x5c125d,_0x5afc82);VisuMZ['ItemsEquipsCore']['paramJS'][_0x5bb47c]=new Function(_0x1a2cc8(0x4c4),_0x1a2cc8(0x3b1),_0x21da1e);}}else _0x1d123b['ItemsEquipsCore']['Scene_Shop_createSellWindow'][_0x1a2cc8(0x36e)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x1a2cc8(0x4d9)]();}}}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x572)]={},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x360)]=function(_0x2265e7,_0x545415){const _0xd44a4c=_0x220c41;if(_0x545415!==$dataItems)return;if(_0x2265e7[_0xd44a4c(0x366)][_0xd44a4c(0x17d)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0xd44a4c(0x629)===_0xd44a4c(0x43b))_0x352ee2[_0xd44a4c(0x44d)]['Settings'][_0xd44a4c(0x278)][_0xd44a4c(0x207)][_0xd44a4c(0x36e)](this),this[_0xd44a4c(0x417)]();else{const _0x2ff886=String(RegExp['$1']),_0x44f29c=_0xd44a4c(0x56f)['format'](_0x2ff886);VisuMZ[_0xd44a4c(0x44d)][_0xd44a4c(0x572)][_0x2265e7['id']]=new Function(_0xd44a4c(0x4c4),_0x44f29c);}}},DataManager[_0x220c41(0x4e3)]=function(_0x371a7c){const _0x4713a5=_0x220c41;return this[_0x4713a5(0x498)](_0x371a7c)&&_0x371a7c['itypeId']===0x2;},DataManager[_0x220c41(0x541)]=function(_0x40be8f){const _0x46c607=_0x220c41;if(!_0x40be8f){if(_0x46c607(0x4f4)!==_0x46c607(0x1a3))return 0x63;else{const _0x51e0c5=_0x26f1cf(_0x8c296f['$1'])['toUpperCase']()[_0x46c607(0x31d)](),_0x38edf9=_0x3deefd(_0x362162['$2'])[_0x46c607(0x31d)]();this[_0x46c607(0x51f)][_0x51e0c5]=_0x38edf9;}}else return _0x40be8f[_0x46c607(0x366)][_0x46c607(0x17d)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x46c607(0x483)](_0x40be8f);},DataManager[_0x220c41(0x483)]=function(_0x4c64f2){const _0x13cb7a=_0x220c41;if(this[_0x13cb7a(0x498)](_0x4c64f2))return VisuMZ[_0x13cb7a(0x44d)][_0x13cb7a(0x22a)]['ItemScene'][_0x13cb7a(0x2fa)];else{if(this[_0x13cb7a(0x340)](_0x4c64f2))return VisuMZ[_0x13cb7a(0x44d)][_0x13cb7a(0x22a)][_0x13cb7a(0x58c)]['MaxWeapons'];else{if(this[_0x13cb7a(0x5e6)](_0x4c64f2))return _0x13cb7a(0x1ff)!=='UjubO'?this[_0x13cb7a(0x39a)]()[_0x13cb7a(0x17d)](/LOWER/i):VisuMZ[_0x13cb7a(0x44d)][_0x13cb7a(0x22a)][_0x13cb7a(0x58c)][_0x13cb7a(0x5b9)];}}},DataManager[_0x220c41(0x245)]=function(_0x10efb5){const _0x3fbcda=_0x220c41;_0x10efb5=_0x10efb5[_0x3fbcda(0x1dc)]()[_0x3fbcda(0x31d)](),this[_0x3fbcda(0x308)]=this['_itemIDs']||{};if(this['_itemIDs'][_0x10efb5])return this[_0x3fbcda(0x308)][_0x10efb5];for(const _0x3a16ca of $dataItems){if(!_0x3a16ca)continue;this[_0x3fbcda(0x308)][_0x3a16ca[_0x3fbcda(0x443)][_0x3fbcda(0x1dc)]()[_0x3fbcda(0x31d)]()]=_0x3a16ca['id'];}return this[_0x3fbcda(0x308)][_0x10efb5]||0x0;},DataManager['getWeaponIdWithName']=function(_0x29dab6){const _0x37c639=_0x220c41;_0x29dab6=_0x29dab6['toUpperCase']()[_0x37c639(0x31d)](),this[_0x37c639(0x1f2)]=this[_0x37c639(0x1f2)]||{};if(this[_0x37c639(0x1f2)][_0x29dab6])return this[_0x37c639(0x1f2)][_0x29dab6];for(const _0x181c95 of $dataWeapons){if(!_0x181c95)continue;this[_0x37c639(0x1f2)][_0x181c95[_0x37c639(0x443)][_0x37c639(0x1dc)]()[_0x37c639(0x31d)]()]=_0x181c95['id'];}return this['_weaponIDs'][_0x29dab6]||0x0;},DataManager[_0x220c41(0x407)]=function(_0x21ff74){const _0x4c8d74=_0x220c41;_0x21ff74=_0x21ff74[_0x4c8d74(0x1dc)]()[_0x4c8d74(0x31d)](),this[_0x4c8d74(0x3e2)]=this[_0x4c8d74(0x3e2)]||{};if(this[_0x4c8d74(0x3e2)][_0x21ff74])return this[_0x4c8d74(0x3e2)][_0x21ff74];for(const _0x267524 of $dataArmors){if(_0x4c8d74(0x5e9)===_0x4c8d74(0x5e9)){if(!_0x267524)continue;this['_armorIDs'][_0x267524[_0x4c8d74(0x443)][_0x4c8d74(0x1dc)]()['trim']()]=_0x267524['id'];}else{if(!this['checkItemConditionsSwitchNotetags'](_0x5f2c2b))return![];return!![];}}return this[_0x4c8d74(0x3e2)][_0x21ff74]||0x0;},VisuMZ['ItemsEquipsCore'][_0x220c41(0x486)]=function(){const _0x306e68=_0x220c41;VisuMZ[_0x306e68(0x44d)]['SetupProxyItemGroup']($dataItems),VisuMZ[_0x306e68(0x44d)][_0x306e68(0x62e)]($dataWeapons),VisuMZ['ItemsEquipsCore']['SetupProxyItemGroup']($dataArmors);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x62e)]=function(_0x103169){const _0x538532=_0x220c41;for(const _0x1b5918 of _0x103169){if(!_0x1b5918)continue;if(!DataManager[_0x538532(0x3ef)](_0x1b5918))continue;const _0x454110=DataManager['getProxyItem'](_0x1b5918),_0x27be80=[_0x538532(0x443),'iconIndex',_0x538532(0x1d1)];for(const _0x313f38 of _0x27be80){'uYgcE'===_0x538532(0x570)?_0x14af58=_0x538532(0x31f)[_0x538532(0x22d)](_0x5b28c3['id']):_0x1b5918[_0x313f38]=_0x454110[_0x313f38];}}},DataManager[_0x220c41(0x3ef)]=function(_0xb1f0a8){const _0x1bf943=_0x220c41;if(!_0xb1f0a8)return![];if(!_0xb1f0a8['note'])return![];return _0xb1f0a8&&_0xb1f0a8[_0x1bf943(0x366)][_0x1bf943(0x17d)](/<PROXY:[ ](.*)>/i);},DataManager[_0x220c41(0x444)]=function(_0x2fffb4){const _0x5ebd43=_0x220c41;if(this['isProxyItem'](_0x2fffb4))return'yVYDU'!==_0x5ebd43(0x58b)?_0x16c684[_0x5ebd43(0x44d)][_0x5ebd43(0x22a)]['StatusWindow'][_0x5ebd43(0x540)]:this[_0x5ebd43(0x35a)](_0x2fffb4)||_0x2fffb4;else{if(_0x5ebd43(0x38f)===_0x5ebd43(0x4fc)){_0x178e7f+=_0x5ebd43(0x552)[_0x5ebd43(0x22d)](_0x1deda3['iconIndex']),_0x2c475a++;if(_0x236815>=_0x4a4cbb)return _0x2a87a1;}else return _0x2fffb4;}},DataManager['switchProxyItem']=function(_0x151b6d){const _0x1eb256=_0x220c41;_0x151b6d[_0x1eb256(0x366)][_0x1eb256(0x17d)](/<PROXY:[ ](.*)>/i);const _0x177b09=RegExp['$1']['trim'](),_0x3ac17c=/^\d+$/[_0x1eb256(0x4ab)](_0x177b09);if(this[_0x1eb256(0x498)](_0x151b6d)){const _0x4f9b7e=_0x3ac17c?Number(RegExp['$1']):DataManager[_0x1eb256(0x245)](_0x177b09);return $dataItems[_0x4f9b7e]||_0x151b6d;}else{if(this[_0x1eb256(0x340)](_0x151b6d)){if(_0x1eb256(0x241)!==_0x1eb256(0x241))return _0x51a510[_0x1eb256(0x44d)][_0x1eb256(0x22a)][_0x1eb256(0x217)][_0x1eb256(0x4a2)];else{const _0x53cfa2=_0x3ac17c?Number(RegExp['$1']):DataManager[_0x1eb256(0x5a1)](_0x177b09);return $dataWeapons[_0x53cfa2]||_0x151b6d;}}else{if(this[_0x1eb256(0x5e6)](_0x151b6d)){const _0x2f681a=_0x3ac17c?Number(RegExp['$1']):DataManager['getArmorIdWithName'](_0x177b09);return $dataArmors[_0x2f681a]||_0x151b6d;}}}return _0x151b6d;},VisuMZ['ItemsEquipsCore']['Window_ItemList_item']=Window_ItemList['prototype'][_0x220c41(0x4c4)],Window_ItemList[_0x220c41(0x4a1)]['item']=function(){const _0x3146d7=_0x220c41;if($gameTemp[_0x3146d7(0x47c)])return VisuMZ[_0x3146d7(0x44d)][_0x3146d7(0x424)]['call'](this);return DataManager[_0x3146d7(0x444)](VisuMZ[_0x3146d7(0x44d)][_0x3146d7(0x424)][_0x3146d7(0x36e)](this));},Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x183)]=function(){const _0x5596cf=_0x220c41;return VisuMZ[_0x5596cf(0x44d)]['Window_ItemList_item']['call'](this);},VisuMZ[_0x220c41(0x44d)]['Window_ShopBuy_item']=Window_ShopBuy[_0x220c41(0x4a1)]['item'],Window_ShopBuy[_0x220c41(0x4a1)][_0x220c41(0x4c4)]=function(){const _0x22d2bb=_0x220c41;if($gameTemp[_0x22d2bb(0x47c)])return VisuMZ[_0x22d2bb(0x44d)][_0x22d2bb(0x27c)][_0x22d2bb(0x36e)](this);return DataManager['getProxyItem'](VisuMZ[_0x22d2bb(0x44d)][_0x22d2bb(0x27c)]['call'](this));},Window_ShopBuy['prototype'][_0x220c41(0x183)]=function(){const _0x3ae805=_0x220c41;return VisuMZ[_0x3ae805(0x44d)][_0x3ae805(0x27c)]['call'](this);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x36a)]=Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x5a5)],Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x5a5)]=function(_0x5df411){const _0x1181d4=_0x220c41;_0x5df411=DataManager[_0x1181d4(0x444)](_0x5df411),VisuMZ[_0x1181d4(0x44d)][_0x1181d4(0x36a)][_0x1181d4(0x36e)](this,_0x5df411);},VisuMZ['ItemsEquipsCore']['Game_Item_setObject']=Game_Item[_0x220c41(0x4a1)][_0x220c41(0x37f)],Game_Item['prototype'][_0x220c41(0x37f)]=function(_0x341919){const _0x3df46e=_0x220c41;if(DataManager['isProxyItem'](_0x341919))return;VisuMZ[_0x3df46e(0x44d)]['Game_Item_setObject']['call'](this,_0x341919);},DataManager[_0x220c41(0x1ee)]=function(_0x355e30){const _0x453363=_0x220c41;if(!this[_0x453363(0x5e6)](_0x355e30))return![];const _0x1be5e1=_0x355e30[_0x453363(0x366)];if(!_0x1be5e1)return![];if(_0x1be5e1[_0x453363(0x17d)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1be5e1[_0x453363(0x17d)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1be5e1['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1be5e1['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isStackableArtifact']=function(_0x33e0cb){const _0x429e53=_0x220c41;if(!this['isArtifact'](_0x33e0cb))return![];const _0x31a2d0=_0x33e0cb[_0x429e53(0x366)];if(!_0x31a2d0)return![];if(_0x31a2d0[_0x429e53(0x17d)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x31a2d0[_0x429e53(0x17d)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x220c41(0x189)]=function(_0x29a88e){const _0x5da437=_0x220c41;if(!this[_0x5da437(0x1ee)](_0x29a88e))return![];const _0x3764f1=_0x29a88e[_0x5da437(0x366)];if(!_0x3764f1)return![];if(_0x3764f1['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3764f1[_0x5da437(0x17d)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x220c41(0x555)]=function(_0x4ec9f3){const _0x33c55f=_0x220c41;if(!this[_0x33c55f(0x1ee)](_0x4ec9f3))return![];const _0x4a219d=_0x4ec9f3[_0x33c55f(0x366)];if(!_0x4a219d)return![];if(_0x4a219d[_0x33c55f(0x17d)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x4a219d[_0x33c55f(0x17d)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x322)]=Game_BattlerBase[_0x220c41(0x4a1)][_0x220c41(0x5e7)],Game_BattlerBase['prototype'][_0x220c41(0x5e7)]=function(_0x5c05a3){const _0x4cd604=_0x220c41;if(DataManager[_0x4cd604(0x1ee)](_0x5c05a3))return![];return VisuMZ[_0x4cd604(0x44d)][_0x4cd604(0x322)][_0x4cd604(0x36e)](this,_0x5c05a3);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x2e6)]=Game_BattlerBase[_0x220c41(0x4a1)]['param'],Game_BattlerBase[_0x220c41(0x4a1)]['param']=function(_0x1b2647){const _0x396670=_0x220c41;this[_0x396670(0x608)]=!![];const _0x1eeff9=VisuMZ[_0x396670(0x44d)][_0x396670(0x2e6)]['call'](this,_0x1b2647);return this[_0x396670(0x608)]=undefined,_0x1eeff9;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x461)]=Game_Actor['prototype']['traitObjects'],Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x287)]=function(){const _0x15650f=_0x220c41;this[_0x15650f(0x1e8)]=!![];const _0x15cac6=VisuMZ['ItemsEquipsCore'][_0x15650f(0x461)][_0x15650f(0x36e)](this);return this[_0x15650f(0x1e8)]=undefined,_0x15cac6;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x2bb)]=Game_Actor['prototype']['equips'],Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x440)]=function(){const _0x40f05e=_0x220c41,_0xa01a35=VisuMZ[_0x40f05e(0x44d)]['Game_Actor_equips_artifacts']['call'](this);if(this[_0x40f05e(0x1e8)]||this[_0x40f05e(0x608)]){const _0x5368fc=_0xa01a35['concat']($gameParty[_0x40f05e(0x361)]());return _0x5368fc;}else return _0xa01a35;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x386)]=Game_BattlerBase[_0x220c41(0x4a1)][_0x220c41(0x1a2)],Game_BattlerBase[_0x220c41(0x4a1)][_0x220c41(0x1a2)]=function(_0x281134){const _0x1c3da7=_0x220c41;let _0x141b20=VisuMZ[_0x1c3da7(0x44d)][_0x1c3da7(0x386)][_0x1c3da7(0x36e)](this,_0x281134);if(this[_0x1c3da7(0x1e7)]===Game_Enemy){if(_0x1c3da7(0x4ff)===_0x1c3da7(0x25d)){if(_0x34df90===_0x34fd9c)return;if(_0x1f75bf[_0x1c3da7(0x366)][_0x1c3da7(0x17d)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x2a9786=_0x53c69(_0x381e07['$1']),_0x20ad3c=(_0x121230===_0x3b10cf?_0x1c3da7(0x53a):'A%1')['format'](_0x512a15['id']),_0x3f87a6='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x2a9786);for(let _0x3e3317=0x0;_0x3e3317<0x8;_0x3e3317++){if(_0x2a9786['match'](_0xe2e0ea[_0x1c3da7(0x44d)][_0x1c3da7(0x428)]['BorderRegExp'][_0x3e3317])){const _0x5711c=_0x1c3da7(0x573)[_0x1c3da7(0x22d)](_0x20ad3c,_0x3e3317);_0x431284[_0x1c3da7(0x44d)][_0x1c3da7(0x3e4)][_0x5711c]=new _0x1c30ff(_0x1c3da7(0x4c4),_0x1c3da7(0x3b1),_0x3f87a6);}}}}else for(const _0x2439f2 of $gameParty[_0x1c3da7(0x1b2)]()){if(_0x1c3da7(0x57c)===_0x1c3da7(0x57c)){if(_0x2439f2)_0x141b20+=_0x2439f2[_0x1c3da7(0x17e)][_0x281134];}else{const _0x296117=0x0,_0xbb8b6d=this[_0x1c3da7(0x2db)](),_0x518e3e=_0x302d6b[_0x1c3da7(0x3b8)],_0x10b397=this[_0x1c3da7(0x51b)]();return new _0x59a1e5(_0x296117,_0xbb8b6d,_0x518e3e,_0x10b397);}}}return _0x141b20;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x479)]=Game_Enemy[_0x220c41(0x4a1)][_0x220c41(0x287)],Game_Enemy[_0x220c41(0x4a1)][_0x220c41(0x287)]=function(){const _0x2fac21=_0x220c41;let _0x5e1b6c=VisuMZ[_0x2fac21(0x44d)][_0x2fac21(0x479)][_0x2fac21(0x36e)](this);return _0x5e1b6c[_0x2fac21(0x47b)]($gameParty[_0x2fac21(0x1b2)]());},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x1a0)]=Game_Party[_0x220c41(0x4a1)][_0x220c41(0x40f)],Game_Party[_0x220c41(0x4a1)]['gainItem']=function(_0x41dec3,_0x509a78,_0x4d7942){const _0x384de0=_0x220c41;VisuMZ['ItemsEquipsCore'][_0x384de0(0x1a0)]['call'](this,_0x41dec3,_0x509a78,_0x4d7942);if(DataManager[_0x384de0(0x1ee)](_0x41dec3)){let _0x5639fa=$gameParty[_0x384de0(0x25c)]();if($gameParty['inBattle']())_0x5639fa=_0x5639fa[_0x384de0(0x47b)]($gameTroop[_0x384de0(0x301)]());for(const _0x18f019 of $gameTroop['members']()){if(_0x384de0(0x47d)==='sKwrM')return _0x507bda[_0x384de0(0x44d)][_0x384de0(0x5c0)][_0x384de0(0x36e)](this);else{if(!_0x18f019)continue;_0x18f019[_0x384de0(0x26b)]={};}}}},Game_Party[_0x220c41(0x4a1)][_0x220c41(0x361)]=function(){const _0xc52f57=_0x220c41;let _0x57508b=[];for(const _0x1438ed of this['armors']()){if(_0xc52f57(0x5a7)!==_0xc52f57(0x58e)){if(!_0x1438ed)continue;if(!DataManager['isArtifact'](_0x1438ed))continue;if(!DataManager[_0xc52f57(0x189)](_0x1438ed))continue;let _0x2f1d84=0x1;if(DataManager[_0xc52f57(0x476)](_0x1438ed))_0x2f1d84=this['numItems'](_0x1438ed);while(_0x2f1d84--)_0x57508b[_0xc52f57(0x349)](_0x1438ed);}else return this[_0xc52f57(0x264)]?this[_0xc52f57(0x4b0)]?_0x4019b3[_0xc52f57(0x62d)]:0x1:_0x26bd7a[_0xc52f57(0x44d)]['Game_BattlerBase_param'][_0xc52f57(0x36e)](this,_0x246c29);}return _0x57508b;},Game_Party[_0x220c41(0x4a1)][_0x220c41(0x1b2)]=function(){const _0x18f0bf=_0x220c41;let _0x5b85b1=[];for(const _0x3b471b of this[_0x18f0bf(0x50c)]()){if(!_0x3b471b)continue;if(!DataManager[_0x18f0bf(0x1ee)](_0x3b471b))continue;if(!DataManager[_0x18f0bf(0x555)](_0x3b471b))continue;let _0xbe1c43=0x1;if(DataManager[_0x18f0bf(0x476)](_0x3b471b))_0xbe1c43=this[_0x18f0bf(0x280)](_0x3b471b);while(_0xbe1c43--)_0x5b85b1[_0x18f0bf(0x349)](_0x3b471b);}return _0x5b85b1;},Game_Party[_0x220c41(0x4a1)][_0x220c41(0x48a)]=function(){const _0x101d0a=_0x220c41;return this[_0x101d0a(0x361)]()[_0x101d0a(0x47b)](this[_0x101d0a(0x1b2)]());},VisuMZ['ItemsEquipsCore']['Game_Party_setupBattleTestItems_artifact']=Game_Party[_0x220c41(0x4a1)]['setupBattleTestItems'],Game_Party['prototype'][_0x220c41(0x3cb)]=function(){const _0x502481=_0x220c41;VisuMZ[_0x502481(0x44d)][_0x502481(0x2de)][_0x502481(0x36e)](this),this['removeBattleTestArtifacts']();},Game_Party[_0x220c41(0x4a1)][_0x220c41(0x186)]=function(){const _0x3eb5b7=_0x220c41,_0x223f94=$gameParty[_0x3eb5b7(0x50c)]()[_0x3eb5b7(0x1b5)](_0x1ce914=>DataManager[_0x3eb5b7(0x1ee)](_0x1ce914));for(const _0xf1116d of _0x223f94){if(_0x3eb5b7(0x4e7)!=='UcfHs'){const _0x489d52=this[_0x3eb5b7(0x280)](_0xf1116d);if(_0x489d52)this[_0x3eb5b7(0x23e)](_0xf1116d,_0x489d52);}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},TextManager[_0x220c41(0x530)]={'helpDesc':{'equip':VisuMZ['ItemsEquipsCore'][_0x220c41(0x22a)]['EquipScene'][_0x220c41(0x618)]??'Pick\x20and\x20choose\x20equipment\x20to\x20change.','optimize':VisuMZ['ItemsEquipsCore'][_0x220c41(0x22a)][_0x220c41(0x278)][_0x220c41(0x604)]??_0x220c41(0x2b4),'clear':VisuMZ[_0x220c41(0x44d)][_0x220c41(0x22a)][_0x220c41(0x278)][_0x220c41(0x20e)]??'Remove\x20all\x20available\x20equipment.'}},ColorManager[_0x220c41(0x32a)]=function(_0x555f46){const _0x3f7308=_0x220c41;if(!_0x555f46)return this['normalColor']();else{if(_0x555f46[_0x3f7308(0x366)][_0x3f7308(0x17d)](/<COLOR:[ ](\d+)>/i)){if(_0x3f7308(0x477)!=='JHQKu')_0x1cd47c[_0x3f7308(0x267)]=this[_0x3f7308(0x40c)];else return this[_0x3f7308(0x193)](Number(RegExp['$1'])['clamp'](0x0,0x1f));}else return _0x555f46[_0x3f7308(0x366)][_0x3f7308(0x17d)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x3f7308(0x539)]();}},ColorManager[_0x220c41(0x1a9)]=function(_0x5730dc){const _0x3bb795=_0x220c41;_0x5730dc=String(_0x5730dc);if(_0x5730dc[_0x3bb795(0x17d)](/#(.*)/i))return _0x3bb795(0x46b)[_0x3bb795(0x22d)](String(RegExp['$1']));else{if(_0x3bb795(0x59f)!==_0x3bb795(0x59f)){const _0x3c77db=this['_categoryNameWindow'];_0x3c77db['contents'][_0x3bb795(0x27f)]();const _0x452abc=this[_0x3bb795(0x2e7)](this[_0x3bb795(0x468)]());if(_0x452abc===_0x3bb795(0x49d)){const _0x2e5e04=this[_0x3bb795(0x582)](this[_0x3bb795(0x468)]());let _0xaf2038=this['commandName'](this[_0x3bb795(0x468)]());_0xaf2038=_0xaf2038[_0x3bb795(0x3e1)](/\\I\[(\d+)\]/gi,''),_0x3c77db[_0x3bb795(0x27e)](),this[_0x3bb795(0x464)](_0xaf2038,_0x2e5e04),this[_0x3bb795(0x543)](_0xaf2038,_0x2e5e04),this[_0x3bb795(0x565)](_0xaf2038,_0x2e5e04);}}else return this[_0x3bb795(0x193)](Number(_0x5730dc));}},SceneManager[_0x220c41(0x190)]=function(){const _0x10f6b4=_0x220c41;return this[_0x10f6b4(0x37c)]&&this[_0x10f6b4(0x37c)][_0x10f6b4(0x1e7)]===Scene_Shop;},Game_Temp[_0x220c41(0x4a1)][_0x220c41(0x18e)]=function(){const _0x27e629=_0x220c41;if(this['_bypassNewLabel'])return![];return VisuMZ[_0x27e629(0x44d)][_0x27e629(0x22a)][_0x27e629(0x342)][_0x27e629(0x4e4)];},VisuMZ[_0x220c41(0x62d)]=VisuMZ['ItemsEquipsCore'][_0x220c41(0x22a)][_0x220c41(0x315)]['MultiplierStandard'],VisuMZ['ItemsEquipsCore']['Game_BattlerBase_param']=Game_BattlerBase[_0x220c41(0x4a1)][_0x220c41(0x28d)],Game_BattlerBase['prototype'][_0x220c41(0x28d)]=function(_0x5d8cec){const _0xfb9fd9=_0x220c41;if(this[_0xfb9fd9(0x264)]){if(_0xfb9fd9(0x285)===_0xfb9fd9(0x4ba))_0xb90d61=this[_0xfb9fd9(0x60b)][_0xfb9fd9(0x28d)](_0x2d8a18);else return this[_0xfb9fd9(0x4b0)]?VisuMZ[_0xfb9fd9(0x62d)]:0x1;}else{if(_0xfb9fd9(0x1f7)==='syfvg')return VisuMZ[_0xfb9fd9(0x44d)][_0xfb9fd9(0x2ae)]['call'](this,_0x5d8cec);else{if(this[_0xfb9fd9(0x210)]())return _0x5936cf[_0xfb9fd9(0x388)]('shift');return _0x45c924[_0xfb9fd9(0x4a1)]['buttonAssistKey3'][_0xfb9fd9(0x36e)](this);}}},VisuMZ['ItemsEquipsCore'][_0x220c41(0x3c2)]=Game_BattlerBase[_0x220c41(0x4a1)][_0x220c41(0x454)],Game_BattlerBase[_0x220c41(0x4a1)][_0x220c41(0x454)]=function(_0x385767){const _0x44051d=_0x220c41;if(!_0x385767)return![];if(!VisuMZ['ItemsEquipsCore'][_0x44051d(0x3c2)][_0x44051d(0x36e)](this,_0x385767))return![];if(!this[_0x44051d(0x324)](_0x385767))return![];if(!this[_0x44051d(0x300)](_0x385767))return![];return!![];},Game_BattlerBase[_0x220c41(0x4a1)]['meetsItemConditionsNotetags']=function(_0x4d5b84){const _0x439c90=_0x220c41;if(!this[_0x439c90(0x341)](_0x4d5b84))return![];return!![];},Game_BattlerBase['prototype'][_0x220c41(0x341)]=function(_0x2f25e0){const _0x1dd678=_0x220c41,_0x26a122=_0x2f25e0[_0x1dd678(0x366)];if(_0x26a122[_0x1dd678(0x17d)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20222c=JSON[_0x1dd678(0x636)]('['+RegExp['$1'][_0x1dd678(0x17d)](/\d+/g)+']');for(const _0x522a3f of _0x20222c){if(!$gameSwitches[_0x1dd678(0x634)](_0x522a3f))return![];}return!![];}if(_0x26a122[_0x1dd678(0x17d)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x239315=JSON[_0x1dd678(0x636)]('['+RegExp['$1'][_0x1dd678(0x17d)](/\d+/g)+']');for(const _0x5c3e7f of _0x239315){if(!$gameSwitches[_0x1dd678(0x634)](_0x5c3e7f))return![];}return!![];}if(_0x26a122[_0x1dd678(0x17d)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ac048=JSON[_0x1dd678(0x636)]('['+RegExp['$1'][_0x1dd678(0x17d)](/\d+/g)+']');for(const _0x296147 of _0x4ac048){if(_0x1dd678(0x3b7)!==_0x1dd678(0x527)){if($gameSwitches['value'](_0x296147))return!![];}else{const _0x408e8f='TP\x20DAMAGE';if(this[_0x1dd678(0x51f)][_0x408e8f])return this[_0x1dd678(0x51f)][_0x408e8f];let _0x32e017='';return _0x32e017+='%1'[_0x1dd678(0x22d)](this['_itemData'][_0x1dd678(0x2f1)]),_0x32e017;}}return![];}if(_0x26a122[_0x1dd678(0x17d)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('PBwDE'===_0x1dd678(0x4a3))return'iconText';else{const _0x5214c8=JSON['parse']('['+RegExp['$1'][_0x1dd678(0x17d)](/\d+/g)+']');for(const _0x301b32 of _0x5214c8){if(_0x1dd678(0x208)!==_0x1dd678(0x508)){if(!$gameSwitches[_0x1dd678(0x634)](_0x301b32))return!![];}else{const _0xc3de3c=this[_0x1dd678(0x5f9)]();this['_statusWindow']=new _0xaea39b(_0xc3de3c),this[_0x1dd678(0x520)](this[_0x1dd678(0x55d)]),this[_0x1dd678(0x258)]['setStatusWindow'](this[_0x1dd678(0x55d)]);const _0x28b49c=_0x57c6e6[_0x1dd678(0x44d)][_0x1dd678(0x22a)][_0x1dd678(0x58c)][_0x1dd678(0x3da)];this['_statusWindow'][_0x1dd678(0x627)](_0x28b49c||0x0);}}return![];}}if(_0x26a122['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('jBgZL'!==_0x1dd678(0x5a2)){const _0x3bde7d=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xf116da of _0x3bde7d){if('GnNoN'===_0x1dd678(0x455)){if(!$gameSwitches[_0x1dd678(0x634)](_0xf116da))return!![];}else{_0x47d0df[_0x1dd678(0x4a1)]['callUpdateHelp'][_0x1dd678(0x36e)](this);if(this['_categoryNameWindow'])this[_0x1dd678(0x425)]();}}return![];}else this[_0x1dd678(0x365)](_0xfe57d1,_0x4765a1,_0xe7b38,_0xb1131e,!![]),this[_0x1dd678(0x365)](_0x5cc838,_0x109de0,_0x221743,_0x3b8326,![],_0x1dd678(0x28c)),this[_0x1dd678(0x3bf)](_0x202ec9,_0x5566b5,_0x1dde20),this['resetFontSettings']();}if(_0x26a122['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1dd678(0x3d0)!==_0x1dd678(0x3ca)){const _0x27c77e=JSON[_0x1dd678(0x636)]('['+RegExp['$1'][_0x1dd678(0x17d)](/\d+/g)+']');for(const _0x365e16 of _0x27c77e){if(_0x1dd678(0x64b)!==_0x1dd678(0x64b))_0x5511df[_0x1dd678(0x44d)][_0x1dd678(0x269)][_0x1dd678(0x36e)](this),this['onSlotOkAutoSelect']();else{if($gameSwitches[_0x1dd678(0x634)](_0x365e16))return![];}}return!![];}else{const _0xf89004=_0x71e3aa[_0x3f321];_0xf89004&&_0xf89004[_0x1dd678(0x61c)]===_0x35ab08+0x1&&_0x3edaab[_0x1dd678(0x349)](_0xf89004);}}return!![];},Game_BattlerBase['prototype']['meetsItemConditionsJS']=function(_0x49dbe1){const _0x28a842=_0x220c41,_0x5687dd=_0x49dbe1[_0x28a842(0x366)],_0xf4a49f=VisuMZ[_0x28a842(0x44d)][_0x28a842(0x572)];if(_0xf4a49f[_0x49dbe1['id']])return _0xf4a49f[_0x49dbe1['id']][_0x28a842(0x36e)](this,_0x49dbe1);else{if('rrvKj'==='rrvKj')return!![];else this[_0x28a842(0x5a4)]();}},Game_Actor['prototype']['initEquips']=function(_0x3fadb6){const _0x3617d0=_0x220c41;_0x3fadb6=this[_0x3617d0(0x421)](_0x3fadb6);const _0x1fb074=this[_0x3617d0(0x544)]();this['_equips']=[];for(let _0x36d292=0x0;_0x36d292<_0x1fb074[_0x3617d0(0x5ff)];_0x36d292++){this[_0x3617d0(0x4bf)][_0x36d292]=new Game_Item();}for(let _0x1732f8=0x0;_0x1732f8<_0x1fb074['length'];_0x1732f8++){const _0x3120cc=_0x1fb074[_0x1732f8],_0x111711=this[_0x3617d0(0x58d)](_0x3fadb6,_0x3120cc);if(this['canEquip'](_0x111711))this[_0x3617d0(0x4bf)][_0x1732f8][_0x3617d0(0x37f)](_0x111711);}this['releaseUnequippableItems'](!![]),this[_0x3617d0(0x387)]();},Game_Actor['prototype'][_0x220c41(0x421)]=function(_0x18ae1f){const _0x568f80=_0x220c41,_0x501826=[];for(let _0x42eba8=0x0;_0x42eba8<_0x18ae1f['length'];_0x42eba8++){if(_0x568f80(0x631)!=='cUdFB')_0x1342f5['push'](_0x213974[_0x4934d8]);else{const _0x13f01e=_0x18ae1f[_0x42eba8];if(_0x13f01e<=0x0)continue;const _0x5dbcc7=$dataSystem[_0x568f80(0x5af)][_0x42eba8+0x1];if(_0x5dbcc7===$dataSystem[_0x568f80(0x5af)][0x1]||_0x42eba8===0x1&&this[_0x568f80(0x60a)]())_0x501826['push']($dataWeapons[_0x13f01e]);else{if(BattleManager[_0x568f80(0x611)]()){const _0x3a3cdd=$dataArmors[_0x13f01e];_0x3a3cdd&&_0x3a3cdd['etypeId']===_0x42eba8+0x1&&('pdbgL'===_0x568f80(0x2c5)?_0x501826[_0x568f80(0x349)](_0x3a3cdd):this[_0x568f80(0x1af)](_0x436d36[_0x568f80(0x45c)](_0x568f80(0x28c))));}else{if(_0x568f80(0x2eb)===_0x568f80(0x2eb)){const _0x8dcad8=$dataArmors[_0x13f01e];_0x8dcad8&&_0x8dcad8[_0x568f80(0x61c)]===_0x42eba8+0x1&&(_0x568f80(0x260)!=='fsdLF'?this[_0x568f80(0x4dd)]():_0x501826[_0x568f80(0x349)](_0x8dcad8));}else this[_0x568f80(0x273)]=_0x7335bf,this[_0x568f80(0x387)](),this[_0x568f80(0x5da)]();}}}}return _0x501826;},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x58d)]=function(_0x47aaab,_0x144a87){const _0x2b90f9=_0x220c41;for(const _0x402832 of _0x47aaab){if(!_0x402832)continue;if(_0x402832[_0x2b90f9(0x61c)]===_0x144a87){if(_0x2b90f9(0x441)===_0x2b90f9(0x3c1)){if(_0xd3b331[_0x2b90f9(0x3ef)](_0x542ee5))return;_0x31fd45[_0x2b90f9(0x44d)][_0x2b90f9(0x1ef)]['call'](this,_0x4daf51);}else return _0x47aaab['splice'](_0x47aaab[_0x2b90f9(0x4bd)](_0x402832),0x1),_0x402832;}}return null;},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x544)]=function(){const _0x155472=_0x220c41,_0x39b364=JsonEx[_0x155472(0x2cf)](this[_0x155472(0x273)]||this[_0x155472(0x2c8)]()['equipSlots']);if(_0x39b364['length']>=0x2&&this[_0x155472(0x60a)]())_0x39b364[0x1]=0x1;return _0x39b364;},Game_Actor[_0x220c41(0x4a1)]['forceChangeEquipSlots']=function(_0x493086){const _0x209ca7=_0x220c41;_0x493086[_0x209ca7(0x5c8)](0x0),_0x493086[_0x209ca7(0x5c8)](-0x1),this['_forcedSlots']=_0x493086,this['refresh'](),this[_0x209ca7(0x5da)]();},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x5f0)]=function(){this['_forcedSlots']=undefined,this['refresh'](),this['updateChangedSlots']();},Game_Actor['prototype'][_0x220c41(0x5da)]=function(){const _0x487d13=_0x220c41;let _0x51e459=this[_0x487d13(0x544)]()[_0x487d13(0x5ff)];while(this[_0x487d13(0x4bf)][_0x487d13(0x5ff)]>_0x51e459){if(_0x487d13(0x538)===_0x487d13(0x538)){const _0x21aeb6=this[_0x487d13(0x4bf)][this[_0x487d13(0x4bf)]['length']-0x1];_0x21aeb6&&_0x21aeb6[_0x487d13(0x391)]()&&(_0x487d13(0x30f)===_0x487d13(0x30f)?$gameParty[_0x487d13(0x40f)](_0x21aeb6[_0x487d13(0x391)](),0x1):this[_0x487d13(0x1af)](_0xb3bac7[_0x487d13(0x45c)](_0x487d13(0x2e3)))),this[_0x487d13(0x4bf)]['pop']();}else{if(!this[_0x487d13(0x1ee)](_0x205340))return![];const _0x3b4eb3=_0xab70ec[_0x487d13(0x366)];if(!_0x3b4eb3)return![];if(_0x3b4eb3[_0x487d13(0x17d)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3b4eb3['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];}}while(_0x51e459>this[_0x487d13(0x4bf)]['length']){if(_0x487d13(0x4db)===_0x487d13(0x4db))this[_0x487d13(0x4bf)][_0x487d13(0x349)](new Game_Item());else{if(!this['_tempActor']){const _0x2c1cc7=_0x13c0a7['makeDeepCopy'](this);_0x2c1cc7[_0x487d13(0x4ee)]=!![],_0x444806[_0x487d13(0x44d)][_0x487d13(0x1eb)][_0x487d13(0x36e)](this,_0x5092da,_0x1128d1),this['equipAdjustHpMp'](_0x2c1cc7);}else _0x1ecdc2['ItemsEquipsCore']['Game_Actor_changeEquip']['call'](this,_0x2bbc95,_0x1247dd);}}},Game_Actor[_0x220c41(0x4a1)]['prepareNewEquipSlotsOnLoad']=function(){const _0x535788=_0x220c41,_0x3b183d=this[_0x535788(0x544)]();for(let _0xd4b592=0x0;_0xd4b592<_0x3b183d[_0x535788(0x5ff)];_0xd4b592++){if(!this[_0x535788(0x4bf)][_0xd4b592])this[_0x535788(0x4bf)][_0xd4b592]=new Game_Item();}this['releaseUnequippableItems'](![]),this['refresh']();},VisuMZ['ItemsEquipsCore'][_0x220c41(0x1eb)]=Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x30e)],Game_Actor['prototype'][_0x220c41(0x30e)]=function(_0x21984,_0x4af5fe){const _0x15c807=_0x220c41;if(!this[_0x15c807(0x4ee)]){if(_0x15c807(0x503)===_0x15c807(0x401))return _0x180e27['ItemsEquipsCore'][_0x15c807(0x22a)]['StatusWindow'][_0x15c807(0x515)];else{const _0x2cb8d7=JsonEx[_0x15c807(0x2cf)](this);_0x2cb8d7[_0x15c807(0x4ee)]=!![],VisuMZ[_0x15c807(0x44d)][_0x15c807(0x1eb)][_0x15c807(0x36e)](this,_0x21984,_0x4af5fe),this['equipAdjustHpMp'](_0x2cb8d7);}}else{if(_0x15c807(0x2bd)!==_0x15c807(0x33a))VisuMZ['ItemsEquipsCore'][_0x15c807(0x1eb)][_0x15c807(0x36e)](this,_0x21984,_0x4af5fe);else{const _0x63048a=_0x517b25[_0x15c807(0x2cf)](this[_0x15c807(0x60b)]);_0x63048a[_0x15c807(0x4ee)]=!![],_0x63048a[_0x15c807(0x5b8)](this['_slotId'],this['item']()),this[_0x15c807(0x55d)][_0x15c807(0x1fc)](_0x63048a);}}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x302)]=Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x5b8)],Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x5b8)]=function(_0xd64254,_0x348d13){const _0x122618=_0x220c41;if(!this[_0x122618(0x4ee)]){const _0x58a12f=JsonEx[_0x122618(0x2cf)](this);_0x58a12f[_0x122618(0x4ee)]=!![],VisuMZ[_0x122618(0x44d)][_0x122618(0x302)]['call'](this,_0xd64254,_0x348d13),this[_0x122618(0x3fe)](_0x58a12f);}else{if(_0x122618(0x3cc)!==_0x122618(0x2a9))VisuMZ[_0x122618(0x44d)][_0x122618(0x302)][_0x122618(0x36e)](this,_0xd64254,_0x348d13);else{if(_0x523fd7['id']===_0x8a7258['id'])_0x162b1f+=0x1;}}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x4de)]=Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x5b7)],Game_Actor['prototype'][_0x220c41(0x5b7)]=function(_0x1bd6cc){const _0x5d545f=_0x220c41;if(!this[_0x5d545f(0x4ee)]){const _0x24de0f=JsonEx[_0x5d545f(0x2cf)](this);_0x24de0f[_0x5d545f(0x4ee)]=!![],VisuMZ['ItemsEquipsCore'][_0x5d545f(0x4de)][_0x5d545f(0x36e)](this,_0x1bd6cc),this['equipAdjustHpMp'](_0x24de0f);}else{if('qHHgN'!=='qHHgN')return'#%1'[_0x5d545f(0x22d)](_0x37c306(_0x93ffdd['$1']));else VisuMZ[_0x5d545f(0x44d)][_0x5d545f(0x4de)][_0x5d545f(0x36e)](this,_0x1bd6cc);}},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x545)]=function(_0x16d2dc){const _0x118eba=_0x220c41;if(this[_0x118eba(0x23a)])return;for(;;){const _0x59e75d=this['equipSlots'](),_0x1bbf1b=this[_0x118eba(0x440)](),_0x1ac79f=_0x1bbf1b[_0x118eba(0x5ff)];let _0x52d89e=![];for(let _0x2244de=0x0;_0x2244de<_0x1ac79f;_0x2244de++){const _0x3422f8=_0x1bbf1b[_0x2244de];if(_0x3422f8&&(!this[_0x118eba(0x5e7)](_0x3422f8)||_0x3422f8[_0x118eba(0x61c)]!==_0x59e75d[_0x2244de])){!_0x16d2dc&&this[_0x118eba(0x626)](null,_0x3422f8);if(!this[_0x118eba(0x4ee)]){const _0x2e83f0=JsonEx[_0x118eba(0x2cf)](this);_0x2e83f0[_0x118eba(0x4ee)]=!![],this[_0x118eba(0x4bf)][_0x2244de]['setObject'](null),this[_0x118eba(0x23a)]=!![],this[_0x118eba(0x3fe)](_0x2e83f0),this[_0x118eba(0x23a)]=undefined;}else this['_equips'][_0x2244de][_0x118eba(0x37f)](null);_0x52d89e=!![];}}if(!_0x52d89e)break;}},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x3fe)]=function(_0x10c154){const _0x43eaa9=_0x220c41;if(this[_0x43eaa9(0x4ee)])return;if(!VisuMZ[_0x43eaa9(0x44d)][_0x43eaa9(0x22a)][_0x43eaa9(0x278)][_0x43eaa9(0x229)])return;const _0x225122=Math[_0x43eaa9(0x4d4)](_0x10c154[_0x43eaa9(0x624)]()*this[_0x43eaa9(0x1df)]),_0x1c86dd=Math['round'](_0x10c154[_0x43eaa9(0x492)]()*this[_0x43eaa9(0x20c)]);if(this['hp']>0x0)this[_0x43eaa9(0x32d)](_0x225122);if(this['mp']>0x0)this[_0x43eaa9(0x24c)](_0x1c86dd);},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x3a2)]=function(){const _0x273b70=_0x220c41,_0x4a6742=this[_0x273b70(0x544)]()['length'];for(let _0x55b989=0x0;_0x55b989<_0x4a6742;_0x55b989++){if(this[_0x273b70(0x2d7)](_0x55b989))this[_0x273b70(0x30e)](_0x55b989,null);}},Game_Actor['prototype'][_0x220c41(0x2d7)]=function(_0xe152ec){const _0x42bb60=_0x220c41;return this[_0x42bb60(0x5ae)]()[_0x42bb60(0x427)](this[_0x42bb60(0x544)]()[_0xe152ec])?![]:this[_0x42bb60(0x42a)](_0xe152ec);},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x5ae)]=function(){const _0x384749=_0x220c41;return VisuMZ[_0x384749(0x44d)][_0x384749(0x22a)]['EquipScene']['NonRemoveETypes'];},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x4da)]=function(){const _0x1b8c5e=_0x220c41,_0x2c8f29=this[_0x1b8c5e(0x544)]()['length'];for(let _0x24144b=0x0;_0x24144b<_0x2c8f29;_0x24144b++){if('uHGIX'==='uHGIX'){if(this[_0x1b8c5e(0x201)](_0x24144b))this[_0x1b8c5e(0x30e)](_0x24144b,null);}else{const _0x3e6f87=_0xc1d674['ItemsEquipsCore']['Settings'][_0x1b8c5e(0x315)][_0x1b8c5e(0x26d)];return _0x3e6f87[_0x1b8c5e(0x22d)](_0x396cfc['mp']);}}for(let _0x2ac9f9=0x0;_0x2ac9f9<_0x2c8f29;_0x2ac9f9++){if(this[_0x1b8c5e(0x201)](_0x2ac9f9))this[_0x1b8c5e(0x30e)](_0x2ac9f9,this['bestEquipItem'](_0x2ac9f9));}},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x201)]=function(_0x2b814a){const _0x186b25=_0x220c41;if(this[_0x186b25(0x44b)]()['includes'](this[_0x186b25(0x544)]()[_0x2b814a]))return![];else{if(_0x186b25(0x1fd)!==_0x186b25(0x1fd))this[_0x186b25(0x605)]();else return this[_0x186b25(0x42a)](_0x2b814a);}},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x44b)]=function(){const _0x4d44c3=_0x220c41;return VisuMZ[_0x4d44c3(0x44d)][_0x4d44c3(0x22a)][_0x4d44c3(0x278)][_0x4d44c3(0x35f)];},VisuMZ['ItemsEquipsCore']['Game_Actor_tradeItemWithParty']=Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x626)],Game_Actor['prototype']['tradeItemWithParty']=function(_0x1be553,_0x224e2c){const _0x1a4d34=_0x220c41;if(this[_0x1a4d34(0x4ee)])return![];$gameTemp[_0x1a4d34(0x5f3)]=!![];const _0x30ef1d=VisuMZ[_0x1a4d34(0x44d)]['Game_Actor_tradeItemWithParty'][_0x1a4d34(0x36e)](this,_0x1be553,_0x224e2c);return $gameTemp[_0x1a4d34(0x5f3)]=![],_0x30ef1d;},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x26f)]=function(_0x31e7ca,_0x4f95c8){const _0x5a4787=_0x220c41,_0x3cd28b=this['getNextAvailableEtypeId'](_0x31e7ca);if(_0x3cd28b<0x0)return;const _0x88cbd1=_0x31e7ca===0x1?$dataWeapons[_0x4f95c8]:$dataArmors[_0x4f95c8];this[_0x5a4787(0x30e)](_0x3cd28b,_0x88cbd1);},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x263)]=function(_0x581bca){const _0x3d0b12=_0x220c41;let _0x151c19=0x0;const _0x334bfe=this[_0x3d0b12(0x544)](),_0x3e9347=this[_0x3d0b12(0x440)]();for(let _0x24fbc4=0x0;_0x24fbc4<_0x334bfe[_0x3d0b12(0x5ff)];_0x24fbc4++){if(_0x334bfe[_0x24fbc4]===_0x581bca){if(_0x3d0b12(0x64d)===_0x3d0b12(0x64d)){_0x151c19=_0x24fbc4;if(!_0x3e9347[_0x24fbc4])return _0x151c19;}else this[_0x3d0b12(0x592)](_0x1a032a,_0x56a1f7['x'],_0x48f20c['y']+0x2);}}return _0x151c19;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x404)]=Game_Actor['prototype'][_0x220c41(0x1a2)],Game_Actor['prototype'][_0x220c41(0x1a2)]=function(_0x14c42b){const _0x271c4e=_0x220c41;let _0x7b7b93=VisuMZ['ItemsEquipsCore'][_0x271c4e(0x404)][_0x271c4e(0x36e)](this,_0x14c42b);for(const _0x1e659a of this[_0x271c4e(0x440)]()){if(_0x1e659a)_0x7b7b93+=this[_0x271c4e(0x2a3)](_0x1e659a,_0x14c42b);}return _0x7b7b93;},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x2a3)]=function(_0x2b8d21,_0x32b043){const _0x246e0b=_0x220c41;if(this['_calculatingJSParameters'])return 0x0;const _0x33754a=(DataManager[_0x246e0b(0x340)](_0x2b8d21)?_0x246e0b(0x53a):_0x246e0b(0x1f8))[_0x246e0b(0x22d)](_0x2b8d21['id']),_0x15f8e8=_0x246e0b(0x573)[_0x246e0b(0x22d)](_0x33754a,_0x32b043);if(VisuMZ[_0x246e0b(0x44d)][_0x246e0b(0x3e4)][_0x15f8e8]){this['_calculatingJSParameters']=!![];const _0x8d481=VisuMZ[_0x246e0b(0x44d)][_0x246e0b(0x3e4)][_0x15f8e8][_0x246e0b(0x36e)](this,_0x2b8d21,_0x32b043);return this[_0x246e0b(0x337)]=![],_0x8d481;}else return'Zoudc'!=='Zoudc'?_0x5c1ba2['ItemsEquipsCore']['Settings'][_0x246e0b(0x278)][_0x246e0b(0x446)]:0x0;},Game_Actor[_0x220c41(0x4a1)]['setShopStatusWindowMode']=function(_0x47860f){const _0x5d28bd=_0x220c41;this[_0x5d28bd(0x264)]=!![],this[_0x5d28bd(0x4b0)]=_0x47860f;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x38c)]=Game_Party[_0x220c41(0x4a1)][_0x220c41(0x600)],Game_Party[_0x220c41(0x4a1)]['initialize']=function(){const _0x53f581=_0x220c41;VisuMZ['ItemsEquipsCore']['Game_Party_initialize'][_0x53f581(0x36e)](this),this['initNewItemsList']();},Game_Party['prototype'][_0x220c41(0x4f2)]=function(){this['_newItemsList']=[];},Game_Party[_0x220c41(0x4a1)]['isNewItem']=function(_0x4b1aa6){const _0x10cec2=_0x220c41;if(!$gameTemp[_0x10cec2(0x18e)]())return![];if(this[_0x10cec2(0x5ab)]===undefined)this['initNewItemsList']();let _0x29d0e7='';if(DataManager[_0x10cec2(0x498)](_0x4b1aa6)){if(_0x10cec2(0x62a)===_0x10cec2(0x3c7))return _0x5b431d[_0x10cec2(0x44d)][_0x10cec2(0x22a)][_0x10cec2(0x278)][_0x10cec2(0x1e0)];else _0x29d0e7=_0x10cec2(0x31f)[_0x10cec2(0x22d)](_0x4b1aa6['id']);}else{if(DataManager[_0x10cec2(0x340)](_0x4b1aa6))_0x29d0e7=_0x10cec2(0x2c9)['format'](_0x4b1aa6['id']);else{if(DataManager[_0x10cec2(0x5e6)](_0x4b1aa6))_0x29d0e7='armor-%1'[_0x10cec2(0x22d)](_0x4b1aa6['id']);else{if(_0x10cec2(0x451)===_0x10cec2(0x451))return;else _0x51ea7f+=_0x468436(_0xb320ff['$1']),_0x34c539+=_0x521722(_0x413cee['$2']);}}}return this[_0x10cec2(0x5ab)]['includes'](_0x29d0e7);},Game_Party['prototype']['setNewItem']=function(_0x490d5c){const _0x4c502e=_0x220c41;if(!$gameTemp[_0x4c502e(0x18e)]())return;if(this[_0x4c502e(0x5ab)]===undefined)this[_0x4c502e(0x4f2)]();let _0x4a6eb8='';if(DataManager[_0x4c502e(0x498)](_0x490d5c))_0x4a6eb8='item-%1'[_0x4c502e(0x22d)](_0x490d5c['id']);else{if(DataManager[_0x4c502e(0x340)](_0x490d5c)){if(_0x4c502e(0x2ef)===_0x4c502e(0x2ef))_0x4a6eb8=_0x4c502e(0x2c9)[_0x4c502e(0x22d)](_0x490d5c['id']);else return _0x3b527d[_0x4c502e(0x44d)][_0x4c502e(0x22a)][_0x4c502e(0x315)][_0x4c502e(0x339)];}else{if(DataManager[_0x4c502e(0x5e6)](_0x490d5c))_0x4c502e(0x4e9)===_0x4c502e(0x4e9)?_0x4a6eb8=_0x4c502e(0x435)['format'](_0x490d5c['id']):_0x4ab4ba[_0x4c502e(0x44d)][_0x4c502e(0x302)]['call'](this,_0x122454,_0x11e025);else{if('QwLiT'===_0x4c502e(0x4ea))this[_0x4c502e(0x328)][_0x4c502e(0x353)](0x0),this[_0x4c502e(0x328)]['activate']();else return;}}}if(!this[_0x4c502e(0x5ab)]['includes'](_0x4a6eb8))this[_0x4c502e(0x5ab)]['push'](_0x4a6eb8);},Game_Party[_0x220c41(0x4a1)][_0x220c41(0x338)]=function(_0x39832f){const _0x18afd2=_0x220c41;if(!$gameTemp[_0x18afd2(0x18e)]())return;if(this[_0x18afd2(0x5ab)]===undefined)this[_0x18afd2(0x4f2)]();let _0x41f627='';if(DataManager[_0x18afd2(0x498)](_0x39832f))_0x41f627=_0x18afd2(0x31f)[_0x18afd2(0x22d)](_0x39832f['id']);else{if(DataManager[_0x18afd2(0x340)](_0x39832f))_0x41f627='weapon-%1'['format'](_0x39832f['id']);else{if(DataManager[_0x18afd2(0x5e6)](_0x39832f))_0x41f627='armor-%1'[_0x18afd2(0x22d)](_0x39832f['id']);else return;}}if(this[_0x18afd2(0x5ab)][_0x18afd2(0x427)](_0x41f627)){if('nFJdQ'!==_0x18afd2(0x2dc))return _0x686345[_0x18afd2(0x44d)][_0x18afd2(0x22a)]['EquipScene'][_0x18afd2(0x577)];else this[_0x18afd2(0x5ab)]['splice'](this[_0x18afd2(0x5ab)][_0x18afd2(0x4bd)](_0x41f627),0x1);}},VisuMZ['ItemsEquipsCore']['Game_Party_numItems']=Game_Party[_0x220c41(0x4a1)][_0x220c41(0x280)],Game_Party[_0x220c41(0x4a1)]['numItems']=function(_0x1d430c){const _0xc4ae6f=_0x220c41;if(DataManager[_0xc4ae6f(0x3ef)](_0x1d430c))_0x1d430c=DataManager[_0xc4ae6f(0x444)](_0x1d430c);return VisuMZ[_0xc4ae6f(0x44d)]['Game_Party_numItems']['call'](this,_0x1d430c);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x549)]=Game_Party[_0x220c41(0x4a1)][_0x220c41(0x40f)],Game_Party[_0x220c41(0x4a1)][_0x220c41(0x40f)]=function(_0x223bf6,_0x2209f6,_0x464398){const _0x53418e=_0x220c41;if(DataManager[_0x53418e(0x3ef)](_0x223bf6))_0x223bf6=null;const _0x414022=this[_0x53418e(0x280)](_0x223bf6);VisuMZ[_0x53418e(0x44d)][_0x53418e(0x549)]['call'](this,_0x223bf6,_0x2209f6,_0x464398);if(this[_0x53418e(0x280)](_0x223bf6)>_0x414022)this['setNewItem'](_0x223bf6);},Game_Party['prototype']['maxItems']=function(_0xe6090){const _0x45420c=_0x220c41;if(DataManager[_0x45420c(0x3ef)](_0xe6090))_0xe6090=DataManager[_0x45420c(0x444)](_0xe6090);return DataManager['maxItemAmount'](_0xe6090);},VisuMZ[_0x220c41(0x44d)]['Scene_ItemBase_activateItemWindow']=Scene_ItemBase[_0x220c41(0x4a1)][_0x220c41(0x344)],Scene_ItemBase[_0x220c41(0x4a1)]['activateItemWindow']=function(){const _0x599f9d=_0x220c41;VisuMZ['ItemsEquipsCore'][_0x599f9d(0x462)][_0x599f9d(0x36e)](this),this[_0x599f9d(0x258)][_0x599f9d(0x4eb)]();},Scene_Item['prototype']['isBottomHelpMode']=function(){const _0x46b3a3=_0x220c41;if(ConfigManager[_0x46b3a3(0x445)]&&ConfigManager[_0x46b3a3(0x266)]!==undefined)return ConfigManager[_0x46b3a3(0x266)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x46b3a3(0x39a)]()['match'](/LOWER/i);else _0x46b3a3(0x32c)!==_0x46b3a3(0x5fa)?Scene_ItemBase['prototype'][_0x46b3a3(0x359)][_0x46b3a3(0x36e)](this):this[_0x46b3a3(0x1e1)]();}},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x359)]=function(){const _0x305b93=_0x220c41;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x305b93(0x281)]!==undefined)return ConfigManager[_0x305b93(0x281)];else{if(this[_0x305b93(0x559)]())return this[_0x305b93(0x39a)]()[_0x305b93(0x17d)](/RIGHT/i);else{if(_0x305b93(0x275)===_0x305b93(0x509)){if(_0x31ca6e[_0x305b93(0x445)]&&_0x27ca18[_0x305b93(0x281)]!==_0x594e79)return _0x4f00ab[_0x305b93(0x281)];else{if(this[_0x305b93(0x559)]())return this['updatedLayoutStyle']()[_0x305b93(0x17d)](/RIGHT/i);else _0x186af6['prototype']['isRightInputMode'][_0x305b93(0x36e)](this);}}else Scene_ItemBase[_0x305b93(0x4a1)][_0x305b93(0x359)][_0x305b93(0x36e)](this);}}},Scene_Item['prototype'][_0x220c41(0x39a)]=function(){const _0x1ba9cf=_0x220c41;return VisuMZ[_0x1ba9cf(0x44d)][_0x1ba9cf(0x22a)][_0x1ba9cf(0x58c)][_0x1ba9cf(0x57f)];},Scene_Item[_0x220c41(0x4a1)]['isUseModernControls']=function(){const _0x232639=_0x220c41;return this[_0x232639(0x5fb)]&&this[_0x232639(0x5fb)]['isUseModernControls']();},Scene_Item[_0x220c41(0x4a1)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x1e3cce=_0x220c41;return VisuMZ[_0x1e3cce(0x44d)][_0x1e3cce(0x22a)]['ItemScene'][_0x1e3cce(0x374)];},VisuMZ['ItemsEquipsCore'][_0x220c41(0x3d1)]=Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x29d)],Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x29d)]=function(){const _0x1ac90f=_0x220c41;VisuMZ['ItemsEquipsCore'][_0x1ac90f(0x3d1)][_0x1ac90f(0x36e)](this),this[_0x1ac90f(0x23c)]()&&this['onCategoryOk']();},VisuMZ[_0x220c41(0x44d)]['Scene_Item_helpWindowRect']=Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x3bc)],Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x3bc)]=function(){const _0x15ba0f=_0x220c41;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x15ba0f(0x403)!=='xoyFX')return this[_0x15ba0f(0x517)]();else return;}else return VisuMZ[_0x15ba0f(0x44d)]['Scene_Item_helpWindowRect']['call'](this);},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x517)]=function(){const _0x4b5d9b=_0x220c41,_0x1fe7d8=0x0,_0x5beab6=this['helpAreaTop'](),_0x5db269=Graphics[_0x4b5d9b(0x3b8)],_0x5b2e1e=this[_0x4b5d9b(0x51b)]();return new Rectangle(_0x1fe7d8,_0x5beab6,_0x5db269,_0x5b2e1e);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x603)]=Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x40a)],Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x40a)]=function(){const _0x5ccf50=_0x220c41;VisuMZ[_0x5ccf50(0x44d)][_0x5ccf50(0x603)][_0x5ccf50(0x36e)](this);if(this[_0x5ccf50(0x23c)]()){if(_0x5ccf50(0x413)!==_0x5ccf50(0x413)){_0x1f367f[_0x5ccf50(0x47c)]=!![],this['_item']=this[_0x5ccf50(0x312)][_0x5ccf50(0x4c4)]();const _0x43a8e7=_0x32fffe[_0x5ccf50(0x44d)][_0x5ccf50(0x3c8)]['call'](this);return _0x2a97a2[_0x5ccf50(0x47c)]=![],this['_item']=this['_buyWindow'][_0x5ccf50(0x4c4)](),_0x43a8e7;}else this[_0x5ccf50(0x4d6)]();}},Scene_Item[_0x220c41(0x4a1)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x47982e=_0x220c41;delete this[_0x47982e(0x5fb)][_0x47982e(0x276)]['ok'],delete this[_0x47982e(0x5fb)][_0x47982e(0x276)][_0x47982e(0x1bc)];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x49f)]=Scene_Item[_0x220c41(0x4a1)]['categoryWindowRect'],Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x5b2)]=function(){const _0x546f23=_0x220c41;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x546f23(0x1de)]():VisuMZ['ItemsEquipsCore'][_0x546f23(0x49f)][_0x546f23(0x36e)](this);},Scene_Item['prototype'][_0x220c41(0x1de)]=function(){const _0x46b6dc=_0x220c41,_0xb3cbe3=0x0,_0x5a050d=this[_0x46b6dc(0x2ce)](),_0x45c0fe=Graphics[_0x46b6dc(0x3b8)],_0x48013b=this[_0x46b6dc(0x238)](0x1,!![]);return new Rectangle(_0xb3cbe3,_0x5a050d,_0x45c0fe,_0x48013b);},VisuMZ[_0x220c41(0x44d)]['Scene_Item_createItemWindow']=Scene_Item['prototype'][_0x220c41(0x345)],Scene_Item['prototype'][_0x220c41(0x345)]=function(){const _0x42aa74=_0x220c41;VisuMZ['ItemsEquipsCore']['Scene_Item_createItemWindow']['call'](this);if(this[_0x42aa74(0x23c)]()){if('jcSeZ'!=='jcSeZ'){const _0x356e5d=this[_0x42aa74(0x582)](_0x19dd51),_0xcb9dda=this['textSizeEx'](_0x1c8aa0)[_0x42aa74(0x2c3)];return _0xcb9dda<=_0x356e5d[_0x42aa74(0x2c3)]?_0x42aa74(0x46d):_0x42aa74(0x49d);}else this[_0x42aa74(0x350)]();}this[_0x42aa74(0x40b)]()&&this[_0x42aa74(0x438)]();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x4be)]=Scene_Item['prototype'][_0x220c41(0x1b9)],Scene_Item[_0x220c41(0x4a1)]['itemWindowRect']=function(){const _0x47d89d=_0x220c41;if(this[_0x47d89d(0x559)]())return this[_0x47d89d(0x46a)]();else{if(_0x47d89d(0x252)!==_0x47d89d(0x60e)){const _0x2efed6=VisuMZ[_0x47d89d(0x44d)][_0x47d89d(0x4be)][_0x47d89d(0x36e)](this);if(this[_0x47d89d(0x40b)]()&&this[_0x47d89d(0x521)]()){if(_0x47d89d(0x38e)!==_0x47d89d(0x38e))return this[_0x47d89d(0x42a)](_0x28e5d5);else _0x2efed6[_0x47d89d(0x2c3)]-=this[_0x47d89d(0x430)]();}return _0x2efed6;}else return _0x239a79===null&&this[_0x47d89d(0x5ae)]()[_0x47d89d(0x427)](this['etypeId']())?![]:_0xed3aec['ItemsEquipsCore'][_0x47d89d(0x3dd)][_0x47d89d(0x36e)](this,_0x5b8a38);}},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x46a)]=function(){const _0x57843c=_0x220c41,_0x51e31b=this[_0x57843c(0x359)]()?this['statusWidth']():0x0,_0x32d34=this[_0x57843c(0x5fb)]['y']+this[_0x57843c(0x5fb)][_0x57843c(0x4d7)],_0x205b00=Graphics[_0x57843c(0x3b8)]-this[_0x57843c(0x430)](),_0x2b454b=this[_0x57843c(0x5a6)]()-_0x32d34;return new Rectangle(_0x51e31b,_0x32d34,_0x205b00,_0x2b454b);},Scene_Item['prototype'][_0x220c41(0x350)]=function(){const _0x3d557c=_0x220c41;this['_itemWindow'][_0x3d557c(0x1c1)]('cancel',this[_0x3d557c(0x18a)][_0x3d557c(0x3ed)](this));},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x40b)]=function(){const _0x3fb331=_0x220c41;if(this[_0x3fb331(0x559)]()){if(_0x3fb331(0x5e4)!=='wUSfN')_0x559777=_0x3fb331(0x2c9)[_0x3fb331(0x22d)](_0x22a840['id']);else return!![];}else{if(_0x3fb331(0x42b)===_0x3fb331(0x42b))return VisuMZ[_0x3fb331(0x44d)]['Settings']['ItemScene']['ShowShopStatus'];else{const _0x5e711e=_0x559af6['concat'](_0x20fbc1[_0x3fb331(0x361)]());return _0x5e711e;}}},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x521)]=function(){const _0x526b63=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x526b63(0x22a)][_0x526b63(0x58c)][_0x526b63(0x4f1)];},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x438)]=function(){const _0x1a21e1=_0x220c41,_0x123628=this[_0x1a21e1(0x5f9)]();this['_statusWindow']=new Window_ShopStatus(_0x123628),this[_0x1a21e1(0x520)](this[_0x1a21e1(0x55d)]),this[_0x1a21e1(0x258)][_0x1a21e1(0x334)](this['_statusWindow']);const _0x134dd6=VisuMZ[_0x1a21e1(0x44d)][_0x1a21e1(0x22a)][_0x1a21e1(0x58c)]['ItemMenuStatusBgType'];this[_0x1a21e1(0x55d)][_0x1a21e1(0x627)](_0x134dd6||0x0);},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x5f9)]=function(){const _0x43a3ab=_0x220c41;return this['isUseItemsEquipsCoreUpdatedLayout']()?_0x43a3ab(0x1da)==='wlvcY'?this[_0x43a3ab(0x5f8)]():_0x307e4c[_0x43a3ab(0x44d)][_0x43a3ab(0x22a)][_0x43a3ab(0x315)]['Width']:VisuMZ[_0x43a3ab(0x44d)][_0x43a3ab(0x22a)]['ItemScene'][_0x43a3ab(0x475)][_0x43a3ab(0x36e)](this);},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x5f8)]=function(){const _0x26eee3=_0x220c41,_0x457aa1=this[_0x26eee3(0x430)](),_0xfeb2a3=this[_0x26eee3(0x258)]['height'],_0x1858a8=this['isRightInputMode']()?0x0:Graphics[_0x26eee3(0x3b8)]-this[_0x26eee3(0x430)](),_0x544a0b=this[_0x26eee3(0x258)]['y'];return new Rectangle(_0x1858a8,_0x544a0b,_0x457aa1,_0xfeb2a3);},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x430)]=function(){const _0x5bf9e2=_0x220c41;return Scene_Shop[_0x5bf9e2(0x4a1)]['statusWidth']();},Scene_Item[_0x220c41(0x4a1)][_0x220c41(0x5d6)]=function(){const _0xcf249c=_0x220c41;if(!this[_0xcf249c(0x39a)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0xcf249c(0x258)])return![];if(!this[_0xcf249c(0x258)][_0xcf249c(0x5c7)])return![];return this[_0xcf249c(0x39a)]()&&this[_0xcf249c(0x23c)]();},Scene_Item[_0x220c41(0x4a1)]['buttonAssistKey1']=function(){const _0x5d9788=_0x220c41;if(this[_0x5d9788(0x5d6)]())return _0x5d9788(0x45d)===_0x5d9788(0x45d)?this[_0x5d9788(0x258)][_0x5d9788(0x4f5)]()===0x1?TextManager[_0x5d9788(0x4f8)](_0x5d9788(0x5a9),'right'):TextManager[_0x5d9788(0x4f8)](_0x5d9788(0x5e5),_0x5d9788(0x2e3)):_0x5a8afc[_0x5d9788(0x44d)]['Settings']['EquipScene'][_0x5d9788(0x446)];return Scene_ItemBase[_0x5d9788(0x4a1)]['buttonAssistKey1']['call'](this);},Scene_Item[_0x220c41(0x4a1)]['buttonAssistText1']=function(){const _0x3db04c=_0x220c41;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x3db04c(0x44d)][_0x3db04c(0x22a)][_0x3db04c(0x58c)]['buttonAssistCategory'];return Scene_ItemBase['prototype']['buttonAssistText1'][_0x3db04c(0x36e)](this);},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x370)]=function(){const _0x50fb56=_0x220c41;if(ConfigManager[_0x50fb56(0x445)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x50fb56(0x559)]())return this[_0x50fb56(0x39a)]()[_0x50fb56(0x17d)](/LOWER/i);else{if('GFQvN'===_0x50fb56(0x3ab))return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:_0x3716d6['ItemsEquipsCore'][_0x50fb56(0x22a)][_0x50fb56(0x58c)][_0x50fb56(0x33e)];else Scene_MenuBase[_0x50fb56(0x4a1)][_0x50fb56(0x359)]['call'](this);}}},Scene_Equip[_0x220c41(0x4a1)]['isRightInputMode']=function(){const _0x645f92=_0x220c41;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x645f92(0x281)]!==undefined)return ConfigManager[_0x645f92(0x281)];else{if(this[_0x645f92(0x559)]())return this[_0x645f92(0x39a)]()['match'](/RIGHT/i);else{if(_0x645f92(0x2f9)!==_0x645f92(0x375))Scene_MenuBase[_0x645f92(0x4a1)]['isRightInputMode'][_0x645f92(0x36e)](this);else return this[_0x645f92(0x559)]()?this['statusWindowRectItemsEquipsCore']():_0x21d2dc['ItemsEquipsCore']['Settings']['ItemScene']['ItemMenuStatusRect'][_0x645f92(0x36e)](this);}}},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x39a)]=function(){const _0x55f0a3=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x55f0a3(0x22a)][_0x55f0a3(0x278)][_0x55f0a3(0x57f)];},Scene_Equip[_0x220c41(0x4a1)]['isUseModernControls']=function(){const _0x2500bf=_0x220c41;return this[_0x2500bf(0x4a8)]&&this[_0x2500bf(0x4a8)][_0x2500bf(0x23c)]();},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x559)]=function(){const _0x1f8581=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x1f8581(0x22a)][_0x1f8581(0x278)]['EnableLayout'];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x3eb)]=Scene_Equip['prototype'][_0x220c41(0x29d)],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x29d)]=function(){const _0x149267=_0x220c41;VisuMZ[_0x149267(0x44d)][_0x149267(0x3eb)][_0x149267(0x36e)](this),this[_0x149267(0x23c)]()&&(_0x149267(0x3be)!==_0x149267(0x41f)?this[_0x149267(0x590)]():(_0x5a22c6[_0x149267(0x44d)]['Scene_Equip_onSlotCancel'][_0x149267(0x36e)](this),this['isUseModernControls']()&&(this[_0x149267(0x4a8)]['smoothSelect'](0x0),this[_0x149267(0x328)][_0x149267(0x493)]())));},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x3fb)]=Scene_Equip[_0x220c41(0x4a1)]['helpWindowRect'],Scene_Equip['prototype'][_0x220c41(0x3bc)]=function(){const _0x5c1051=_0x220c41;if(this[_0x5c1051(0x559)]()){if('FOnWT'===_0x5c1051(0x528))_0x9881d0[_0x5c1051(0x4a1)][_0x5c1051(0x600)][_0x5c1051(0x36e)](this),this[_0x5c1051(0x495)]();else return this[_0x5c1051(0x517)]();}else{if(_0x5c1051(0x4bb)!=='XNqrt')return VisuMZ[_0x5c1051(0x44d)][_0x5c1051(0x3fb)]['call'](this);else{const _0xe80d40='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x5c1051(0x22d)](_0x4a3caa);_0x1d966b[_0x5c1051(0x44d)][_0x5c1051(0x428)][_0x5c1051(0x41d)][_0x5c1051(0x349)](new _0x4bac0a(_0xe80d40,'i'));const _0x5e435f=_0x5c1051(0x2c4)['format'](_0x2f753e);_0x25c10a['ItemsEquipsCore']['RegExp'][_0x5c1051(0x58f)][_0x5c1051(0x349)](new _0x2c760f(_0x5e435f,'g'));}}},Scene_Equip['prototype'][_0x220c41(0x517)]=function(){const _0x5a060b=_0x220c41,_0x240e78=0x0,_0x4ebae=this[_0x5a060b(0x2db)](),_0x2bf833=Graphics[_0x5a060b(0x3b8)],_0x4d26e2=this[_0x5a060b(0x51b)]();return new Rectangle(_0x240e78,_0x4ebae,_0x2bf833,_0x4d26e2);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x33b)]=Scene_Equip['prototype'][_0x220c41(0x5f9)],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x5f9)]=function(){const _0x27ec92=_0x220c41;if(this[_0x27ec92(0x559)]())return this[_0x27ec92(0x5f8)]();else{if('YQsju'===_0x27ec92(0x45e)){const _0x2337d4=this['itemPadding']();let _0x2e2c9e=0x0,_0xfddc4a=0x0,_0x2f3214='';if(this[_0x27ec92(0x4ee)]){_0x281d70[_0x27ec92(0x1d7)]?(_0x2e2c9e=this[_0x27ec92(0x60b)][_0x27ec92(0x3aa)](_0xb04f1a,![]),_0xfddc4a=this[_0x27ec92(0x4ee)]['paramValueByName'](_0x1861df,![]),_0x2f3214=this[_0x27ec92(0x4ee)]['paramValueByName'](_0x170725,!![])):(_0x2e2c9e=this[_0x27ec92(0x60b)]['param'](_0x5d510f),_0xfddc4a=this[_0x27ec92(0x4ee)]['param'](_0x4db0f2),_0x2f3214=this[_0x27ec92(0x4ee)][_0x27ec92(0x28d)](_0x3fd033));const _0x3a3709=_0x2e2c9e,_0x29e6a0=_0xfddc4a;_0x4e2cae=_0x29e6a0-_0x3a3709,this[_0x27ec92(0x1e5)](_0x259f7a[_0x27ec92(0x5f7)](_0xe2ddbd)),this[_0x27ec92(0x343)](_0x2f3214,_0x407394,_0x180b43,_0x4e6112-_0x2337d4,_0x27ec92(0x28c));}}else return VisuMZ['ItemsEquipsCore']['Scene_Equip_statusWindowRect']['call'](this);}},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x5f8)]=function(){const _0x113411=_0x220c41,_0x55566e=this['isRightInputMode']()?0x0:Graphics[_0x113411(0x3b8)]-this['statusWidth'](),_0x8deb0=this[_0x113411(0x2ce)](),_0x5dd4bb=this[_0x113411(0x430)](),_0x395eac=this[_0x113411(0x53c)]();return new Rectangle(_0x55566e,_0x8deb0,_0x5dd4bb,_0x395eac);},VisuMZ[_0x220c41(0x44d)]['Scene_Equip_createCommandWindow']=Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x2cc)],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x2cc)]=function(){const _0x566c36=_0x220c41;VisuMZ[_0x566c36(0x44d)][_0x566c36(0x4b6)][_0x566c36(0x36e)](this);if(this[_0x566c36(0x410)])this[_0x566c36(0x4a8)][_0x566c36(0x542)](this['_helpWindow']);},VisuMZ['ItemsEquipsCore']['Scene_Equip_commandWindowRect']=Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x283)],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x283)]=function(){const _0x3d1f6c=_0x220c41;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['commandWindowRectItemsEquipsCore']();else{if('IbdDb'!==_0x3d1f6c(0x2ba))return VisuMZ[_0x3d1f6c(0x44d)][_0x3d1f6c(0x235)][_0x3d1f6c(0x36e)](this);else this['postCreateItemsEquipsCore']();}},Scene_Equip['prototype']['shouldCommandWindowExist']=function(){const _0x3d63ea=_0x220c41,_0x3eb4a7=VisuMZ['ItemsEquipsCore'][_0x3d63ea(0x22a)][_0x3d63ea(0x278)];return _0x3eb4a7['CommandAddOptimize']||_0x3eb4a7[_0x3d63ea(0x5df)];},Scene_Equip[_0x220c41(0x4a1)]['commandWindowRectItemsEquipsCore']=function(){const _0x14f264=_0x220c41,_0x2b0a14=this[_0x14f264(0x420)](),_0x21ffee=this[_0x14f264(0x359)]()?this[_0x14f264(0x430)]():0x0,_0x26d506=this[_0x14f264(0x2ce)](),_0x21edda=Graphics['boxWidth']-this[_0x14f264(0x430)](),_0x332006=_0x2b0a14?this['calcWindowHeight'](0x1,!![]):0x0;return new Rectangle(_0x21ffee,_0x26d506,_0x21edda,_0x332006);},VisuMZ[_0x220c41(0x44d)]['Scene_Equip_createSlotWindow']=Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x571)],Scene_Equip['prototype'][_0x220c41(0x571)]=function(){const _0x4d7982=_0x220c41;VisuMZ[_0x4d7982(0x44d)][_0x4d7982(0x364)][_0x4d7982(0x36e)](this);if(this[_0x4d7982(0x23c)]()){if(_0x4d7982(0x5a3)===_0x4d7982(0x5a3))this[_0x4d7982(0x367)]();else{const _0x594aab=0x0,_0x346d19=this[_0x4d7982(0x2db)](),_0x3e6d5a=_0x3055bb[_0x4d7982(0x3b8)],_0x3ecb20=this[_0x4d7982(0x51b)]();return new _0x55767a(_0x594aab,_0x346d19,_0x3e6d5a,_0x3ecb20);}}},VisuMZ[_0x220c41(0x44d)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x220c41(0x4a1)]['slotWindowRect'],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x396)]=function(){const _0x4dd585=_0x220c41;return this[_0x4dd585(0x559)]()?this[_0x4dd585(0x30a)]():VisuMZ[_0x4dd585(0x44d)][_0x4dd585(0x1ca)][_0x4dd585(0x36e)](this);},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x30a)]=function(){const _0x2c3cc3=_0x220c41,_0x4d8b5f=this[_0x2c3cc3(0x283)](),_0x222c4a=this[_0x2c3cc3(0x359)]()?this[_0x2c3cc3(0x430)]():0x0,_0x4b6ad0=_0x4d8b5f['y']+_0x4d8b5f[_0x2c3cc3(0x4d7)],_0x5c4d80=Graphics['boxWidth']-this[_0x2c3cc3(0x430)](),_0x11a91b=this[_0x2c3cc3(0x53c)]()-_0x4d8b5f[_0x2c3cc3(0x4d7)];return new Rectangle(_0x222c4a,_0x4b6ad0,_0x5c4d80,_0x11a91b);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x305)]=Scene_Equip[_0x220c41(0x4a1)]['itemWindowRect'],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x1b9)]=function(){const _0x53b02c=_0x220c41;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('orytZ'===_0x53b02c(0x1a6)){if(_0x3fc4c6['uiMenuStyle']&&_0xd7c480['uiHelpPosition']!==_0x1b0ae8)return _0x455d48[_0x53b02c(0x266)];else{if(this[_0x53b02c(0x559)]())return this[_0x53b02c(0x39a)]()[_0x53b02c(0x17d)](/LOWER/i);else _0x3de468[_0x53b02c(0x4a1)][_0x53b02c(0x359)]['call'](this);}}else return this[_0x53b02c(0x396)]();}else{if(_0x53b02c(0x531)!==_0x53b02c(0x656))return VisuMZ[_0x53b02c(0x44d)]['Scene_Equip_itemWindowRect']['call'](this);else{const _0x247aaf=this[_0x53b02c(0x468)](),_0xc5230=this['hitIndex']();_0xc5230>=0x0&&_0xc5230!==this[_0x53b02c(0x468)]()&&this[_0x53b02c(0x64a)](_0xc5230),_0x6949e8&&this[_0x53b02c(0x468)]()!==_0x247aaf&&this[_0x53b02c(0x5a4)]();}}},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x430)]=function(){const _0x55c911=_0x220c41;if(this[_0x55c911(0x559)]()){if(_0x55c911(0x5ba)!==_0x55c911(0x35d))return this[_0x55c911(0x2b0)]();else{const _0x22493d='TP\x20RECOVERY';if(this[_0x55c911(0x50a)][_0x55c911(0x2f1)]<=0x0&&!this[_0x55c911(0x51f)][_0x22493d])return![];const _0x5b6950=this['getItemEffectsTpRecoveryLabel']();this['drawItemKeyData'](_0x5b6950,_0x4c0a8b,_0x139d92,_0x2ce79c,!![]);const _0x462013=this[_0x55c911(0x2e0)]();return this[_0x55c911(0x1e5)](_0x5e0e5f['powerUpColor']()),this['drawItemKeyData'](_0x462013,_0x24082b,_0x5e932c,_0xd4f115,![],_0x55c911(0x28c)),this[_0x55c911(0x3bf)](_0x580f24,_0x434942,_0x228147),this['resetFontSettings'](),!![];}}else return VisuMZ[_0x55c911(0x44d)][_0x55c911(0x22a)][_0x55c911(0x278)][_0x55c911(0x2d4)];},Scene_Equip['prototype'][_0x220c41(0x2b0)]=function(){const _0x24a776=_0x220c41;return Math['floor'](Graphics[_0x24a776(0x3b8)]/0x2);},Scene_Equip[_0x220c41(0x4a1)]['postCreateSlotWindowItemsEquipsCore']=function(){const _0x2b8805=_0x220c41;this['_slotWindow'][_0x2b8805(0x1c1)]('cancel',this[_0x2b8805(0x18a)][_0x2b8805(0x3ed)](this)),this[_0x2b8805(0x328)][_0x2b8805(0x1c1)](_0x2b8805(0x2e3),this[_0x2b8805(0x39f)][_0x2b8805(0x3ed)](this)),this['_slotWindow'][_0x2b8805(0x1c1)](_0x2b8805(0x5e5),this['previousActor'][_0x2b8805(0x3ed)](this));},VisuMZ['ItemsEquipsCore'][_0x220c41(0x3ae)]=Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x590)],Scene_Equip['prototype']['commandEquip']=function(){const _0x379a5e=_0x220c41;this[_0x379a5e(0x23c)]()&&(this[_0x379a5e(0x4a8)]['deselect'](),this[_0x379a5e(0x4a8)][_0x379a5e(0x493)]()),VisuMZ[_0x379a5e(0x44d)][_0x379a5e(0x3ae)]['call'](this);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x269)]=Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x4dc)],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x4dc)]=function(){const _0x2bd994=_0x220c41;this[_0x2bd994(0x328)][_0x2bd994(0x468)]()>=0x0?(VisuMZ[_0x2bd994(0x44d)][_0x2bd994(0x269)]['call'](this),this[_0x2bd994(0x2a1)]()):(this[_0x2bd994(0x328)][_0x2bd994(0x353)](0x0),this[_0x2bd994(0x328)]['activate']());},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x2a1)]=function(){const _0x451751=_0x220c41;this['_itemWindow'][_0x451751(0x387)]();const _0x1d6d8a=this['_slotWindow'][_0x451751(0x4c4)](),_0x3dc8ee=this[_0x451751(0x258)][_0x451751(0x4c3)][_0x451751(0x4bd)](_0x1d6d8a),_0x31eb0b=Math[_0x451751(0x27a)](this[_0x451751(0x258)][_0x451751(0x630)]()/0x2)-0x1;this[_0x451751(0x258)][_0x451751(0x353)](_0x3dc8ee>=0x0?_0x3dc8ee:0x0),this['_itemWindow']['_scrollDuration']>0x1&&(this[_0x451751(0x258)][_0x451751(0x316)]=0x1,this[_0x451751(0x258)][_0x451751(0x25f)]()),this[_0x451751(0x258)][_0x451751(0x41c)](this['_itemWindow']['index']()-_0x31eb0b);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x2e1)]=Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x553)],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x553)]=function(){const _0x1448d5=_0x220c41;VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotCancel'][_0x1448d5(0x36e)](this),this[_0x1448d5(0x23c)]()&&(this[_0x1448d5(0x4a8)][_0x1448d5(0x353)](0x0),this[_0x1448d5(0x328)][_0x1448d5(0x493)]());},VisuMZ['ItemsEquipsCore'][_0x220c41(0x180)]=Scene_Equip['prototype'][_0x220c41(0x4c8)],Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x4c8)]=function(){const _0x386c29=_0x220c41;VisuMZ[_0x386c29(0x44d)]['Scene_Equip_onActorChange'][_0x386c29(0x36e)](this);if(this[_0x386c29(0x23c)]()){if(_0x386c29(0x2ad)===_0x386c29(0x2ad))this[_0x386c29(0x4a8)][_0x386c29(0x493)](),this[_0x386c29(0x4a8)][_0x386c29(0x4cd)](),this['_slotWindow']['smoothSelect'](0x0),this[_0x386c29(0x328)]['activate']();else return _0x44ed31['ItemsEquipsCore'][_0x386c29(0x22a)][_0x386c29(0x278)]['CommandAddClear'];}},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x210)]=function(){const _0x380f14=_0x220c41;if(!this[_0x380f14(0x328)])return![];if(!this[_0x380f14(0x328)]['active'])return![];return this['_slotWindow'][_0x380f14(0x355)]();},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x537)]=function(){const _0x145b34=_0x220c41;if(this[_0x145b34(0x210)]()){if(_0x145b34(0x50f)!==_0x145b34(0x50f))_0x53a625[_0x145b34(0x44d)][_0x145b34(0x485)]['call'](this,_0x335032),this[_0x145b34(0x474)](_0x5d0de9);else return TextManager[_0x145b34(0x388)]('shift');}return Scene_MenuBase['prototype'][_0x145b34(0x537)][_0x145b34(0x36e)](this);},Scene_Equip['prototype'][_0x220c41(0x585)]=function(){const _0x315073=_0x220c41;if(this['buttonAssistSlotWindowShift']())return VisuMZ['ItemsEquipsCore']['Settings'][_0x315073(0x278)][_0x315073(0x211)];return Scene_MenuBase[_0x315073(0x4a1)][_0x315073(0x585)][_0x315073(0x36e)](this);},Scene_Equip[_0x220c41(0x4a1)]['buttonAssistOffset3']=function(){const _0x54487e=_0x220c41;if(this[_0x54487e(0x210)]())return this[_0x54487e(0x347)][_0x54487e(0x2c3)]/0x5/-0x3;return Scene_MenuBase[_0x54487e(0x4a1)]['buttonAssistOffset3'][_0x54487e(0x36e)](this);},Scene_Equip[_0x220c41(0x4a1)][_0x220c41(0x18a)]=function(){const _0x3a2504=_0x220c41;SceneManager[_0x3a2504(0x5fc)]();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x5b5)]=Scene_Load[_0x220c41(0x4a1)][_0x220c41(0x54b)],Scene_Load[_0x220c41(0x4a1)][_0x220c41(0x54b)]=function(){const _0x1be60f=_0x220c41;VisuMZ[_0x1be60f(0x44d)][_0x1be60f(0x5b5)][_0x1be60f(0x36e)](this),this[_0x1be60f(0x643)]();},Scene_Load[_0x220c41(0x4a1)]['refreshActorEquipSlotsIfUpdated']=function(){const _0x508649=_0x220c41;if($gameSystem[_0x508649(0x292)]()!==$dataSystem[_0x508649(0x292)])for(const _0x5d20af of $gameActors[_0x508649(0x4c3)]){if(_0x508649(0x5c1)===_0x508649(0x5c1)){if(_0x5d20af)_0x5d20af[_0x508649(0x2ee)]();}else return![];}},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x370)]=function(){const _0x29654e=_0x220c41;if(ConfigManager[_0x29654e(0x445)]&&ConfigManager[_0x29654e(0x266)]!==undefined)return ConfigManager[_0x29654e(0x266)];else{if(this[_0x29654e(0x559)]())return this['updatedLayoutStyle']()[_0x29654e(0x17d)](/LOWER/i);else Scene_MenuBase[_0x29654e(0x4a1)][_0x29654e(0x359)][_0x29654e(0x36e)](this);}},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x359)]=function(){const _0x2f643a=_0x220c41;if(ConfigManager[_0x2f643a(0x445)]&&ConfigManager['uiInputPosition']!==undefined){if(_0x2f643a(0x2a8)!==_0x2f643a(0x2a8)){const _0xd28f2d=this[_0x2f643a(0x4a8)]['y'],_0x226ce8=this[_0x2f643a(0x4a8)][_0x2f643a(0x2c3)],_0x400685=this[_0x2f643a(0x238)](0x1,!![]),_0x53e157=this[_0x2f643a(0x359)]()?_0xf4eed4['boxWidth']-_0x226ce8:0x0;return new _0x4a16ed(_0x53e157,_0xd28f2d,_0x226ce8,_0x400685);}else return ConfigManager[_0x2f643a(0x281)];}else{if(this[_0x2f643a(0x559)]()){if(_0x2f643a(0x4d8)!==_0x2f643a(0x1bd))return this[_0x2f643a(0x39a)]()[_0x2f643a(0x17d)](/RIGHT/i);else this[_0x2f643a(0x393)]();}else Scene_MenuBase[_0x2f643a(0x4a1)]['isRightInputMode'][_0x2f643a(0x36e)](this);}},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x39a)]=function(){const _0x2c3b64=_0x220c41;return VisuMZ[_0x2c3b64(0x44d)][_0x2c3b64(0x22a)][_0x2c3b64(0x217)][_0x2c3b64(0x57f)];},Scene_Shop['prototype']['isUseModernControls']=function(){const _0x48692b=_0x220c41;return this['_categoryWindow']&&this[_0x48692b(0x5fb)][_0x48692b(0x23c)]();},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x559)]=function(){const _0x16d9ad=_0x220c41;return VisuMZ[_0x16d9ad(0x44d)][_0x16d9ad(0x22a)]['ShopScene'][_0x16d9ad(0x374)];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x43c)]=Scene_Shop['prototype'][_0x220c41(0x4c5)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x4c5)]=function(_0x1d6659,_0x73c986){const _0x3fdd88=_0x220c41;_0x1d6659=JsonEx[_0x3fdd88(0x2cf)](_0x1d6659),VisuMZ['ItemsEquipsCore'][_0x3fdd88(0x43c)][_0x3fdd88(0x36e)](this,_0x1d6659,_0x73c986),this[_0x3fdd88(0x42e)]();},Scene_Shop['prototype']['adjustHiddenShownGoods']=function(){const _0x284fc7=_0x220c41;this[_0x284fc7(0x628)]=0x0;const _0xae47b8=[];for(const _0x413c0d of this[_0x284fc7(0x271)]){this[_0x284fc7(0x390)](_0x413c0d)?this[_0x284fc7(0x628)]++:_0x284fc7(0x505)!=='uPvHC'?_0xae47b8[_0x284fc7(0x349)](_0x413c0d):this['_itemWindow'][_0x284fc7(0x57b)](this[_0x284fc7(0x2f3)]());}for(const _0x4e94ac of _0xae47b8){_0x284fc7(0x29e)!==_0x284fc7(0x294)?this['_goods']['remove'](_0x4e94ac):this[_0x284fc7(0x5ab)]=[];}},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x390)]=function(_0x42400b){const _0x2beca9=_0x220c41;if(_0x42400b[0x0]>0x2||_0x42400b[0x0]<0x0)return![];const _0x865214=[$dataItems,$dataWeapons,$dataArmors][_0x42400b[0x0]][_0x42400b[0x1]];if(!_0x865214)return![];const _0x3eedd1=_0x865214[_0x2beca9(0x366)]||'';if(_0x3eedd1[_0x2beca9(0x17d)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2beca9(0x621)===_0x2beca9(0x621)){const _0x1a3b31=JSON[_0x2beca9(0x636)]('['+RegExp['$1'][_0x2beca9(0x17d)](/\d+/g)+']');for(const _0x228e13 of _0x1a3b31){if(!$gameSwitches[_0x2beca9(0x634)](_0x228e13))return![];}return!![];}else return _0x2e4b23[_0x2beca9(0x44d)][_0x2beca9(0x33b)][_0x2beca9(0x36e)](this);}if(_0x3eedd1['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20b635=JSON[_0x2beca9(0x636)]('['+RegExp['$1'][_0x2beca9(0x17d)](/\d+/g)+']');for(const _0x152a40 of _0x20b635){if('ZZPAN'!=='Heznm'){if(!$gameSwitches[_0x2beca9(0x634)](_0x152a40))return![];}else delete this[_0x2beca9(0x5fb)][_0x2beca9(0x276)]['ok'],delete this['_categoryWindow'][_0x2beca9(0x276)][_0x2beca9(0x1bc)];}return!![];}if(_0x3eedd1[_0x2beca9(0x17d)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a349d=JSON[_0x2beca9(0x636)]('['+RegExp['$1'][_0x2beca9(0x17d)](/\d+/g)+']');for(const _0x44961a of _0x2a349d){if($gameSwitches['value'](_0x44961a))return!![];}return![];}if(_0x3eedd1[_0x2beca9(0x17d)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17e2b9=JSON[_0x2beca9(0x636)]('['+RegExp['$1'][_0x2beca9(0x17d)](/\d+/g)+']');for(const _0x39eaa7 of _0x17e2b9){if(_0x2beca9(0x4b1)!==_0x2beca9(0x41e)){if(!$gameSwitches[_0x2beca9(0x634)](_0x39eaa7))return!![];}else this[_0x2beca9(0x5fb)]['show']();}return![];}if(_0x3eedd1[_0x2beca9(0x17d)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e9ebe=JSON['parse']('['+RegExp['$1'][_0x2beca9(0x17d)](/\d+/g)+']');for(const _0x20aa21 of _0x4e9ebe){if(_0x2beca9(0x1c3)!==_0x2beca9(0x1c3))this[_0x2beca9(0x27e)](),this['changePaintOpacity'](!![]),this[_0x2beca9(0x548)](),this[_0x2beca9(0x5e2)]()?this[_0x2beca9(0x181)]():this[_0x2beca9(0x488)](),this[_0x2beca9(0x2a5)]();else{if(!$gameSwitches[_0x2beca9(0x634)](_0x20aa21))return!![];}}return![];}if(_0x3eedd1[_0x2beca9(0x17d)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('CVwhq'===_0x2beca9(0x5eb)){const _0x3230df=_0x1ffffb[_0x2beca9(0x50c)]()[_0x2beca9(0x1b5)](_0x373c70=>_0x4c2cb9[_0x2beca9(0x1ee)](_0x373c70));for(const _0x134b81 of _0x3230df){const _0x1d8cc8=this[_0x2beca9(0x280)](_0x134b81);if(_0x1d8cc8)this[_0x2beca9(0x23e)](_0x134b81,_0x1d8cc8);}}else{const _0x2a10ec=JSON[_0x2beca9(0x636)]('['+RegExp['$1'][_0x2beca9(0x17d)](/\d+/g)+']');for(const _0x52d991 of _0x2a10ec){if('EkNxa'!=='IgSZh'){if($gameSwitches['value'](_0x52d991))return![];}else{const _0x274be5=this[_0x2beca9(0x4a8)]['y']+this[_0x2beca9(0x4a8)][_0x2beca9(0x4d7)],_0x222009=_0x23e8fc['boxWidth']-this[_0x2beca9(0x430)](),_0x420b42=this[_0x2beca9(0x359)]()?_0x4d555a[_0x2beca9(0x3b8)]-_0x222009:0x0,_0x290c7b=this[_0x2beca9(0x53c)]()-this[_0x2beca9(0x4a8)]['height'];return new _0x5deeb9(_0x420b42,_0x274be5,_0x222009,_0x290c7b);}}return!![];}}return!![];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x1cb)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x29d)],Scene_Shop['prototype']['create']=function(){const _0x4b5639=_0x220c41;VisuMZ[_0x4b5639(0x44d)][_0x4b5639(0x1cb)][_0x4b5639(0x36e)](this);if(this[_0x4b5639(0x559)]()){if(_0x4b5639(0x456)!==_0x4b5639(0x257))this[_0x4b5639(0x195)]();else return _0xbeb467['ItemsEquipsCore'][_0x4b5639(0x22a)][_0x4b5639(0x315)][_0x4b5639(0x504)];}this[_0x4b5639(0x5fd)]();},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x195)]=function(){const _0x267317=_0x220c41;this[_0x267317(0x579)][_0x267317(0x3ba)](),this[_0x267317(0x312)][_0x267317(0x437)](),this[_0x267317(0x312)][_0x267317(0x4cd)](),this[_0x267317(0x55d)]['show']();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x2f8)]=Scene_Shop[_0x220c41(0x4a1)]['helpWindowRect'],Scene_Shop['prototype'][_0x220c41(0x3bc)]=function(){const _0x36b8ba=_0x220c41;if(this[_0x36b8ba(0x559)]()){if(_0x36b8ba(0x30d)===_0x36b8ba(0x256))this[_0x36b8ba(0x258)][_0x36b8ba(0x316)]=0x1,this[_0x36b8ba(0x258)][_0x36b8ba(0x25f)]();else return this['helpWindowRectItemsEquipsCore']();}else{if('rFiJP'===_0x36b8ba(0x19e)){if(!this[_0x36b8ba(0x39a)]())return![];if(!this[_0x36b8ba(0x23c)]())return![];if(!this[_0x36b8ba(0x204)])return![];if(!this[_0x36b8ba(0x204)][_0x36b8ba(0x5c7)])return![];return this['updatedLayoutStyle']()&&this[_0x36b8ba(0x23c)]();}else return VisuMZ[_0x36b8ba(0x44d)][_0x36b8ba(0x2f8)][_0x36b8ba(0x36e)](this);}},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x517)]=function(){const _0x4ca2ae=_0x220c41,_0x33782c=0x0,_0x11fcb2=this[_0x4ca2ae(0x2db)](),_0x7ddc1b=Graphics[_0x4ca2ae(0x3b8)],_0x3c0216=this['helpAreaHeight']();return new Rectangle(_0x33782c,_0x11fcb2,_0x7ddc1b,_0x3c0216);},VisuMZ[_0x220c41(0x44d)]['Scene_Shop_goldWindowRect']=Scene_Shop['prototype'][_0x220c41(0x61e)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x61e)]=function(){const _0x4d9860=_0x220c41;if(this[_0x4d9860(0x559)]())return this[_0x4d9860(0x202)]();else{if(_0x4d9860(0x372)!==_0x4d9860(0x372))_0x1f2139=this['_actor'][_0x4d9860(0x3aa)](_0x3db8ab,![]),_0x1e6271=this['_tempActor']['paramValueByName'](_0x2523e4,![]),_0x3ba14a=_0x1a4cf3(this[_0x4d9860(0x60b)][_0x4d9860(0x3aa)](_0x2cb568,!![]))[_0x4d9860(0x17d)](/([%％])/i);else return VisuMZ[_0x4d9860(0x44d)][_0x4d9860(0x31a)][_0x4d9860(0x36e)](this);}},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x202)]=function(){const _0x201bc8=_0x220c41,_0x559951=this[_0x201bc8(0x47f)](),_0x240900=this[_0x201bc8(0x238)](0x1,!![]),_0x8b6452=this['isRightInputMode']()?0x0:Graphics[_0x201bc8(0x3b8)]-_0x559951,_0x4752f4=this[_0x201bc8(0x2ce)]();return new Rectangle(_0x8b6452,_0x4752f4,_0x559951,_0x240900);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x220)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x283)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x283)]=function(){const _0x47470a=_0x220c41;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('XGPvy'!==_0x47470a(0x3a3))_0xf48ae0[_0x47470a(0x1bb)][_0x47470a(0x349)](_0x2fae9b[_0x47470a(0x1dc)]()[_0x47470a(0x31d)]());else return this[_0x47470a(0x523)]();}else return VisuMZ[_0x47470a(0x44d)][_0x47470a(0x220)][_0x47470a(0x36e)](this);},Scene_Shop['prototype'][_0x220c41(0x523)]=function(){const _0x133bb1=_0x220c41,_0x48d1e5=this[_0x133bb1(0x359)]()?this[_0x133bb1(0x47f)]():0x0,_0x1db970=this[_0x133bb1(0x2ce)](),_0x5cb7ff=Graphics[_0x133bb1(0x3b8)]-this[_0x133bb1(0x47f)](),_0x2c1103=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x48d1e5,_0x1db970,_0x5cb7ff,_0x2c1103);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x3e0)]=Scene_Shop['prototype'][_0x220c41(0x243)],Scene_Shop[_0x220c41(0x4a1)]['numberWindowRect']=function(){const _0x41a223=_0x220c41;return this[_0x41a223(0x559)]()?_0x41a223(0x432)!==_0x41a223(0x31b)?this[_0x41a223(0x55e)]():this[_0x41a223(0x1de)]():VisuMZ[_0x41a223(0x44d)][_0x41a223(0x3e0)][_0x41a223(0x36e)](this);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x55e)]=function(){const _0x2f9a64=_0x220c41,_0x456492=this['_commandWindow']['y']+this[_0x2f9a64(0x4a8)][_0x2f9a64(0x4d7)],_0x3eb0c4=Graphics[_0x2f9a64(0x3b8)]-this['statusWidth'](),_0x4ce574=this[_0x2f9a64(0x359)]()?Graphics['boxWidth']-_0x3eb0c4:0x0,_0x599d1b=this['mainAreaHeight']()-this['_commandWindow'][_0x2f9a64(0x4d7)];return new Rectangle(_0x4ce574,_0x456492,_0x3eb0c4,_0x599d1b);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x5c0)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x5f9)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x5f9)]=function(){const _0x51cbe=_0x220c41;if(this[_0x51cbe(0x559)]())return this['statusWindowRectItemsEquipsCore']();else{if(_0x51cbe(0x414)==='GujUt'){const _0x2d2744=_0x5cfd24[_0xd57ab0];if(_0x2d2744&&_0x2d2744[_0x51cbe(0x1e3)]>0x0){_0x256a90+=_0x51cbe(0x552)['format'](_0x2d2744[_0x51cbe(0x1e3)]),_0x20daf1++;if(_0x23d55b>=_0xa7cbfb)return _0x57bfb3;}}else return VisuMZ[_0x51cbe(0x44d)][_0x51cbe(0x5c0)]['call'](this);}},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x5f8)]=function(){const _0x640da8=_0x220c41,_0x2fdaf0=this[_0x640da8(0x430)](),_0x4ab7e7=this[_0x640da8(0x53c)]()-this['_commandWindow'][_0x640da8(0x4d7)],_0x2ad03d=this[_0x640da8(0x359)]()?0x0:Graphics['boxWidth']-_0x2fdaf0,_0x2a952f=this[_0x640da8(0x4a8)]['y']+this['_commandWindow'][_0x640da8(0x4d7)];return new Rectangle(_0x2ad03d,_0x2a952f,_0x2fdaf0,_0x4ab7e7);},VisuMZ[_0x220c41(0x44d)]['Scene_Shop_buyWindowRect']=Scene_Shop[_0x220c41(0x4a1)]['buyWindowRect'],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x286)]=function(){const _0x4e98d4=_0x220c41;return this[_0x4e98d4(0x559)]()?this['buyWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x4e98d4(0x2bc)][_0x4e98d4(0x36e)](this);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x3c6)]=function(){const _0x26ea65=_0x220c41,_0x1acb49=this['_commandWindow']['y']+this[_0x26ea65(0x4a8)][_0x26ea65(0x4d7)],_0x315ca0=Graphics['boxWidth']-this[_0x26ea65(0x430)](),_0x2a8bf4=this[_0x26ea65(0x53c)]()-this[_0x26ea65(0x4a8)][_0x26ea65(0x4d7)],_0x4a6683=this[_0x26ea65(0x359)]()?Graphics[_0x26ea65(0x3b8)]-_0x315ca0:0x0;return new Rectangle(_0x4a6683,_0x1acb49,_0x315ca0,_0x2a8bf4);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x534)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x40a)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x40a)]=function(){const _0xa2a904=_0x220c41;VisuMZ[_0xa2a904(0x44d)][_0xa2a904(0x534)][_0xa2a904(0x36e)](this),this[_0xa2a904(0x23c)]()&&(_0xa2a904(0x48c)!=='GqMQu'?_0x269939='item-%1'['format'](_0x2690b9['id']):this['postCreateCategoryWindowItemsEquipsCore']());},VisuMZ['ItemsEquipsCore'][_0x220c41(0x518)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x5b2)],Scene_Shop['prototype'][_0x220c41(0x5b2)]=function(){const _0x1882cd=_0x220c41;if(this[_0x1882cd(0x559)]()){if('eDzgt'===_0x1882cd(0x356))_0x153bb5=this['innerHeight']-_0x5458a3;else return this[_0x1882cd(0x1de)]();}else{if('NaAkt'===_0x1882cd(0x637))return VisuMZ[_0x1882cd(0x44d)][_0x1882cd(0x518)][_0x1882cd(0x36e)](this);else{const _0xb8b426=this[_0x1882cd(0x363)];if(_0xb8b426[_0x2fe081])return _0xb8b426[_0x488640];else{const _0x55f288=new _0x2187fc();return _0xb8b426[_0x1e7bf7]=_0x55f288,this['addInnerChild'](_0x55f288),_0x55f288;}}}},Scene_Shop['prototype'][_0x220c41(0x1de)]=function(){const _0x535d65=_0x220c41,_0x47d8e4=this[_0x535d65(0x4a8)]['y'],_0x4a2eb1=this[_0x535d65(0x4a8)][_0x535d65(0x2c3)],_0x380392=this[_0x535d65(0x238)](0x1,!![]),_0x29da74=this[_0x535d65(0x359)]()?Graphics[_0x535d65(0x3b8)]-_0x4a2eb1:0x0;return new Rectangle(_0x29da74,_0x47d8e4,_0x4a2eb1,_0x380392);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x4d6)]=function(){const _0x28b340=_0x220c41;delete this[_0x28b340(0x5fb)][_0x28b340(0x276)]['ok'],delete this[_0x28b340(0x5fb)][_0x28b340(0x276)][_0x28b340(0x1bc)];},VisuMZ['ItemsEquipsCore']['Scene_Shop_createSellWindow']=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x405)],Scene_Shop[_0x220c41(0x4a1)]['createSellWindow']=function(){const _0x54df4e=_0x220c41;VisuMZ['ItemsEquipsCore']['Scene_Shop_createSellWindow'][_0x54df4e(0x36e)](this),this[_0x54df4e(0x559)]()&&this[_0x54df4e(0x4d9)]();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x2b9)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x3cd)],Scene_Shop['prototype'][_0x220c41(0x3cd)]=function(){const _0x5e1979=_0x220c41;if(this[_0x5e1979(0x559)]()){if(_0x5e1979(0x60c)===_0x5e1979(0x60c))return this['sellWindowRectItemsEquipsCore']();else this[_0x5e1979(0x218)](_0x3efb73);}else return VisuMZ[_0x5e1979(0x44d)][_0x5e1979(0x2b9)][_0x5e1979(0x36e)](this);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x5e0)]=function(){const _0x54488e=_0x220c41,_0x468675=this['_categoryWindow']['y']+this['_categoryWindow'][_0x54488e(0x4d7)],_0x1a059e=Graphics[_0x54488e(0x3b8)]-this[_0x54488e(0x430)](),_0x204b70=this[_0x54488e(0x53c)]()-this[_0x54488e(0x5fb)][_0x54488e(0x4d7)],_0x124d69=this[_0x54488e(0x359)]()?Graphics[_0x54488e(0x3b8)]-_0x1a059e:0x0;return new Rectangle(_0x124d69,_0x468675,_0x1a059e,_0x204b70);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x4d9)]=function(){const _0x19657a=_0x220c41;this['_sellWindow'][_0x19657a(0x334)](this[_0x19657a(0x55d)]);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x430)]=function(){const _0x16e21d=_0x220c41;return VisuMZ[_0x16e21d(0x44d)]['Settings'][_0x16e21d(0x315)][_0x16e21d(0x59e)];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x24b)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x20a)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x20a)]=function(){const _0x589d92=_0x220c41;VisuMZ[_0x589d92(0x44d)][_0x589d92(0x24b)][_0x589d92(0x36e)](this),this[_0x589d92(0x559)]()&&this[_0x589d92(0x55d)]['show'](),this['_sellWindow']['updateHelp']();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x221)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x1ed)],Scene_Shop['prototype']['commandBuy']=function(){const _0x59f1dd=_0x220c41;VisuMZ[_0x59f1dd(0x44d)][_0x59f1dd(0x221)][_0x59f1dd(0x36e)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x59f1dd(0x614)]();},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x614)]=function(){const _0x144f95=_0x220c41;this[_0x144f95(0x4e1)]=this['_buyWindowLastIndex']||0x0,this[_0x144f95(0x312)][_0x144f95(0x353)](this[_0x144f95(0x4e1)]);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x4b2)]=Scene_Shop['prototype'][_0x220c41(0x612)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x612)]=function(){const _0x2438cf=_0x220c41;VisuMZ[_0x2438cf(0x44d)]['Scene_Shop_commandSell'][_0x2438cf(0x36e)](this);this[_0x2438cf(0x559)]()&&this[_0x2438cf(0x32b)]();if(this['isUseModernControls']()){if('jLoVu'==='yGaiy')return this['getItemDamageAmountLabelOriginal']();else this[_0x2438cf(0x5fb)][_0x2438cf(0x353)](0x0),this[_0x2438cf(0x2ec)]();}},Scene_Shop['prototype'][_0x220c41(0x32b)]=function(){const _0x145c26=_0x220c41;this['_buyWindow'][_0x145c26(0x3ba)](),this['_commandWindow'][_0x145c26(0x3ba)]();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x1ab)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x4ce)],Scene_Shop[_0x220c41(0x4a1)]['onBuyCancel']=function(){const _0x3ebd63=_0x220c41;VisuMZ['ItemsEquipsCore']['Scene_Shop_onBuyCancel'][_0x3ebd63(0x36e)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['onBuyCancelItemsEquipsCore']();},Scene_Shop[_0x220c41(0x4a1)]['onBuyCancelItemsEquipsCore']=function(){const _0x5aaef7=_0x220c41;this[_0x5aaef7(0x4e1)]=this[_0x5aaef7(0x312)]['index'](),this[_0x5aaef7(0x312)][_0x5aaef7(0x437)](),this[_0x5aaef7(0x312)][_0x5aaef7(0x4cd)](),this[_0x5aaef7(0x312)][_0x5aaef7(0x2b7)](0x0,0x0),this[_0x5aaef7(0x55d)]['show'](),this[_0x5aaef7(0x579)]['hide']();},VisuMZ[_0x220c41(0x44d)]['Scene_Shop_onCategoryCancel']=Scene_Shop['prototype'][_0x220c41(0x4dd)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x4dd)]=function(){const _0x266eda=_0x220c41;VisuMZ[_0x266eda(0x44d)][_0x266eda(0x4af)][_0x266eda(0x36e)](this),this[_0x266eda(0x559)]()&&this[_0x266eda(0x323)]();},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x323)]=function(){const _0x3051c4=_0x220c41;this['_buyWindow'][_0x3051c4(0x437)](),this[_0x3051c4(0x4a8)][_0x3051c4(0x437)]();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x3a1)]=Scene_Shop[_0x220c41(0x4a1)]['onBuyOk'],Scene_Shop['prototype'][_0x220c41(0x4cf)]=function(){const _0x17d8c2=_0x220c41;$gameTemp[_0x17d8c2(0x47c)]=!![],VisuMZ[_0x17d8c2(0x44d)]['Scene_Shop_onBuyOk'][_0x17d8c2(0x36e)](this),$gameTemp[_0x17d8c2(0x47c)]=![],this[_0x17d8c2(0x1e6)]=this[_0x17d8c2(0x312)][_0x17d8c2(0x4c4)]();},VisuMZ[_0x220c41(0x44d)]['Scene_Shop_buyingPrice']=Scene_Shop[_0x220c41(0x4a1)]['buyingPrice'],Scene_Shop[_0x220c41(0x4a1)]['buyingPrice']=function(){const _0x29e866=_0x220c41;$gameTemp[_0x29e866(0x47c)]=!![],this['_item']=this[_0x29e866(0x312)][_0x29e866(0x4c4)]();const _0x1827cb=VisuMZ[_0x29e866(0x44d)][_0x29e866(0x3c8)][_0x29e866(0x36e)](this);return $gameTemp[_0x29e866(0x47c)]=![],this[_0x29e866(0x1e6)]=this[_0x29e866(0x312)]['item'](),_0x1827cb;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x304)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x270)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x270)]=function(){const _0x22c2dd=_0x220c41;VisuMZ[_0x22c2dd(0x44d)]['Scene_Shop_onSellOk']['call'](this),this[_0x22c2dd(0x559)]()&&this[_0x22c2dd(0x268)]();},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x268)]=function(){const _0x419e0a=_0x220c41;this[_0x419e0a(0x5fb)][_0x419e0a(0x437)]();},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x63a)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x382)],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x382)]=function(){const _0x1e2e24=_0x220c41;VisuMZ['ItemsEquipsCore'][_0x1e2e24(0x63a)][_0x1e2e24(0x36e)](this);if(this['isUseModernControls']()){if('fpUiW'!==_0x1e2e24(0x303)){if(this[_0x1e2e24(0x214)]()&&_0x477f5f[_0x1e2e24(0x4e5)]())this['onTouchSelectModernControls'](![]);else _0x2bd1a9['isTriggered']()&&this[_0x1e2e24(0x4b8)](!![]);_0x523fdb[_0x1e2e24(0x546)]()&&this[_0x1e2e24(0x647)]();}else this[_0x1e2e24(0x4dd)]();}this[_0x1e2e24(0x559)]()&&this[_0x1e2e24(0x579)][_0x1e2e24(0x3ba)]();},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x52b)]=function(_0x5994df){const _0x507f65=_0x220c41,_0x1dde4c=this[_0x507f65(0x1e6)];this[_0x507f65(0x1e6)]=_0x5994df;const _0x4fa8bc=this[_0x507f65(0x533)]();return this[_0x507f65(0x1e6)]=_0x1dde4c,_0x4fa8bc;},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x2b3)]=Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x533)],Scene_Shop['prototype']['sellingPrice']=function(){const _0x12f9dc=_0x220c41;let _0x181287=this['determineBaseSellingPrice']();const _0xd448b5=this['_item'];return _0x181287=VisuMZ[_0x12f9dc(0x44d)]['Settings']['ShopScene'][_0x12f9dc(0x25a)][_0x12f9dc(0x36e)](this,_0xd448b5,_0x181287),_0x181287;},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x63b)]=function(){const _0x1eaeb4=_0x220c41;let _0x4d2a66=this['_item'][_0x1eaeb4(0x51d)];if(!this[_0x1eaeb4(0x1e6)])return 0x0;else{if(this[_0x1eaeb4(0x1e6)]['note'][_0x1eaeb4(0x17d)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x41c670=String(RegExp['$1']);let _0x525716=this[_0x1eaeb4(0x1e6)],_0x8f9fb2=_0x4d2a66*this[_0x1eaeb4(0x351)]();try{eval(_0x41c670);}catch(_0xe1f0cc){if($gameTemp[_0x1eaeb4(0x4ed)]())console['log'](_0xe1f0cc);}if(isNaN(_0x8f9fb2))_0x8f9fb2=0x0;return Math[_0x1eaeb4(0x27a)](_0x8f9fb2);}else{if(this['_item'][_0x1eaeb4(0x366)][_0x1eaeb4(0x17d)](/<SELL PRICE:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x1eaeb4(0x1fa)===_0x1eaeb4(0x1fa))return Math['floor'](this[_0x1eaeb4(0x5d5)]());else{const _0x596ba5='MP\x20RECOVERY';if(this[_0x1eaeb4(0x50a)][_0x1eaeb4(0x560)]<=0x0&&this[_0x1eaeb4(0x50a)][_0x1eaeb4(0x4fd)]<=0x0&&!this[_0x1eaeb4(0x51f)][_0x596ba5])return![];const _0x2e45f4=this[_0x1eaeb4(0x2dd)]();this[_0x1eaeb4(0x365)](_0x2e45f4,_0x54e6f5,_0x2be833,_0x4506c9,!![]);const _0x3237dc=this[_0x1eaeb4(0x489)]();return this[_0x1eaeb4(0x1e5)](_0xecbcfe[_0x1eaeb4(0x2ca)](0x3)),this[_0x1eaeb4(0x365)](_0x3237dc,_0x5700cb,_0x21b08c,_0x5ed7dc,![],_0x1eaeb4(0x28c)),this['drawItemDarkRect'](_0x2b78f3,_0x62412f,_0x57c3de),this[_0x1eaeb4(0x27e)](),!![];}}}}},Scene_Shop[_0x220c41(0x4a1)]['baseSellingPrice']=function(){const _0x38f273=_0x220c41;return this[_0x38f273(0x1e6)][_0x38f273(0x51d)]*this['sellPriceRate']();},Scene_Shop['prototype']['sellPriceRate']=function(){const _0x5c322b=_0x220c41;return VisuMZ[_0x5c322b(0x44d)][_0x5c322b(0x22a)][_0x5c322b(0x217)][_0x5c322b(0x206)];},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x5d6)]=function(){const _0x318fab=_0x220c41;if(!this[_0x318fab(0x39a)]())return![];if(!this[_0x318fab(0x23c)]())return![];if(!this[_0x318fab(0x204)])return![];if(!this[_0x318fab(0x204)]['active'])return![];return this[_0x318fab(0x39a)]()&&this[_0x318fab(0x23c)]();},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x460)]=function(){const _0x1bed14=_0x220c41;if(this['buttonAssistItemListRequirement']())return this['_sellWindow'][_0x1bed14(0x4f5)]()===0x1?TextManager[_0x1bed14(0x4f8)](_0x1bed14(0x5a9),'right'):TextManager[_0x1bed14(0x4f8)](_0x1bed14(0x5e5),_0x1bed14(0x2e3));else{if(this[_0x1bed14(0x56e)]&&this[_0x1bed14(0x56e)][_0x1bed14(0x5c7)])return TextManager[_0x1bed14(0x4f8)](_0x1bed14(0x5a9),'right');}return Scene_MenuBase[_0x1bed14(0x4a1)]['buttonAssistKey1'][_0x1bed14(0x36e)](this);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x610)]=function(){const _0x4c400e=_0x220c41;if(this[_0x4c400e(0x56e)]&&this[_0x4c400e(0x56e)][_0x4c400e(0x5c7)])return TextManager[_0x4c400e(0x4f8)]('up',_0x4c400e(0x50d));return Scene_MenuBase[_0x4c400e(0x4a1)][_0x4c400e(0x610)][_0x4c400e(0x36e)](this);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x30b)]=function(){const _0x299c40=_0x220c41;if(this[_0x299c40(0x5d6)]())return VisuMZ[_0x299c40(0x44d)][_0x299c40(0x22a)][_0x299c40(0x58c)][_0x299c40(0x4ad)];else{if(this['_numberWindow']&&this[_0x299c40(0x56e)]['active']){if(_0x299c40(0x5aa)==='QkItM')return VisuMZ[_0x299c40(0x44d)][_0x299c40(0x22a)][_0x299c40(0x217)]['buttonAssistSmallIncrement'];else{const _0x5adc96=this['itemPadding']();_0x13e2a1[_0x299c40(0x1d7)]?this['drawParamText'](_0x4e0d30+_0x5adc96,_0x194373,_0x237f74,_0x1355bf,![]):this[_0x299c40(0x343)](_0x16a7b6['param'](_0x3c7f9c),_0xcfb2+_0x5adc96,_0x4cf359,_0x177584);}}}return Scene_MenuBase[_0x299c40(0x4a1)][_0x299c40(0x30b)][_0x299c40(0x36e)](this);},Scene_Shop['prototype'][_0x220c41(0x645)]=function(){const _0xc390d=_0x220c41;if(this[_0xc390d(0x56e)]&&this[_0xc390d(0x56e)]['active'])return _0xc390d(0x564)!=='XxdpU'?(_0x1cff19[_0xc390d(0x4ed)]()&&(_0x31ef06['log']('Damage\x20Formula\x20Error\x20for\x20%1'[_0xc390d(0x22d)](this[_0xc390d(0x1e6)][_0xc390d(0x443)])),_0x23ec22['log'](_0x384a11)),this['revertGlobalNamespaceVariables'](),'?????'):VisuMZ[_0xc390d(0x44d)][_0xc390d(0x22a)]['ShopScene']['buttonAssistLargeIncrement'];return Scene_MenuBase[_0xc390d(0x4a1)][_0xc390d(0x645)]['call'](this);},Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x5fd)]=function(){const _0x484870=_0x220c41;if(!SceneManager['isSceneShop']())return;const _0x50e1be=VisuMZ['ItemsEquipsCore'][_0x484870(0x22a)][_0x484870(0x217)];if(_0x50e1be[_0x484870(0x369)]){if(_0x484870(0x51c)===_0x484870(0x4c2))return _0x2332d1;else $gameSwitches[_0x484870(0x44c)](_0x50e1be[_0x484870(0x369)],![]);}_0x50e1be[_0x484870(0x20d)]&&(_0x484870(0x39c)!==_0x484870(0x450)?$gameSwitches[_0x484870(0x44c)](_0x50e1be[_0x484870(0x20d)],![]):_0x5c0639=_0x1337d6[_0x484870(0x394)][_0x484870(0x22a)]['Param'][_0x484870(0x415)]);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x188)]=Scene_Shop[_0x220c41(0x4a1)]['doBuy'],Scene_Shop[_0x220c41(0x4a1)][_0x220c41(0x2c6)]=function(_0x5ef3e5){const _0xe9070d=_0x220c41;VisuMZ[_0xe9070d(0x44d)][_0xe9070d(0x188)][_0xe9070d(0x36e)](this,_0x5ef3e5);if(_0x5ef3e5<=0x0)return;const _0x376c59=VisuMZ[_0xe9070d(0x44d)][_0xe9070d(0x22a)][_0xe9070d(0x217)];_0x376c59['SwitchBuy']&&$gameSwitches['setValue'](_0x376c59[_0xe9070d(0x369)],!![]);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x5ca)]=Scene_Shop['prototype'][_0x220c41(0x329)],Scene_Shop['prototype'][_0x220c41(0x329)]=function(_0xb7e422){const _0x3a712a=_0x220c41;VisuMZ[_0x3a712a(0x44d)][_0x3a712a(0x5ca)][_0x3a712a(0x36e)](this,_0xb7e422);if(_0xb7e422<=0x0)return;const _0x18a4ea=VisuMZ[_0x3a712a(0x44d)][_0x3a712a(0x22a)][_0x3a712a(0x217)];_0x18a4ea[_0x3a712a(0x369)]&&$gameSwitches['setValue'](_0x18a4ea[_0x3a712a(0x20d)],!![]);};function _0x11a9(_0xe962f5,_0x473b88){const _0x421aba=_0x421a();return _0x11a9=function(_0x11a9f1,_0x3767e1){_0x11a9f1=_0x11a9f1-0x17c;let _0x1b8135=_0x421aba[_0x11a9f1];return _0x1b8135;},_0x11a9(_0xe962f5,_0x473b88);}function Sprite_NewLabel(){const _0x328c4c=_0x220c41;this[_0x328c4c(0x600)](...arguments);}function _0x421a(){const _0x258abe=['discardEquip','forceChangeEquip','MaxArmors','OVZdo','KSTJR','keyItem','paramValueFontSize','LabelSelfGainTP','addItemCategories','Scene_Shop_statusWindowRect','MlyhL','AllArmors','Step1Start','drawItemStyleIconText','%1%','modifiedBuyPriceItemsEquipsCore','active','remove','SwitchID','Scene_Shop_doSell','speed','fsoeP','removeBuff','Whitelist','jzjBB','text','URkzm','createNewLabelSprite','drawUpdatedParamValueDiff','split','baseSellingPrice','buttonAssistItemListRequirement','updateCommandNameWindow','activate','ScopeRandomEnemies','updateChangedSlots','NotConsumable','foreground','LabelRecoverMP','RDBEI','CommandAddClear','sellWindowRectItemsEquipsCore','revertGlobalNamespaceVariables','isEquipItem','occasion','wUSfN','pageup','isArmor','canEquip','ScopeAlliesButUser','IIZKD','BiXem','mDQUZ','isPageChangeRequested','loadPicture','REMOVED\x20EFFECTS','drawItemSuccessRate','forceResetEquipSlots','resetTextColor','getItemEffectsMpDamageLabel','_bypassNewLabel','NdaFY','Step2Start','fontSize','paramchangeTextColor','statusWindowRectItemsEquipsCore','statusWindowRect','CbiXT','_categoryWindow','pop','resetShopSwitches','MANUAL','length','initialize','anyEmptyEquipSlotsOfSameEtype','Step3Start','Scene_Item_createCategoryWindow','optimizeCmdDesc','playBuzzerSound','Window_ShopBuy_refresh','VNDra','_allowArtifactParamBase','fontSizeRatio','isDualWield','_actor','NvFxm','fontFace','PbGHD','LipuN','buttonAssistKey2','isBattleTest','commandSell','onTouchCancel','commandBuyItemsEquipsCore','itemPadding','Parse_Notetags_Batch','isDrawItemNumber','equipCmdDesc','ElementNone','powerDownColor','yumdG','etypeId','zjauv','goldWindowRect','cursorUp','drawParamText','EnzSw','optKeyItemsNumber','commandName','hpRate','actorParams','tradeItemWithParty','setBackgroundType','_goodsCount','lZFdb','ufLMK','PQteL','LabelRecoverTP','ShopMenuStatusStandard','SetupProxyItemGroup','hitType','maxVisibleItems','cUdFB','FUNC','_categoryNameWindow','value','drawItemCustomEntries','parse','NaAkt','commandStyleCheck','15829bmBXVH','Scene_Shop_onSellCancel','determineBaseSellingPrice','addClearCommand','FadeLimit','_tempActorA','wQObr','ABodA','systemColor','mainFontFace','refreshActorEquipSlotsIfUpdated','_commandNameWindow','buttonAssistText2','ZKsvt','onTouchOk','yuXcJ','getItemConsumableText','select','HhHdB','setItemWindow','JBNjH','Window_ShopBuy_price','isSoleArmorType','MAT','middle','move','KeyItemProtect','isBuyCommandEnabled','blt','USiyh','IconSet','match','params','SpeedNeg2000','Scene_Equip_onActorChange','drawEquipData','HBaFs','proxyItem','EFFECT_GAIN_TP','shift','removeBattleTestArtifacts','prepareNextScene','Scene_Shop_doBuy','isPartyArtifact','popScene','updateMoneyAmount','IQgcF','process_VisuMZ_ItemsEquipsCore_Notetags','newLabelEnabled','ARRAYJSON','isSceneShop','FPKQl','drawItemNumber','textColor','nzrLm','postCreateItemsEquipsCore','LabelDamageHP','zhleU','processCursorHomeEndTrigger','getItemEffectsHpDamageText','drawParamName','Speed2000','IncludeShopItem','dfbkt','LfqYU','translucentOpacity','Game_Party_gainItem_artifact','UBrEI','paramPlus','mbBAR','lQSyJ','mNRHg','eHGdM','changePaintOpacity','DrawFaceJS','getColor','HWeYi','Scene_Shop_onBuyCancel','possession','ARRAYNUM','plOHX','cursorRight','ParseClassNotetags','tAcgO','troopArtifacts','ZbYpU','addChild','filter','drawItemCost','yzbVi','TysRM','itemWindowRect','bXvLZ','categories','cancel','JdJAN','Window_Selectable_initialize','removeStateBuffChanges','removeDebuff','setHandler','isClearCommandEnabled','PlQTb','updateNewLabelOpacity','process_VisuMZ_ItemsEquipsCore_EquipSlots','ttbAX','drawRemoveItem','?????','USER\x20TP\x20GAIN','Scene_Equip_slotWindowRect','Scene_Shop_create','idThL','hZKsW','BackRectColor','getItemSuccessRateText','AGI','description','getItemsEquipsCoreBackColor2','JeyAN','removeState','Damage\x20Formula\x20Error\x20for\x20%1','CeSDI','VisuMZ_0_CoreEngine','getTextColor','4248108lWvxjF','wlvcY','cursorDown','toUpperCase','sell','categoryWindowRectItemsEquipsCore','mhp','CmdTextAlign','cursorPageup','kgvSd','iconIndex','mXMkn','changeTextColor','_item','constructor','_allowArtifactTraitObjects','processCursorMoveModernControls','repeats','Game_Actor_changeEquip','eLaId','commandBuy','isArtifact','Game_Item_setObject','LabelRecoverHP','armorTypes','_weaponIDs','HqItl','drawItemDamageElement','LabelRemove','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','syfvg','A%1','ffoAB','NRfhY','_doubleTouch','setTempActor','jWfat','isUseParamNamesWithIcons','UjubO','drawActorParamDifference','isOptimizeEquipOk','goldWindowRectItemsEquipsCore','IXEZK','_sellWindow','TP\x20RECOVERY','SellPriceRate','DrawPortraitJS','tvrTb','Nonconsumable','activateSellWindow','GaNTn','mmp','SwitchSell','clearCmdDesc','hideAdditionalSprites','buttonAssistSlotWindowShift','buttonAssistRemove','HiddenItemB','RegularItems','isHoverEnabled','getItemRepeatsLabel','yJUHo','ShopScene','drawItemStyleIcon','RemoveEquipText','EUHVg','nFNfZ','uQBqX','pIwSS','jROsT','drawItemRepeats','Scene_Shop_commandWindowRect','Scene_Shop_commandBuy','+%1%','playOkSound','isOptimizeCommandAdded','equipSlotIndex','12970cvWWWp','DpzaD','contentsBack','EquipAdjustHpMp','Settings','ShiftShortcutKey','drawItemHitType','format','yIYJD','SpeedNeg999','addCommand','pNMEe','MlHEF','drawUpdatedParamName','Scope%1','Scene_Equip_commandWindowRect','_tempActorB','return\x200','calcWindowHeight','damage','_bypassReleaseUnequippableItemsItemsEquipsCore','drawItemDamage','isUseModernControls','canConsumeItem','loseItem','Occasion%1','processHandling','qpJZR','Step1End','numberWindowRect','Speed1','getItemIdWithName','Window_EquipCommand_initialize','Step2End','getItemSpeedText','EFFECT_REMOVE_STATE','itemAt','Scene_Shop_activateSellWindow','setMp','drawPossession','FontFace','EqcUT','LyjUp','DrawIcons','VrCiw','NFumr','FontColor','DTfJj','QgBbf','LPZDI','_itemWindow','gaugeBackColor','SellPriceJS','BattleUsable','allMembers','YTXYQ','addBuyCommand','updateSmoothScroll','fsdLF','fYHub','nagTT','getNextAvailableEtypeId','_shopStatusMenuMode','HP\x20RECOVERY','uiHelpPosition','opacity','onSellOkItemsEquipsCore','Scene_Equip_onSlotOk','YMYsV','_cache','HP\x20DAMAGE','LabelDamageMP','EFFECT_ADD_DEBUFF','changeEquipById','onSellOk','_goods','limitedPageUpDownSceneCheck','_forcedSlots','NPdVF','ZFPAi','_handlers','MP\x20RECOVERY','EquipScene','process_VisuMZ_ItemsEquipsCore_RegExp','floor','DAMAGE\x20MULTIPLIER','Window_ShopBuy_item','LXQaF','resetFontSettings','clear','numItems','uiInputPosition','textSizeEx','commandWindowRect','fillRect','WwLmM','buyWindowRect','traitObjects','SUCCESS\x20RATE','AlreadyEquipMarker','refreshCursor','45vCfcoo','right','param','ceil','onMenuImageLoad','DYxmk','CannotEquipMarker','versionId','WqQDx','JPiPk','weaponTypes','Bbswh','log','parameters','isClearCommandAdded','DrawEquipData','ySjwy','_resetFontSize','create','vJQcb','characterName','ADDED\x20EFFECTS','onSlotOkAutoSelect','equip','paramPlusItemsEquipsCoreCustomJS','VzHIL','drawCustomShopGraphic','getItemsEquipsCoreBackColor1','getItemSpeedLabel','QWtmb','oZvtB','eiVQx','uRkoA','OffsetX','ammBQ','Game_BattlerBase_param','DrawBackRect','geUpdatedLayoutStatusWidth','makeCommandList','atk','Scene_Shop_sellingPrice','Equip\x20the\x20strongest\x20available\x20equipment.','RemoveEquipIcon','categoryList','smoothScrollTo','drawItemOccasion','Scene_Shop_sellWindowRect','DWxCD','Game_Actor_equips_artifacts','Scene_Shop_buyWindowRect','XfPKU','checkShiftRemoveShortcut','FadeSpeed','EFFECT_RECOVER_MP','XMrMo','XafqB','width','\x5cb%1\x5cb','pdbgL','doBuy','dataId','currentClass','weapon-%1','damageColor','canUse','createCommandWindow','drawCustomShopGraphicLoad','mainAreaTop','makeDeepCopy','dnbAB','loadCharacter','drawItemEffectsTpRecovery','buffIconIndex','StatusWindowWidth','xxpPE','getItemDamageAmountTextOriginal','isClearEquipOk','+%1','auto','optimize','helpAreaTop','nFJdQ','getItemEffectsMpRecoveryLabel','Game_Party_setupBattleTestItems_artifact','wJXUy','getItemEffectsTpRecoveryText','Scene_Equip_onSlotCancel','7LmvSpb','pagedown','smhIY','allowShiftScrolling','Game_BattlerBase_param_artifact','categoryStyleCheck','IoJgI','CuUhr','_slotId','xxozk','onCategoryOk','CmdStyle','prepareNewEquipSlotsOnLoad','TrzDo','onDatabaseLoaded','gainTP','drawItemScope','currentExt','smallParamFontSize','getItemEffectsTpRecoveryLabel','loadFaceImages','WqdrN','Scene_Shop_helpWindowRect','sFmcr','MaxItems','pNaiG','getItemDamageElementLabel','1082NqmKED','exit','PcEWL','meetsItemConditionsJS','members','Game_Actor_forceChangeEquip','fpUiW','Scene_Shop_onSellOk','Scene_Equip_itemWindowRect','ItemQuantityFmt','CmdIconClear','_itemIDs','initNewLabelSprites','slotWindowRectItemsEquipsCore','buttonAssistText1','NMagA','SunWd','changeEquip','GNQCI','DrawItemData','getItemEffects','_buyWindow','addInnerChild','user','StatusWindow','_scrollDuration','drawItemEquipType','loadSystem','CONSUMABLE','Scene_Shop_goldWindowRect','pGNSm','drawItemEffectsSelfTpGain','trim','Window_Selectable_refresh','item-%1','drawCurrencyValue','DamageType%1','Game_BattlerBase_canEquip_artifact','onCategoryCancelItemsEquipsCore','meetsItemConditionsNotetags','AyNuD','helpDesc','canShiftRemoveEquipment','_slotWindow','doSell','getItemColor','commandSellItemsEquipsCore','vbNYL','setHp','(%1)','isPressed','drawItemEffectsMpDamage','addCancelCommand','SpeedNeg1999','SPEED','setStatusWindow','getItemEffectsHpDamageLabel','ParseWeaponNotetags','_calculatingJSParameters','clearNewItem','LabelSpeed','HuLSe','Scene_Equip_statusWindowRect','cxqKs','LabelHitType','ShowShopStatus','paintOpacity','isWeapon','checkItemConditionsSwitchNotetags','New','drawText','activateItemWindow','createItemWindow','min','_buttonAssistWindow','allowCommandWindowCursorUp','push','agMyL','onTouchSelect','EVAL','Fkcti','100%','LfZNR','postCreateItemWindowModernControls','sellPriceRate','isOpen','smoothSelect','helpDescriptionText','isShiftRemoveShortcutEnabled','dkfxZ','center','getItemEffectsRemovedStatesBuffsLabel','isRightInputMode','switchProxyItem','addEquipCommand','isShowNew','ElJpU','update','NonOptimizeETypes','Parse_Notetags_EnableJS','partyArtifacts','getItemSuccessRateLabel','_newLabelSprites','Scene_Equip_createSlotWindow','drawItemKeyData','note','postCreateSlotWindowItemsEquipsCore','Window_ItemList_maxCols','SwitchBuy','Window_ShopStatus_setItem','ConvertNumberToString','SJRIf','getItemScopeText','call','ScopeRandomAllies','isBottomHelpMode','Parse_Notetags_ParamJS','VQIBx','TeWyG','EnableLayout','BXjWB','mlUyq','Type','drawItemName','maxItems','_newLabelOpacityChange','VisuMZ_1_MainMenuCore','_scene','WgQwO','Sllye','setObject','type','aKJxW','onSellCancel','commandNameWindowDrawBackground','Speed1000','KFSrz','Game_BattlerBase_paramPlus_artifact','refresh','getInputButtonString','updateHelp','getItemQuantityText','getItemDamageAmountText','Game_Party_initialize','LxWUT','YkIBH','cGAHZ','isGoodShown','object','hpphq','refreshItemsEquipsCoreNoMenuImage','CoreEngine','registerCommand','slotWindowRect','wsOjF','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','drawItemEffectsHpDamage','updatedLayoutStyle','max','VjTiR','drawItemConsumable','getItemConsumableLabel','nextActor','drawItemEffectsHpRecovery','Scene_Shop_onBuyOk','clearEquipments','XGPvy','commandNameWindowCenter','createCommandNameWindow','553624RzuAWP','HissQ','XcWtt','639cGXGNT','paramValueByName','PZafM','addLoadListener','OffsetY','Scene_Equip_commandEquip','drawNewLabelIcon','iIfot','paramId','mDgTC','commandStyle','bRnuz','ScopeRandomAny','onTouchSelectModern','RbTPg','boxWidth','TextAlign','hide','MP\x20DAMAGE','helpWindowRect','setText','RjaHl','drawItemDarkRect','placeNewLabel','rMLKb','Game_BattlerBase_meetsItemConditions','7761294NWyhsx','KawVO','actor','buyWindowRectItemsEquipsCore','QXUle','Scene_Shop_buyingPrice','BiFwP','SzCHa','setupBattleTestItems','xiKlW','sellWindowRect','jeGnb','getItemDamageAmountLabel','KFaQp','Scene_Item_create','getItemHitTypeText','lineHeight','PurchaseOnly','mainFontSize','CommandAddOptimize','dBTqw','drawTextEx','YKKXA','ItemMenuStatusBgType','Window_ItemList_colSpacing','fAKOG','Window_EquipItem_includes','WodpR','lzRwR','Scene_Shop_numberWindowRect','replace','_armorIDs','QoL','paramJS','cHkIW','MDF','qurkB','ListWindowCols','map','drawItemDamageAmount','Scene_Equip_create','Param','bind','processTouchModernControls','isProxyItem','ActorChangeEquipSlots','money','ParseItemNotetags','drawNewLabelText','drawItemSpeed','equip2','drawUpdatedAfterParamValue','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','windowPadding','elementId','odUiz','Scene_Equip_helpWindowRect','KhIkC','processCursorSpecialCheckModernControls','equipAdjustHpMp','drawItemQuantity','commandNameWindowDrawText','ehdkU','Parse_Notetags_EquipSlots','GdVgJ','Game_Actor_paramPlus','createSellWindow','qqZWA','getArmorIdWithName','mFMRJ','_list','createCategoryWindow','allowCreateStatusWindow','_newLabelOpacity','uXWMA','Translucent','gainItem','_helpWindow','cursorLeft','jtsEJ','JENcN','zFbns','ExtDisplayedParams','_purchaseOnly','drawParamsItemsEquipsCore','isCommandEnabled','addStateBuffChanges','ElementWeapon','consumable','setTopRow','EquipParams','twOKY','kobuD','shouldCommandWindowExist','convertInitEquipsToItems','contents','JSON','Window_ItemList_item','updateCategoryNameWindow','currencyUnit','includes','RegExp','NvRSq','isEquipChangeOk','OIiyC','getItemDamageAmountTextBattleCore','cursorPagedown','adjustHiddenShownGoods','tpGain','statusWidth','XOWVI','PePAc','_newLabelOpacityUpperLimit','RkYwD','armor-%1','BNCCb','show','createStatusWindow','gBNoj','Parse_Notetags_Prices','HxHmH','Scene_Shop_prepare','xcMXa','isMainMenuCoreMenuImageOptionAvailable','LabelSuccessRate','equips','mtFYW','MaxHP','name','getProxyItem','uiMenuStyle','NonRemoveETypes','iFKxY','isCancelled','JitMQ','iconWidth','nonOptimizeEtypes','setValue','ItemsEquipsCore','drawItemEffectsAddedStatesBuffs','clearNewLabelFromItem','QFDEq','wxuaL','alterSkillName','MQFke','meetsItemConditions','GnNoN','NhOUk','selfTP','Window_ShopCommand_initialize','Window_EquipItem_isEnabled','Blacklist','HiddenItemA','isTriggered','WIZOl','HbACs','tCCLG','buttonAssistKey1','Game_Actor_artifact','Scene_ItemBase_activateItemWindow','MaxMP','categoryNameWindowDrawBackground','CmdCancelRename','Scene_Boot_onDatabaseLoaded','hideNewLabelSprites','index','Parse_Notetags_Category','itemWindowRectItemsEquipsCore','#%1','Categories','iconText','Window_ItemList_drawItem','successRate','isOpenAndActive','hsOKa','vxCFB','Step3End','createCategoryNameWindow','ItemMenuStatusRect','isStackableArtifact','JHQKu','addSellCommand','Game_Enemy_traitObjects_artifact','ActorResetEquipSlots','concat','_bypassProxy','HOvEq','ParseArmorNotetags','mainCommandWidth','isCursorMovable','isSellCommandEnabled','CmdIconOptimize','defaultItemMax','getItemDamageElementText','Window_ItemCategory_initialize','SetupProxyItemGroups','Window_ItemCategory_setItemWindow','drawItemData','getItemEffectsMpRecoveryText','artifacts','flatHP','GqMQu','textWidth','QlVAB','getItemEffectsAddedStatesBuffsText','ARRAYEVAL','setHelpWindowItem','mpRate','deactivate','drawItem','createBitmap','drawing','RNEwl','isItem','drawUpdatedBeforeParamValue','fill','innerHeight','hitIndex','icon','itypeId','Scene_Item_categoryWindowRect','CmdIconCancel','prototype','CmdHideDisabled','HaOFi','getItemDamageAmountLabelOriginal','innerWidth','ePggQ','glttu','_commandWindow','VsIfr','isSkill','test','formula','buttonAssistCategory','top','Scene_Shop_onCategoryCancel','_shopStatusMenuAlly','yunHe','Scene_Shop_commandSell','effects','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','HIT\x20TYPE','Scene_Equip_createCommandWindow','Window_Selectable_update','onTouchSelectModernControls','xrDSZ','laVIT','GECnT','isRepeated','indexOf','Scene_Item_itemWindowRect','_equips','qXKWR','AlwaysUsable','kFVya','_data','item','prepare','eOCTb','tuHAw','onActorChange','powerUpColor','Window_EquipStatus_refresh','uOMWO','Actors','deselect','onBuyCancel','onBuyOk','isHandled','0000','setupItemDamageTempActors','getItemEffectsHpRecoveryLabel','round','Icon','postCreateCategoryWindowItemsEquipsCore','height','DbGfc','postCreateSellWindowItemsEquipsCore','optimizeEquipments','nfNIq','onSlotOk','onCategoryCancel','Game_Actor_discardEquip','colSpacing','YZqox','_buyWindowLastIndex','XprIL','isKeyItem','Enable','isHovered','prepareRefreshItemsEquipsCoreLayout','Bczdw','ConvertParams','eZwZg','vkRKR','callUpdateHelp','Parse_Notetags_ParamValues','isPlaytest','_tempActor','yGGjl','addState','ItemSceneAdjustItemList','initNewItemsList','ELEMENT','cReGP','maxCols','EFFECT_RECOVER_HP','value1','getInputMultiButtonStrings','getItemEffectsTpDamageLabel','setShopStatusWindowMode','DEF','mdNkl','flatMP','isEquipCommandEnabled','VKXkD','drawItemEffectsTpDamage','getItemEffectsTpDamageText','drawItemCustomEntryLine','glfXu','Consumable','yVlHN','isNewItem','_category','xhPEy','JZbPA','_itemData','Window_Selectable_setHelpWindowItem','armors','down','Zckyb','TqdJp','toLowerCase','HitType%1','LUK','svtWe','\x5cI[%1]%2','LabelRepeats','EFFECT_ADD_STATE','helpWindowRectItemsEquipsCore','Scene_Shop_categoryWindowRect','bAyDr','bitmap','helpAreaHeight','dUPpz','price','nsJLO','_customItemInfo','addWindow','adjustItemWidthByStatus','AllWeapons','commandWindowRectItemsEquipsCore','code','1849035ncPfTr','CmdIconBuy','XWFPv','YFzJw','battleMembers','daqqh','sellPriceOfItem','KeyItems','getItemEffectsHpRecoveryText','ezamV','GGENw','ITEMS_EQUIPS_CORE','DXUta','lflEk','sellingPrice','Scene_Shop_createCategoryWindow','BatchShop','atypeId','buttonAssistKey3','Ebqmf','normalColor','W%1','drawItemEffectsRemovedStatesBuffs','mainAreaHeight','makeItemData','getItemEffectsSelfTpGainText','visible','LabelConsume','maxItemAmount','setHelpWindow','categoryNameWindowDrawText','equipSlots','releaseUnequippableItems','isClicked','STR','prepareItemCustomData','Game_Party_gainItem','NaoYK','reloadMapIfUpdated','processDrawIcon','LabelApply','GILpZ','changeBuff','processShiftRemoveShortcut','addItemCategory','\x5cI[%1]','onSlotCancel','getItemEffectsRemovedStatesBuffsText','isTroopArtifact','qNnTj','iconHeight','itemTextAlign','isUseItemsEquipsCoreUpdatedLayout','PGAWx','clamp','phafC','_statusWindow','numberWindowRectItemsEquipsCore','isShiftShortcutKeyForRemove','rateMP','KwYTT','isOptimizeCommandEnabled','ROxQI','XxdpU','categoryNameWindowCenter','_money','_resetFontColor','Window_ShopSell_isEnabled','rateHP','status','nMGfW','KoSmA','categoryItemTypes','_numberWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','afmNS','createSlotWindow','itemEnableJS','%1-%2','currentSymbol','dTwyK','CDNxO','ParamValueFontSize','buy','_dummyWindow','ParamChangeFontSize','setCategory','BIBsl','value2','GgtUC','LayoutStyle','EFFECT_ADD_BUFF','pXZJc','itemLineRect','gfvyw','vvcct','buttonAssistText3','version','fXyNf','getItemEffectsAddedStatesBuffsLabel','getMenuImage','getItemRepeatsText','yVYDU','ItemScene','getMatchingInitEquip','MauYx','BorderRegExp','commandEquip','maxBattleMembers','drawIcon','isEnabled','MoXoz','hideDisabledCommands','556392ftvqER','FieldUsable','isEquipCommandAdded','yFFCE','AllItems','jvIHU','MEYho','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Width','vpEaO','SLCGW','getWeaponIdWithName','mESmG','CwIbr','playCursorSound','setItem','mainAreaBottom','MxIYQ','getDamageStyle','left','QkItM','_newItemsList','getItemEffectsSelfTpGainLabel','itemHasEquipLimit','nonRemovableEtypes','equipTypes','wtypeId','vliYi','categoryWindowRect','VisuMZ_1_BattleCore','itemDataFontSize','Scene_Load_reloadMapIfUpdated','ZcUJu'];_0x421a=function(){return _0x258abe;};return _0x421a();}Sprite_NewLabel[_0x220c41(0x4a1)]=Object[_0x220c41(0x29d)](Sprite[_0x220c41(0x4a1)]),Sprite_NewLabel[_0x220c41(0x4a1)][_0x220c41(0x1e7)]=Sprite_NewLabel,Sprite_NewLabel[_0x220c41(0x4a1)][_0x220c41(0x600)]=function(){const _0x1dd849=_0x220c41;Sprite['prototype'][_0x1dd849(0x600)]['call'](this),this[_0x1dd849(0x495)]();},Sprite_NewLabel[_0x220c41(0x4a1)][_0x220c41(0x495)]=function(){const _0x4ab449=_0x220c41,_0x58fad6=ImageManager[_0x4ab449(0x44a)],_0x543dd4=ImageManager[_0x4ab449(0x557)];this[_0x4ab449(0x51a)]=new Bitmap(_0x58fad6,_0x543dd4),this[_0x4ab449(0x3af)](),this[_0x4ab449(0x3f3)]();},Sprite_NewLabel[_0x220c41(0x4a1)][_0x220c41(0x3af)]=function(){const _0x38ac2d=_0x220c41,_0x418f07=VisuMZ[_0x38ac2d(0x44d)][_0x38ac2d(0x22a)][_0x38ac2d(0x342)]['Icon'];if(_0x418f07<=0x0)return;const _0x45ea00=ImageManager['loadSystem'](_0x38ac2d(0x17c)),_0x5c19e2=ImageManager[_0x38ac2d(0x44a)],_0x308109=ImageManager[_0x38ac2d(0x557)],_0x212f85=_0x418f07%0x10*_0x5c19e2,_0x4babf3=Math[_0x38ac2d(0x27a)](_0x418f07/0x10)*_0x308109;this[_0x38ac2d(0x51a)][_0x38ac2d(0x655)](_0x45ea00,_0x212f85,_0x4babf3,_0x5c19e2,_0x308109,0x0,0x0);},Sprite_NewLabel['prototype'][_0x220c41(0x3f3)]=function(){const _0x4843b5=_0x220c41,_0x4f56a8=VisuMZ[_0x4843b5(0x44d)][_0x4843b5(0x22a)]['New'],_0x3563e6=_0x4f56a8['Text'];if(_0x3563e6==='')return;const _0x2bd3b6=ImageManager[_0x4843b5(0x44a)],_0x26a51c=ImageManager[_0x4843b5(0x557)];this[_0x4843b5(0x51a)][_0x4843b5(0x60d)]=_0x4f56a8[_0x4843b5(0x24e)]||$gameSystem[_0x4843b5(0x642)](),this[_0x4843b5(0x51a)][_0x4843b5(0x193)]=this[_0x4843b5(0x1d8)](),this[_0x4843b5(0x51a)][_0x4843b5(0x5f6)]=_0x4f56a8['FontSize'],this[_0x4843b5(0x51a)][_0x4843b5(0x343)](_0x3563e6,0x0,_0x26a51c/0x2,_0x2bd3b6,_0x26a51c/0x2,_0x4843b5(0x357));},Sprite_NewLabel['prototype'][_0x220c41(0x1d8)]=function(){const _0x5d1f57=_0x220c41,_0x2e2c31=VisuMZ[_0x5d1f57(0x44d)][_0x5d1f57(0x22a)][_0x5d1f57(0x342)][_0x5d1f57(0x254)];return _0x2e2c31[_0x5d1f57(0x17d)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x5d1f57(0x193)](_0x2e2c31);},Window_Base[_0x220c41(0x4a1)][_0x220c41(0x378)]=function(_0x2743d5,_0x3bcd3e,_0x46c21f,_0x2affaf){const _0x2c0c03=_0x220c41;if(_0x2743d5){const _0x45f577=_0x46c21f+(this[_0x2c0c03(0x3d3)]()-ImageManager[_0x2c0c03(0x557)])/0x2,_0x1f0f92=ImageManager['iconWidth']+0x4,_0x564ef7=Math['max'](0x0,_0x2affaf-_0x1f0f92);this[_0x2c0c03(0x1e5)](ColorManager[_0x2c0c03(0x32a)](_0x2743d5)),this[_0x2c0c03(0x592)](_0x2743d5[_0x2c0c03(0x1e3)],_0x3bcd3e,_0x45f577),this[_0x2c0c03(0x343)](_0x2743d5['name'],_0x3bcd3e+_0x1f0f92,_0x46c21f,_0x564ef7),this[_0x2c0c03(0x5f1)]();}},Window_Base[_0x220c41(0x4a1)][_0x220c41(0x192)]=function(_0x4be4bc,_0x2e5707,_0x476389,_0x57b977){const _0x4476ad=_0x220c41;if(this['isDrawItemNumber'](_0x4be4bc)){if(_0x4476ad(0x3c4)===_0x4476ad(0x5bb)){const _0x945d36=_0xfee819[_0x4476ad(0x318)](_0x4476ad(0x17c)),_0x526a33=_0x52b409[_0x4476ad(0x44a)],_0x171ae3=_0x289d32[_0x4476ad(0x557)],_0x3a9f2e=_0x1df6dc%0x10*_0x526a33,_0x345bd9=_0x221087[_0x4476ad(0x27a)](_0x3d2950/0x10)*_0x171ae3,_0x16a8d4=_0x393670[_0x4476ad(0x28e)](_0x526a33*this[_0x4476ad(0x609)]()),_0x5736ff=_0x550431[_0x4476ad(0x28e)](_0x171ae3*this[_0x4476ad(0x609)]());this['contents'][_0x4476ad(0x655)](_0x945d36,_0x3a9f2e,_0x345bd9,_0x526a33,_0x171ae3,_0x10d1ca,_0x4602a6,_0x16a8d4,_0x5736ff);}else{this[_0x4476ad(0x27e)]();const _0x55f5a0=VisuMZ[_0x4476ad(0x44d)][_0x4476ad(0x22a)][_0x4476ad(0x58c)],_0x3f1044=_0x55f5a0['ItemQuantityFmt'],_0x4c9374=_0x3f1044[_0x4476ad(0x22d)]($gameParty[_0x4476ad(0x280)](_0x4be4bc));this[_0x4476ad(0x422)]['fontSize']=_0x55f5a0['ItemQuantityFontSize'],this[_0x4476ad(0x343)](_0x4c9374,_0x2e5707,_0x476389,_0x57b977,_0x4476ad(0x28c)),this['resetFontSettings']();}}},Window_Base[_0x220c41(0x4a1)][_0x220c41(0x617)]=function(_0x1019a4){const _0x39d00e=_0x220c41;if(DataManager['isKeyItem'](_0x1019a4))return $dataSystem[_0x39d00e(0x622)];return!![];},Window_Base[_0x220c41(0x4a1)][_0x220c41(0x3bf)]=function(_0x61734a,_0x14ede9,_0x57bd03,_0x3ac8e6,_0xdb8bb6){const _0x1be6d5=_0x220c41;_0xdb8bb6=Math[_0x1be6d5(0x39b)](_0xdb8bb6||0x1,0x1);while(_0xdb8bb6--){if(_0x1be6d5(0x57e)!=='GgtUC'){_0x2abc13+='\x5cI[%1]'[_0x1be6d5(0x22d)](_0x2c9f1e[_0x1be6d5(0x1e3)]),_0x5bfb65++;if(_0x293e88>=_0x10af9a)return _0x4bbfa5;}else{_0x3ac8e6=_0x3ac8e6||this[_0x1be6d5(0x3d3)](),this[_0x1be6d5(0x228)][_0x1be6d5(0x33f)]=0xa0;const _0xb41671=ColorManager[_0x1be6d5(0x259)]();this[_0x1be6d5(0x228)]['fillRect'](_0x61734a+0x1,_0x14ede9+0x1,_0x57bd03-0x2,_0x3ac8e6-0x2,_0xb41671),this[_0x1be6d5(0x228)][_0x1be6d5(0x33f)]=0xff;}}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x1be)]=Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x600)],Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x600)]=function(_0x51b826){const _0x52ea13=_0x220c41;this[_0x52ea13(0x309)](),VisuMZ[_0x52ea13(0x44d)][_0x52ea13(0x1be)]['call'](this,_0x51b826);},Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x309)]=function(){const _0x26d97c=_0x220c41;this[_0x26d97c(0x363)]={},this['_newLabelOpacity']=0xff,this[_0x26d97c(0x37a)]=VisuMZ[_0x26d97c(0x44d)]['Settings'][_0x26d97c(0x342)][_0x26d97c(0x2bf)],this[_0x26d97c(0x433)]=VisuMZ[_0x26d97c(0x44d)]['Settings'][_0x26d97c(0x342)][_0x26d97c(0x63d)];},Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x35c)]=function(){return![];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x50b)]=Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x491)],Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x491)]=function(_0x286dee){const _0xd7d8d1=_0x220c41;VisuMZ[_0xd7d8d1(0x44d)][_0xd7d8d1(0x50b)][_0xd7d8d1(0x36e)](this,_0x286dee);if(this['isShowNew']())this['clearNewLabelFromItem'](_0x286dee);},Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x44f)]=function(_0x152f44){const _0x243268=_0x220c41;if(!_0x152f44)return;$gameParty[_0x243268(0x338)](_0x152f44);let _0x4d9193='';if(DataManager[_0x243268(0x498)](_0x152f44))_0x4d9193=_0x243268(0x31f)[_0x243268(0x22d)](_0x152f44['id']);else{if(DataManager[_0x243268(0x340)](_0x152f44))_0x243268(0x376)!==_0x243268(0x203)?_0x4d9193=_0x243268(0x2c9)[_0x243268(0x22d)](_0x152f44['id']):_0x449273[_0x243268(0x5fc)]();else{if(DataManager['isArmor'](_0x152f44))_0x4d9193=_0x243268(0x435)['format'](_0x152f44['id']);else return;}}const _0x186730=this[_0x243268(0x363)][_0x4d9193];if(_0x186730)_0x186730[_0x243268(0x3ba)]();},VisuMZ['ItemsEquipsCore']['Window_Selectable_refresh']=Window_Selectable[_0x220c41(0x4a1)]['refresh'],Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x387)]=function(){const _0x128ad9=_0x220c41;this[_0x128ad9(0x467)](),VisuMZ[_0x128ad9(0x44d)][_0x128ad9(0x31e)][_0x128ad9(0x36e)](this);},Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x467)]=function(){const _0x1e2efa=_0x220c41;for(const _0x29ee0c of Object['values'](this[_0x1e2efa(0x363)])){_0x29ee0c[_0x1e2efa(0x3ba)]();}},VisuMZ['ItemsEquipsCore'][_0x220c41(0x4b7)]=Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x35e)],Window_Selectable[_0x220c41(0x4a1)]['update']=function(){const _0x4447c5=_0x220c41;this['updateNewLabelOpacity'](),VisuMZ[_0x4447c5(0x44d)][_0x4447c5(0x4b7)][_0x4447c5(0x36e)](this);},Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x1c4)]=function(){const _0x1294d2=_0x220c41;if(!this[_0x1294d2(0x35c)]())return;const _0x32ca89=this[_0x1294d2(0x433)];this[_0x1294d2(0x40c)]+=this[_0x1294d2(0x37a)];(this[_0x1294d2(0x40c)]>=_0x32ca89||this[_0x1294d2(0x40c)]<=0x0)&&(this[_0x1294d2(0x37a)]*=-0x1);this[_0x1294d2(0x40c)]=this[_0x1294d2(0x40c)]['clamp'](0x0,_0x32ca89);for(const _0x1a48a6 of Object['values'](this[_0x1294d2(0x363)])){_0x1a48a6[_0x1294d2(0x267)]=this['_newLabelOpacity'];}},Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x5d2)]=function(_0x456827){const _0x2ab788=_0x220c41,_0x1d2f21=this[_0x2ab788(0x363)];if(_0x1d2f21[_0x456827])return _0x1d2f21[_0x456827];else{if(_0x2ab788(0x3fa)!=='lkuhf'){const _0x1f45f6=new Sprite_NewLabel();return _0x1d2f21[_0x456827]=_0x1f45f6,this[_0x2ab788(0x313)](_0x1f45f6),_0x1f45f6;}else return _0x251ce0[_0x2ab788(0x44d)]['Settings']['EquipScene'][_0x2ab788(0x3d6)];}},Window_Selectable[_0x220c41(0x4a1)][_0x220c41(0x3c0)]=function(_0x55bf71,_0x502be7,_0xb8524a){const _0x54e70f=_0x220c41;let _0x1fda84='';if(DataManager['isItem'](_0x55bf71))_0x1fda84=_0x54e70f(0x31f)['format'](_0x55bf71['id']);else{if(DataManager[_0x54e70f(0x340)](_0x55bf71))_0x1fda84=_0x54e70f(0x2c9)['format'](_0x55bf71['id']);else{if(DataManager[_0x54e70f(0x5e6)](_0x55bf71))_0x1fda84=_0x54e70f(0x435)[_0x54e70f(0x22d)](_0x55bf71['id']);else{if('vSLEn'!==_0x54e70f(0x3dc))return;else for(const _0x4f0d01 of _0x8e3dd1[_0x54e70f(0x5af)]){const _0x322d1e=_0xce5356[_0x54e70f(0x5af)][_0x54e70f(0x4bd)](_0x4f0d01[_0x54e70f(0x31d)]());if(_0x322d1e>0x0)_0x15456c['equipSlots'][_0x54e70f(0x349)](_0x322d1e);}}}}const _0x5d2f98=this[_0x54e70f(0x5d2)](_0x1fda84);_0x5d2f98[_0x54e70f(0x652)](_0x502be7,_0xb8524a),_0x5d2f98['show'](),_0x5d2f98[_0x54e70f(0x267)]=this[_0x54e70f(0x40c)];},Window_ItemCategory[_0x220c41(0x2b6)]=VisuMZ[_0x220c41(0x44d)]['Settings']['Categories']['List'],Window_ItemCategory['categoryItemTypes']=[_0x220c41(0x45b),_0x220c41(0x212),_0x220c41(0x209),_0x220c41(0x504),'AlwaysUsable',_0x220c41(0x25b),_0x220c41(0x597),'NeverUsable'],VisuMZ[_0x220c41(0x44d)]['Window_ItemCategory_initialize']=Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x600)],Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x600)]=function(_0x1183b1){const _0x5400ef=_0x220c41;VisuMZ[_0x5400ef(0x44d)][_0x5400ef(0x485)][_0x5400ef(0x36e)](this,_0x1183b1),this[_0x5400ef(0x474)](_0x1183b1);},Window_ItemCategory['prototype'][_0x220c41(0x474)]=function(_0x49ca50){const _0xae7960=_0x220c41,_0x38cdae=new Rectangle(0x0,0x0,_0x49ca50[_0xae7960(0x2c3)],_0x49ca50[_0xae7960(0x4d7)]);this['_categoryNameWindow']=new Window_Base(_0x38cdae),this[_0xae7960(0x633)][_0xae7960(0x267)]=0x0,this['addChild'](this[_0xae7960(0x633)]),this['updateCategoryNameWindow']();},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x23c)]=function(){const _0x1ae488=_0x220c41;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x1ae488(0x4a1)][_0x1ae488(0x23c)][_0x1ae488(0x36e)](this);},Window_ItemCategory[_0x220c41(0x4a1)]['processCursorHomeEndTrigger']=function(){},Window_ItemCategory['prototype'][_0x220c41(0x223)]=function(){const _0x5320c3=_0x220c41;if(!this[_0x5320c3(0x23c)]())Window_HorzCommand['prototype']['playOkSound'][_0x5320c3(0x36e)](this);},Window_ItemCategory[_0x220c41(0x4a1)]['maxCols']=function(){const _0x357bdf=_0x220c41;return this[_0x357bdf(0x409)]?this[_0x357bdf(0x379)]():0x4;},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x35e)]=function(){const _0x154851=_0x220c41;Window_HorzCommand[_0x154851(0x4a1)][_0x154851(0x35e)][_0x154851(0x36e)](this),this[_0x154851(0x258)]&&(_0x154851(0x406)==='qqZWA'?this[_0x154851(0x258)][_0x154851(0x57b)](this['currentExt']()):_0x35e9cc[_0x154851(0x349)](_0x3c25ce));},Window_ItemCategory[_0x220c41(0x4a1)]['processCursorMoveModernControls']=function(){const _0x4bc4b8=_0x220c41;if(this[_0x4bc4b8(0x480)]()){if(_0x4bc4b8(0x1e4)==='nyczV')this['cursorDown'](_0x3f9012['isTriggered'](_0x4bc4b8(0x50d)));else{const _0x50fcec=this[_0x4bc4b8(0x468)]();if(this[_0x4bc4b8(0x258)]&&this[_0x4bc4b8(0x258)]['maxCols']()<=0x1)Input[_0x4bc4b8(0x4bc)](_0x4bc4b8(0x28c))&&(_0x4bc4b8(0x2d0)!==_0x4bc4b8(0x2d0)?(_0x5d77f3['a']=_0x118f2b,_0x21a7fc['b']=_0x207343):this['cursorRight'](Input['isTriggered'](_0x4bc4b8(0x28c)))),Input[_0x4bc4b8(0x4bc)](_0x4bc4b8(0x5a9))&&this[_0x4bc4b8(0x411)](Input[_0x4bc4b8(0x45c)](_0x4bc4b8(0x5a9)));else this[_0x4bc4b8(0x258)]&&this[_0x4bc4b8(0x258)]['maxCols']()>0x1&&(Input[_0x4bc4b8(0x4bc)](_0x4bc4b8(0x2e3))&&!Input[_0x4bc4b8(0x32f)](_0x4bc4b8(0x185))&&this[_0x4bc4b8(0x1af)](Input[_0x4bc4b8(0x45c)]('pagedown')),Input[_0x4bc4b8(0x4bc)](_0x4bc4b8(0x5e5))&&!Input['isPressed']('shift')&&(_0x4bc4b8(0x532)!==_0x4bc4b8(0x532)?this[_0x4bc4b8(0x218)](_0x2257c9):this[_0x4bc4b8(0x411)](Input[_0x4bc4b8(0x45c)](_0x4bc4b8(0x5e5)))));if(this[_0x4bc4b8(0x468)]()!==_0x50fcec){if('HqItl'!==_0x4bc4b8(0x1f3))return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x4bc4b8(0x1de)]():_0x4618db[_0x4bc4b8(0x44d)][_0x4bc4b8(0x518)][_0x4bc4b8(0x36e)](this);else this['playCursorSound']();}}}},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x240)]=function(){const _0xcf5271=_0x220c41;if(this['isUseModernControls']())return;Window_HorzCommand[_0xcf5271(0x4a1)][_0xcf5271(0x240)][_0xcf5271(0x36e)](this);},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x214)]=function(){const _0x4da7e7=_0x220c41;if(this[_0x4da7e7(0x23c)]())return'EOYQM'!=='EOYQM'?_0xf55b22[_0x4da7e7(0x1d7)]&&_0x4bf158['prototype'][_0x4da7e7(0x23c)][_0x4da7e7(0x36e)](this):![];else{if('yGGjl'===_0x4da7e7(0x4ef))return Window_HorzCommand[_0x4da7e7(0x4a1)][_0x4da7e7(0x214)][_0x4da7e7(0x36e)](this);else{let _0x21d676=_0x5abeca['ItemsEquipsCore'][_0x4da7e7(0x386)]['call'](this,_0x4238b4);if(this[_0x4da7e7(0x1e7)]===_0x3ecade)for(const _0x445929 of _0xff8ace['troopArtifacts']()){if(_0x445929)_0x21d676+=_0x445929['params'][_0x1d16b5];}return _0x21d676;}}},Window_ItemCategory[_0x220c41(0x4a1)]['processTouchModernControls']=function(){const _0x1a6a58=_0x220c41;if(this[_0x1a6a58(0x470)]()){TouchInput['isTriggered']()&&this['onTouchSelect'](!![]);if(TouchInput[_0x1a6a58(0x546)]())this[_0x1a6a58(0x647)]();else TouchInput[_0x1a6a58(0x448)]()&&(_0x1a6a58(0x583)===_0x1a6a58(0x583)?this[_0x1a6a58(0x613)]():(this[_0x1a6a58(0x1e5)](_0x1e2318[_0x1a6a58(0x641)]()),this[_0x1a6a58(0x343)](_0x20e263['param'](_0x104564),_0x41607e,_0x459b8c,_0x1a6ab8)));}},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x34b)]=function(_0x3e58d6){const _0x35df39=_0x220c41;this['isUseModernControls']()?this[_0x35df39(0x3b6)](!![]):Window_HorzCommand[_0x35df39(0x4a1)]['onTouchSelect'][_0x35df39(0x36e)](this,_0x3e58d6);},Window_ItemCategory[_0x220c41(0x4a1)]['onTouchSelectModern']=function(_0x54ef01){const _0x39060d=_0x220c41;this['_doubleTouch']=![];if(this[_0x39060d(0x480)]()){const _0x31906c=this[_0x39060d(0x468)](),_0x1ea933=this['hitIndex']();_0x1ea933>=0x0&&_0x1ea933!==this[_0x39060d(0x468)]()&&this[_0x39060d(0x64a)](_0x1ea933),_0x54ef01&&this[_0x39060d(0x468)]()!==_0x31906c&&this[_0x39060d(0x5a4)]();}},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x2b1)]=function(){const _0x25da54=_0x220c41;this[_0x25da54(0x5bf)](),this[_0x25da54(0x64a)](this[_0x25da54(0x468)]());},Window_ItemCategory['prototype'][_0x220c41(0x5bf)]=function(){const _0x3da676=_0x220c41;for(const _0x5b7797 of Window_ItemCategory[_0x3da676(0x2b6)]){if(_0x3da676(0x5cc)!==_0x3da676(0x5a0))this['addItemCategory'](_0x5b7797);else{if(_0x241b5e[_0x3da676(0x3ef)](_0x5d601d))_0x3fae47=_0x2bee91[_0x3da676(0x444)](_0x345537);return _0x3f5442[_0x3da676(0x541)](_0x42420d);}}},Window_ItemCategory['prototype'][_0x220c41(0x551)]=function(_0x40614d){const _0x37d748=_0x220c41,_0x54fd7d=_0x40614d[_0x37d748(0x377)],_0x224eb1=_0x40614d[_0x37d748(0x4d5)],_0x3b16ab=_0x40614d[_0x37d748(0x5c9)]||0x0;if(_0x3b16ab>0x0&&!$gameSwitches['value'](_0x3b16ab))return;let _0x34f3d9='',_0x25f76a='category',_0x7171b=_0x54fd7d;if(_0x54fd7d[_0x37d748(0x17d)](/Category:(.*)/i))_0x34f3d9=String(RegExp['$1'])[_0x37d748(0x31d)]();else{if(Window_ItemCategory[_0x37d748(0x56d)][_0x37d748(0x427)](_0x54fd7d))_0x34f3d9=VisuMZ[_0x37d748(0x44d)]['Settings'][_0x37d748(0x46c)][_0x54fd7d];else{if([_0x37d748(0x59a),_0x37d748(0x213)][_0x37d748(0x427)](_0x54fd7d))'UMqpn'==='UMqpn'?_0x34f3d9=TextManager['item']:(_0x5ba180[_0x37d748(0x44d)][_0x37d748(0x38c)][_0x37d748(0x36e)](this),this[_0x37d748(0x4f2)]());else{if(_0x54fd7d===_0x37d748(0x52c))_0x37d748(0x37d)===_0x37d748(0x576)?this[_0x37d748(0x1e1)]():_0x34f3d9=TextManager[_0x37d748(0x5bc)];else{if(_0x54fd7d===_0x37d748(0x522))_0x34f3d9=TextManager['weapon'];else{if(_0x54fd7d===_0x37d748(0x5c2)){if(_0x37d748(0x60f)===_0x37d748(0x1cd)){if(_0x49e1b1!==_0x22f899)return;if(_0x23eed2[_0x37d748(0x366)][_0x37d748(0x17d)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x68d888=_0x313729(_0x1be48f['$1']),_0x25fb25=_0x37d748(0x56f)[_0x37d748(0x22d)](_0x68d888);_0xee4365[_0x37d748(0x44d)][_0x37d748(0x572)][_0x3a1636['id']]=new _0x4f7cd2('item',_0x25fb25);}}else _0x34f3d9=TextManager['armor'];}else{if(_0x54fd7d[_0x37d748(0x17d)](/WTYPE:(\d+)/i))_0x34f3d9=$dataSystem['weaponTypes'][Number(RegExp['$1'])]||'';else{if(_0x54fd7d[_0x37d748(0x17d)](/ATYPE:(\d+)/i)){if(_0x37d748(0x52f)!==_0x37d748(0x50e))_0x34f3d9=$dataSystem[_0x37d748(0x1f1)][Number(RegExp['$1'])]||'';else return this['index']();}else _0x54fd7d[_0x37d748(0x17d)](/ETYPE:(\d+)/i)&&(_0x34f3d9=$dataSystem[_0x37d748(0x5af)][Number(RegExp['$1'])]||'');}}}}}}}_0x224eb1>0x0&&this['categoryStyle']()!=='text'&&('NcChY'===_0x37d748(0x43d)?this[_0x37d748(0x5c4)](_0x2c458e):_0x34f3d9=_0x37d748(0x514)[_0x37d748(0x22d)](_0x224eb1,_0x34f3d9)),this['addCommand'](_0x34f3d9,_0x25f76a,!![],_0x7171b);},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x558)]=function(){const _0x1c545b=_0x220c41;return VisuMZ[_0x1c545b(0x44d)]['Settings'][_0x1c545b(0x46c)][_0x1c545b(0x3b9)];},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x494)]=function(_0x3ba54c){const _0x47d98c=_0x220c41,_0x4f750d=this[_0x47d98c(0x2e7)](_0x3ba54c);if(_0x4f750d===_0x47d98c(0x46d))this[_0x47d98c(0x5c4)](_0x3ba54c);else _0x4f750d===_0x47d98c(0x49d)?_0x47d98c(0x4a7)!==_0x47d98c(0x27d)?this[_0x47d98c(0x218)](_0x3ba54c):(_0x56712e[_0x47d98c(0x4bc)](_0x47d98c(0x28c))&&this[_0x47d98c(0x1af)](_0x461008[_0x47d98c(0x45c)]('right')),_0x348b45['isRepeated'](_0x47d98c(0x5a9))&&this[_0x47d98c(0x411)](_0x61bf1b[_0x47d98c(0x45c)](_0x47d98c(0x5a9)))):Window_HorzCommand[_0x47d98c(0x4a1)][_0x47d98c(0x494)][_0x47d98c(0x36e)](this,_0x3ba54c);},Window_ItemCategory[_0x220c41(0x4a1)]['categoryStyle']=function(){const _0x400203=_0x220c41;return VisuMZ[_0x400203(0x44d)][_0x400203(0x22a)][_0x400203(0x46c)]['Style'];},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x2e7)]=function(_0x3b0cd3){const _0x1b1d52=_0x220c41;if(_0x3b0cd3<0x0)return _0x1b1d52(0x5d0);const _0x3760a9=this['categoryStyle']();if(_0x3760a9!==_0x1b1d52(0x2d9))return _0x3760a9;else{if(_0x1b1d52(0x1b8)===_0x1b1d52(0x61d))return _0x299308[_0x1b1d52(0x44d)][_0x1b1d52(0x235)][_0x1b1d52(0x36e)](this);else{const _0x184e77=this[_0x1b1d52(0x623)](_0x3b0cd3);if(_0x184e77[_0x1b1d52(0x17d)](/\\I\[(\d+)\]/i)){const _0x33fc66=this[_0x1b1d52(0x582)](_0x3b0cd3),_0x122392=this[_0x1b1d52(0x282)](_0x184e77)[_0x1b1d52(0x2c3)];return _0x122392<=_0x33fc66['width']?_0x1b1d52(0x46d):_0x1b1d52(0x49d);}else return _0x1b1d52(0x5d0);}}},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x5c4)]=function(_0x2c1ded){const _0x40c02a=_0x220c41,_0x387d3d=this[_0x40c02a(0x582)](_0x2c1ded),_0x3adc79=this['commandName'](_0x2c1ded),_0x4ba673=this['textSizeEx'](_0x3adc79)['width'];this[_0x40c02a(0x1a7)](this[_0x40c02a(0x418)](_0x2c1ded));const _0x2861d8=this[_0x40c02a(0x558)]();if(_0x2861d8==='right')this['drawTextEx'](_0x3adc79,_0x387d3d['x']+_0x387d3d[_0x40c02a(0x2c3)]-_0x4ba673,_0x387d3d['y'],_0x4ba673);else{if(_0x2861d8===_0x40c02a(0x357)){if('fYHub'!==_0x40c02a(0x261)){if(_0x4a36aa)_0x4022a9+=_0x390077['params'][_0x5f4647];}else{const _0x5296b1=_0x387d3d['x']+Math[_0x40c02a(0x27a)]((_0x387d3d['width']-_0x4ba673)/0x2);this['drawTextEx'](_0x3adc79,_0x5296b1,_0x387d3d['y'],_0x4ba673);}}else this[_0x40c02a(0x3d8)](_0x3adc79,_0x387d3d['x'],_0x387d3d['y'],_0x4ba673);}},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x218)]=function(_0xcfb49a){const _0x5f3c64=_0x220c41,_0x5178a0=this[_0x5f3c64(0x623)](_0xcfb49a);if(_0x5178a0[_0x5f3c64(0x17d)](/\\I\[(\d+)\]/i)){if(_0x5f3c64(0x232)!==_0x5f3c64(0x61b)){const _0x385073=Number(RegExp['$1'])||0x0,_0x5e36ea=this['itemLineRect'](_0xcfb49a),_0x3dc1eb=_0x5e36ea['x']+Math['floor']((_0x5e36ea['width']-ImageManager[_0x5f3c64(0x44a)])/0x2),_0x501f4f=_0x5e36ea['y']+(_0x5e36ea[_0x5f3c64(0x4d7)]-ImageManager[_0x5f3c64(0x557)])/0x2;this[_0x5f3c64(0x592)](_0x385073,_0x3dc1eb,_0x501f4f);}else _0xa2e4ac[_0x5f3c64(0x44d)][_0x5f3c64(0x47e)][_0x5f3c64(0x36e)](this,_0x1306be),_0x2ef223[_0x5f3c64(0x44d)][_0x5f3c64(0x616)](_0xe957f6,_0x22b4dc);}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x487)]=Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x64c)],Window_ItemCategory[_0x220c41(0x4a1)]['setItemWindow']=function(_0x5b021a){const _0x3da870=_0x220c41;VisuMZ[_0x3da870(0x44d)][_0x3da870(0x487)]['call'](this,_0x5b021a),_0x5b021a[_0x3da870(0x5fb)]=this;},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x4eb)]=function(){const _0x262860=_0x220c41;Window_HorzCommand[_0x262860(0x4a1)][_0x262860(0x4eb)][_0x262860(0x36e)](this);if(this[_0x262860(0x633)])this[_0x262860(0x425)]();},Window_ItemCategory[_0x220c41(0x4a1)]['updateCategoryNameWindow']=function(){const _0x39efca=_0x220c41,_0x4e7232=this[_0x39efca(0x633)];_0x4e7232['contents']['clear']();const _0x5200ad=this['categoryStyleCheck'](this['index']());if(_0x5200ad===_0x39efca(0x49d)){const _0x307ea5=this[_0x39efca(0x582)](this[_0x39efca(0x468)]());let _0x3c287b=this[_0x39efca(0x623)](this[_0x39efca(0x468)]());_0x3c287b=_0x3c287b[_0x39efca(0x3e1)](/\\I\[(\d+)\]/gi,''),_0x4e7232['resetFontSettings'](),this['categoryNameWindowDrawBackground'](_0x3c287b,_0x307ea5),this[_0x39efca(0x543)](_0x3c287b,_0x307ea5),this[_0x39efca(0x565)](_0x3c287b,_0x307ea5);}},Window_ItemCategory[_0x220c41(0x4a1)][_0x220c41(0x464)]=function(_0x28c638,_0x31e83c){},Window_ItemCategory[_0x220c41(0x4a1)]['categoryNameWindowDrawText']=function(_0x405528,_0x28faa2){const _0x2bb5d0=_0x220c41,_0x54a8b4=this[_0x2bb5d0(0x633)];_0x54a8b4[_0x2bb5d0(0x343)](_0x405528,0x0,_0x28faa2['y'],_0x54a8b4['innerWidth'],_0x2bb5d0(0x357));},Window_ItemCategory[_0x220c41(0x4a1)]['categoryNameWindowCenter']=function(_0x3074a8,_0x2d4035){const _0x30fcd8=_0x220c41,_0x4238a6=this[_0x30fcd8(0x633)],_0x44393b=$gameSystem[_0x30fcd8(0x3f8)](),_0x28ee11=_0x2d4035['x']+Math[_0x30fcd8(0x27a)](_0x2d4035[_0x30fcd8(0x2c3)]/0x2)+_0x44393b;_0x4238a6['x']=_0x4238a6['width']/-0x2+_0x28ee11,_0x4238a6['y']=Math['floor'](_0x2d4035[_0x30fcd8(0x4d7)]/0x2);},Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x1e9)]=function(){const _0x1b2a64=_0x220c41;if(this[_0x1b2a64(0x480)]()){if(_0x1b2a64(0x513)===_0x1b2a64(0x513)){const _0x4fdda0=this[_0x1b2a64(0x468)]();if(this[_0x1b2a64(0x4f5)]()<=0x1){if(_0x1b2a64(0x2d5)===_0x1b2a64(0x2d5)){!this[_0x1b2a64(0x4d0)](_0x1b2a64(0x2e3))&&Input[_0x1b2a64(0x45c)](_0x1b2a64(0x2e3))&&this[_0x1b2a64(0x42d)]();if(!this[_0x1b2a64(0x4d0)](_0x1b2a64(0x5e5))&&Input[_0x1b2a64(0x45c)]('pageup')){if('uQBqX'===_0x1b2a64(0x21c))this['cursorPageup']();else return 0x63;}}else this['drawTextEx'](_0x54bd5e,_0x35a0e2['x'],_0x151e7d['y'],_0x5e1468);}else{if(this['maxCols']()>0x1){if(_0x1b2a64(0x648)===_0x1b2a64(0x648)){Input[_0x1b2a64(0x4bc)](_0x1b2a64(0x28c))&&this[_0x1b2a64(0x1af)](Input[_0x1b2a64(0x45c)](_0x1b2a64(0x28c)));if(Input['isRepeated'](_0x1b2a64(0x5a9))){if(_0x1b2a64(0x5d1)!==_0x1b2a64(0x5d1))return _0x4e44b2[_0x1b2a64(0x266)];else this[_0x1b2a64(0x411)](Input[_0x1b2a64(0x45c)](_0x1b2a64(0x5a9)));}if(this[_0x1b2a64(0x272)]())Input[_0x1b2a64(0x45c)](_0x1b2a64(0x2e3))&&Input[_0x1b2a64(0x32f)](_0x1b2a64(0x185))&&this[_0x1b2a64(0x42d)](),Input[_0x1b2a64(0x45c)](_0x1b2a64(0x5e5))&&Input[_0x1b2a64(0x32f)](_0x1b2a64(0x185))&&this[_0x1b2a64(0x1e1)]();else{if(Input[_0x1b2a64(0x45c)](_0x1b2a64(0x2e3))){if('JitMQ'===_0x1b2a64(0x449))this[_0x1b2a64(0x42d)]();else return _0x2cfe93['isWeapon'](_0x570a83)&&_0x2bc7e6['wtypeId']===_0x104f30(_0x37cf5f['$1']);}if(Input[_0x1b2a64(0x45c)](_0x1b2a64(0x5e5))){if('qfvhx'!=='KRCrd')this[_0x1b2a64(0x1e1)]();else{if(_0x3a0b66[_0x1b2a64(0x445)]&&_0x10d026[_0x1b2a64(0x281)]!==_0x1e8b79)return _0x4e191d[_0x1b2a64(0x281)];else{if(this[_0x1b2a64(0x559)]())return this[_0x1b2a64(0x39a)]()['match'](/RIGHT/i);else _0x51efde['prototype'][_0x1b2a64(0x359)][_0x1b2a64(0x36e)](this);}}}}}else return _0x51a1ed(_0x460b6b['$1']);}}if(Input[_0x1b2a64(0x4bc)]('down')){if(Input[_0x1b2a64(0x32f)](_0x1b2a64(0x185))&&this[_0x1b2a64(0x2e5)]())this[_0x1b2a64(0x42d)]();else{if(_0x1b2a64(0x599)!==_0x1b2a64(0x599)){const _0x1d50b2=this['_commandNameWindow'];_0x1d50b2[_0x1b2a64(0x422)][_0x1b2a64(0x27f)]();const _0x4980be=this[_0x1b2a64(0x638)](this[_0x1b2a64(0x468)]());if(_0x4980be==='icon'){const _0x4a0fc8=this[_0x1b2a64(0x582)](this[_0x1b2a64(0x468)]());let _0x277696=this['commandName'](this['index']());_0x277696=_0x277696[_0x1b2a64(0x3e1)](/\\I\[(\d+)\]/gi,''),_0x1d50b2[_0x1b2a64(0x27e)](),this[_0x1b2a64(0x383)](_0x277696,_0x4a0fc8),this[_0x1b2a64(0x400)](_0x277696,_0x4a0fc8),this[_0x1b2a64(0x3a4)](_0x277696,_0x4a0fc8);}}else this[_0x1b2a64(0x1db)](Input[_0x1b2a64(0x45c)](_0x1b2a64(0x50d)));}}Input['isRepeated']('up')&&(Input['isPressed']('shift')&&this[_0x1b2a64(0x2e5)]()?this[_0x1b2a64(0x1e1)]():_0x1b2a64(0x373)===_0x1b2a64(0x373)?this[_0x1b2a64(0x61f)](Input[_0x1b2a64(0x45c)]('up')):_0x26f34e[_0x1b2a64(0x2d1)](_0x530993[_0x1b2a64(0x29f)]())),Imported[_0x1b2a64(0x1d7)]&&(_0x1b2a64(0x434)==='RkYwD'?this[_0x1b2a64(0x198)]():(this[_0x1b2a64(0x4e1)]=this[_0x1b2a64(0x312)][_0x1b2a64(0x468)](),this[_0x1b2a64(0x312)]['show'](),this['_buyWindow'][_0x1b2a64(0x4cd)](),this['_buyWindow'][_0x1b2a64(0x2b7)](0x0,0x0),this[_0x1b2a64(0x55d)][_0x1b2a64(0x437)](),this[_0x1b2a64(0x579)][_0x1b2a64(0x3ba)]())),this['index']()!==_0x4fdda0&&this[_0x1b2a64(0x5a4)]();}else return _0x172671[_0x1b2a64(0x5d9)][_0x1b2a64(0x22d)](_0xc13de4(_0x7a97be['$1']));}},Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x272)]=function(){const _0x23647a=_0x220c41,_0x3d68ec=SceneManager[_0x23647a(0x37c)],_0x5b41be=[Scene_Item,Scene_Shop];return _0x5b41be['includes'](_0x3d68ec[_0x23647a(0x1e7)]);},Window_ItemList['prototype']['activate']=function(){const _0x5d07d0=_0x220c41;Window_Selectable[_0x5d07d0(0x4a1)][_0x5d07d0(0x5d8)][_0x5d07d0(0x36e)](this),this['_categoryWindow']&&this[_0x5d07d0(0x5fb)]['isUseModernControls']()&&this[_0x5d07d0(0x5fb)][_0x5d07d0(0x5d8)]();},Window_ItemList['prototype'][_0x220c41(0x493)]=function(){const _0x15ad8f=_0x220c41;Window_Selectable['prototype'][_0x15ad8f(0x493)][_0x15ad8f(0x36e)](this),this['_categoryWindow']&&this[_0x15ad8f(0x5fb)][_0x15ad8f(0x23c)]()&&this[_0x15ad8f(0x5fb)][_0x15ad8f(0x493)]();},Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x57b)]=function(_0x2acb14){const _0x28cf35=_0x220c41;this[_0x28cf35(0x507)]!==_0x2acb14&&(this[_0x28cf35(0x507)]=_0x2acb14,this[_0x28cf35(0x387)](),this[_0x28cf35(0x5fb)]&&this[_0x28cf35(0x5fb)][_0x28cf35(0x23c)]()?this['smoothSelect'](0x0):this['scrollTo'](0x0,0x0));},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x368)]=Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x4f5)],Window_ItemList['prototype'][_0x220c41(0x4f5)]=function(){const _0x15ab84=_0x220c41;if(SceneManager['_scene'][_0x15ab84(0x1e7)]===Scene_Battle)return VisuMZ[_0x15ab84(0x44d)]['Window_ItemList_maxCols'][_0x15ab84(0x36e)](this);else{if(SceneManager[_0x15ab84(0x37c)][_0x15ab84(0x1e7)]===Scene_Map){if('XUHNC'!==_0x15ab84(0x584))return VisuMZ[_0x15ab84(0x44d)]['Window_ItemList_maxCols']['call'](this);else this[_0x15ab84(0x5c4)](_0x29352f);}else{if('kcDjp'===_0x15ab84(0x231))_0x1ed22a[_0x15ab84(0x4a1)][_0x15ab84(0x359)][_0x15ab84(0x36e)](this);else return VisuMZ['ItemsEquipsCore'][_0x15ab84(0x22a)]['ItemScene'][_0x15ab84(0x3e8)];}}},VisuMZ[_0x220c41(0x44d)]['Window_ItemList_colSpacing']=Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x4df)],Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x4df)]=function(){const _0x41b1e0=_0x220c41;if(this['maxCols']()<=0x1){if(_0x41b1e0(0x408)===_0x41b1e0(0x2c1)){_0x381b4a[_0x41b1e0(0x44d)]['Scene_Equip_createCommandWindow']['call'](this);if(this[_0x41b1e0(0x410)])this['_commandWindow']['setHelpWindow'](this['_helpWindow']);}else return Window_Selectable[_0x41b1e0(0x4a1)][_0x41b1e0(0x4df)][_0x41b1e0(0x36e)](this);}else return'HOEhC'===_0x41b1e0(0x3e5)?_0x357165[_0x41b1e0(0x44d)][_0x41b1e0(0x22a)][_0x41b1e0(0x217)][_0x41b1e0(0x1e0)]:VisuMZ[_0x41b1e0(0x44d)][_0x41b1e0(0x3db)]['call'](this);},Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x427)]=function(_0x136e33){const _0x3c630c=_0x220c41;switch(this['_category']){case _0x3c630c(0x59a):return DataManager['isItem'](_0x136e33);case _0x3c630c(0x213):return DataManager[_0x3c630c(0x498)](_0x136e33)&&_0x136e33[_0x3c630c(0x49e)]===0x1;case'KeyItems':return DataManager[_0x3c630c(0x498)](_0x136e33)&&_0x136e33[_0x3c630c(0x49e)]===0x2;case'HiddenItemA':return DataManager[_0x3c630c(0x498)](_0x136e33)&&_0x136e33['itypeId']===0x3;case'HiddenItemB':return DataManager[_0x3c630c(0x498)](_0x136e33)&&_0x136e33[_0x3c630c(0x49e)]===0x4;case _0x3c630c(0x504):return DataManager[_0x3c630c(0x498)](_0x136e33)&&_0x136e33[_0x3c630c(0x41b)];case'Nonconsumable':return DataManager[_0x3c630c(0x498)](_0x136e33)&&!_0x136e33['consumable'];case _0x3c630c(0x4c1):return DataManager['isItem'](_0x136e33)&&[0x0][_0x3c630c(0x427)](_0x136e33[_0x3c630c(0x5e3)]);case _0x3c630c(0x25b):return DataManager['isItem'](_0x136e33)&&[0x0,0x1][_0x3c630c(0x427)](_0x136e33[_0x3c630c(0x5e3)]);case _0x3c630c(0x597):return DataManager['isItem'](_0x136e33)&&[0x0,0x2]['includes'](_0x136e33['occasion']);case'NeverUsable':return DataManager['isItem'](_0x136e33)&&[0x3][_0x3c630c(0x427)](_0x136e33['occasion']);case _0x3c630c(0x522):return DataManager['isWeapon'](_0x136e33);case _0x3c630c(0x5c2):return DataManager['isArmor'](_0x136e33);default:if(this[_0x3c630c(0x507)][_0x3c630c(0x17d)](/WTYPE:(\d+)/i))return _0x3c630c(0x4c6)!=='eOCTb'?_0x3609c9[_0x3c630c(0x44d)]['Settings']['StatusWindow'][_0x3c630c(0x54d)]:DataManager[_0x3c630c(0x340)](_0x136e33)&&_0x136e33[_0x3c630c(0x5b0)]===Number(RegExp['$1']);else{if(this[_0x3c630c(0x507)][_0x3c630c(0x17d)](/WTYPE:(.*)/i)){if(_0x3c630c(0x20b)!==_0x3c630c(0x20b))_0x507782[_0x3c630c(0x44d)][_0x3c630c(0x22a)]['StatusWindow'][_0x3c630c(0x310)][_0x3c630c(0x36e)](this);else{const _0x576e1f=$dataSystem[_0x3c630c(0x295)]['indexOf'](String(RegExp['$1'])[_0x3c630c(0x31d)]());return DataManager[_0x3c630c(0x340)](_0x136e33)&&_0x136e33['wtypeId']===_0x576e1f;}}else{if(this['_category'][_0x3c630c(0x17d)](/ATYPE:(\d+)/i))return DataManager[_0x3c630c(0x5e6)](_0x136e33)&&_0x136e33[_0x3c630c(0x536)]===Number(RegExp['$1']);else{if(this[_0x3c630c(0x507)][_0x3c630c(0x17d)](/ATYPE:(.*)/i)){const _0x15da5b=$dataSystem[_0x3c630c(0x1f1)][_0x3c630c(0x4bd)](String(RegExp['$1'])[_0x3c630c(0x31d)]());return DataManager[_0x3c630c(0x5e6)](_0x136e33)&&_0x136e33[_0x3c630c(0x536)]===_0x15da5b;}else{if(this['_category']['match'](/ETYPE:(\d+)/i))return!!_0x136e33&&_0x136e33['etypeId']===Number(RegExp['$1']);else{if(this[_0x3c630c(0x507)][_0x3c630c(0x17d)](/ETYPE:(.*)/i)){if('smhIY'===_0x3c630c(0x2e4)){const _0x370ded=$dataSystem[_0x3c630c(0x5af)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0x3c630c(0x5e6)](_0x136e33)&&_0x136e33[_0x3c630c(0x61c)]===_0x370ded;}else return _0x3866c7[_0x3c630c(0x1d7)]&&_0x37f5c[_0x3c630c(0x4a1)][_0x3c630c(0x23c)]['call'](this);}else{if(this[_0x3c630c(0x507)][_0x3c630c(0x17d)](/Category:(.*)/i))return!!_0x136e33&&_0x136e33['categories'][_0x3c630c(0x427)](String(RegExp['$1'])[_0x3c630c(0x1dc)]()[_0x3c630c(0x31d)]());}}}}}}}return![];},Window_ItemList['prototype'][_0x220c41(0x35c)]=function(){return!![];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x46e)]=Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x494)],Window_ItemList['prototype'][_0x220c41(0x494)]=function(_0x4df9c3){const _0x4af7fd=_0x220c41;VisuMZ[_0x4af7fd(0x44d)]['Window_ItemList_drawItem']['call'](this,_0x4df9c3),this['placeItemNewLabel'](_0x4df9c3);},Window_ItemList['prototype'][_0x220c41(0x192)]=function(_0xa3b791,_0xd1113d,_0xa061e5,_0x3e26b2){const _0x3736f0=_0x220c41;Window_Selectable[_0x3736f0(0x4a1)][_0x3736f0(0x192)][_0x3736f0(0x36e)](this,_0xa3b791,_0xd1113d,_0xa061e5,_0x3e26b2);},Window_ItemList[_0x220c41(0x4a1)]['placeItemNewLabel']=function(_0x12d72b){const _0x43cc0f=_0x220c41,_0x2e24e3=this[_0x43cc0f(0x24a)](_0x12d72b);if(!_0x2e24e3||!this['isShowNew']())return;if(!$gameParty[_0x43cc0f(0x506)](_0x2e24e3))return;const _0x2b9666=this[_0x43cc0f(0x582)](_0x12d72b),_0x1334bb=_0x2b9666['x'],_0x523977=_0x2b9666['y']+(this[_0x43cc0f(0x3d3)]()-ImageManager[_0x43cc0f(0x557)])/0x2,_0x1d5478=VisuMZ[_0x43cc0f(0x44d)]['Settings'][_0x43cc0f(0x342)][_0x43cc0f(0x2ac)],_0x47ab22=VisuMZ[_0x43cc0f(0x44d)][_0x43cc0f(0x22a)][_0x43cc0f(0x342)][_0x43cc0f(0x3ad)];this[_0x43cc0f(0x3c0)](_0x2e24e3,_0x1334bb+_0x1d5478,_0x523977+_0x47ab22);},Window_ItemList['prototype'][_0x220c41(0x334)]=function(_0x221881){const _0x56f5a3=_0x220c41;this[_0x56f5a3(0x55d)]=_0x221881,this[_0x56f5a3(0x4eb)]();},VisuMZ[_0x220c41(0x44d)]['Window_ItemList_updateHelp']=Window_ItemList[_0x220c41(0x4a1)]['updateHelp'],Window_ItemList[_0x220c41(0x4a1)][_0x220c41(0x389)]=function(){const _0x4a8106=_0x220c41;VisuMZ[_0x4a8106(0x44d)]['Window_ItemList_updateHelp'][_0x4a8106(0x36e)](this);if(this[_0x4a8106(0x55d)]&&this[_0x4a8106(0x55d)]['constructor']===Window_ShopStatus){if(_0x4a8106(0x1a4)===_0x4a8106(0x1a4))this['_statusWindow'][_0x4a8106(0x5a5)](this[_0x4a8106(0x4c4)]());else return this[_0x4a8106(0x409)]?this['_list']['length']:0x3;}},Window_BattleItem[_0x220c41(0x4a1)][_0x220c41(0x593)]=function(_0x1ff47c){const _0x413299=_0x220c41;if(BattleManager[_0x413299(0x3c5)]()){if(_0x413299(0x197)===_0x413299(0x253))this[_0x413299(0x5a4)]();else return BattleManager[_0x413299(0x3c5)]()[_0x413299(0x2cb)](_0x1ff47c);}else{if(_0x413299(0x1b7)===_0x413299(0x397)){const _0x26e5f7=this['isRightInputMode']()?0x0:_0x3fc0e3[_0x413299(0x3b8)]-this[_0x413299(0x430)](),_0x5b3c60=this[_0x413299(0x2ce)](),_0x56653a=this[_0x413299(0x430)](),_0x15acf0=this[_0x413299(0x53c)]();return new _0x2186f3(_0x26e5f7,_0x5b3c60,_0x56653a,_0x15acf0);}else return Window_ItemList['prototype'][_0x413299(0x593)][_0x413299(0x36e)](this,_0x1ff47c);}},Window_EventItem[_0x220c41(0x4a1)][_0x220c41(0x35c)]=function(){return![];},Window_EquipStatus['prototype'][_0x220c41(0x559)]=function(){const _0x2c11ca=_0x220c41;return VisuMZ[_0x2c11ca(0x44d)]['Settings'][_0x2c11ca(0x278)][_0x2c11ca(0x374)];},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x4ca)]=Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x387)],Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x387)]=function(){const _0x8d6b2c=_0x220c41;this[_0x8d6b2c(0x20f)](),this[_0x8d6b2c(0x27e)]();if(this['_actor'])this[_0x8d6b2c(0x60b)][_0x8d6b2c(0x387)]();if(this[_0x8d6b2c(0x559)]())this[_0x8d6b2c(0x4e6)]();else{if(_0x8d6b2c(0x412)!==_0x8d6b2c(0x54a))VisuMZ[_0x8d6b2c(0x44d)][_0x8d6b2c(0x4ca)][_0x8d6b2c(0x36e)](this);else return _0x165e6a[_0x8d6b2c(0x44d)]['Scene_Item_helpWindowRect'][_0x8d6b2c(0x36e)](this);}},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x4e6)]=function(){const _0x511bb3=_0x220c41;this[_0x511bb3(0x422)][_0x511bb3(0x27f)]();if(!this['_actor'])return;if(this[_0x511bb3(0x43e)]()){const _0x55915a=ImageManager['loadPicture'](this['_actor']['getMenuImage']());_0x55915a[_0x511bb3(0x3ac)](this[_0x511bb3(0x28f)][_0x511bb3(0x3ed)](this));}else this[_0x511bb3(0x393)]();},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x43e)]=function(){const _0x5d109b=_0x220c41;return Imported[_0x5d109b(0x37b)]&&this[_0x5d109b(0x60b)][_0x5d109b(0x589)]()!==''&&VisuMZ[_0x5d109b(0x44d)][_0x5d109b(0x22a)]['EquipScene']['MenuPortraits'];},Window_EquipStatus['prototype'][_0x220c41(0x28f)]=function(){const _0x9f0467=_0x220c41;VisuMZ[_0x9f0467(0x44d)][_0x9f0467(0x22a)][_0x9f0467(0x278)]['DrawPortraitJS'][_0x9f0467(0x36e)](this),this[_0x9f0467(0x417)]();},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x393)]=function(){const _0x564508=_0x220c41;VisuMZ[_0x564508(0x44d)][_0x564508(0x22a)]['EquipScene'][_0x564508(0x1a8)][_0x564508(0x36e)](this),this[_0x564508(0x417)]();},Window_EquipStatus['prototype']['drawParamsItemsEquipsCore']=function(){const _0x5e6545=_0x220c41;this[_0x5e6545(0x27e)](),VisuMZ['ItemsEquipsCore'][_0x5e6545(0x22a)][_0x5e6545(0x278)]['DrawParamJS']['call'](this);},Window_EquipStatus[_0x220c41(0x4a1)]['drawItemActorMenuImage']=function(_0x2b332a,_0x296cfc,_0x22263f,_0x484c23,_0x3cd2ab){const _0x3dfd9=_0x220c41,_0xadc748=ImageManager['loadPicture'](_0x2b332a['getMenuImage']()),_0x2aca45=this[_0x3dfd9(0x4a5)]-_0xadc748[_0x3dfd9(0x2c3)];_0x296cfc+=_0x2aca45/0x2;if(_0x2aca45<0x0)_0x484c23-=_0x2aca45;Window_StatusBase['prototype']['drawItemActorMenuImage'][_0x3dfd9(0x36e)](this,_0x2b332a,_0x296cfc,_0x22263f,_0x484c23,_0x3cd2ab);},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x625)]=function(){const _0x1d6d66=_0x220c41;if(Imported[_0x1d6d66(0x1d7)]){if('KoSmA'!==_0x1d6d66(0x56c)){const _0x2bf986=_0x122226(_0x4c309b['$1']);try{_0x17aa6a(_0x2bf986);}catch(_0x3cc926){if(_0x129e4c[_0x1d6d66(0x4ed)]())_0x15f7ea['log'](_0x3cc926);}}else return VisuMZ[_0x1d6d66(0x394)]['Settings'][_0x1d6d66(0x3ec)]['ExtDisplayedParams'];}else{if(_0x1d6d66(0x3fc)===_0x1d6d66(0x3a7))_0x4b87a1[_0x1d6d66(0x366)][_0x1d6d66(0x17d)](/<PRICE:[ ](\d+)>/i)&&(_0x30699b['price']=_0x139af3(_0x53c094['$1']));else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x5bd)]=function(){const _0x492124=_0x220c41;return VisuMZ[_0x492124(0x44d)]['Settings']['EquipScene'][_0x492124(0x577)];},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x1fe)]=function(){const _0x5efcac=_0x220c41;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x5efcac(0x394)][_0x5efcac(0x22a)]['Param']['DrawIcons'];},Window_EquipStatus['prototype'][_0x220c41(0x233)]=function(_0xb1438c,_0x1c9f64,_0x454862,_0x39103a){const _0x282237=_0x220c41,_0x3ba12f=this['itemPadding']();if(Imported['VisuMZ_0_CoreEngine'])this[_0x282237(0x620)](_0x1c9f64+_0x3ba12f,_0x454862,_0x39103a,_0xb1438c,![]);else{if(_0x282237(0x587)==='fXyNf')this[_0x282237(0x343)](TextManager[_0x282237(0x28d)](_0xb1438c),_0x1c9f64+_0x3ba12f,_0x454862,_0x39103a);else return _0x5480d6[_0x282237(0x44d)][_0x282237(0x22a)][_0x282237(0x217)][_0x282237(0x2ed)];}},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x499)]=function(_0x3b4a92,_0x22bc1c,_0x3b8bb2,_0x4f6f6f){const _0x5c1c6c=_0x220c41,_0x414127=this[_0x5c1c6c(0x615)]();let _0x79bfd7=0x0;if(Imported['VisuMZ_0_CoreEngine'])'AcJdO'!=='AcJdO'?_0x26b995+=_0x302d88(_0x229540['$1']):_0x79bfd7=this['_actor'][_0x5c1c6c(0x3aa)](_0x3b4a92,!![]);else{if(_0x5c1c6c(0x26a)===_0x5c1c6c(0x26a))_0x79bfd7=this[_0x5c1c6c(0x60b)][_0x5c1c6c(0x28d)](_0x3b4a92);else return _0x319ae0[_0x5c1c6c(0x4f8)]('left',_0x5c1c6c(0x28c));}const _0x1bf5a9=_0x79bfd7;this[_0x5c1c6c(0x343)](_0x79bfd7,_0x22bc1c,_0x3b8bb2,_0x4f6f6f-_0x414127,'right');},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x3f6)]=function(_0x343c14,_0x1ee3ac,_0x4c108d,_0x58b530){const _0x3a54df=_0x220c41,_0x352768=this[_0x3a54df(0x615)]();let _0x2e90bd=0x0,_0x461482=0x0,_0xd2b36e='';if(this[_0x3a54df(0x4ee)]){Imported['VisuMZ_0_CoreEngine']?(_0x2e90bd=this[_0x3a54df(0x60b)][_0x3a54df(0x3aa)](_0x343c14,![]),_0x461482=this[_0x3a54df(0x4ee)][_0x3a54df(0x3aa)](_0x343c14,![]),_0xd2b36e=this[_0x3a54df(0x4ee)][_0x3a54df(0x3aa)](_0x343c14,!![])):(_0x2e90bd=this[_0x3a54df(0x60b)]['param'](_0x343c14),_0x461482=this[_0x3a54df(0x4ee)][_0x3a54df(0x28d)](_0x343c14),_0xd2b36e=this['_tempActor']['param'](_0x343c14));const _0x32109c=_0x2e90bd,_0x5390ac=_0x461482;diffValue=_0x5390ac-_0x32109c,this[_0x3a54df(0x1e5)](ColorManager[_0x3a54df(0x5f7)](diffValue)),this[_0x3a54df(0x343)](_0xd2b36e,_0x1ee3ac,_0x4c108d,_0x58b530-_0x352768,_0x3a54df(0x28c));}},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x5d3)]=function(_0x33b856,_0xfe7a67,_0xa5b295,_0x1b23ef){const _0x237716=_0x220c41,_0x1d8040=this[_0x237716(0x615)]();let _0x52d54b=0x0,_0x223656=0x0,_0x228077=![];if(this[_0x237716(0x4ee)]){Imported[_0x237716(0x1d7)]?(_0x52d54b=this[_0x237716(0x60b)]['paramValueByName'](_0x33b856,![]),_0x223656=this[_0x237716(0x4ee)]['paramValueByName'](_0x33b856,![]),_0x228077=String(this[_0x237716(0x60b)][_0x237716(0x3aa)](_0x33b856,!![]))[_0x237716(0x17d)](/([%％])/i)):(_0x52d54b=this['_actor'][_0x237716(0x28d)](_0x33b856),_0x223656=this['_tempActor'][_0x237716(0x28d)](_0x33b856),_0x228077=_0x52d54b%0x1!==0x0||_0x223656%0x1!==0x0);const _0x574d55=_0x52d54b,_0x5ae638=_0x223656,_0x3e25da=_0x5ae638-_0x574d55;let _0x19c207=_0x3e25da;if(_0x228077)_0x19c207=Math['round'](_0x3e25da*0x64)+'%';_0x3e25da!==0x0&&(this[_0x237716(0x1e5)](ColorManager[_0x237716(0x5f7)](_0x3e25da)),_0x19c207=(_0x3e25da>0x0?'(+%1)':_0x237716(0x32e))[_0x237716(0x22d)](_0x19c207),this[_0x237716(0x343)](_0x19c207,_0xfe7a67+_0x1d8040,_0xa5b295,_0x1b23ef,_0x237716(0x5a9)));}},Window_EquipStatus[_0x220c41(0x4a1)][_0x220c41(0x3bf)]=function(_0x47a0b9,_0x55cd99,_0x1b245a,_0x5e43c5,_0x5c1007){const _0x55331c=_0x220c41;if(VisuMZ['ItemsEquipsCore'][_0x55331c(0x22a)][_0x55331c(0x278)]['DrawBackRect']===![])return;_0x5c1007=Math['max'](_0x5c1007||0x1,0x1);while(_0x5c1007--){_0x5e43c5=_0x5e43c5||this[_0x55331c(0x3d3)](),this[_0x55331c(0x422)][_0x55331c(0x33f)]=0xa0;const _0x1c2d74=ColorManager[_0x55331c(0x1d2)]();this[_0x55331c(0x422)][_0x55331c(0x284)](_0x47a0b9+0x1,_0x55cd99+0x1,_0x1b245a-0x2,_0x5e43c5-0x2,_0x1c2d74),this[_0x55331c(0x422)][_0x55331c(0x33f)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x36c50f=_0x220c41,_0x54a152=VisuMZ['ItemsEquipsCore'][_0x36c50f(0x22a)][_0x36c50f(0x278)];let _0x7d80d4=_0x54a152[_0x36c50f(0x1ce)]!==undefined?_0x54a152[_0x36c50f(0x1ce)]:0x13;return ColorManager[_0x36c50f(0x1a9)](_0x7d80d4);},VisuMZ['ItemsEquipsCore'][_0x220c41(0x246)]=Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x600)],Window_EquipCommand[_0x220c41(0x4a1)]['initialize']=function(_0x423365){const _0x3c151c=_0x220c41;VisuMZ['ItemsEquipsCore'][_0x3c151c(0x246)]['call'](this,_0x423365),this[_0x3c151c(0x3a5)](_0x423365);},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x3a5)]=function(_0x225c2f){const _0x434f3b=_0x220c41,_0x2f597a=new Rectangle(0x0,0x0,_0x225c2f['width'],_0x225c2f[_0x434f3b(0x4d7)]);this[_0x434f3b(0x644)]=new Window_Base(_0x2f597a),this[_0x434f3b(0x644)][_0x434f3b(0x267)]=0x0,this[_0x434f3b(0x1b4)](this['_commandNameWindow']),this[_0x434f3b(0x5d7)]();},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x4eb)]=function(){const _0x2935d5=_0x220c41;Window_HorzCommand[_0x2935d5(0x4a1)][_0x2935d5(0x4eb)]['call'](this);if(this[_0x2935d5(0x644)])this[_0x2935d5(0x5d7)]();},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x5d7)]=function(){const _0x44b1fb=_0x220c41,_0x1aa20e=this[_0x44b1fb(0x644)];_0x1aa20e['contents'][_0x44b1fb(0x27f)]();const _0x1e24c8=this[_0x44b1fb(0x638)](this[_0x44b1fb(0x468)]());if(_0x1e24c8==='icon'){const _0x1a63b2=this[_0x44b1fb(0x582)](this[_0x44b1fb(0x468)]());let _0x579b15=this[_0x44b1fb(0x623)](this[_0x44b1fb(0x468)]());_0x579b15=_0x579b15[_0x44b1fb(0x3e1)](/\\I\[(\d+)\]/gi,''),_0x1aa20e['resetFontSettings'](),this[_0x44b1fb(0x383)](_0x579b15,_0x1a63b2),this[_0x44b1fb(0x400)](_0x579b15,_0x1a63b2),this[_0x44b1fb(0x3a4)](_0x579b15,_0x1a63b2);}},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x383)]=function(_0x1b65dd,_0x550503){},Window_EquipCommand['prototype']['commandNameWindowDrawText']=function(_0x5d2f7c,_0x7bb178){const _0x32f14a=_0x220c41,_0x287acf=this[_0x32f14a(0x644)];_0x287acf[_0x32f14a(0x343)](_0x5d2f7c,0x0,_0x7bb178['y'],_0x287acf[_0x32f14a(0x4a5)],_0x32f14a(0x357));},Window_EquipCommand['prototype']['commandNameWindowCenter']=function(_0x4046cf,_0x1c430b){const _0x11e388=_0x220c41,_0x4e3cb5=this['_commandNameWindow'],_0x1d19c1=$gameSystem[_0x11e388(0x3f8)](),_0x23b59a=_0x1c430b['x']+Math[_0x11e388(0x27a)](_0x1c430b[_0x11e388(0x2c3)]/0x2)+_0x1d19c1;_0x4e3cb5['x']=_0x4e3cb5[_0x11e388(0x2c3)]/-0x2+_0x23b59a,_0x4e3cb5['y']=Math[_0x11e388(0x27a)](_0x1c430b[_0x11e388(0x4d7)]/0x2);},Window_EquipCommand[_0x220c41(0x4a1)]['isUseModernControls']=function(){const _0x1687b7=_0x220c41;return Imported[_0x1687b7(0x1d7)]&&Window_HorzCommand[_0x1687b7(0x4a1)][_0x1687b7(0x23c)][_0x1687b7(0x36e)](this);},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x223)]=function(){const _0x2e36d8=_0x220c41;if(this[_0x2e36d8(0x574)]()===_0x2e36d8(0x2a2))Window_HorzCommand[_0x2e36d8(0x4a1)][_0x2e36d8(0x223)]['call'](this);},Window_EquipCommand['prototype']['processCursorMoveModernControls']=function(){const _0x52b65c=_0x220c41;!this[_0x52b65c(0x3fd)]()&&Window_HorzCommand['prototype'][_0x52b65c(0x1e9)][_0x52b65c(0x36e)](this);},Window_EquipCommand['prototype']['processCursorSpecialCheckModernControls']=function(){const _0xff007=_0x220c41;if(!this[_0xff007(0x480)]())return![];if(SceneManager[_0xff007(0x37c)]['constructor']!==Scene_Equip)return![];if(Input['isTriggered'](_0xff007(0x50d))){if(_0xff007(0x607)!==_0xff007(0x607))return this['updatedLayoutStyle']()['match'](/RIGHT/i);else this[_0xff007(0x5a4)](),SceneManager['_scene']['commandEquip'](),SceneManager[_0xff007(0x37c)][_0xff007(0x328)][_0xff007(0x353)](-0x1);}return![];},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x4f5)]=function(){const _0x567e83=_0x220c41;return this[_0x567e83(0x409)]?this[_0x567e83(0x409)][_0x567e83(0x5ff)]:0x3;},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x3ee)]=function(){const _0x3be326=_0x220c41;if(this[_0x3be326(0x352)]()&&this[_0x3be326(0x53f)]&&SceneManager[_0x3be326(0x37c)][_0x3be326(0x1e7)]===Scene_Equip){if(this[_0x3be326(0x214)]()&&TouchInput['isHovered']()){if(_0x3be326(0x431)===_0x3be326(0x431))this[_0x3be326(0x4b8)](![]);else return this[_0x3be326(0x517)]();}else TouchInput[_0x3be326(0x45c)]()&&this[_0x3be326(0x4b8)](!![]);TouchInput['isClicked']()&&this[_0x3be326(0x647)]();}},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x4b8)]=function(_0x21dc77){const _0x2551b9=_0x220c41;this[_0x2551b9(0x1fb)]=![];const _0x5b4ccf=this[_0x2551b9(0x468)](),_0x25cba8=this[_0x2551b9(0x49c)](),_0x52b5d1=SceneManager[_0x2551b9(0x37c)]['_slotWindow'];if(_0x52b5d1[_0x2551b9(0x352)]()&&_0x52b5d1['visible']){if(_0x25cba8>=0x0)_0x2551b9(0x59c)===_0x2551b9(0x1ae)?_0x5974ee[_0x2551b9(0x37c)]['constructor']===_0x27a7c7&&(this[_0x2551b9(0x566)]=_0x295dc7['_scene'][_0x2551b9(0x3f1)]()):(_0x25cba8===this[_0x2551b9(0x468)]()&&(this[_0x2551b9(0x1fb)]=!![]),this[_0x2551b9(0x5d8)](),this[_0x2551b9(0x64a)](_0x25cba8));else _0x52b5d1[_0x2551b9(0x49c)]()>=0x0&&(this['deactivate'](),this[_0x2551b9(0x4cd)]());}_0x21dc77&&this[_0x2551b9(0x468)]()!==_0x5b4ccf&&this[_0x2551b9(0x5a4)]();},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x2b1)]=function(){const _0x34400a=_0x220c41;this[_0x34400a(0x35b)](),this['addOptimizeCommand'](),this['addClearCommand']();},Window_EquipCommand['prototype']['refresh']=function(){const _0xf74dde=_0x220c41;Window_HorzCommand['prototype'][_0xf74dde(0x387)][_0xf74dde(0x36e)](this),this[_0xf74dde(0x28a)]();},Window_EquipCommand[_0x220c41(0x4a1)]['addEquipCommand']=function(){const _0x183341=_0x220c41;if(!this[_0x183341(0x598)]())return;const _0x39f873=this[_0x183341(0x3b3)](),_0x92fa23=VisuMZ[_0x183341(0x44d)][_0x183341(0x22a)][_0x183341(0x278)]['CmdIconEquip'],_0x377904=_0x39f873===_0x183341(0x5d0)?TextManager['equip2']:_0x183341(0x514)[_0x183341(0x22d)](_0x92fa23,TextManager[_0x183341(0x3f5)]),_0x395374=this[_0x183341(0x4fe)]();this[_0x183341(0x230)](_0x377904,_0x183341(0x2a2),_0x395374);},Window_EquipCommand[_0x220c41(0x4a1)]['isEquipCommandAdded']=function(){return!this['isUseModernControls']();},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x4fe)]=function(){return!![];},Window_EquipCommand[_0x220c41(0x4a1)]['addOptimizeCommand']=function(){const _0x5d4048=_0x220c41;if(!this[_0x5d4048(0x224)]())return;const _0x429028=this['commandStyle'](),_0x2af8e2=VisuMZ[_0x5d4048(0x44d)][_0x5d4048(0x22a)][_0x5d4048(0x278)][_0x5d4048(0x482)],_0x172b9a=_0x429028===_0x5d4048(0x5d0)?TextManager[_0x5d4048(0x2da)]:'\x5cI[%1]%2'[_0x5d4048(0x22d)](_0x2af8e2,TextManager[_0x5d4048(0x2da)]),_0x369d59=this[_0x5d4048(0x562)]();this[_0x5d4048(0x230)](_0x172b9a,_0x5d4048(0x2da),_0x369d59);},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x224)]=function(){const _0x2acbe0=_0x220c41;return VisuMZ[_0x2acbe0(0x44d)][_0x2acbe0(0x22a)]['EquipScene'][_0x2acbe0(0x3d6)];},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x562)]=function(){return!![];},Window_EquipCommand['prototype'][_0x220c41(0x63c)]=function(){const _0x7c52b5=_0x220c41;if(!this[_0x7c52b5(0x299)]())return;const _0x7e354a=this[_0x7c52b5(0x3b3)](),_0xc980f2=VisuMZ[_0x7c52b5(0x44d)][_0x7c52b5(0x22a)][_0x7c52b5(0x278)][_0x7c52b5(0x307)],_0x4ecaf9=_0x7e354a===_0x7c52b5(0x5d0)?TextManager[_0x7c52b5(0x27f)]:'\x5cI[%1]%2'[_0x7c52b5(0x22d)](_0xc980f2,TextManager[_0x7c52b5(0x27f)]),_0x3c6e2d=this[_0x7c52b5(0x1c2)]();this[_0x7c52b5(0x230)](_0x4ecaf9,_0x7c52b5(0x27f),_0x3c6e2d);},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x299)]=function(){const _0x21c039=_0x220c41;return VisuMZ[_0x21c039(0x44d)]['Settings'][_0x21c039(0x278)]['CommandAddClear'];},Window_EquipCommand['prototype'][_0x220c41(0x1c2)]=function(){return!![];},Window_EquipCommand[_0x220c41(0x4a1)]['itemTextAlign']=function(){const _0x1385ff=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x1385ff(0x22a)][_0x1385ff(0x278)]['CmdTextAlign'];},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x494)]=function(_0x27b42a){const _0x140df0=_0x220c41,_0x18483b=this[_0x140df0(0x638)](_0x27b42a);if(_0x18483b===_0x140df0(0x46d)){if(_0x140df0(0x4c7)==='tuHAw')this[_0x140df0(0x5c4)](_0x27b42a);else{if(_0x2bca8e)_0x5e1271+=this[_0x140df0(0x2a3)](_0x117c04,_0x4d8210);}}else _0x18483b===_0x140df0(0x49d)?this[_0x140df0(0x218)](_0x27b42a):Window_HorzCommand[_0x140df0(0x4a1)][_0x140df0(0x494)]['call'](this,_0x27b42a);},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x3b3)]=function(){const _0x256168=_0x220c41;return VisuMZ[_0x256168(0x44d)][_0x256168(0x22a)]['EquipScene'][_0x256168(0x2ed)];},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x638)]=function(_0x206d33){const _0x41a49e=_0x220c41;if(_0x206d33<0x0)return _0x41a49e(0x5d0);const _0x5b1ab0=this[_0x41a49e(0x3b3)]();if(_0x5b1ab0!=='auto'){if(_0x41a49e(0x274)!==_0x41a49e(0x274))_0x222f5b=_0x41a49e(0x435)[_0x41a49e(0x22d)](_0x4a8146['id']);else return _0x5b1ab0;}else{if(this[_0x41a49e(0x379)]()>0x0){if(_0x41a49e(0x1b1)===_0x41a49e(0x1b1)){const _0x501340=this[_0x41a49e(0x623)](_0x206d33);if(_0x501340['match'](/\\I\[(\d+)\]/i)){if(_0x41a49e(0x3d7)!==_0x41a49e(0x3d7))_0x50053a='weapon-%1'[_0x41a49e(0x22d)](_0x13e6d0['id']);else{const _0x3391c8=this['itemLineRect'](_0x206d33),_0x3a2485=this[_0x41a49e(0x282)](_0x501340)[_0x41a49e(0x2c3)];if(_0x3a2485<=_0x3391c8['width'])return _0x41a49e(0x1d3)!==_0x41a49e(0x1d3)?_0x4bd897[_0x41a49e(0x37c)][_0x41a49e(0x1e7)]===_0x1d3740?_0x3313cf['_scene'][_0x41a49e(0x628)]>0x0:!![]:'iconText';else{if(_0x41a49e(0x55c)===_0x41a49e(0x1a5))_0xf78f64[_0x41a49e(0x44d)][_0x41a49e(0x1ab)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['onBuyCancelItemsEquipsCore']();else return _0x41a49e(0x49d);}}}}else this[_0x41a49e(0x42d)]();}}return _0x41a49e(0x5d0);},Window_EquipCommand['prototype'][_0x220c41(0x5c4)]=function(_0x32b415){const _0xae589f=_0x220c41,_0x24605e=this[_0xae589f(0x582)](_0x32b415),_0x2e81c3=this[_0xae589f(0x623)](_0x32b415),_0x167590=this[_0xae589f(0x282)](_0x2e81c3)[_0xae589f(0x2c3)];this['changePaintOpacity'](this[_0xae589f(0x418)](_0x32b415));const _0x512a1b=this[_0xae589f(0x558)]();if(_0x512a1b===_0xae589f(0x28c)){if(_0xae589f(0x40d)===_0xae589f(0x40d))this[_0xae589f(0x3d8)](_0x2e81c3,_0x24605e['x']+_0x24605e[_0xae589f(0x2c3)]-_0x167590,_0x24605e['y'],_0x167590);else return this[_0xae589f(0x42a)](_0xafdab3);}else{if(_0x512a1b===_0xae589f(0x357)){const _0x18bdf2=_0x24605e['x']+Math[_0xae589f(0x27a)]((_0x24605e[_0xae589f(0x2c3)]-_0x167590)/0x2);this[_0xae589f(0x3d8)](_0x2e81c3,_0x18bdf2,_0x24605e['y'],_0x167590);}else this[_0xae589f(0x3d8)](_0x2e81c3,_0x24605e['x'],_0x24605e['y'],_0x167590);}},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x218)]=function(_0xe9fe23){const _0x12108a=_0x220c41;this[_0x12108a(0x623)](_0xe9fe23)[_0x12108a(0x17d)](/\\I\[(\d+)\]/i);const _0xd55bb6=Number(RegExp['$1'])||0x0,_0x41ff94=this[_0x12108a(0x582)](_0xe9fe23),_0x4c1e30=_0x41ff94['x']+Math[_0x12108a(0x27a)]((_0x41ff94[_0x12108a(0x2c3)]-ImageManager[_0x12108a(0x44a)])/0x2),_0x171436=_0x41ff94['y']+(_0x41ff94[_0x12108a(0x4d7)]-ImageManager[_0x12108a(0x557)])/0x2;this[_0x12108a(0x592)](_0xd55bb6,_0x4c1e30,_0x171436);},Window_EquipCommand['prototype'][_0x220c41(0x3c5)]=function(){const _0x3ab1e9=_0x220c41,_0x4fc9d6=SceneManager['_scene'];if(_0x4fc9d6&&_0x4fc9d6[_0x3ab1e9(0x314)]){if(_0x3ab1e9(0x21b)!==_0x3ab1e9(0x21b))_0x32671c=_0x3885bd(_0x53cdcd['$1']),_0x2d93ba=_0xf78cb1(_0x22cb3a['$2']);else return _0x4fc9d6[_0x3ab1e9(0x314)]();}return null;},Window_EquipCommand[_0x220c41(0x4a1)][_0x220c41(0x389)]=function(){const _0x267ec4=_0x220c41;Window_Command[_0x267ec4(0x4a1)][_0x267ec4(0x389)][_0x267ec4(0x36e)](this),this[_0x267ec4(0x410)][_0x267ec4(0x3bd)](this[_0x267ec4(0x354)]());},Window_EquipCommand[_0x220c41(0x4a1)]['helpDescriptionText']=function(){const _0x18a031=_0x220c41,_0x4d5e67=this[_0x18a031(0x574)]();switch(_0x4d5e67){case _0x18a031(0x2a2):return TextManager[_0x18a031(0x530)][_0x18a031(0x326)]['equip'];case _0x18a031(0x2da):return TextManager['ITEMS_EQUIPS_CORE']['helpDesc'][_0x18a031(0x2da)];case'clear':return TextManager[_0x18a031(0x530)][_0x18a031(0x326)][_0x18a031(0x27f)];default:return'';}},Window_EquipSlot[_0x220c41(0x4a1)]['isUseModernControls']=function(){const _0x16bdf9=_0x220c41;return Imported[_0x16bdf9(0x1d7)]&&Window_HorzCommand[_0x16bdf9(0x4a1)]['isUseModernControls'][_0x16bdf9(0x36e)](this);},Window_EquipSlot[_0x220c41(0x4a1)][_0x220c41(0x5d8)]=function(){const _0x54b6a3=_0x220c41;Window_StatusBase['prototype'][_0x54b6a3(0x5d8)]['call'](this),this[_0x54b6a3(0x4eb)]();},Window_EquipSlot[_0x220c41(0x4a1)]['processCursorMove']=function(){const _0x1678ec=_0x220c41;Window_StatusBase[_0x1678ec(0x4a1)]['processCursorMove'][_0x1678ec(0x36e)](this),this[_0x1678ec(0x2be)]();},Window_EquipSlot['prototype']['checkShiftRemoveShortcut']=function(){const _0x4ac9d2=_0x220c41;if(!this[_0x4ac9d2(0x355)]())return;if(Input[_0x4ac9d2(0x45c)](_0x4ac9d2(0x185))&&this[_0x4ac9d2(0x4c4)]()){if(_0x4ac9d2(0x1e2)!=='lJsvA'){const _0x1a1c9b=SceneManager['_scene']['_actor'];_0x1a1c9b&&(_0x4ac9d2(0x1aa)!=='kZHUf'?this[_0x4ac9d2(0x327)](this['index']())?(this[_0x4ac9d2(0x550)](),this[_0x4ac9d2(0x389)]()):this[_0x4ac9d2(0x605)]():this['cursorPagedown']());}else{this['contents'][_0x4ac9d2(0x27f)]();if(!this['_actor'])return;if(this[_0x4ac9d2(0x43e)]()){const _0x1828aa=_0x2f1a57[_0x4ac9d2(0x5ed)](this[_0x4ac9d2(0x60b)]['getMenuImage']());_0x1828aa[_0x4ac9d2(0x3ac)](this[_0x4ac9d2(0x28f)][_0x4ac9d2(0x3ed)](this));}else this[_0x4ac9d2(0x393)]();}}},Window_EquipSlot['prototype'][_0x220c41(0x327)]=function(_0x166616){const _0x87fd31=_0x220c41,_0x247014=SceneManager[_0x87fd31(0x37c)][_0x87fd31(0x60b)];if(!_0x247014)return;if(!_0x247014[_0x87fd31(0x42a)](this['index']()))return![];const _0x4851da=_0x247014[_0x87fd31(0x544)]()[this[_0x87fd31(0x468)]()];if(_0x247014[_0x87fd31(0x5ae)]()[_0x87fd31(0x427)](_0x4851da))return![];return!![];;},Window_EquipSlot[_0x220c41(0x4a1)]['processShiftRemoveShortcut']=function(){const _0x378000=_0x220c41;SoundManager['playEquip']();const _0x1ff8de=SceneManager[_0x378000(0x37c)][_0x378000(0x60b)];_0x1ff8de[_0x378000(0x30e)](this['index'](),null),this[_0x378000(0x387)](),this['_itemWindow'][_0x378000(0x387)](),this['callUpdateHelp']();const _0xaecf6a=SceneManager[_0x378000(0x37c)][_0x378000(0x55d)];if(_0xaecf6a)_0xaecf6a[_0x378000(0x387)]();},Window_EquipSlot[_0x220c41(0x4a1)]['isShiftRemoveShortcutEnabled']=function(){const _0x1acf83=_0x220c41;if(!this['active'])return![];if(!VisuMZ[_0x1acf83(0x44d)][_0x1acf83(0x22a)][_0x1acf83(0x278)][_0x1acf83(0x22b)])return![];return!![];},Window_EquipSlot[_0x220c41(0x4a1)][_0x220c41(0x1e9)]=function(){const _0x55f5f4=_0x220c41;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase[_0x55f5f4(0x4a1)][_0x55f5f4(0x1e9)][_0x55f5f4(0x36e)](this);},Window_EquipSlot[_0x220c41(0x4a1)][_0x220c41(0x3fd)]=function(){const _0x37880a=_0x220c41;if(!this[_0x37880a(0x480)]())return![];if(SceneManager[_0x37880a(0x37c)][_0x37880a(0x1e7)]!==Scene_Equip)return![];if(this[_0x37880a(0x348)]())return this[_0x37880a(0x5a4)](),Input[_0x37880a(0x27f)](),SceneManager[_0x37880a(0x37c)][_0x37880a(0x553)](),![];else{if(Input['isRepeated'](_0x37880a(0x50d))){const _0x22d1c4=this[_0x37880a(0x468)]();if(Input['isPressed']('shift')){if(_0x37880a(0x18c)!==_0x37880a(0x563))this[_0x37880a(0x42d)]();else{const _0x528193=_0x37880a(0x4b5);if(this[_0x37880a(0x51f)][_0x528193])return this[_0x37880a(0x51f)][_0x528193];const _0x27a87c=_0x2a5335['ItemsEquipsCore'][_0x37880a(0x22a)][_0x37880a(0x315)],_0x1ca1c8=_0x37880a(0x511)['format'](this[_0x37880a(0x1e6)][_0x37880a(0x62f)]);return _0x27a87c[_0x1ca1c8];}}else this[_0x37880a(0x1db)](Input[_0x37880a(0x45c)](_0x37880a(0x50d)));if(this[_0x37880a(0x468)]()!==_0x22d1c4){if(_0x37880a(0x36c)!==_0x37880a(0x2e8))this[_0x37880a(0x5a4)]();else{if(_0x56131b){const _0x567f7b=_0x460290+(this[_0x37880a(0x3d3)]()-_0x4e804a['iconHeight'])/0x2,_0x5c90f6=_0x5917a0[_0x37880a(0x44a)]+0x4,_0x149b9b=_0x5517b5[_0x37880a(0x39b)](0x0,_0x42da3c-_0x5c90f6);this['changeTextColor'](_0x370093[_0x37880a(0x32a)](_0x20a633)),this[_0x37880a(0x592)](_0x188ecf[_0x37880a(0x1e3)],_0x189368,_0x567f7b),this[_0x37880a(0x343)](_0x43542b[_0x37880a(0x443)],_0x4527d6+_0x5c90f6,_0x553284,_0x149b9b),this['resetTextColor']();}}}return!![];}else{if(this[_0x37880a(0x55f)]()&&Input[_0x37880a(0x45c)](_0x37880a(0x185))){if('vvjOS'!==_0x37880a(0x519))return!![];else{const _0x52b85c=this[_0x37880a(0x623)](_0x1644b3);if(_0x52b85c[_0x37880a(0x17d)](/\\I\[(\d+)\]/i)){const _0x35a278=_0x49a413(_0x2e0484['$1'])||0x0,_0x12fe9b=this[_0x37880a(0x582)](_0x347967),_0x2c2486=_0x12fe9b['x']+_0x155d8a[_0x37880a(0x27a)]((_0x12fe9b['width']-_0x32aae2[_0x37880a(0x44a)])/0x2),_0x15fd54=_0x12fe9b['y']+(_0x12fe9b[_0x37880a(0x4d7)]-_0xd7cdfe[_0x37880a(0x557)])/0x2;this[_0x37880a(0x592)](_0x35a278,_0x2c2486,_0x15fd54);}}}}}return![];},Window_EquipSlot[_0x220c41(0x4a1)][_0x220c41(0x348)]=function(){const _0x31d6e8=_0x220c41;if(this[_0x31d6e8(0x468)]()!==0x0)return![];const _0x47f9c7=VisuMZ['ItemsEquipsCore'][_0x31d6e8(0x22a)][_0x31d6e8(0x278)];if(!_0x47f9c7[_0x31d6e8(0x3d6)]&&!_0x47f9c7[_0x31d6e8(0x5df)])return![];return Input['isTriggered']('up');},Window_EquipSlot['prototype']['isShiftShortcutKeyForRemove']=function(){const _0x4dc80a=_0x220c41;return VisuMZ[_0x4dc80a(0x44d)][_0x4dc80a(0x22a)]['EquipScene'][_0x4dc80a(0x22b)];},Window_EquipSlot['prototype'][_0x220c41(0x3ee)]=function(){const _0x5420ca=_0x220c41;if(this['isOpen']()&&this[_0x5420ca(0x53f)]&&SceneManager['_scene'][_0x5420ca(0x1e7)]===Scene_Equip){if('XllKx'===_0x5420ca(0x4a9))_0x122509[_0x5420ca(0x45c)](_0x5420ca(0x2e3))&&this[_0x5420ca(0x42d)](),_0x49542d[_0x5420ca(0x45c)](_0x5420ca(0x5e5))&&this[_0x5420ca(0x1e1)]();else{if(this[_0x5420ca(0x214)]()&&TouchInput[_0x5420ca(0x4e5)]())this[_0x5420ca(0x4b8)](![]);else TouchInput[_0x5420ca(0x45c)]()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x5420ca(0x546)]())this['onTouchOk']();else TouchInput['isCancelled']()&&this[_0x5420ca(0x613)]();}}},Window_EquipSlot[_0x220c41(0x4a1)][_0x220c41(0x4b8)]=function(_0x1e49cc){const _0x4b3098=_0x220c41;this[_0x4b3098(0x1fb)]=![];const _0x4edef2=this[_0x4b3098(0x468)](),_0x589349=this[_0x4b3098(0x49c)](),_0x362c5a=SceneManager['_scene'][_0x4b3098(0x4a8)];if(_0x362c5a[_0x4b3098(0x352)]()&&_0x362c5a[_0x4b3098(0x53f)]){if(_0x589349>=0x0)_0x589349===this['index']()&&(_0x4b3098(0x2ff)===_0x4b3098(0x2e9)?_0xfb7e88=_0x4b3098(0x2c9)[_0x4b3098(0x22d)](_0x5a7ad7['id']):this[_0x4b3098(0x1fb)]=!![]),this['activate'](),this[_0x4b3098(0x64a)](_0x589349);else{if(_0x362c5a[_0x4b3098(0x49c)]()>=0x0){if(_0x4b3098(0x497)==='KCLjg'){const _0x5915c9=_0x166495(_0x33c279['$1']),_0x1a2e4d=(_0x51cbfd===_0x30e992?'W%1':'A%1')['format'](_0x4a304['id']),_0x17119d=_0x4b3098(0x1f6)[_0x4b3098(0x22d)](_0x5915c9);for(let _0xe471df=0x0;_0xe471df<0x8;_0xe471df++){if(_0x5915c9['match'](_0x3f0df1['ItemsEquipsCore'][_0x4b3098(0x428)][_0x4b3098(0x58f)][_0xe471df])){const _0x56f739=_0x4b3098(0x573)[_0x4b3098(0x22d)](_0x1a2e4d,_0xe471df);_0x334979[_0x4b3098(0x44d)][_0x4b3098(0x3e4)][_0x56f739]=new _0x4a575b('item',_0x4b3098(0x3b1),_0x17119d);}}}else this['deactivate'](),this[_0x4b3098(0x4cd)]();}}}_0x1e49cc&&this[_0x4b3098(0x468)]()!==_0x4edef2&&this['playCursorSound']();},Window_EquipSlot[_0x220c41(0x4a1)][_0x220c41(0x225)]=function(){const _0x2d278c=_0x220c41;return this[_0x2d278c(0x468)]();},VisuMZ[_0x220c41(0x44d)]['Window_EquipItem_includes']=Window_EquipItem[_0x220c41(0x4a1)][_0x220c41(0x427)],Window_EquipItem[_0x220c41(0x4a1)][_0x220c41(0x427)]=function(_0x1b6fd4){const _0x3767c8=_0x220c41;if(_0x1b6fd4===null&&this[_0x3767c8(0x5ae)]()[_0x3767c8(0x427)](this['etypeId']())){if(_0x3767c8(0x2fb)===_0x3767c8(0x2fb))return![];else{if(_0x290373[_0x3767c8(0x17d)](_0x77a4f8[_0x3767c8(0x44d)]['RegExp'][_0x3767c8(0x58f)][_0x2b07c0])){const _0x46cc74='%1-%2'['format'](_0x5cba59,_0x16b632);_0x328f66['ItemsEquipsCore']['paramJS'][_0x46cc74]=new _0x407179('item',_0x3767c8(0x3b1),_0x4ccf72);}}}else{if(_0x3767c8(0x5cf)!==_0x3767c8(0x5cf))_0x1ba1c7[_0x3767c8(0x44d)][_0x3767c8(0x4b2)][_0x3767c8(0x36e)](this),this[_0x3767c8(0x559)]()&&this[_0x3767c8(0x32b)](),this[_0x3767c8(0x23c)]()&&(this[_0x3767c8(0x5fb)][_0x3767c8(0x353)](0x0),this[_0x3767c8(0x2ec)]());else return VisuMZ[_0x3767c8(0x44d)][_0x3767c8(0x3dd)][_0x3767c8(0x36e)](this,_0x1b6fd4);}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x459)]=Window_EquipItem[_0x220c41(0x4a1)]['isEnabled'],Window_EquipItem['prototype'][_0x220c41(0x593)]=function(_0x4d54d8){const _0x25aa49=_0x220c41;if(_0x4d54d8&&this[_0x25aa49(0x60b)]){if(this['itemHasEquipLimit'](_0x4d54d8))return![];if(this['isSoleWeaponType'](_0x4d54d8))return![];if(this[_0x25aa49(0x64f)](_0x4d54d8))return![];}if(!_0x4d54d8)return _0x25aa49(0x4cb)!==_0x25aa49(0x62b)?!this[_0x25aa49(0x5ae)]()[_0x25aa49(0x427)](this[_0x25aa49(0x61c)]()):this['isUseItemsEquipsCoreUpdatedLayout']()?this['buyWindowRectItemsEquipsCore']():_0xdbbbf3[_0x25aa49(0x44d)][_0x25aa49(0x2bc)]['call'](this);return VisuMZ[_0x25aa49(0x44d)][_0x25aa49(0x459)][_0x25aa49(0x36e)](this,_0x4d54d8);},Window_EquipItem['prototype'][_0x220c41(0x5ad)]=function(_0x1549fa){const _0xe3fa0a=_0x220c41,_0x11f1e0=_0x1549fa[_0xe3fa0a(0x366)];if(_0x11f1e0[_0xe3fa0a(0x17d)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0xe3fa0a(0x48e)===_0xe3fa0a(0x48e)){const _0x6127dd=Number(RegExp['$1'])||0x1;let _0x57b705=0x0;const _0x46184e=this[_0xe3fa0a(0x60b)][_0xe3fa0a(0x440)](),_0xef5bf8=SceneManager[_0xe3fa0a(0x37c)][_0xe3fa0a(0x328)][_0xe3fa0a(0x225)]();_0x46184e[_0xef5bf8]=null;for(const _0x24e9d2 of _0x46184e){if(_0xe3fa0a(0x1f9)!==_0xe3fa0a(0x2f7)){if(!_0x24e9d2)continue;if(DataManager[_0xe3fa0a(0x340)](_0x1549fa)===DataManager['isWeapon'](_0x24e9d2)){if(_0xe3fa0a(0x4e2)==='XprIL'){if(_0x1549fa['id']===_0x24e9d2['id'])_0x57b705+=0x1;}else{if(!_0x8782a['value'](_0x3953ab))return!![];}}}else{if(_0x570b50[_0xe3fa0a(0x292)]()!==_0x22430d[_0xe3fa0a(0x292)])for(const _0x16eab6 of _0x520efe[_0xe3fa0a(0x4c3)]){if(_0x16eab6)_0x16eab6[_0xe3fa0a(0x2ee)]();}}}return _0x57b705>=_0x6127dd;}else this[_0xe3fa0a(0x411)](_0x1b124d['isTriggered'](_0xe3fa0a(0x5a9)));}else return![];},Window_EquipItem['prototype']['isSoleWeaponType']=function(_0x2ec6f5){const _0x235299=_0x220c41;if(!DataManager[_0x235299(0x340)](_0x2ec6f5))return![];const _0x1b5094=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x3e6ade=0x0;const _0x1fad7e=this['_actor'][_0x235299(0x440)](),_0x5c0b9c=SceneManager[_0x235299(0x37c)][_0x235299(0x328)][_0x235299(0x225)]();_0x1fad7e[_0x5c0b9c]=null;for(const _0x574d4d of _0x1fad7e){if(!_0x574d4d)continue;if(!DataManager[_0x235299(0x340)](_0x574d4d))continue;if(_0x2ec6f5[_0x235299(0x5b0)]===_0x574d4d[_0x235299(0x5b0)]){if('RBOXY'!=='RBOXY')return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x235299(0x523)]():_0x4f1245[_0x235299(0x44d)][_0x235299(0x235)][_0x235299(0x36e)](this);else{_0x3e6ade+=0x1;if(_0x2ec6f5[_0x235299(0x366)][_0x235299(0x17d)](_0x1b5094)){if('DIJxw'!=='DIJxw')return'100%';else{const _0x4d5e0a=Number(RegExp['$1'])||0x1;if(_0x3e6ade>=_0x4d5e0a)return!![];}}if(_0x574d4d['note'][_0x235299(0x17d)](_0x1b5094)){const _0x2fd47b=Number(RegExp['$1'])||0x1;if(_0x3e6ade>=_0x2fd47b)return!![];}}}}return![];},Window_EquipItem[_0x220c41(0x4a1)][_0x220c41(0x64f)]=function(_0x4f0a8e){const _0x4cce09=_0x220c41;if(!DataManager[_0x4cce09(0x5e6)](_0x4f0a8e))return![];const _0x143da1=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x333637=0x0;const _0x90f02c=this[_0x4cce09(0x60b)][_0x4cce09(0x440)](),_0xbcb57e=SceneManager[_0x4cce09(0x37c)][_0x4cce09(0x328)][_0x4cce09(0x225)]();_0x90f02c[_0xbcb57e]=null;for(const _0x3a7e0b of _0x90f02c){if(_0x4cce09(0x381)===_0x4cce09(0x381)){if(!_0x3a7e0b)continue;if(!DataManager[_0x4cce09(0x5e6)](_0x3a7e0b))continue;if(_0x4f0a8e['atypeId']===_0x3a7e0b[_0x4cce09(0x536)]){if(_0x4cce09(0x37e)!==_0x4cce09(0x37e)){if(!this[_0x4cce09(0x299)]())return;const _0x518e83=this[_0x4cce09(0x3b3)](),_0x2a1166=_0x21a2b8['ItemsEquipsCore'][_0x4cce09(0x22a)][_0x4cce09(0x278)][_0x4cce09(0x307)],_0x284918=_0x518e83===_0x4cce09(0x5d0)?_0xcefb68[_0x4cce09(0x27f)]:'\x5cI[%1]%2'[_0x4cce09(0x22d)](_0x2a1166,_0x114e67[_0x4cce09(0x27f)]),_0x1f0f71=this[_0x4cce09(0x1c2)]();this[_0x4cce09(0x230)](_0x284918,_0x4cce09(0x27f),_0x1f0f71);}else{_0x333637+=0x1;if(_0x4f0a8e[_0x4cce09(0x366)][_0x4cce09(0x17d)](_0x143da1)){if(_0x4cce09(0x34f)!==_0x4cce09(0x3de)){const _0x4d1ee8=Number(RegExp['$1'])||0x1;if(_0x333637>=_0x4d1ee8)return!![];}else return'iconText';}if(_0x3a7e0b[_0x4cce09(0x366)][_0x4cce09(0x17d)](_0x143da1)){const _0x5a6ff7=Number(RegExp['$1'])||0x1;if(_0x333637>=_0x5a6ff7)return!![];}}}}else return this['_item'][_0x4cce09(0x51d)]*this[_0x4cce09(0x351)]();}return![];},Window_EquipItem[_0x220c41(0x4a1)][_0x220c41(0x5ae)]=function(){const _0x1b44f3=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x1b44f3(0x22a)]['EquipScene'][_0x1b44f3(0x446)];},Window_EquipItem[_0x220c41(0x4a1)][_0x220c41(0x494)]=function(_0x2fa8fe){const _0x5bb2fc=_0x220c41,_0x5afb77=this[_0x5bb2fc(0x24a)](_0x2fa8fe);_0x5afb77?Window_ItemList[_0x5bb2fc(0x4a1)]['drawItem']['call'](this,_0x2fa8fe):this[_0x5bb2fc(0x1c7)](_0x2fa8fe);},Window_EquipItem['prototype']['drawRemoveItem']=function(_0x2ee1ea){const _0x2cb589=_0x220c41;this[_0x2cb589(0x1a7)](this[_0x2cb589(0x593)](null));const _0x1d9b09=VisuMZ[_0x2cb589(0x44d)][_0x2cb589(0x22a)][_0x2cb589(0x278)],_0x453b93=this[_0x2cb589(0x582)](_0x2ee1ea),_0x1f3f1e=_0x453b93['y']+(this[_0x2cb589(0x3d3)]()-ImageManager[_0x2cb589(0x557)])/0x2,_0x222747=ImageManager[_0x2cb589(0x44a)]+0x4,_0x1ccb60=Math['max'](0x0,_0x453b93['width']-_0x222747);this[_0x2cb589(0x5f1)](),this['drawIcon'](_0x1d9b09[_0x2cb589(0x2b5)],_0x453b93['x'],_0x1f3f1e),this[_0x2cb589(0x343)](_0x1d9b09[_0x2cb589(0x219)],_0x453b93['x']+_0x222747,_0x453b93['y'],_0x1ccb60),this[_0x2cb589(0x1a7)](!![]);},Window_EquipItem[_0x220c41(0x4a1)]['updateHelp']=function(){const _0x38d5a3=_0x220c41;Window_ItemList[_0x38d5a3(0x4a1)]['updateHelp']['call'](this);if(this[_0x38d5a3(0x60b)]&&this[_0x38d5a3(0x55d)]&&this[_0x38d5a3(0x2ea)]>=0x0){if(_0x38d5a3(0x594)==='mJptK'){if(this[_0x38d5a3(0x23c)]())return;_0x1ab336[_0x38d5a3(0x4a1)][_0x38d5a3(0x240)][_0x38d5a3(0x36e)](this);}else{const _0x4c3f37=JsonEx[_0x38d5a3(0x2cf)](this[_0x38d5a3(0x60b)]);_0x4c3f37[_0x38d5a3(0x4ee)]=!![],_0x4c3f37[_0x38d5a3(0x5b8)](this['_slotId'],this['item']()),this[_0x38d5a3(0x55d)][_0x38d5a3(0x1fc)](_0x4c3f37);}}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x458)]=Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x600)],Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x600)]=function(_0x514d0f){const _0x4a8a1a=_0x220c41;VisuMZ[_0x4a8a1a(0x44d)][_0x4a8a1a(0x458)][_0x4a8a1a(0x36e)](this,_0x514d0f),this[_0x4a8a1a(0x3a5)](_0x514d0f);},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x3a5)]=function(_0x5708eb){const _0x1935a2=_0x220c41,_0x2b4f0a=new Rectangle(0x0,0x0,_0x5708eb[_0x1935a2(0x2c3)],_0x5708eb['height']);this[_0x1935a2(0x644)]=new Window_Base(_0x2b4f0a),this['_commandNameWindow'][_0x1935a2(0x267)]=0x0,this['addChild'](this[_0x1935a2(0x644)]),this[_0x1935a2(0x5d7)]();},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x4eb)]=function(){const _0x1b8cd9=_0x220c41;Window_HorzCommand[_0x1b8cd9(0x4a1)][_0x1b8cd9(0x4eb)]['call'](this);if(this[_0x1b8cd9(0x644)])this[_0x1b8cd9(0x5d7)]();},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x5d7)]=function(){const _0x307005=_0x220c41,_0x3d717f=this[_0x307005(0x644)];_0x3d717f[_0x307005(0x422)][_0x307005(0x27f)]();const _0x560590=this[_0x307005(0x638)](this[_0x307005(0x468)]());if(_0x560590===_0x307005(0x49d)){const _0x3721be=this['itemLineRect'](this[_0x307005(0x468)]());let _0x480bea=this[_0x307005(0x623)](this[_0x307005(0x468)]());_0x480bea=_0x480bea[_0x307005(0x3e1)](/\\I\[(\d+)\]/gi,''),_0x3d717f['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x480bea,_0x3721be),this[_0x307005(0x400)](_0x480bea,_0x3721be),this[_0x307005(0x3a4)](_0x480bea,_0x3721be);}},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x383)]=function(_0x37cb46,_0x59ac37){},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x400)]=function(_0x56461c,_0x3b0b29){const _0x3edb96=_0x220c41,_0x1c3957=this['_commandNameWindow'];_0x1c3957[_0x3edb96(0x343)](_0x56461c,0x0,_0x3b0b29['y'],_0x1c3957['innerWidth'],'center');},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x3a4)]=function(_0x2daaa7,_0x231cdf){const _0x3c4bf6=_0x220c41,_0x4f4267=this[_0x3c4bf6(0x644)],_0x3dd818=$gameSystem[_0x3c4bf6(0x3f8)](),_0x581adf=_0x231cdf['x']+Math[_0x3c4bf6(0x27a)](_0x231cdf['width']/0x2)+_0x3dd818;_0x4f4267['x']=_0x4f4267[_0x3c4bf6(0x2c3)]/-0x2+_0x581adf,_0x4f4267['y']=Math[_0x3c4bf6(0x27a)](_0x231cdf['height']/0x2);},Window_ShopCommand[_0x220c41(0x4a1)]['maxCols']=function(){const _0x5e3e05=_0x220c41;return this[_0x5e3e05(0x409)]?this[_0x5e3e05(0x409)][_0x5e3e05(0x5ff)]:0x3;},Window_ShopCommand['prototype']['hideDisabledCommands']=function(){const _0x17dfe9=_0x220c41;return VisuMZ[_0x17dfe9(0x44d)][_0x17dfe9(0x22a)][_0x17dfe9(0x217)]['CmdHideDisabled'];},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x2b1)]=function(){const _0x2d2d1d=_0x220c41;this[_0x2d2d1d(0x25e)](),this['addSellCommand'](),this[_0x2d2d1d(0x331)]();},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x387)]=function(){const _0x584202=_0x220c41;Window_HorzCommand['prototype'][_0x584202(0x387)][_0x584202(0x36e)](this),this[_0x584202(0x28a)]();},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x25e)]=function(){const _0x19ab37=_0x220c41,_0x5cf67d=this[_0x19ab37(0x3b3)](),_0x56f588=VisuMZ[_0x19ab37(0x44d)][_0x19ab37(0x22a)][_0x19ab37(0x217)][_0x19ab37(0x526)],_0x29413d=_0x5cf67d===_0x19ab37(0x5d0)?TextManager[_0x19ab37(0x578)]:_0x19ab37(0x514)[_0x19ab37(0x22d)](_0x56f588,TextManager[_0x19ab37(0x578)]),_0x4aa32b=this[_0x19ab37(0x654)]();if(this[_0x19ab37(0x595)]()&&!_0x4aa32b)return;this[_0x19ab37(0x230)](_0x29413d,_0x19ab37(0x578),_0x4aa32b);},Window_ShopCommand[_0x220c41(0x4a1)]['isBuyCommandEnabled']=function(){const _0x47b608=_0x220c41;return SceneManager[_0x47b608(0x37c)][_0x47b608(0x1e7)]===Scene_Shop?SceneManager['_scene']['_goodsCount']>0x0:!![];},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x478)]=function(){const _0x1a85a5=_0x220c41,_0x3c4a78=this[_0x1a85a5(0x3b3)](),_0x2bf773=VisuMZ[_0x1a85a5(0x44d)][_0x1a85a5(0x22a)][_0x1a85a5(0x217)]['CmdIconSell'],_0x3456a4=_0x3c4a78===_0x1a85a5(0x5d0)?TextManager[_0x1a85a5(0x1dd)]:_0x1a85a5(0x514)[_0x1a85a5(0x22d)](_0x2bf773,TextManager['sell']),_0xd89560=this[_0x1a85a5(0x481)]();if(this['hideDisabledCommands']()&&!_0xd89560)return;this[_0x1a85a5(0x230)](_0x3456a4,_0x1a85a5(0x1dd),_0xd89560);},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x481)]=function(){const _0x1dacb2=_0x220c41;return!this[_0x1dacb2(0x416)];},Window_ShopCommand['prototype']['addCancelCommand']=function(){const _0xca1bf=_0x220c41,_0x3ce2d7=this[_0xca1bf(0x3b3)](),_0x37e00b=VisuMZ[_0xca1bf(0x44d)][_0xca1bf(0x22a)][_0xca1bf(0x217)][_0xca1bf(0x4a0)],_0x4d61b7=VisuMZ[_0xca1bf(0x44d)]['Settings']['ShopScene'][_0xca1bf(0x465)],_0x2ae6d3=_0x3ce2d7===_0xca1bf(0x5d0)?_0x4d61b7:_0xca1bf(0x514)['format'](_0x37e00b,_0x4d61b7);this[_0xca1bf(0x230)](_0x2ae6d3,'cancel');},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x558)]=function(){const _0x5e38be=_0x220c41;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5e38be(0x217)][_0x5e38be(0x1e0)];},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x494)]=function(_0x250308){const _0x6b5776=_0x220c41,_0x55597f=this[_0x6b5776(0x638)](_0x250308);if(_0x55597f===_0x6b5776(0x46d))this['drawItemStyleIconText'](_0x250308);else _0x55597f==='icon'?this[_0x6b5776(0x218)](_0x250308):Window_HorzCommand[_0x6b5776(0x4a1)][_0x6b5776(0x494)]['call'](this,_0x250308);},Window_ShopCommand[_0x220c41(0x4a1)]['commandStyle']=function(){const _0x3a99b1=_0x220c41;return VisuMZ['ItemsEquipsCore']['Settings'][_0x3a99b1(0x217)][_0x3a99b1(0x2ed)];},Window_ShopCommand[_0x220c41(0x4a1)][_0x220c41(0x638)]=function(_0x5af700){const _0x277866=_0x220c41;if(_0x5af700<0x0)return'text';const _0x2cb2f4=this[_0x277866(0x3b3)]();if(_0x2cb2f4!=='auto')return _0x2cb2f4;else{if(this['maxItems']()>0x0){if(_0x277866(0x3df)!=='ITftQ'){const _0x50bce5=this['commandName'](_0x5af700);if(_0x50bce5[_0x277866(0x17d)](/\\I\[(\d+)\]/i)){const _0x2124f5=this[_0x277866(0x582)](_0x5af700),_0x532121=this[_0x277866(0x282)](_0x50bce5)[_0x277866(0x2c3)];return _0x532121<=_0x2124f5[_0x277866(0x2c3)]?_0x277866(0x46d):_0x277866(0x49d);}}else _0xf8557f[_0x277866(0x5b8)](_0x17e332,this[_0x277866(0x1e6)]);}}return _0x277866(0x5d0);},Window_ShopCommand['prototype'][_0x220c41(0x5c4)]=function(_0x10fb3e){const _0x400f75=_0x220c41,_0xfb9a4=this['itemLineRect'](_0x10fb3e),_0x4f5914=this[_0x400f75(0x623)](_0x10fb3e),_0x4ca5ff=this[_0x400f75(0x282)](_0x4f5914)['width'];this[_0x400f75(0x1a7)](this[_0x400f75(0x418)](_0x10fb3e));const _0x3c365a=this[_0x400f75(0x558)]();if(_0x3c365a===_0x400f75(0x28c))this[_0x400f75(0x3d8)](_0x4f5914,_0xfb9a4['x']+_0xfb9a4['width']-_0x4ca5ff,_0xfb9a4['y'],_0x4ca5ff);else{if(_0x3c365a===_0x400f75(0x357)){if('LyjUp'!==_0x400f75(0x250))this['_category']!==_0x3cff5a&&(this['_category']=_0x206e8a,this[_0x400f75(0x387)](),this['_categoryWindow']&&this[_0x400f75(0x5fb)][_0x400f75(0x23c)]()?this[_0x400f75(0x353)](0x0):this['scrollTo'](0x0,0x0));else{const _0x17703b=_0xfb9a4['x']+Math['floor']((_0xfb9a4[_0x400f75(0x2c3)]-_0x4ca5ff)/0x2);this[_0x400f75(0x3d8)](_0x4f5914,_0x17703b,_0xfb9a4['y'],_0x4ca5ff);}}else this[_0x400f75(0x3d8)](_0x4f5914,_0xfb9a4['x'],_0xfb9a4['y'],_0x4ca5ff);}},Window_ShopCommand[_0x220c41(0x4a1)]['drawItemStyleIcon']=function(_0x59e7c9){const _0x4a40f0=_0x220c41;this['commandName'](_0x59e7c9)[_0x4a40f0(0x17d)](/\\I\[(\d+)\]/i);const _0x46b97a=Number(RegExp['$1'])||0x0,_0x3e386c=this[_0x4a40f0(0x582)](_0x59e7c9),_0x2303fa=_0x3e386c['x']+Math[_0x4a40f0(0x27a)]((_0x3e386c['width']-ImageManager[_0x4a40f0(0x44a)])/0x2),_0x314663=_0x3e386c['y']+(_0x3e386c['height']-ImageManager[_0x4a40f0(0x557)])/0x2;this[_0x4a40f0(0x592)](_0x46b97a,_0x2303fa,_0x314663);},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x606)]=Window_ShopBuy[_0x220c41(0x4a1)][_0x220c41(0x387)],Window_ShopBuy[_0x220c41(0x4a1)][_0x220c41(0x387)]=function(){const _0xb967af=_0x220c41;this[_0xb967af(0x18b)](),VisuMZ['ItemsEquipsCore'][_0xb967af(0x606)][_0xb967af(0x36e)](this);},Window_ShopBuy['prototype']['updateMoneyAmount']=function(){const _0x993484=_0x220c41;if(SceneManager[_0x993484(0x37c)][_0x993484(0x1e7)]===Scene_Shop){if(_0x993484(0x1c6)!==_0x993484(0x55a))this['_money']=SceneManager[_0x993484(0x37c)][_0x993484(0x3f1)]();else{const _0x3c5219=this['itemLineRect'](this['index']());let _0x15abef=this[_0x993484(0x623)](this[_0x993484(0x468)]());_0x15abef=_0x15abef[_0x993484(0x3e1)](/\\I\[(\d+)\]/gi,''),_0x4698a1['resetFontSettings'](),this['categoryNameWindowDrawBackground'](_0x15abef,_0x3c5219),this[_0x993484(0x543)](_0x15abef,_0x3c5219),this[_0x993484(0x565)](_0x15abef,_0x3c5219);}}},VisuMZ[_0x220c41(0x44d)][_0x220c41(0x64e)]=Window_ShopBuy['prototype'][_0x220c41(0x51d)],Window_ShopBuy[_0x220c41(0x4a1)][_0x220c41(0x51d)]=function(_0x4bcc68){const _0x17163b=_0x220c41;if(!_0x4bcc68)return 0x0;let _0x333ebe=VisuMZ['ItemsEquipsCore'][_0x17163b(0x64e)][_0x17163b(0x36e)](this,_0x4bcc68);return Math['max'](0x0,this[_0x17163b(0x5c6)](_0x4bcc68,_0x333ebe));},Window_ShopBuy[_0x220c41(0x4a1)][_0x220c41(0x5c6)]=function(_0x2be4e5,_0x5b558d){const _0x49c80c=_0x220c41,_0x40cd88=_0x2be4e5['note'];if(_0x40cd88['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x583fa2=String(RegExp['$1']);try{eval(_0x583fa2);}catch(_0x24ffba){if($gameTemp[_0x49c80c(0x4ed)]())console[_0x49c80c(0x297)](_0x24ffba);}}_0x5b558d=VisuMZ[_0x49c80c(0x44d)][_0x49c80c(0x22a)]['ShopScene']['BuyPriceJS'][_0x49c80c(0x36e)](this,_0x2be4e5,_0x5b558d);if(isNaN(_0x5b558d))_0x5b558d=0x0;return Math['floor'](_0x5b558d);},Window_ShopBuy['prototype'][_0x220c41(0x494)]=function(_0x5b91a7){const _0x446025=_0x220c41;this[_0x446025(0x27e)]();const _0x5d426a=this[_0x446025(0x24a)](_0x5b91a7),_0x518e6b=this['itemLineRect'](_0x5b91a7),_0x240314=_0x518e6b['width'];this['changePaintOpacity'](this[_0x446025(0x593)](_0x5d426a)),this[_0x446025(0x378)](_0x5d426a,_0x518e6b['x'],_0x518e6b['y'],_0x240314),this[_0x446025(0x1b6)](_0x5d426a,_0x518e6b),this['changePaintOpacity'](!![]);},Window_ShopBuy['prototype'][_0x220c41(0x1b6)]=function(_0x4f25d7,_0x171538){const _0x1947c3=_0x220c41,_0x44a2d8=this['price'](_0x4f25d7);this[_0x1947c3(0x320)](_0x44a2d8,TextManager[_0x1947c3(0x426)],_0x171538['x'],_0x171538['y'],_0x171538[_0x1947c3(0x2c3)]);},Window_ShopSell[_0x220c41(0x4a1)][_0x220c41(0x4f5)]=function(){const _0x115eaa=_0x220c41;return SceneManager[_0x115eaa(0x37c)][_0x115eaa(0x559)]()?0x1:0x2;},VisuMZ[_0x220c41(0x44d)]['Window_ShopSell_isEnabled']=Window_ShopSell['prototype'][_0x220c41(0x593)],Window_ShopSell[_0x220c41(0x4a1)][_0x220c41(0x593)]=function(_0x39b386){const _0x3f0238=_0x220c41;if(!_0x39b386)return![];const _0x539f68=_0x39b386[_0x3f0238(0x366)];if(_0x539f68[_0x3f0238(0x17d)](/<CANNOT SELL>/i))return![];if(_0x539f68[_0x3f0238(0x17d)](/<CAN SELL>/i))return!![];if(_0x539f68[_0x3f0238(0x17d)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d6de6=JSON['parse']('['+RegExp['$1'][_0x3f0238(0x17d)](/\d+/g)+']');for(const _0x425678 of _0x5d6de6){if(!$gameSwitches[_0x3f0238(0x634)](_0x425678))return![];}}if(_0x539f68[_0x3f0238(0x17d)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3f0238(0x2aa)===_0x3f0238(0x2aa)){const _0x1729b1=JSON[_0x3f0238(0x636)]('['+RegExp['$1'][_0x3f0238(0x17d)](/\d+/g)+']');for(const _0x4eb77b of _0x1729b1){if(!$gameSwitches[_0x3f0238(0x634)](_0x4eb77b))return![];}}else return _0x4453ab[_0x3f0238(0x44d)]['Settings'][_0x3f0238(0x58c)]['ShowShopStatus'];}if(_0x539f68[_0x3f0238(0x17d)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13c4c9=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1c38f3 of _0x13c4c9){if(_0x3f0238(0x2c2)!==_0x3f0238(0x2c2))return![];else{if($gameSwitches[_0x3f0238(0x634)](_0x1c38f3))return![];}}}return VisuMZ[_0x3f0238(0x44d)][_0x3f0238(0x568)][_0x3f0238(0x36e)](this,_0x39b386);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x5ec)]=function(){return![];},Window_ShopStatus['prototype'][_0x220c41(0x2f6)]=function(){const _0x5b818d=_0x220c41;Window_StatusBase['prototype']['loadFaceImages'][_0x5b818d(0x36e)](this);for(const _0x49fe88 of $gameParty[_0x5b818d(0x301)]()){ImageManager[_0x5b818d(0x2d1)](_0x49fe88[_0x5b818d(0x29f)]());}},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x19f)]=function(){const _0x9629c5=_0x220c41;return VisuMZ[_0x9629c5(0x44d)][_0x9629c5(0x22a)]['StatusWindow'][_0x9629c5(0x40e)];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x387)]=function(){const _0x2d1b92=_0x220c41;this[_0x2d1b92(0x422)][_0x2d1b92(0x27f)](),this['contentsBack'][_0x2d1b92(0x27f)]();if(this[_0x2d1b92(0x1e6)]){this['resetFontSettings'](),this['changePaintOpacity'](!![]),this[_0x2d1b92(0x548)]();if(this[_0x2d1b92(0x5e2)]()){if(_0x2d1b92(0x3c9)===_0x2d1b92(0x3c9))this[_0x2d1b92(0x181)]();else{if(_0x322e23[_0x2d1b92(0x1ee)](_0x5c62c6))return![];return _0x3108bb['ItemsEquipsCore'][_0x2d1b92(0x322)][_0x2d1b92(0x36e)](this,_0x5a8060);}}else{if(_0x2d1b92(0x262)==='HqOjE'){_0x5b3985+=0x1;if(_0x3b5869[_0x2d1b92(0x366)][_0x2d1b92(0x17d)](_0x2aef4a)){const _0x3cfb4a=_0x3a8b4a(_0xd75ba['$1'])||0x1;if(_0x73ffc0>=_0x3cfb4a)return!![];}if(_0x57d3f6['note']['match'](_0x5d2226)){const _0x4b8a14=_0x28f8f4(_0x2ad62b['$1'])||0x1;if(_0x507072>=_0x4b8a14)return!![];}}else this[_0x2d1b92(0x488)]();}this[_0x2d1b92(0x2a5)]();}},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x24d)]=function(_0x2b7c7e,_0x29acd0){const _0x189660=_0x220c41;if(!this[_0x189660(0x5e2)]()&&!DataManager[_0x189660(0x498)](this[_0x189660(0x1e6)]))return;const _0x55d814=this['innerWidth']-this['itemPadding']()-_0x2b7c7e,_0x39e458=this['textWidth'](_0x189660(0x4d1));this[_0x189660(0x1e5)](ColorManager[_0x189660(0x641)]()),this['drawText'](TextManager['possession'],_0x2b7c7e+this[_0x189660(0x615)](),_0x29acd0,_0x55d814-_0x39e458),this[_0x189660(0x5f1)](),this[_0x189660(0x192)](this[_0x189660(0x1e6)],_0x2b7c7e,_0x29acd0,_0x55d814);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x3bf)]=function(_0x91f1c,_0x5b5477,_0x5b23e1,_0x7b0998,_0x34e259){const _0x200323=_0x220c41;if(VisuMZ['ItemsEquipsCore']['Settings'][_0x200323(0x315)][_0x200323(0x2af)]===![])return;_0x34e259=Math[_0x200323(0x39b)](_0x34e259||0x1,0x1);while(_0x34e259--){_0x7b0998=_0x7b0998||this[_0x200323(0x3d3)](),this[_0x200323(0x228)][_0x200323(0x33f)]=0xa0;const _0x3cf4ed=ColorManager[_0x200323(0x2a6)]();this['contentsBack'][_0x200323(0x284)](_0x91f1c+0x1,_0x5b5477+0x1,_0x5b23e1-0x2,_0x7b0998-0x2,_0x3cf4ed),this[_0x200323(0x228)][_0x200323(0x33f)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x555359=_0x220c41,_0x151d4e=VisuMZ[_0x555359(0x44d)][_0x555359(0x22a)][_0x555359(0x315)];let _0x517095=_0x151d4e['BackRectColor']!==undefined?_0x151d4e[_0x555359(0x1ce)]:0x13;return ColorManager[_0x555359(0x1a9)](_0x517095);},Window_ShopStatus[_0x220c41(0x4a1)]['drawEquipData']=function(){const _0x29b726=_0x220c41;if(VisuMZ['ItemsEquipsCore'][_0x29b726(0x22a)][_0x29b726(0x315)][_0x29b726(0x29a)]){VisuMZ[_0x29b726(0x44d)]['Settings'][_0x29b726(0x315)][_0x29b726(0x29a)][_0x29b726(0x36e)](this);return;}const _0x40077e=this[_0x29b726(0x3d3)](),_0x5f3417=this['gaugeLineHeight']()+0x8;let _0x1f9a7f=0x0,_0x563101=0x0,_0x1b9de9=this[_0x29b726(0x4a5)],_0x54494c=this['innerHeight'],_0x39890f=Math['floor'](_0x1b9de9/0x2),_0x556553=_0x1f9a7f+_0x1b9de9-_0x39890f;this['drawItemName'](this[_0x29b726(0x1e6)],_0x1f9a7f+this['itemPadding'](),_0x563101,_0x1b9de9-this[_0x29b726(0x615)]()*0x2),this['drawItemDarkRect'](_0x1f9a7f,_0x563101,_0x1b9de9),_0x563101+=_0x40077e;if(this[_0x29b726(0x317)](_0x1f9a7f,_0x563101,_0x39890f))_0x563101+=0x0;if(this[_0x29b726(0x3ff)](_0x556553,_0x563101,_0x39890f))_0x563101+=_0x40077e;const _0x53310a=this[_0x29b726(0x625)](),_0x5c2ab3=_0x563101;_0x563101=_0x54494c-_0x53310a[_0x29b726(0x5ff)]*_0x5f3417-0x4;let _0x2172f0=_0x1f9a7f,_0x44280d=0x0,_0x3aef49=_0x563101;for(const _0x1ff150 of _0x53310a){_0x29b726(0x5f4)!==_0x29b726(0x5f4)?this['_sellWindow']['setStatusWindow'](this[_0x29b726(0x55d)]):(_0x44280d=Math[_0x29b726(0x39b)](this[_0x29b726(0x19a)](_0x1ff150,_0x1f9a7f+0x4,_0x563101+0x4,_0x1b9de9),_0x44280d),_0x563101+=_0x5f3417);}const _0x22abd5=$gameParty[_0x29b726(0x591)](),_0x46ba75=Math[_0x29b726(0x27a)]((_0x1b9de9-_0x44280d)/_0x22abd5);_0x44280d=_0x1b9de9-_0x46ba75*_0x22abd5;for(const _0x14f746 of $gameParty[_0x29b726(0x529)]()){if('BNCCb'!==_0x29b726(0x436)){const _0x3cc8ac=this[_0x29b726(0x263)](_0x55de09);if(_0x3cc8ac<0x0)return;const _0x543105=_0x1c343c===0x1?_0x509a0e[_0x363cf6]:_0x29e791[_0x3c5320];this[_0x29b726(0x30e)](_0x3cc8ac,_0x543105);}else{const _0x4ea184=$gameParty[_0x29b726(0x529)]()[_0x29b726(0x4bd)](_0x14f746),_0x2040c7=_0x2172f0+_0x44280d+_0x4ea184*_0x46ba75;this['changePaintOpacity'](_0x14f746[_0x29b726(0x5e7)](this[_0x29b726(0x1e6)])),this['drawActorCharacter'](_0x14f746,_0x2040c7+_0x46ba75/0x2,_0x3aef49);let _0x5b1731=_0x3aef49;for(const _0x3ad12a of _0x53310a){const _0x5c7901=_0x5b1731-(_0x40077e-_0x5f3417)/0x2;this[_0x29b726(0x200)](_0x14f746,_0x3ad12a,_0x2040c7,_0x5c7901,_0x46ba75),_0x5b1731+=_0x5f3417;}}}this['drawItemDarkRect'](_0x2172f0,_0x5c2ab3,_0x44280d,_0x3aef49-_0x5c2ab3);for(let _0x722601=0x0;_0x722601<_0x22abd5;_0x722601++){const _0x152aa9=_0x2172f0+_0x44280d+_0x722601*_0x46ba75;this['drawItemDarkRect'](_0x152aa9,_0x5c2ab3,_0x46ba75,_0x3aef49-_0x5c2ab3);}for(const _0x38debb of _0x53310a){this[_0x29b726(0x3bf)](_0x2172f0,_0x3aef49,_0x44280d,_0x5f3417);for(let _0x1e7a2d=0x0;_0x1e7a2d<_0x22abd5;_0x1e7a2d++){const _0x3f6f90=_0x2172f0+_0x44280d+_0x1e7a2d*_0x46ba75;this[_0x29b726(0x3bf)](_0x3f6f90,_0x3aef49,_0x46ba75,_0x5f3417);}_0x3aef49+=_0x5f3417;}},Window_ShopStatus[_0x220c41(0x4a1)]['drawItemEquipType']=function(_0x5dc4e5,_0x5ab199,_0x4362ed){const _0x4f28c1=_0x220c41;if(!this[_0x4f28c1(0x5e2)]())return![];const _0x51103c=$dataSystem[_0x4f28c1(0x5af)][this['_item'][_0x4f28c1(0x61c)]];return this['drawItemKeyData'](_0x51103c,_0x5dc4e5,_0x5ab199,_0x4362ed,!![]),this[_0x4f28c1(0x3bf)](_0x5dc4e5,_0x5ab199,_0x4362ed),this[_0x4f28c1(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemQuantityText']=function(){const _0x49c1a9=_0x220c41,_0xaa73ff=VisuMZ[_0x49c1a9(0x44d)]['Settings'][_0x49c1a9(0x58c)][_0x49c1a9(0x306)];return _0xaa73ff[_0x49c1a9(0x22d)]($gameParty[_0x49c1a9(0x280)](this[_0x49c1a9(0x1e6)]));},Window_ShopStatus['prototype'][_0x220c41(0x625)]=function(){const _0xca4a39=_0x220c41;let _0x576099=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0xca4a39(0x1d7)]&&(_0x576099=VisuMZ[_0xca4a39(0x394)][_0xca4a39(0x22a)]['Param'][_0xca4a39(0x415)]),_0x576099=_0x576099[_0xca4a39(0x3e9)](_0x504460=>typeof _0x504460==='number'?_0x504460:_0x504460['toUpperCase']()[_0xca4a39(0x31d)]()),_0x576099;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2f4)]=function(){const _0x4b8fdb=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x4b8fdb(0x22a)][_0x4b8fdb(0x315)]['ParamChangeFontSize'];},Window_ShopStatus['prototype'][_0x220c41(0x19a)]=function(_0x4b2c01,_0x153995,_0x3ae837,_0x4c126d){const _0xd162e2=_0x220c41;this[_0xd162e2(0x27e)](),this[_0xd162e2(0x422)][_0xd162e2(0x5f6)]=this[_0xd162e2(0x2f4)]();let _0x3d586f=this[_0xd162e2(0x48d)](TextManager[_0xd162e2(0x28d)](_0x4b2c01))+0x4+_0x153995;if(Imported[_0xd162e2(0x1d7)])this['drawParamText'](_0x153995,_0x3ae837,_0x4c126d,_0x4b2c01,!![]),VisuMZ[_0xd162e2(0x394)][_0xd162e2(0x22a)][_0xd162e2(0x3ec)][_0xd162e2(0x251)]&&(_0xd162e2(0x45f)!=='tCCLG'?this['_newLabelOpacityChange']*=-0x1:_0x3d586f+=ImageManager[_0xd162e2(0x44a)]+0x4);else{if('xOrAx'!==_0xd162e2(0x429))this[_0xd162e2(0x1e5)](ColorManager[_0xd162e2(0x641)]()),this[_0xd162e2(0x343)](TextManager[_0xd162e2(0x28d)](_0x4b2c01),_0x153995,_0x3ae837,_0x4c126d);else{if(!_0x150900['isSceneShop']())return;const _0x377fac=_0x2c4e6a[_0xd162e2(0x44d)][_0xd162e2(0x22a)][_0xd162e2(0x217)];_0x377fac[_0xd162e2(0x369)]&&_0x1b89f5[_0xd162e2(0x44c)](_0x377fac['SwitchBuy'],![]),_0x377fac[_0xd162e2(0x20d)]&&_0xb2af78[_0xd162e2(0x44c)](_0x377fac[_0xd162e2(0x20d)],![]);}}return this[_0xd162e2(0x27e)](),_0x3d586f;},Window_ShopStatus['prototype'][_0x220c41(0x200)]=function(_0x1c65d1,_0x3dc4c0,_0x4407fd,_0x348855,_0xb6368){const _0x50640c=_0x220c41;_0x4407fd+=this[_0x50640c(0x615)](),_0xb6368-=this[_0x50640c(0x615)]()*0x2;const _0x1eca77=VisuMZ[_0x50640c(0x44d)][_0x50640c(0x22a)][_0x50640c(0x315)];this[_0x50640c(0x422)][_0x50640c(0x5f6)]=_0x1eca77[_0x50640c(0x57a)],this[_0x50640c(0x1a7)](_0x1c65d1['canEquip'](this[_0x50640c(0x1e6)]));if(_0x1c65d1['isEquipped'](this[_0x50640c(0x1e6)])&&!_0x1c65d1[_0x50640c(0x601)](this[_0x50640c(0x1e6)])){const _0x1a523d=_0x1eca77[_0x50640c(0x289)];this[_0x50640c(0x343)](_0x1a523d,_0x4407fd,_0x348855,_0xb6368,_0x50640c(0x357));}else{if(_0x1c65d1[_0x50640c(0x5e7)](this[_0x50640c(0x1e6)])){const _0xb6d2c5=JsonEx[_0x50640c(0x2cf)](_0x1c65d1);_0xb6d2c5['_tempActor']=!![];const _0x37c847=_0xb6d2c5['getEmptyEquipSlotOfSameEtype'](this[_0x50640c(0x1e6)]);_0x37c847>=0x0&&_0xb6d2c5[_0x50640c(0x5b8)](_0x37c847,this[_0x50640c(0x1e6)]);let _0x1a91eb=0x0,_0x4fc3b4=0x0,_0x144cb1=0x0;if(Imported[_0x50640c(0x1d7)])_0x1a91eb=_0xb6d2c5[_0x50640c(0x3aa)](_0x3dc4c0),_0x4fc3b4=_0x1a91eb-_0x1c65d1[_0x50640c(0x3aa)](_0x3dc4c0),this[_0x50640c(0x1e5)](ColorManager[_0x50640c(0x5f7)](_0x4fc3b4)),_0x144cb1=(_0x4fc3b4>=0x0?'+':'')+VisuMZ[_0x50640c(0x36b)](_0x4fc3b4,0x0,_0x3dc4c0);else{if(_0x50640c(0x4e0)===_0x50640c(0x556)){const _0x5c12d1=_0x59b4f3[_0x50640c(0x4a1)][_0x50640c(0x2d3)](-0x1,_0x353fd8);if(_0x5c12d1>0x0){_0x235534+=_0x50640c(0x552)[_0x50640c(0x22d)](_0x5c12d1),_0x1c1f47++;if(_0x1c68b6>=_0x12b313)return _0x441c24;}}else _0x1a91eb=_0xb6d2c5[_0x50640c(0x28d)](_0x3dc4c0),_0x4fc3b4=_0x1a91eb-_0x1c65d1[_0x50640c(0x28d)](_0x3dc4c0),this['changeTextColor'](ColorManager[_0x50640c(0x5f7)](_0x4fc3b4)),_0x144cb1=(_0x4fc3b4>=0x0?'+':'')+_0x4fc3b4;}_0x144cb1==='+0'&&(_0x144cb1=_0x1eca77['NoChangeMarker']),this[_0x50640c(0x343)](_0x144cb1,_0x4407fd,_0x348855,_0xb6368,_0x50640c(0x357));}else{if(_0x50640c(0x5de)==='RDBEI'){const _0xc760b4=_0x1eca77[_0x50640c(0x291)];this[_0x50640c(0x343)](_0xc760b4,_0x4407fd,_0x348855,_0xb6368,_0x50640c(0x357));}else _0x557d8d=_0x18dfd9(_0x53c46f['$1']);}}this[_0x50640c(0x27e)](),this['changePaintOpacity'](!![]);},Game_Actor[_0x220c41(0x4a1)][_0x220c41(0x601)]=function(_0x4ea5bc){const _0x2b7c43=_0x220c41;if(!_0x4ea5bc)return![];const _0x21f218=_0x4ea5bc[_0x2b7c43(0x61c)],_0x4c0805=this[_0x2b7c43(0x544)]();for(let _0x301bf4=0x0;_0x301bf4<_0x4c0805[_0x2b7c43(0x5ff)];_0x301bf4++){const _0x133ff8=_0x4c0805[_0x301bf4];if(_0x133ff8!==_0x21f218)continue;if(!this['equips']()[_0x301bf4])return!![];}return![];},Game_Actor[_0x220c41(0x4a1)]['getEmptyEquipSlotOfSameEtype']=function(_0x145de3){const _0xae56cb=_0x220c41;if(!_0x145de3)return-0x1;const _0x3fec81=_0x145de3[_0xae56cb(0x61c)],_0x1e65d7=this['equipSlots']();let _0x1e1217=-0x1;for(let _0x2cd94f=0x0;_0x2cd94f<_0x1e65d7[_0xae56cb(0x5ff)];_0x2cd94f++){const _0x49ef15=_0x1e65d7[_0x2cd94f];if(_0x49ef15!==_0x3fec81)continue;if(!this[_0xae56cb(0x440)]()[_0x2cd94f])return _0x2cd94f;if(_0x1e1217<0x0)_0x1e1217=_0x2cd94f;}return _0x1e1217;},Window_ShopStatus['prototype']['drawItemData']=function(){const _0x595cc6=_0x220c41;VisuMZ[_0x595cc6(0x44d)][_0x595cc6(0x22a)][_0x595cc6(0x315)][_0x595cc6(0x310)][_0x595cc6(0x36e)](this);},Window_ShopStatus[_0x220c41(0x4a1)]['drawItemName']=function(_0x4e0b2b,_0x35966a,_0x1b6786,_0x4b5a27){const _0x1e5b7c=_0x220c41,_0xdbcc09=DataManager[_0x1e5b7c(0x4aa)](_0x4e0b2b,_0x35966a,_0x1b6786,_0x4b5a27)&&Imported['VisuMZ_1_SkillsStatesCore'],_0x161c5a=_0x4e0b2b?_0x4e0b2b['name']:'';if(_0xdbcc09)Window_SkillList[_0x1e5b7c(0x4a1)][_0x1e5b7c(0x452)]['call'](this,_0x4e0b2b);Window_Base['prototype'][_0x1e5b7c(0x378)][_0x1e5b7c(0x36e)](this,_0x4e0b2b,_0x35966a,_0x1b6786,_0x4b5a27);if(_0xdbcc09)_0x4e0b2b[_0x1e5b7c(0x443)]=_0x161c5a;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x548)]=function(){const _0x46f3cc=_0x220c41;this[_0x46f3cc(0x51f)]={};if(!this['_item'])return;const _0x20f040=this[_0x46f3cc(0x1e6)][_0x46f3cc(0x366)];if(_0x20f040[_0x46f3cc(0x17d)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x1563a8=String(RegExp['$1'])[_0x46f3cc(0x5d4)](/[\r\n]+/);for(const _0xc0794 of _0x1563a8){if(_0x46f3cc(0x22e)!==_0x46f3cc(0x1cc)){if(_0xc0794[_0x46f3cc(0x17d)](/(.*):[ ](.*)/i)){const _0xdbb502=String(RegExp['$1'])[_0x46f3cc(0x1dc)]()['trim'](),_0x4cff31=String(RegExp['$2'])[_0x46f3cc(0x31d)]();this[_0x46f3cc(0x51f)][_0xdbb502]=_0x4cff31;}}else return this[_0x46f3cc(0x539)]();}}},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x5b4)]=function(){const _0x478923=_0x220c41;return Math[_0x478923(0x39b)](0x1,$gameSystem[_0x478923(0x3d5)]()-0x4);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x27e)]=function(){const _0x3ce3e0=_0x220c41;Window_StatusBase['prototype'][_0x3ce3e0(0x27e)][_0x3ce3e0(0x36e)](this),this[_0x3ce3e0(0x422)]['fontSize']=this[_0x3ce3e0(0x29c)]||this[_0x3ce3e0(0x422)][_0x3ce3e0(0x5f6)],this[_0x3ce3e0(0x422)][_0x3ce3e0(0x193)]=this[_0x3ce3e0(0x567)]||this['contents']['textColor'];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x609)]=function(){const _0x4c7b6f=_0x220c41;return this[_0x4c7b6f(0x422)][_0x4c7b6f(0x5f6)]/$gameSystem[_0x4c7b6f(0x3d5)]();},Window_ShopStatus['prototype']['drawIcon']=function(_0x545eb9,_0x2d6fda,_0x26eeb9){const _0x4f4399=_0x220c41,_0x14d6e5=ImageManager['loadSystem']('IconSet'),_0x178c79=ImageManager[_0x4f4399(0x44a)],_0x7707c2=ImageManager[_0x4f4399(0x557)],_0x43c633=_0x545eb9%0x10*_0x178c79,_0x2fd106=Math[_0x4f4399(0x27a)](_0x545eb9/0x10)*_0x7707c2,_0x2ae3e2=Math[_0x4f4399(0x28e)](_0x178c79*this[_0x4f4399(0x609)]()),_0x2792b5=Math[_0x4f4399(0x28e)](_0x7707c2*this[_0x4f4399(0x609)]());this['contents'][_0x4f4399(0x655)](_0x14d6e5,_0x43c633,_0x2fd106,_0x178c79,_0x7707c2,_0x2d6fda,_0x26eeb9,_0x2ae3e2,_0x2792b5);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x54c)]=function(_0x16b2ac,_0x348035){const _0x434894=_0x220c41;if(_0x348035[_0x434894(0x496)]){if(_0x434894(0x34d)!==_0x434894(0x34d)){if(_0x50988a['uiMenuStyle']&&_0x2a65ae[_0x434894(0x266)]!==_0x32ee60)return _0x5ae5ce[_0x434894(0x266)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x434894(0x39a)]()['match'](/LOWER/i);else _0x220f52[_0x434894(0x4a1)][_0x434894(0x359)][_0x434894(0x36e)](this);}}else this[_0x434894(0x592)](_0x16b2ac,_0x348035['x'],_0x348035['y']+0x2);}_0x348035['x']+=Math['ceil'](ImageManager[_0x434894(0x44a)]*this[_0x434894(0x609)]());if(this[_0x434894(0x609)]()===0x1)_0x348035['x']+=0x4;},Window_ShopStatus[_0x220c41(0x4a1)]['drawItemKeyData']=function(_0x2b40db,_0x381a84,_0x2847f5,_0x19136b,_0x38a440,_0x69052d){const _0x1ea53d=_0x220c41;_0x2b40db=_0x2b40db||'',_0x69052d=_0x69052d||_0x1ea53d(0x5a9),this[_0x1ea53d(0x29c)]=this[_0x1ea53d(0x5b4)](),this['_resetFontColor']=_0x38a440?ColorManager['systemColor']():this[_0x1ea53d(0x422)][_0x1ea53d(0x193)],_0x381a84+=this['itemPadding'](),_0x19136b-=this['itemPadding']()*0x2;const _0x13e686=this[_0x1ea53d(0x282)](_0x2b40db);if(_0x69052d===_0x1ea53d(0x357)){if(_0x1ea53d(0x5ea)==='BiXem')_0x381a84=_0x381a84+Math[_0x1ea53d(0x27a)]((_0x19136b-_0x13e686['width'])/0x2);else{if(!_0x3cd7c7[_0x1ea53d(0x634)](_0x53acb3))return![];}}else{if(_0x69052d===_0x1ea53d(0x28c)){if(_0x1ea53d(0x472)===_0x1ea53d(0x3b0))return _0x33beb6[_0x1ea53d(0x44d)][_0x1ea53d(0x22a)][_0x1ea53d(0x58c)][_0x1ea53d(0x374)];else _0x381a84=_0x381a84+_0x19136b-_0x13e686['width'];}}_0x2847f5+=(this[_0x1ea53d(0x3d3)]()-_0x13e686[_0x1ea53d(0x4d7)])/0x2,this[_0x1ea53d(0x3d8)](_0x2b40db,_0x381a84,_0x2847f5,_0x19136b),this['_resetFontSize']=undefined,this[_0x1ea53d(0x567)]=undefined,this[_0x1ea53d(0x27e)]();},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x39d)]=function(_0x48d2cf,_0x12fa75,_0x465158){const _0x10f9ee=_0x220c41;if(!DataManager['isItem'](this[_0x10f9ee(0x1e6)]))return![];const _0x5b67ba=this['getItemConsumableLabel']();this['drawItemKeyData'](_0x5b67ba,_0x48d2cf,_0x12fa75,_0x465158,!![]);const _0x2b6fe2=this[_0x10f9ee(0x649)]();return this[_0x10f9ee(0x365)](_0x2b6fe2,_0x48d2cf,_0x12fa75,_0x465158,![],_0x10f9ee(0x28c)),this[_0x10f9ee(0x3bf)](_0x48d2cf,_0x12fa75,_0x465158),this[_0x10f9ee(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x39e)]=function(){const _0x379612=_0x220c41;return VisuMZ[_0x379612(0x44d)][_0x379612(0x22a)]['StatusWindow'][_0x379612(0x540)];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemConsumableText']=function(){const _0x1903a7=_0x220c41,_0x1eb716=_0x1903a7(0x319);if(this['_customItemInfo'][_0x1eb716])return this[_0x1903a7(0x51f)][_0x1eb716];return this['canConsumeItem']()?VisuMZ['ItemsEquipsCore']['Settings'][_0x1903a7(0x315)]['Consumable']:VisuMZ[_0x1903a7(0x44d)][_0x1903a7(0x22a)][_0x1903a7(0x315)][_0x1903a7(0x5db)];},Window_ShopStatus['prototype'][_0x220c41(0x23d)]=function(){const _0x33ff72=_0x220c41;if(VisuMZ[_0x33ff72(0x394)]&&VisuMZ['CoreEngine'][_0x33ff72(0x22a)][_0x33ff72(0x3e3)][_0x33ff72(0x653)]&&DataManager[_0x33ff72(0x4e3)](this[_0x33ff72(0x1e6)])){if(_0x33ff72(0x646)===_0x33ff72(0x646))return![];else{const _0x1ebc39=this['_commandNameWindow'];_0x1ebc39['contents']['clear']();const _0x2d360c=this['commandStyleCheck'](this[_0x33ff72(0x468)]());if(_0x2d360c===_0x33ff72(0x49d)){const _0x14dbce=this['itemLineRect'](this['index']());let _0x77b37=this[_0x33ff72(0x623)](this[_0x33ff72(0x468)]());_0x77b37=_0x77b37[_0x33ff72(0x3e1)](/\\I\[(\d+)\]/gi,''),_0x1ebc39[_0x33ff72(0x27e)](),this['commandNameWindowDrawBackground'](_0x77b37,_0x14dbce),this[_0x33ff72(0x400)](_0x77b37,_0x14dbce),this[_0x33ff72(0x3a4)](_0x77b37,_0x14dbce);}}}else return this[_0x33ff72(0x1e6)][_0x33ff72(0x41b)];},Window_ShopStatus['prototype'][_0x220c41(0x3ff)]=function(_0x13e743,_0x5d37b1,_0x4246d8){const _0x1856a3=_0x220c41;if(!this['isEquipItem']()&&!DataManager[_0x1856a3(0x498)](this[_0x1856a3(0x1e6)]))return![];if(DataManager['isKeyItem'](this[_0x1856a3(0x1e6)])&&!$dataSystem[_0x1856a3(0x622)]){if('TIfMK'===_0x1856a3(0x439))_0xf3229['ItemsEquipsCore'][_0x1856a3(0x3d1)][_0x1856a3(0x36e)](this),this[_0x1856a3(0x23c)]()&&this[_0x1856a3(0x2ec)]();else{const _0x2c27ee=TextManager[_0x1856a3(0x5bc)];this['drawItemKeyData'](_0x2c27ee,_0x13e743,_0x5d37b1,_0x4246d8,!![],'center');}}else{if(_0x1856a3(0x4a6)!=='optOV'){const _0x18b291=TextManager[_0x1856a3(0x1ac)];this['drawItemKeyData'](_0x18b291,_0x13e743,_0x5d37b1,_0x4246d8,!![]);const _0x26e8f7=this[_0x1856a3(0x38a)]();this[_0x1856a3(0x365)](_0x26e8f7,_0x13e743,_0x5d37b1,_0x4246d8,![],_0x1856a3(0x28c));}else return!![];}return this[_0x1856a3(0x3bf)](_0x13e743,_0x5d37b1,_0x4246d8),this[_0x1856a3(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x38a)]=function(){const _0x1ff874=_0x220c41,_0x3ff155='QUANTITY';if(this[_0x1ff874(0x51f)][_0x3ff155])return this[_0x1ff874(0x51f)][_0x3ff155];const _0x593508=VisuMZ['ItemsEquipsCore'][_0x1ff874(0x22a)][_0x1ff874(0x58c)][_0x1ff874(0x306)];return _0x593508[_0x1ff874(0x22d)]($gameParty[_0x1ff874(0x280)](this[_0x1ff874(0x1e6)]));},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2b8)]=function(_0x32b935,_0x3435e2,_0x2e2131){const _0x18a0ff=_0x220c41,_0x594d06=this['getItemOccasionText']();return this[_0x18a0ff(0x365)](_0x594d06,_0x32b935,_0x3435e2,_0x2e2131,![],'center'),this[_0x18a0ff(0x3bf)](_0x32b935,_0x3435e2,_0x2e2131),this[_0x18a0ff(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemOccasionText']=function(){const _0x17bd20=_0x220c41,_0x2ad43a='OCCASION';if(this[_0x17bd20(0x51f)][_0x2ad43a])return this[_0x17bd20(0x51f)][_0x2ad43a];const _0x94c8d9=VisuMZ[_0x17bd20(0x44d)][_0x17bd20(0x22a)]['StatusWindow'],_0x6b2f2e=_0x17bd20(0x23f)[_0x17bd20(0x22d)](this[_0x17bd20(0x1e6)][_0x17bd20(0x5e3)]);return _0x94c8d9[_0x6b2f2e];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2f2)]=function(_0x1aa3bd,_0xc37e09,_0x4433f4){const _0x42303c=_0x220c41,_0x59095f=this[_0x42303c(0x36d)]();return this[_0x42303c(0x365)](_0x59095f,_0x1aa3bd,_0xc37e09,_0x4433f4,![],_0x42303c(0x357)),this[_0x42303c(0x3bf)](_0x1aa3bd,_0xc37e09,_0x4433f4),this[_0x42303c(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x36d)]=function(){const _0x25ec74=_0x220c41,_0x3bcd66='SCOPE';if(this['_customItemInfo'][_0x3bcd66])return this['_customItemInfo'][_0x3bcd66];const _0xaa37d3=VisuMZ['ItemsEquipsCore'][_0x25ec74(0x22a)]['StatusWindow'];if(Imported[_0x25ec74(0x5b3)]){const _0x392c67=this[_0x25ec74(0x1e6)]['note'];if(_0x392c67[_0x25ec74(0x17d)](/<TARGET:[ ](.*)>/i)){if('bewJm'!=='ocesf'){const _0x2f4371=String(RegExp['$1']);if(_0x2f4371['match'](/(\d+) RANDOM ANY/i))return _0xaa37d3[_0x25ec74(0x3b5)][_0x25ec74(0x22d)](Number(RegExp['$1']));else{if(_0x2f4371[_0x25ec74(0x17d)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if(_0x25ec74(0x54e)===_0x25ec74(0x296))this[_0x25ec74(0x55d)]['show']();else return _0xaa37d3['ScopeRandomEnemies'][_0x25ec74(0x22d)](Number(RegExp['$1']));}else{if(_0x2f4371['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0xaa37d3[_0x25ec74(0x36f)]['format'](Number(RegExp['$1']));else{if(_0x2f4371[_0x25ec74(0x17d)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0xaa37d3[_0x25ec74(0x5e8)];}}}}else{const _0x246cb7=this[_0x25ec74(0x2a7)]();this[_0x25ec74(0x365)](_0x246cb7,_0x273d22,_0x359b40,_0x1e5da4,!![]);const _0x588362=this[_0x25ec74(0x248)]();return this[_0x25ec74(0x365)](_0x588362,_0x1a08a7,_0x3fdc25,_0x1e8b0f,![],_0x25ec74(0x28c)),this[_0x25ec74(0x3bf)](_0x1b1cdc,_0x99f2b5,_0x4c1b8e),this[_0x25ec74(0x27e)](),!![];}}}const _0x4bc74c=_0x25ec74(0x234)['format'](this['_item']['scope']);return _0xaa37d3[_0x4bc74c];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x3f4)]=function(_0x47c98b,_0x1bcd1c,_0x42f64f){const _0xbb28ff=_0x220c41,_0x5274da=this[_0xbb28ff(0x2a7)]();this[_0xbb28ff(0x365)](_0x5274da,_0x47c98b,_0x1bcd1c,_0x42f64f,!![]);const _0x391c4b=this['getItemSpeedText']();return this[_0xbb28ff(0x365)](_0x391c4b,_0x47c98b,_0x1bcd1c,_0x42f64f,![],'right'),this[_0xbb28ff(0x3bf)](_0x47c98b,_0x1bcd1c,_0x42f64f),this[_0xbb28ff(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemSpeedLabel']=function(){const _0x4a471d=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x4a471d(0x22a)][_0x4a471d(0x315)][_0x4a471d(0x339)];},Window_ShopStatus['prototype']['getItemSpeedText']=function(){const _0x41aada=_0x220c41,_0x20503d=_0x41aada(0x333);if(this[_0x41aada(0x51f)][_0x20503d])return this[_0x41aada(0x51f)][_0x20503d];const _0x2f56f7=this[_0x41aada(0x1e6)][_0x41aada(0x5cb)];if(_0x2f56f7>=0x7d0)return VisuMZ[_0x41aada(0x44d)][_0x41aada(0x22a)][_0x41aada(0x315)][_0x41aada(0x19b)];else{if(_0x2f56f7>=0x3e8){if(_0x41aada(0x3a8)!==_0x41aada(0x3a8)){const _0x186646=_0x5920e6[_0x41aada(0x5af)]['indexOf'](_0x4f1c7c[_0x41aada(0x31d)]());if(_0x186646>0x0)_0x522dc0[_0x41aada(0x544)][_0x41aada(0x349)](_0x186646);}else return VisuMZ[_0x41aada(0x44d)][_0x41aada(0x22a)]['StatusWindow'][_0x41aada(0x384)];}else{if(_0x2f56f7>0x0)return VisuMZ['ItemsEquipsCore'][_0x41aada(0x22a)][_0x41aada(0x315)][_0x41aada(0x244)];else{if(_0x2f56f7===0x0){if(_0x41aada(0x3ce)===_0x41aada(0x3ce))return VisuMZ['ItemsEquipsCore'][_0x41aada(0x22a)][_0x41aada(0x315)]['Speed0'];else _0x46caf3['ItemsEquipsCore']['Scene_Equip_create'][_0x41aada(0x36e)](this),this[_0x41aada(0x23c)]()&&this['commandEquip']();}else{if(_0x2f56f7>-0x3e8)return VisuMZ[_0x41aada(0x44d)][_0x41aada(0x22a)][_0x41aada(0x315)][_0x41aada(0x22f)];else{if(_0x2f56f7>-0x7d0)return VisuMZ['ItemsEquipsCore'][_0x41aada(0x22a)]['StatusWindow'][_0x41aada(0x332)];else return _0x2f56f7<=-0x7d0?VisuMZ[_0x41aada(0x44d)][_0x41aada(0x22a)][_0x41aada(0x315)][_0x41aada(0x17f)]:'?????';}}}}}},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x5ef)]=function(_0x25ab7f,_0x57999b,_0x258b70){const _0x1280d4=_0x220c41,_0x262723=this['getItemSuccessRateLabel']();this[_0x1280d4(0x365)](_0x262723,_0x25ab7f,_0x57999b,_0x258b70,!![]);const _0x39627b=this[_0x1280d4(0x1cf)]();return this[_0x1280d4(0x365)](_0x39627b,_0x25ab7f,_0x57999b,_0x258b70,![],_0x1280d4(0x28c)),this['drawItemDarkRect'](_0x25ab7f,_0x57999b,_0x258b70),this[_0x1280d4(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x362)]=function(){const _0x39cfbd=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x39cfbd(0x22a)]['StatusWindow'][_0x39cfbd(0x43f)];},Window_ShopStatus['prototype']['getItemSuccessRateText']=function(){const _0x5a2a07=_0x220c41,_0x106b5=_0x5a2a07(0x288);if(this[_0x5a2a07(0x51f)][_0x106b5])return this[_0x5a2a07(0x51f)][_0x106b5];if(Imported[_0x5a2a07(0x5b3)]){if(_0x5a2a07(0x33c)===_0x5a2a07(0x182)){_0x56f8a9[_0x5a2a07(0x17d)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x4f169d=_0x39bd01(_0x2cf8cf['$1'])[_0x5a2a07(0x1dc)]()[_0x5a2a07(0x31d)]()[_0x5a2a07(0x5d4)](',');for(const _0xeb7fa8 of _0x4f169d){_0x226c7a[_0x5a2a07(0x1bb)][_0x5a2a07(0x349)](_0xeb7fa8[_0x5a2a07(0x31d)]());}}else{const _0x59cf67=this[_0x5a2a07(0x1e6)][_0x5a2a07(0x366)];if(_0x59cf67['match'](/<ALWAYS HIT>/i))return _0x5a2a07(0x34e);else{if(_0x59cf67[_0x5a2a07(0x17d)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x5a2a07(0x5c5)[_0x5a2a07(0x22d)](Number(RegExp['$1']));}}}return _0x5a2a07(0x5c5)[_0x5a2a07(0x22d)](this[_0x5a2a07(0x1e6)][_0x5a2a07(0x46f)]);},Window_ShopStatus['prototype'][_0x220c41(0x21f)]=function(_0x21d05f,_0x5810de,_0x13a183){const _0x56a950=_0x220c41,_0x950017=this['getItemRepeatsLabel']();this[_0x56a950(0x365)](_0x950017,_0x21d05f,_0x5810de,_0x13a183,!![]);const _0x49dbfe=this[_0x56a950(0x58a)]();return this[_0x56a950(0x365)](_0x49dbfe,_0x21d05f,_0x5810de,_0x13a183,![],'right'),this['drawItemDarkRect'](_0x21d05f,_0x5810de,_0x13a183),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x215)]=function(){const _0x2e40b0=_0x220c41;return VisuMZ['ItemsEquipsCore']['Settings'][_0x2e40b0(0x315)]['LabelRepeats'];},Window_ShopStatus['prototype'][_0x220c41(0x58a)]=function(){const _0x46c47c=_0x220c41,_0x419e55='REPEAT';if(this[_0x46c47c(0x51f)][_0x419e55])return this[_0x46c47c(0x51f)][_0x419e55];const _0x42436d='×%1';return _0x42436d[_0x46c47c(0x22d)](this['_item'][_0x46c47c(0x1ea)]);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x22c)]=function(_0x293e23,_0x4d7856,_0x660f10){const _0x5e549e=_0x220c41,_0x1e8ae2=this['getItemHitTypeLabel']();this[_0x5e549e(0x365)](_0x1e8ae2,_0x293e23,_0x4d7856,_0x660f10,!![]);const _0x4535d2=this[_0x5e549e(0x3d2)]();return this[_0x5e549e(0x365)](_0x4535d2,_0x293e23,_0x4d7856,_0x660f10,![],'right'),this['drawItemDarkRect'](_0x293e23,_0x4d7856,_0x660f10),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemHitTypeLabel']=function(){const _0x5163cb=_0x220c41;return VisuMZ[_0x5163cb(0x44d)][_0x5163cb(0x22a)]['StatusWindow'][_0x5163cb(0x33d)];},Window_ShopStatus['prototype'][_0x220c41(0x3d2)]=function(){const _0x67a801=_0x220c41,_0x522bc3='HIT\x20TYPE';if(this['_customItemInfo'][_0x522bc3])return this[_0x67a801(0x51f)][_0x522bc3];const _0x3aa0ce=VisuMZ[_0x67a801(0x44d)][_0x67a801(0x22a)]['StatusWindow'],_0xa4e426='HitType%1'[_0x67a801(0x22d)](this['_item'][_0x67a801(0x62f)]);return _0x3aa0ce[_0xa4e426];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x23b)]=function(_0x4462a5,_0x1d400d,_0x56b10c){const _0x3bf091=_0x220c41;if(this[_0x3bf091(0x1e6)][_0x3bf091(0x239)][_0x3bf091(0x380)]<=0x0)return _0x1d400d;if(this[_0x3bf091(0x1f4)](_0x4462a5,_0x1d400d,_0x56b10c))_0x1d400d+=this[_0x3bf091(0x3d3)]();if(this[_0x3bf091(0x3ea)](_0x4462a5,_0x1d400d,_0x56b10c))_0x1d400d+=this[_0x3bf091(0x3d3)]();return this[_0x3bf091(0x27e)](),_0x1d400d;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x1f4)]=function(_0x1984c8,_0x8b4aca,_0x1fbd0d){const _0x1d320e=_0x220c41,_0x492f1a=this[_0x1d320e(0x2fc)]();this['drawItemKeyData'](_0x492f1a,_0x1984c8,_0x8b4aca,_0x1fbd0d,!![]);const _0x5794b8=this[_0x1d320e(0x484)]();return this[_0x1d320e(0x365)](_0x5794b8,_0x1984c8,_0x8b4aca,_0x1fbd0d,![],_0x1d320e(0x28c)),this[_0x1d320e(0x3bf)](_0x1984c8,_0x8b4aca,_0x1fbd0d),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x220c41(0x2fc)]=function(){const _0x33add3=_0x220c41;return VisuMZ[_0x33add3(0x44d)][_0x33add3(0x22a)]['StatusWindow']['LabelElement'];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x484)]=function(){const _0x2427d0=_0x220c41,_0x2ced32=_0x2427d0(0x4f3);if(this[_0x2427d0(0x51f)][_0x2ced32])return this['_customItemInfo'][_0x2ced32];if(this[_0x2427d0(0x1e6)][_0x2427d0(0x239)][_0x2427d0(0x3f9)]<=-0x1)return VisuMZ[_0x2427d0(0x44d)][_0x2427d0(0x22a)][_0x2427d0(0x315)][_0x2427d0(0x41a)];else{if(this[_0x2427d0(0x1e6)]['damage'][_0x2427d0(0x3f9)]===0x0){if('jTsfC'!=='QOXKS')return VisuMZ[_0x2427d0(0x44d)][_0x2427d0(0x22a)][_0x2427d0(0x315)]['ElementNone'];else{const _0xbc5c42=_0x580e06['x']+_0x5ba6ba[_0x2427d0(0x27a)]((_0x46ea4f[_0x2427d0(0x2c3)]-_0x70e31e)/0x2);this[_0x2427d0(0x3d8)](_0x3313ab,_0xbc5c42,_0x5472c7['y'],_0x3fbb86);}}else return $dataSystem['elements'][this[_0x2427d0(0x1e6)]['damage'][_0x2427d0(0x3f9)]];}},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x3ea)]=function(_0x9266e7,_0x2fe8d5,_0x6b945e){const _0xe8a998=_0x220c41,_0xce8608=this[_0xe8a998(0x3cf)]();this[_0xe8a998(0x365)](_0xce8608,_0x9266e7,_0x2fe8d5,_0x6b945e,!![]),this[_0xe8a998(0x4d2)]();const _0x413b67=this[_0xe8a998(0x38b)](),_0x411e23=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0xe8a998(0x1e6)][_0xe8a998(0x239)][_0xe8a998(0x380)]]);return this[_0xe8a998(0x1e5)](_0x411e23),this[_0xe8a998(0x365)](_0x413b67,_0x9266e7,_0x2fe8d5,_0x6b945e,![],_0xe8a998(0x28c)),this[_0xe8a998(0x3bf)](_0x9266e7,_0x2fe8d5,_0x6b945e),this[_0xe8a998(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x3cf)]=function(){const _0x49c2cb=_0x220c41;if(Imported[_0x49c2cb(0x5b3)]&&DataManager['getDamageStyle'](this['_item'])!=='MANUAL'){if('bwWIO'!==_0x49c2cb(0x30c))return this['getItemDamageAmountLabelBattleCore']();else{if(!_0xaf8733[_0x49c2cb(0x498)](this['_item']))return![];const _0x53e35e=this[_0x49c2cb(0x39e)]();this[_0x49c2cb(0x365)](_0x53e35e,_0x3b187,_0x1b7efe,_0x2ac8df,!![]);const _0x1f2c6d=this['getItemConsumableText']();return this['drawItemKeyData'](_0x1f2c6d,_0x2aa982,_0x5cc782,_0x1138c4,![],_0x49c2cb(0x28c)),this[_0x49c2cb(0x3bf)](_0x3326fd,_0x53f881,_0x10ecee),this['resetFontSettings'](),!![];}}else{if('bXvLZ'===_0x49c2cb(0x1ba))return this['getItemDamageAmountLabelOriginal']();else this[_0x49c2cb(0x312)][_0x49c2cb(0x3ba)](),this[_0x49c2cb(0x4a8)][_0x49c2cb(0x3ba)]();}},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x4a4)]=function(){const _0x10bb2f=_0x220c41,_0xab9e87=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'],_0x418f1b=_0x10bb2f(0x321)[_0x10bb2f(0x22d)](this[_0x10bb2f(0x1e6)][_0x10bb2f(0x239)][_0x10bb2f(0x380)]),_0x5e2d1b=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x10bb2f(0x1e6)]['damage'][_0x10bb2f(0x380)]];return _0xab9e87[_0x418f1b][_0x10bb2f(0x22d)](_0x5e2d1b);},Window_ShopStatus['prototype'][_0x220c41(0x4d2)]=function(){const _0x1e056d=_0x220c41,_0x21c2ac=$gameActors[_0x1e056d(0x3c5)](0x1);this['_tempActorA']=JsonEx[_0x1e056d(0x2cf)](_0x21c2ac),this[_0x1e056d(0x236)]=JsonEx[_0x1e056d(0x2cf)](_0x21c2ac);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x38b)]=function(){const _0x4c9301=_0x220c41,_0x4959d6=_0x4c9301(0x27b);if(this[_0x4c9301(0x51f)][_0x4959d6])return this[_0x4c9301(0x51f)][_0x4959d6];return Imported[_0x4c9301(0x5b3)]&&DataManager[_0x4c9301(0x5a8)](this[_0x4c9301(0x1e6)])!==_0x4c9301(0x5fe)?this[_0x4c9301(0x42c)]():this[_0x4c9301(0x2d6)]();},Window_ShopStatus[_0x220c41(0x4a1)]['getItemDamageAmountTextOriginal']=function(){const _0x336cd7=_0x220c41;window['a']=this[_0x336cd7(0x63e)],window['b']=this['_tempActorB'],this['_tempActorA'][_0x336cd7(0x4fa)](!![]),this['_tempActorB']['setShopStatusWindowMode']([0x3,0x4][_0x336cd7(0x427)](this[_0x336cd7(0x1e6)]['damage'][_0x336cd7(0x380)]));let _0x186b61=this[_0x336cd7(0x1e6)][_0x336cd7(0x239)][_0x336cd7(0x4ac)];try{const _0x2a3811=Math['max'](eval(_0x186b61),0x0)/window['a'][_0x336cd7(0x2b2)];return this[_0x336cd7(0x5e1)](),isNaN(_0x2a3811)?_0x336cd7(0x1c8):_0x336cd7(0x5c5)[_0x336cd7(0x22d)](Math[_0x336cd7(0x4d4)](_0x2a3811*0x64));}catch(_0x206c0d){if('hsOKa'===_0x336cd7(0x471)){if($gameTemp[_0x336cd7(0x4ed)]()){if(_0x336cd7(0x2ab)!==_0x336cd7(0x2ab)){const _0x450e43=_0x1b137a[_0x336cd7(0x289)];this['drawText'](_0x450e43,_0x510b6d,_0x3261d4,_0x3f543c,_0x336cd7(0x357));}else console[_0x336cd7(0x297)](_0x336cd7(0x1d5)[_0x336cd7(0x22d)](this['_item'][_0x336cd7(0x443)])),console[_0x336cd7(0x297)](_0x206c0d);}return this[_0x336cd7(0x5e1)](),_0x336cd7(0x1c8);}else{this[_0x336cd7(0x608)]=!![];const _0x7fc4b5=_0x2e89b0[_0x336cd7(0x44d)][_0x336cd7(0x2e6)][_0x336cd7(0x36e)](this,_0x575af8);return this[_0x336cd7(0x608)]=_0x5a9d04,_0x7fc4b5;}}},Window_ShopStatus['prototype'][_0x220c41(0x5e1)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x220c41(0x4a1)]['drawItemEffects']=function(_0x308649,_0x37b001,_0x2d24e2){const _0x58ca15=_0x220c41;if(!this[_0x58ca15(0x53d)]())return _0x37b001;if(this['drawItemEffectsHpRecovery'](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this['lineHeight']();if(this['drawItemEffectsMpRecovery'](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this['lineHeight']();if(this[_0x58ca15(0x2d2)](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this[_0x58ca15(0x3d3)]();if(this['drawItemEffectsHpDamage'](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this[_0x58ca15(0x3d3)]();if(this[_0x58ca15(0x330)](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this[_0x58ca15(0x3d3)]();if(this[_0x58ca15(0x500)](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this[_0x58ca15(0x3d3)]();if(this[_0x58ca15(0x31c)](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this['lineHeight']();if(this[_0x58ca15(0x44e)](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this[_0x58ca15(0x3d3)]();if(this[_0x58ca15(0x53b)](_0x308649,_0x37b001,_0x2d24e2))_0x37b001+=this[_0x58ca15(0x3d3)]();return this['resetFontSettings'](),_0x37b001;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x311)]=function(){const _0x490e04=_0x220c41;return this[_0x490e04(0x1e6)][_0x490e04(0x4b3)];},Window_ShopStatus['prototype']['makeItemData']=function(){const _0x2ad53e=_0x220c41;let _0x2a5aab=![];this[_0x2ad53e(0x50a)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x5e8659=this[_0x2ad53e(0x311)]();for(const _0x309cea of _0x5e8659){switch(_0x309cea[_0x2ad53e(0x524)]){case Game_Action[_0x2ad53e(0x4f6)]:this[_0x2ad53e(0x50a)][_0x2ad53e(0x569)]+=_0x309cea[_0x2ad53e(0x4f7)],this[_0x2ad53e(0x50a)][_0x2ad53e(0x48b)]+=_0x309cea['value2'],_0x2a5aab=!![];break;case Game_Action[_0x2ad53e(0x2c0)]:this[_0x2ad53e(0x50a)]['rateMP']+=_0x309cea[_0x2ad53e(0x4f7)],this[_0x2ad53e(0x50a)][_0x2ad53e(0x4fd)]+=_0x309cea[_0x2ad53e(0x57d)],_0x2a5aab=!![];break;case Game_Action[_0x2ad53e(0x184)]:this[_0x2ad53e(0x50a)]['gainTP']+=_0x309cea['value1'],_0x2a5aab=!![];break;case Game_Action[_0x2ad53e(0x516)]:this['_itemData'][_0x2ad53e(0x4f0)]['push'](_0x309cea[_0x2ad53e(0x2c7)]),_0x2a5aab=!![];break;case Game_Action[_0x2ad53e(0x249)]:this[_0x2ad53e(0x50a)][_0x2ad53e(0x1d4)][_0x2ad53e(0x349)](_0x309cea[_0x2ad53e(0x2c7)]),this[_0x2ad53e(0x50a)][_0x2ad53e(0x1bf)]=!![],_0x2a5aab=!![];break;case Game_Action[_0x2ad53e(0x580)]:this[_0x2ad53e(0x50a)][_0x2ad53e(0x54f)][_0x309cea[_0x2ad53e(0x2c7)]]+=0x1,_0x2a5aab=!![];break;case Game_Action[_0x2ad53e(0x26e)]:this[_0x2ad53e(0x50a)][_0x2ad53e(0x54f)][_0x309cea[_0x2ad53e(0x2c7)]]-=0x1,_0x2a5aab=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x2ad53e(0x50a)][_0x2ad53e(0x5cd)][_0x2ad53e(0x349)](_0x309cea[_0x2ad53e(0x2c7)]),this[_0x2ad53e(0x50a)][_0x2ad53e(0x1bf)]=!![],_0x2a5aab=!![];break;case Game_Action['EFFECT_REMOVE_DEBUFF']:this[_0x2ad53e(0x50a)][_0x2ad53e(0x1c0)][_0x2ad53e(0x349)](_0x309cea[_0x2ad53e(0x2c7)]),this[_0x2ad53e(0x50a)][_0x2ad53e(0x1bf)]=!![],_0x2a5aab=!![];break;}}if(this[_0x2ad53e(0x50a)]['addState'][_0x2ad53e(0x5ff)]>0x0)this[_0x2ad53e(0x50a)][_0x2ad53e(0x419)]=!![];for(let _0x2ff5a0=0x0;_0x2ff5a0<this['_itemData'][_0x2ad53e(0x54f)]['length'];_0x2ff5a0++){if(this[_0x2ad53e(0x50a)][_0x2ad53e(0x54f)][_0x2ff5a0]!==0x0)this[_0x2ad53e(0x50a)]['addStateBuffChanges']=!![];}this['_item'][_0x2ad53e(0x42f)]!==0x0&&(this['_itemData'][_0x2ad53e(0x457)]=this[_0x2ad53e(0x1e6)]['tpGain'],_0x2a5aab=!![]);const _0x39f450=[_0x2ad53e(0x265),'MP\x20RECOVERY',_0x2ad53e(0x205),_0x2ad53e(0x26c),_0x2ad53e(0x3bb),'TP\x20DAMAGE','USER\x20TP\x20GAIN',_0x2ad53e(0x2a0),_0x2ad53e(0x5ee)];for(const _0x4c9369 of _0x39f450){if(_0x2ad53e(0x191)===_0x2ad53e(0x191)){if(this[_0x2ad53e(0x51f)][_0x4c9369]){_0x2a5aab=!![];break;}}else this[_0x2ad53e(0x4d6)]();}return _0x2a5aab;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x3a0)]=function(_0x4bf5b7,_0x1c7d32,_0x286a63){const _0x30f872=_0x220c41,_0x225116=_0x30f872(0x265);if(this[_0x30f872(0x50a)][_0x30f872(0x569)]<=0x0&&this['_itemData'][_0x30f872(0x48b)]<=0x0&&!this['_customItemInfo'][_0x225116])return![];const _0x136dc7=this[_0x30f872(0x4d3)]();this[_0x30f872(0x365)](_0x136dc7,_0x4bf5b7,_0x1c7d32,_0x286a63,!![]);const _0x5942f5=this[_0x30f872(0x52d)]();return this[_0x30f872(0x1e5)](ColorManager[_0x30f872(0x2ca)](0x1)),this[_0x30f872(0x365)](_0x5942f5,_0x4bf5b7,_0x1c7d32,_0x286a63,![],_0x30f872(0x28c)),this['drawItemDarkRect'](_0x4bf5b7,_0x1c7d32,_0x286a63),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemEffectsHpRecoveryLabel']=function(){const _0x15a063=_0x220c41,_0x45e8cd=VisuMZ[_0x15a063(0x44d)][_0x15a063(0x22a)][_0x15a063(0x315)][_0x15a063(0x1f0)];return _0x45e8cd[_0x15a063(0x22d)](TextManager['hp']);},Window_ShopStatus['prototype']['getItemEffectsHpRecoveryText']=function(){const _0x3f9519=_0x220c41,_0x52cae4=_0x3f9519(0x265);if(this[_0x3f9519(0x51f)][_0x52cae4])return this['_customItemInfo'][_0x52cae4];let _0x579015='';if(this['_itemData'][_0x3f9519(0x569)]>0x0)_0x579015+='+%1%'[_0x3f9519(0x22d)](Math[_0x3f9519(0x27a)](this[_0x3f9519(0x50a)][_0x3f9519(0x569)]*0x64));if(this[_0x3f9519(0x50a)][_0x3f9519(0x569)]>0x0&&this[_0x3f9519(0x50a)][_0x3f9519(0x48b)]>0x0)_0x579015+='\x20';if(this[_0x3f9519(0x50a)][_0x3f9519(0x48b)]>0x0)_0x579015+=_0x3f9519(0x2d8)['format'](this[_0x3f9519(0x50a)][_0x3f9519(0x48b)]);return _0x579015;},Window_ShopStatus[_0x220c41(0x4a1)]['drawItemEffectsMpRecovery']=function(_0x5e9975,_0x1db060,_0x4dfcb0){const _0xd7b080=_0x220c41,_0x1ab68b=_0xd7b080(0x277);if(this[_0xd7b080(0x50a)][_0xd7b080(0x560)]<=0x0&&this[_0xd7b080(0x50a)][_0xd7b080(0x4fd)]<=0x0&&!this['_customItemInfo'][_0x1ab68b])return![];const _0x1ce920=this['getItemEffectsMpRecoveryLabel']();this[_0xd7b080(0x365)](_0x1ce920,_0x5e9975,_0x1db060,_0x4dfcb0,!![]);const _0x12a477=this[_0xd7b080(0x489)]();return this['changeTextColor'](ColorManager['damageColor'](0x3)),this['drawItemKeyData'](_0x12a477,_0x5e9975,_0x1db060,_0x4dfcb0,![],_0xd7b080(0x28c)),this['drawItemDarkRect'](_0x5e9975,_0x1db060,_0x4dfcb0),this[_0xd7b080(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2dd)]=function(){const _0x4169a6=_0x220c41,_0x1a73c3=VisuMZ[_0x4169a6(0x44d)][_0x4169a6(0x22a)]['StatusWindow'][_0x4169a6(0x5dd)];return _0x1a73c3['format'](TextManager['mp']);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x489)]=function(){const _0x41daa0=_0x220c41,_0x162fe9=_0x41daa0(0x277);if(this[_0x41daa0(0x51f)][_0x162fe9])return this['_customItemInfo'][_0x162fe9];let _0x332211='';if(this[_0x41daa0(0x50a)][_0x41daa0(0x560)]>0x0)_0x332211+=_0x41daa0(0x222)[_0x41daa0(0x22d)](Math['floor'](this[_0x41daa0(0x50a)][_0x41daa0(0x560)]*0x64));if(this['_itemData'][_0x41daa0(0x560)]>0x0&&this[_0x41daa0(0x50a)][_0x41daa0(0x4fd)]>0x0)_0x332211+='\x20';if(this['_itemData'][_0x41daa0(0x4fd)]>0x0)_0x332211+=_0x41daa0(0x2d8)[_0x41daa0(0x22d)](this['_itemData'][_0x41daa0(0x4fd)]);return _0x332211;},Window_ShopStatus[_0x220c41(0x4a1)]['drawItemEffectsTpRecovery']=function(_0x53f7d7,_0x33f623,_0x2a7143){const _0x21423e=_0x220c41,_0x1088fe='TP\x20RECOVERY';if(this['_itemData'][_0x21423e(0x2f1)]<=0x0&&!this[_0x21423e(0x51f)][_0x1088fe])return![];const _0x2c1838=this[_0x21423e(0x2f5)]();this[_0x21423e(0x365)](_0x2c1838,_0x53f7d7,_0x33f623,_0x2a7143,!![]);const _0xe67024=this[_0x21423e(0x2e0)]();return this['changeTextColor'](ColorManager[_0x21423e(0x4c9)]()),this[_0x21423e(0x365)](_0xe67024,_0x53f7d7,_0x33f623,_0x2a7143,![],_0x21423e(0x28c)),this['drawItemDarkRect'](_0x53f7d7,_0x33f623,_0x2a7143),this[_0x21423e(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2f5)]=function(){const _0x4a7ad8=_0x220c41,_0x5d5317=VisuMZ[_0x4a7ad8(0x44d)][_0x4a7ad8(0x22a)][_0x4a7ad8(0x315)][_0x4a7ad8(0x62c)];return _0x5d5317[_0x4a7ad8(0x22d)](TextManager['tp']);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2e0)]=function(){const _0x53ea5e=_0x220c41,_0x4cab90=_0x53ea5e(0x205);if(this[_0x53ea5e(0x51f)][_0x4cab90])return this[_0x53ea5e(0x51f)][_0x4cab90];let _0x2debdd='';return _0x2debdd+=_0x53ea5e(0x2d8)[_0x53ea5e(0x22d)](this[_0x53ea5e(0x50a)][_0x53ea5e(0x2f1)]),_0x2debdd;},Window_ShopStatus['prototype'][_0x220c41(0x31c)]=function(_0x794f,_0x39889d,_0x355489){const _0x3bbdd3=_0x220c41,_0x2e5fd6=_0x3bbdd3(0x1c9);if(this['_itemData'][_0x3bbdd3(0x457)]===0x0&&!this[_0x3bbdd3(0x51f)][_0x2e5fd6])return![];const _0x5adbe1=this[_0x3bbdd3(0x5ac)]();this[_0x3bbdd3(0x365)](_0x5adbe1,_0x794f,_0x39889d,_0x355489,!![]);const _0x39b3b7=this[_0x3bbdd3(0x53e)]();return this[_0x3bbdd3(0x50a)][_0x3bbdd3(0x457)]>0x0?this[_0x3bbdd3(0x1e5)](ColorManager['powerUpColor']()):this[_0x3bbdd3(0x1e5)](ColorManager['powerDownColor']()),this[_0x3bbdd3(0x365)](_0x39b3b7,_0x794f,_0x39889d,_0x355489,![],_0x3bbdd3(0x28c)),this[_0x3bbdd3(0x3bf)](_0x794f,_0x39889d,_0x355489),this[_0x3bbdd3(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x5ac)]=function(){const _0x5e64c2=_0x220c41,_0x1415d2=VisuMZ['ItemsEquipsCore'][_0x5e64c2(0x22a)]['StatusWindow'][_0x5e64c2(0x5be)];return _0x1415d2['format'](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsSelfTpGainText']=function(){const _0x145294=_0x220c41,_0x48427f='USER\x20TP\x20GAIN';if(this['_customItemInfo'][_0x48427f])return this[_0x145294(0x51f)][_0x48427f];let _0x3344e8='';if(this[_0x145294(0x50a)][_0x145294(0x457)]>0x0){if('zORPJ'!=='zORPJ'){const _0x1d613a=_0x2716de[_0x145294(0x44d)]['Settings']['EquipScene'];let _0x356be5=_0x1d613a[_0x145294(0x1ce)]!==_0x95bfe8?_0x1d613a[_0x145294(0x1ce)]:0x13;return _0x39aa5a['getColor'](_0x356be5);}else _0x3344e8+='+%1'['format'](this['_itemData']['selfTP']);}else _0x3344e8+='%1'[_0x145294(0x22d)](this['_itemData'][_0x145294(0x457)]);return _0x3344e8;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x399)]=function(_0x26ed30,_0x56108b,_0x4fedd4){const _0x5e3dd5=_0x220c41,_0x16a06e='HP\x20DAMAGE';if(this[_0x5e3dd5(0x50a)]['rateHP']>=0x0&&this['_itemData'][_0x5e3dd5(0x48b)]>=0x0&&!this[_0x5e3dd5(0x51f)][_0x16a06e])return![];const _0x14fc7b=this[_0x5e3dd5(0x335)]();this[_0x5e3dd5(0x365)](_0x14fc7b,_0x26ed30,_0x56108b,_0x4fedd4,!![]);const _0x2d485a=this[_0x5e3dd5(0x199)]();return this[_0x5e3dd5(0x1e5)](ColorManager[_0x5e3dd5(0x2ca)](0x0)),this['drawItemKeyData'](_0x2d485a,_0x26ed30,_0x56108b,_0x4fedd4,![],_0x5e3dd5(0x28c)),this[_0x5e3dd5(0x3bf)](_0x26ed30,_0x56108b,_0x4fedd4),this[_0x5e3dd5(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemEffectsHpDamageLabel']=function(){const _0x41125d=_0x220c41,_0x33261b=VisuMZ['ItemsEquipsCore']['Settings'][_0x41125d(0x315)][_0x41125d(0x196)];return _0x33261b['format'](TextManager['hp']);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x199)]=function(){const _0x3c9dfd=_0x220c41,_0x1bcb0c=_0x3c9dfd(0x26c);if(this['_customItemInfo'][_0x1bcb0c])return this['_customItemInfo'][_0x1bcb0c];let _0x279886='';if(this[_0x3c9dfd(0x50a)][_0x3c9dfd(0x569)]<0x0)_0x279886+=_0x3c9dfd(0x5c5)[_0x3c9dfd(0x22d)](Math[_0x3c9dfd(0x27a)](this[_0x3c9dfd(0x50a)]['rateHP']*0x64));if(this['_itemData'][_0x3c9dfd(0x569)]<0x0&&this['_itemData'][_0x3c9dfd(0x48b)]<0x0)_0x279886+='\x20';if(this[_0x3c9dfd(0x50a)][_0x3c9dfd(0x48b)]<0x0)_0x279886+='%1'['format'](this[_0x3c9dfd(0x50a)][_0x3c9dfd(0x48b)]);return _0x279886;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x330)]=function(_0x8ae342,_0x5e812c,_0x1095ca){const _0x34f06d=_0x220c41,_0x3d651f=_0x34f06d(0x3bb);if(this['_itemData'][_0x34f06d(0x560)]>=0x0&&this[_0x34f06d(0x50a)]['flatMP']>=0x0&&!this[_0x34f06d(0x51f)][_0x3d651f])return![];const _0x180dd1=this[_0x34f06d(0x5f2)]();this[_0x34f06d(0x365)](_0x180dd1,_0x8ae342,_0x5e812c,_0x1095ca,!![]);const _0x7c534c=this['getItemEffectsMpDamageText']();return this[_0x34f06d(0x1e5)](ColorManager[_0x34f06d(0x2ca)](0x2)),this[_0x34f06d(0x365)](_0x7c534c,_0x8ae342,_0x5e812c,_0x1095ca,![],_0x34f06d(0x28c)),this[_0x34f06d(0x3bf)](_0x8ae342,_0x5e812c,_0x1095ca),this[_0x34f06d(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemEffectsMpDamageLabel']=function(){const _0x5a2581=_0x220c41,_0x174169=VisuMZ[_0x5a2581(0x44d)][_0x5a2581(0x22a)][_0x5a2581(0x315)][_0x5a2581(0x26d)];return _0x174169['format'](TextManager['mp']);},Window_ShopStatus['prototype']['getItemEffectsMpDamageText']=function(){const _0x7b0101=_0x220c41,_0x583ef1=_0x7b0101(0x3bb);if(this[_0x7b0101(0x51f)][_0x583ef1])return this[_0x7b0101(0x51f)][_0x583ef1];let _0x1ccd5b='';if(this[_0x7b0101(0x50a)][_0x7b0101(0x560)]<0x0)_0x1ccd5b+='%1%'[_0x7b0101(0x22d)](Math[_0x7b0101(0x27a)](this[_0x7b0101(0x50a)][_0x7b0101(0x560)]*0x64));if(this['_itemData'][_0x7b0101(0x560)]<0x0&&this[_0x7b0101(0x50a)][_0x7b0101(0x4fd)]<0x0)_0x1ccd5b+='\x20';if(this[_0x7b0101(0x50a)][_0x7b0101(0x4fd)]<0x0)_0x1ccd5b+='%1'['format'](this['_itemData'][_0x7b0101(0x4fd)]);return _0x1ccd5b;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x500)]=function(_0x740e39,_0x155078,_0x59dfec){const _0x42d94e=_0x220c41,_0x30c410='TP\x20DAMAGE';if(this[_0x42d94e(0x50a)][_0x42d94e(0x2f1)]>=0x0&&!this[_0x42d94e(0x51f)][_0x30c410])return![];const _0x2ce75b=this[_0x42d94e(0x4f9)]();this[_0x42d94e(0x365)](_0x2ce75b,_0x740e39,_0x155078,_0x59dfec,!![]);const _0x131361=this[_0x42d94e(0x501)]();return this[_0x42d94e(0x1e5)](ColorManager[_0x42d94e(0x61a)]()),this[_0x42d94e(0x365)](_0x131361,_0x740e39,_0x155078,_0x59dfec,![],_0x42d94e(0x28c)),this['drawItemDarkRect'](_0x740e39,_0x155078,_0x59dfec),this[_0x42d94e(0x27e)](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x4f9)]=function(){const _0x3a763e=_0x220c41,_0xd14bde=VisuMZ[_0x3a763e(0x44d)]['Settings'][_0x3a763e(0x315)]['LabelDamageTP'];return _0xd14bde[_0x3a763e(0x22d)](TextManager['tp']);},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x501)]=function(){const _0x2ebbc3=_0x220c41,_0x303e36='TP\x20DAMAGE';if(this[_0x2ebbc3(0x51f)][_0x303e36])return this['_customItemInfo'][_0x303e36];let _0x35ea43='';return _0x35ea43+='%1'[_0x2ebbc3(0x22d)](this[_0x2ebbc3(0x50a)]['gainTP']),_0x35ea43;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x44e)]=function(_0x2fafe3,_0x4c9a84,_0x4d3863){const _0x5caf65=_0x220c41,_0x1be1ce=_0x5caf65(0x2a0);if(!this[_0x5caf65(0x50a)]['addStateBuffChanges']&&!this['_customItemInfo'][_0x1be1ce])return![];const _0x200332=this[_0x5caf65(0x588)]();this[_0x5caf65(0x365)](_0x200332,_0x2fafe3,_0x4c9a84,_0x4d3863,!![]);const _0xaec155=this[_0x5caf65(0x48f)]();return this[_0x5caf65(0x365)](_0xaec155,_0x2fafe3,_0x4c9a84,_0x4d3863,![],_0x5caf65(0x28c)),this[_0x5caf65(0x3bf)](_0x2fafe3,_0x4c9a84,_0x4d3863),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x588)]=function(){const _0x1fab9f=_0x220c41;return VisuMZ['ItemsEquipsCore'][_0x1fab9f(0x22a)][_0x1fab9f(0x315)][_0x1fab9f(0x54d)];},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x48f)]=function(){const _0x5b9a98=_0x220c41,_0x2dd700=_0x5b9a98(0x2a0);if(this[_0x5b9a98(0x51f)][_0x2dd700])return this[_0x5b9a98(0x51f)][_0x2dd700];let _0x558110='',_0x5a8e9c=0x0;const _0x11669c=0x8;for(const _0xf33b2 of this['_itemData'][_0x5b9a98(0x4f0)]){const _0x2c971f=$dataStates[_0xf33b2];if(_0x2c971f&&_0x2c971f['iconIndex']>0x0){_0x558110+=_0x5b9a98(0x552)[_0x5b9a98(0x22d)](_0x2c971f[_0x5b9a98(0x1e3)]),_0x5a8e9c++;if(_0x5a8e9c>=_0x11669c)return _0x558110;}}for(let _0x58620e=0x0;_0x58620e<this[_0x5b9a98(0x50a)][_0x5b9a98(0x54f)]['length'];_0x58620e++){const _0x1de260=this[_0x5b9a98(0x50a)][_0x5b9a98(0x54f)][_0x58620e],_0x50c1e1=Game_BattlerBase[_0x5b9a98(0x4a1)][_0x5b9a98(0x2d3)](_0x1de260,_0x58620e);if(_0x50c1e1>0x0){if(_0x5b9a98(0x1b3)==='SGFZu')this[_0x5b9a98(0x647)]();else{_0x558110+=_0x5b9a98(0x552)[_0x5b9a98(0x22d)](_0x50c1e1),_0x5a8e9c++;if(_0x5a8e9c>=_0x11669c)return _0x558110;}}}return _0x558110;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x53b)]=function(_0x473e26,_0x4b5d30,_0x33f6c3){const _0x2ba614=_0x220c41,_0x24162a='REMOVED\x20EFFECTS';if(!this['_itemData']['removeStateBuffChanges']&&!this[_0x2ba614(0x51f)][_0x24162a])return![];const _0x1e24a8=this[_0x2ba614(0x358)]();this[_0x2ba614(0x365)](_0x1e24a8,_0x473e26,_0x4b5d30,_0x33f6c3,!![]);const _0xb09ef2=this[_0x2ba614(0x554)]();return this[_0x2ba614(0x365)](_0xb09ef2,_0x473e26,_0x4b5d30,_0x33f6c3,![],_0x2ba614(0x28c)),this[_0x2ba614(0x3bf)](_0x473e26,_0x4b5d30,_0x33f6c3),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x220c41(0x4a1)]['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0x4ca174=_0x220c41;return VisuMZ[_0x4ca174(0x44d)]['Settings']['StatusWindow'][_0x4ca174(0x1f5)];},Window_ShopStatus['prototype'][_0x220c41(0x554)]=function(){const _0x458b33=_0x220c41,_0x446a69='REMOVED\x20EFFECTS';if(this[_0x458b33(0x51f)][_0x446a69])return this[_0x458b33(0x51f)][_0x446a69];let _0x3f976a='',_0x31fb42=0x0;const _0x30ee81=VisuMZ[_0x458b33(0x44d)][_0x458b33(0x22a)][_0x458b33(0x315)]['MaxIcons'];for(const _0x1e79dc of this['_itemData'][_0x458b33(0x1d4)]){const _0x4bada4=$dataStates[_0x1e79dc];if(_0x4bada4&&_0x4bada4[_0x458b33(0x1e3)]>0x0){_0x3f976a+=_0x458b33(0x552)[_0x458b33(0x22d)](_0x4bada4['iconIndex']),_0x31fb42++;if(_0x31fb42>=_0x30ee81)return _0x3f976a;}}for(let _0xd05f45=0x0;_0xd05f45<this[_0x458b33(0x50a)][_0x458b33(0x5cd)]['length'];_0xd05f45++){const _0x3cfed4=Game_BattlerBase['prototype']['buffIconIndex'](0x1,_0xd05f45);if(_0x3cfed4>0x0){if(_0x458b33(0x1d6)===_0x458b33(0x5b6)){if(!this[_0x458b33(0x1ee)](_0x327c03))return![];const _0x32b40b=_0x4bd875[_0x458b33(0x366)];if(!_0x32b40b)return![];if(_0x32b40b['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x32b40b[_0x458b33(0x17d)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];}else{_0x3f976a+=_0x458b33(0x552)['format'](_0x3cfed4),_0x31fb42++;if(_0x31fb42>=_0x30ee81)return _0x3f976a;}}}for(let _0x308a85=0x0;_0x308a85<this['_itemData'][_0x458b33(0x1c0)][_0x458b33(0x5ff)];_0x308a85++){const _0x5e7c73=Game_BattlerBase['prototype']['buffIconIndex'](-0x1,_0x308a85);if(_0x5e7c73>0x0){if(_0x458b33(0x255)!==_0x458b33(0x1a1)){_0x3f976a+=_0x458b33(0x552)[_0x458b33(0x22d)](_0x5e7c73),_0x31fb42++;if(_0x31fb42>=_0x30ee81)return _0x3f976a;}else return this[_0x458b33(0x559)]()?this[_0x458b33(0x1de)]():_0x2de8e8[_0x458b33(0x44d)]['Scene_Item_categoryWindowRect']['call'](this);}}return _0x3f976a;},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x635)]=function(_0x3e685a,_0x402c54,_0x393f4e){const _0x246715=_0x220c41;if(this[_0x246715(0x1e6)][_0x246715(0x366)][_0x246715(0x17d)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x5e7c63=String(RegExp['$1'])[_0x246715(0x5d4)](/[\r\n]+/);for(const _0x314b96 of _0x5e7c63){if(_0x314b96[_0x246715(0x17d)](/(.*):[ ](.*)/i)){const _0x1bb2c5=String(RegExp['$1'])[_0x246715(0x31d)](),_0x46e7a3=String(RegExp['$2'])[_0x246715(0x31d)]();this[_0x246715(0x502)](_0x1bb2c5,_0x46e7a3,_0x3e685a,_0x402c54,_0x393f4e),_0x402c54+=this['lineHeight']();}}}return this[_0x246715(0x27e)](),_0x402c54;},Window_ShopStatus['prototype'][_0x220c41(0x502)]=function(_0xc601c6,_0x25f00b,_0x3ce6ed,_0xb53fc3,_0x5933e4){const _0x547935=_0x220c41;this[_0x547935(0x365)](_0xc601c6,_0x3ce6ed,_0xb53fc3,_0x5933e4,!![]),this['drawItemKeyData'](_0x25f00b,_0x3ce6ed,_0xb53fc3,_0x5933e4,![],_0x547935(0x28c)),this[_0x547935(0x3bf)](_0x3ce6ed,_0xb53fc3,_0x5933e4),this['resetFontSettings']();},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2a5)]=function(){const _0x41d010=_0x220c41;if(!this[_0x41d010(0x1e6)])return;const _0x4aca4f=this[_0x41d010(0x1e6)][_0x41d010(0x366)],_0x272c4d=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x2ac8b8=_0x4aca4f['match'](_0x272c4d);if(_0x2ac8b8)for(const _0x5413e2 of _0x2ac8b8){_0x5413e2[_0x41d010(0x17d)](_0x272c4d);const _0x3663f4=String(RegExp['$1'])[_0x41d010(0x31d)]()||'';if(_0x3663f4==='')continue;const _0x3386f0=ImageManager[_0x41d010(0x5ed)](_0x3663f4);_0x3386f0['addLoadListener'](this[_0x41d010(0x2cd)][_0x41d010(0x3ed)](this,_0x3386f0,this[_0x41d010(0x1e6)]));}},Window_ShopStatus[_0x220c41(0x4a1)][_0x220c41(0x2cd)]=function(_0x1b4a2d,_0x5c111a){const _0x5d2cfe=_0x220c41;if(this[_0x5d2cfe(0x1e6)]!==_0x5c111a)return;if(!_0x1b4a2d)return;if(_0x1b4a2d[_0x5d2cfe(0x2c3)]<=0x0||_0x1b4a2d[_0x5d2cfe(0x4d7)]<=0x0)return;const _0x281015=_0x5c111a[_0x5d2cfe(0x366)];let _0x1f51fb='background';_0x281015['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x5d2cfe(0x5b1)===_0x5d2cfe(0x5b1)?_0x1f51fb=_0x5d2cfe(0x5dc):_0x1887a7['price']=_0xef9173(_0x1c21e4['$1']));const _0x1a7614=_0x1f51fb==='background'?this['contentsBack']:this[_0x5d2cfe(0x422)];let _0x573ebb=this[_0x5d2cfe(0x4a5)],_0x29b3f9=this['innerHeight'];_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x573ebb=Number(RegExp['$1']));_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x29b3f9=Number(RegExp['$1']));_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x573ebb=Number(RegExp['$1']),_0x29b3f9=Number(RegExp['$2']));const _0x4c8ff8=Math[_0x5d2cfe(0x346)](0x1,_0x573ebb/_0x1b4a2d[_0x5d2cfe(0x2c3)],_0x29b3f9/_0x1b4a2d[_0x5d2cfe(0x4d7)]);let _0x19ac9e=0x0,_0x76dbfd=0x0,_0x278c6c=Math[_0x5d2cfe(0x27a)](_0x1b4a2d['width']*_0x4c8ff8),_0xe195fa=Math[_0x5d2cfe(0x27a)](_0x1b4a2d['height']*_0x4c8ff8),_0x60ddde=_0x5d2cfe(0x357);_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x5d2cfe(0x52e)===_0x5d2cfe(0x19d)?(_0x19254c[_0x5d2cfe(0x44d)]['Scene_Equip_onActorChange'][_0x5d2cfe(0x36e)](this),this[_0x5d2cfe(0x23c)]()&&(this[_0x5d2cfe(0x4a8)][_0x5d2cfe(0x493)](),this[_0x5d2cfe(0x4a8)]['deselect'](),this[_0x5d2cfe(0x328)][_0x5d2cfe(0x353)](0x0),this[_0x5d2cfe(0x328)][_0x5d2cfe(0x5d8)]())):_0x60ddde=String(RegExp['$1'])['toLowerCase']()['trim']());if(_0x60ddde===_0x5d2cfe(0x5a9)){if(_0x5d2cfe(0x2a4)!==_0x5d2cfe(0x59b))_0x19ac9e=0x0;else return _0x1c4bf4[_0x5d2cfe(0x44d)][_0x5d2cfe(0x22a)][_0x5d2cfe(0x315)][_0x5d2cfe(0x619)];}else _0x60ddde===_0x5d2cfe(0x357)?_0x19ac9e=Math[_0x5d2cfe(0x4d4)]((this['innerWidth']-_0x278c6c)/0x2):_0x19ac9e=this[_0x5d2cfe(0x4a5)]-_0x278c6c;let _0x169b23=_0x5d2cfe(0x651);_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x169b23=String(RegExp['$1'])[_0x5d2cfe(0x510)]()[_0x5d2cfe(0x31d)]());if(_0x169b23===_0x5d2cfe(0x4ae))_0x5d2cfe(0x52a)!=='TTESN'?_0x76dbfd=0x0:(_0x18d3d0['ItemsEquipsCore'][_0x5d2cfe(0x603)][_0x5d2cfe(0x36e)](this),this[_0x5d2cfe(0x23c)]()&&this[_0x5d2cfe(0x4d6)]());else _0x169b23===_0x5d2cfe(0x651)?_0x76dbfd=Math[_0x5d2cfe(0x4d4)]((this[_0x5d2cfe(0x49b)]-_0xe195fa)/0x2):_0x5d2cfe(0x24f)===_0x5d2cfe(0x34a)?_0x291e06=0x0:_0x76dbfd=this[_0x5d2cfe(0x49b)]-_0xe195fa;_0x281015['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x19ac9e+=Number(RegExp['$1']));_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x5d2cfe(0x640)!==_0x5d2cfe(0x561)?_0x76dbfd+=Number(RegExp['$1']):_0x98862d=_0x5d2cfe(0x435)[_0x5d2cfe(0x22d)](_0x5ade17['id']));if(_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)){if(_0x5d2cfe(0x293)!=='WqQDx'){_0x466a18[_0x5d2cfe(0x4a1)]['callUpdateHelp']['call'](this);if(this[_0x5d2cfe(0x644)])this[_0x5d2cfe(0x5d7)]();}else _0x19ac9e+=Number(RegExp['$1']),_0x76dbfd+=Number(RegExp['$2']);}let _0xb9c504=0xff;if(_0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i)){if(_0x5d2cfe(0x290)!==_0x5d2cfe(0x290))return _0x112a9f[_0x5d2cfe(0x44d)][_0x5d2cfe(0x22a)]['EquipScene']['buttonAssistRemove'];else _0xb9c504=Number(RegExp['$1']);}else _0x281015[_0x5d2cfe(0x17d)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x5d2cfe(0x4b9)==='xrDSZ'?_0xb9c504=Math[_0x5d2cfe(0x4d4)](Number(RegExp['$1'])*0.01*0xff)[_0x5d2cfe(0x55b)](0x0,0xff):(this[_0x5d2cfe(0x363)]={},this[_0x5d2cfe(0x40c)]=0xff,this['_newLabelOpacityChange']=_0x3c444e['ItemsEquipsCore']['Settings'][_0x5d2cfe(0x342)]['FadeSpeed'],this[_0x5d2cfe(0x433)]=_0x1842eb['ItemsEquipsCore'][_0x5d2cfe(0x22a)][_0x5d2cfe(0x342)]['FadeLimit']));_0x1a7614['paintOpacity']=_0xb9c504,_0x1a7614['blt'](_0x1b4a2d,0x0,0x0,_0x1b4a2d['width'],_0x1b4a2d['height'],_0x19ac9e,_0x76dbfd,_0x278c6c,_0xe195fa),_0x1a7614[_0x5d2cfe(0x33f)]=0xff;};