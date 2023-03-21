//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.38;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.38] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x306dc8=_0x3cb5;(function(_0x146a48,_0x119d6c){const _0x52c90c=_0x3cb5,_0x55f39e=_0x146a48();while(!![]){try{const _0x1ea40a=parseInt(_0x52c90c(0x32f))/0x1*(parseInt(_0x52c90c(0x446))/0x2)+parseInt(_0x52c90c(0x32c))/0x3*(-parseInt(_0x52c90c(0x464))/0x4)+-parseInt(_0x52c90c(0x40f))/0x5*(parseInt(_0x52c90c(0x2ab))/0x6)+-parseInt(_0x52c90c(0x4a6))/0x7*(-parseInt(_0x52c90c(0x3e9))/0x8)+parseInt(_0x52c90c(0x20d))/0x9+-parseInt(_0x52c90c(0x4c1))/0xa+parseInt(_0x52c90c(0x2e8))/0xb;if(_0x1ea40a===_0x119d6c)break;else _0x55f39e['push'](_0x55f39e['shift']());}catch(_0x187176){_0x55f39e['push'](_0x55f39e['shift']());}}}(_0x1848,0x41501));function _0x1848(){const _0x484d47=['itemWindowRectSkillsStatesCore','STR','updateHelp','VWDAs','zTJhA','isMaxBuffAffected','updateVisibility','AEJkb','addWindow','EnableLayout','regenerateAll','_animationIndex','none','pFPXr','getColorDataFromPluginParameters','_result','damage','GroupDigits','_stypeIDs','windowPadding','IconStypeNorm','applyBuffTurnManipulationEffects','success','buff','141800ZpAxll','lineHeight','getCurrentTroopUniqueID','index','stateTurns','setStateData','Game_BattlerBase_decreaseBuff','ZBmSr','refresh','LhaHc','statesByCategory','Game_BattlerBase_isStateResist','Game_Unit_isAllDead','jpJjF','wLDXv','QySxx','xPqsV','onExpireStateGlobalJS','AGI','traitObjects','height','applyDebuffTurnManipulationEffects','adjustItemWidthByShopStatus','removeOtherStatesOfSameCategory','itemTextAlign','getSkillIdWithName','skillTypes','ITDHx','meetsPassiveStateConditionClasses','gaugeBackColor','LHVxB','removeState','ListWindowCols','onAddBuff','qPIRI','ParseAllNotetags','TurnOffsetX','recalculateSlipDamageJS','_stored_state-%1-color','IgtoS','ARRAYFUNC','JScQR','Gauge','buffIconIndex','actions','initMembersSkillsStatesCore','getCurrentStateActiveUser','ATK','POSITIVE','YTUhv','WMhCL','skillCostSeparator','width','shopStatusWindowRect','AxIJN','142SGrvee','uiHelpPosition','eraseBuff','EojwJ','ShowTurns','addPassiveStatesByNotetag','WCqbd','setStateOrigin','AGjGj','IsxxV','Game_BattlerBase_resetStateCounts','onDatabaseLoaded','Game_Battler_isStateAddable','totalStateCategoryAffected','autoRemovalTiming','isUseModernControls','icon','addDebuff','shift','nevtq','outlineColor','_skillIDs','right','setDebuffTurns','fXhzV','resetTextColor','checkShowHideNotetags','DJmRT','jXKyk','resetStateCounts','995424dgCudj','_stateIDs','#%1','onChange','callUpdateHelp','Scene_Skill_itemWindowRect','setStateTurns','drawActorBuffRates','Parse_Notetags_Skill_JS','PassiveConditionJS','currentValueSkillsStatesCore','Game_BattlerBase_recoverAll','MASwG','split','akmpA','gSxWV','nsOMR','XdnLn','NwKiG','removeBuff','labelFontSize','inBattle','DEF','_scene','canUse','slipMp','StackBuffMax','isStateExpired','STRUCT','drawActorStateData','XgAcv','initMembers','isSkillHidden','slipHp','recover\x20all','ygPBt','initialize','WFsKa','applyStateCategoryRemovalEffects','valueOutlineWidth','textSizeEx','paramBuffRate','<troop-%1>','nmNGr','retrieveStateColor','TurnOffsetY','_classIDs','DmVeJ','buffColor','eRzWt','macdt','enemy','Sprite_StateIcon_loadBitmap','onAddStateMakeCustomSlipValues','isStateCategoryAffected','helpWindowRect','ltwEM','QHWhZ','parse','slipTp','stateHpSlipDamageJS','Qaysp','JSON','commandNameWindowDrawText','removeStatesByCategoryAll','DTewT','887089kaqSGM','_skillTypeWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ZBokl','length','isBuffOrDebuffAffected','LabelOutlineSolid','ValueOutlineSolid','_endingBattle','LUK','untitled','Scene_Skill_statusWindowRect','ActionEndUpdate','HiddenSkillTypes','UKcik','clear','labelOutlineColor','Game_Action_testApply','UavuQ','sMEYN','ILMXM','onExpireDebuffGlobalJS','isDebuffAffected','onExpireBuff','isStateRemoved','XXtVX','stateMpSlipHealJS','3834300cnVEOs','skills','GaugeMaxJS','_buffs','wGINt','Window_StatusBase_placeGauge','Window_StatusBase_drawActorIcons','convertPassiveStates','qiuKk','mcNFO','onAddBuffJS','Game_Variables_onChange','pDPnO','changeTextColor','_stateMaxTurns','REASh','onAddStateCustomJS','BjKPI','dgKro','ValueOutlineWidth','drawItemStyleIcon','Window_SkillList_drawItem','clearStateData','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','jjVQN','meetsStateCondition','bitmap','value','createCommandNameWindow','Parse_Notetags_State_SlipEffectJS','makeResistedStateCategories','stateColor','map','_lastStatesActionEndFrameCount','sywOX','UYZCl','convertGaugeTypeSkillsStatesCore','Parse_Notetags_Skill_Cost','FmarG','states','maxCols','\x5cI[%1]%2','isStateAddable','decreaseBuff','name','makeCurrentTroopUniqueID','gaugeRate','_actor','ColorNegative','iconWidth','Sprite_Gauge_currentMaxValue','gradientFillRect','shopStatusWindowRectSkillsStatesCore','buffTurns','ANY','Game_Actor_forgetSkill','enemyId','JTHxz','totalStateCategory','meetsSkillConditionsEnableJS','onAddState','createPassiveStatesCache','Scene_Skill_skillTypeWindowRect','Global','dkmIp','greater','KWkSw','Game_Switches_onChange','format','onEraseDebuffGlobalJS','round','INAor','rufyU','MatchLabelColor','wmgSf','onRemoveState','ignore','%1\x20%2\x20%3','skillTypeWindowRect','GJAcq','FPsGG','currentValue','mpDamage','max','gaugeColor1','isGroupDefeatStateAffected','makeSuccess','PIyuz','addPassiveStatesFromOtherPlugins','drawItemStyleIconText','_stateOrigin','LayoutStyle','gSyQO','CMPBf','rgba(0,\x200,\x200,\x200)','CqOPg','number','getStateData','_skills','isPlaytest','KbGCY','makeCommandName','traitsSet','heal','center','setActor','regenerateAllSkillsStatesCore','status','increaseBuff','_statusWindow','mainAreaTop','_buffTurns','includesSkillsStatesCore','drawActorIcons','members','YeVJH','changeOutlineColor','Jxprv','statePassiveConditionJS','sMjTD','lhFGu','actor','iconText','stateTpSlipDamageJS','ApESD','includes','CfNmR','toLowerCase','_states','checkSkillTypeMatch','tpCost','clearStatesWithStateRetain','getStateDisplay','skillTpCost','maxItems','ARRAYEVAL','checkSkillConditionsSwitchNotetags','Game_BattlerBase_refresh','alterSkillName','tkMVt','MaxTurns','2052549tZZWwi','XqMXu','getStypeIdWithName','ALL','VisuMZ_0_CoreEngine','ShowShopStatus','magicSkills','jBnWq','_stateTurns','Game_Actor_skillTypes','description','addState','Sprite_StateIcon_updateFrame','applyItemUserEffect','_checkingVisuMzPassiveStateObjects','createShopStatusWindow','clearStateOrigin','nHRHS','priority','categories','eraseState','passiveStateObjects','adRhu','floor','overwriteBuffTurns','tvIHU','call','Skills','anchor','_categoryWindow','Window_SkillList_updateHelp','lJoqV','meetsPassiveStateConditions','_tempActor','labelFontFace','changePaintOpacity','Scbiv','item','Game_BattlerBase_initMembers','itemWindowRect','onEraseStateCustomJS','onAddDebuff','drawExtendedParameter','mlaIo','tFGvR','Game_BattlerBase_overwriteBuffTurns','innerWidth','Sprite_Gauge_gaugeRate','uiInputPosition','Game_BattlerBase_skillTpCost','setItem','gJLDN','Vbktt','mpCost','_checkingPassiveStates','<member-%1>','process_VisuMZ_SkillsStatesCore_State_Notetags','stateCategoriesResisted','stateData','xDVJr','meetsPassiveStateConditionJS','uVkXF','NmWaI','CheckVisibleSwitchNotetags','cYtSn','createAllSkillCostText','ColorBuff','MBvsT','stateEraseJS','Game_Battler_addDebuff','EHvjL','fvwal','placeExactGauge','_hidden','IconStypeMagic','isAllDead','LabelOutlineWidth','mainFontSize','Window_SkillList_includes','setPassiveStateSlipDamageJS','normalColor','CqHCL','ARRAYJSON','Game_BattlerBase_states','drawIcon','Game_Battler_regenerateAll','buttonAssistText1','onEraseDebuff','ErHmD','DataFontSize','Scene_Skill_createItemWindow','Sprite_Gauge_initMembers','Window_SkillType_initialize','add','gaugeLineHeight','onExpireStateCustomJS','testSkillStatesCoreNotetags','CheckVisibleBattleNotetags','Parse_Notetags_State_ApplyRemoveLeaveJS','drawParamText','ReapplyRules','SkillMenuStatusRect','PmiWe','addChild','CanPayJS','Sprite_Gauge_currentValue','gcAHk','UTUVM','TfOqz','drawFullGauge','deadMembers','PresetLabelGaugeColor','mGFON','endAction','Scene_Skill_helpWindowRect','Mestu','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','UvtyU','commandNameWindowDrawBackground','onEraseBuffGlobalJS','kuyOr','TurnFontSize','getSkillTypes','_phase','UbIye','addDebuffTurns','drawItem','fontSize','Game_BattlerBase_eraseState','NjHVJ','Jbzly','commandStyleCheck','yOJQe','CgBFO','_itemWindow','exit','RsHgu','yGANt','Name','PayJS','sort','removeStatesAuto','onAddStateGlobalJS','getCurrentStateOriginKey','trim','isSceneBattle','adjustSkillCost','nogMs','LabelFontMainType','getColor','toUpperCase','equips','isSkillCostShown','setBuffTurns','skillId','clamp','MOday','addPassiveStates','24uvJGGC','itemLineRect','makeCommandList','tdNgi','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','multiclasses','PassiveStates','RefreshCacheVar','BattleManager_endAction','gaugeColor2','fontFace','process_VisuMZ_SkillsStatesCore_Notetags','ParseClassIDs','sFEvN','MKxHR','currentMaxValueSkillsStatesCore','scrollTo','LiEkX','PhzMA','skill','ibybW','isBottomHelpMode','Pdiwe','constructor','isSkillUsableForAutoBattle','noMzr','meetsSkillConditions','getStateReapplyRulings','resetFontSettings','tRBxI','isLearnedSkill','onAddStateJS','COeHd','yoAsX','passiveStates','ksNSv','stateHpSlipHealJS','Window_SkillList_setActor','_currentActor','debuffTurns','addPassiveStatesByPluginParameters','DataOffsetX','log','getStateRetainType','test','uEicb','prototype','buttonAssistSwitch','helpAreaTop','wxclc','redrawSkillsStatesCore','version','textColor','MDF','AqGPn','EVAL','_stypeId','_passiveStateResults','actorId','buBAc','meetsPassiveStateGlobalConditionJS','3493468CIFNlI','BattleHiddenSkillTypes','currentClass','_stateRetainType','ParseStateNotetags','loadBitmap','setBackgroundType','onExpireBuffGlobalJS','forgetSkill','tqELm','Nmhnp','stateExpireJS','_currentTroopUniqueID','Game_Unit_deadMembers','ddIsT','vKldr','gainHp','JfHZb','XlCOu','isRightInputMode','drawText','OkhNe','PvMxJ','updatedLayoutStyle','_commandNameWindow','hasState','mainCommandWidth','gainMp','uiMenuStyle','Game_BattlerBase_skillMpCost','DataOffsetY','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','getStateOriginByKey','StackDebuffMax','testApply','stypeId','keys','replace','clearStateRetainType','Game_BattlerBase_meetsSkillConditions','Buffs','getClassIdWithName','die','createTurnDisplaySprite','Game_Troop_setup','stateAddJS','isCommandEnabled','isStateAffected','Game_Action_applyItemUserEffect','hide','isBuffExpired','valueFontFace','MAT','groupDefeat','setStateDisplay','PFIaR','statusWindowRect','ZByiI','contents','text','note','Game_BattlerBase_clearStates','recoverAll','addPassiveStatesTraitSets','KLDTl','ParseSkillNotetags','frameCount','fontBold','3jGYTQB','MAXHP','drawSkillCost','4801bBmCaV','checkCacheKey','placeGauge','oLoAA','canPaySkillCost','dEvWH','_stateData','eXQPm','concat','bmKru','user','isPassiveStateStackable','NUM','_stored_buffColor','_shopStatusWindow','addBuff','ciYwS','CheckVisibleSkillNotetags','setup','onAddBuffGlobalJS','bZfcb','updateCommandNameWindow','FUNC','Settings','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Costs','labelColor','checkShowHideJS','myrIl','currentMaxValue','ValueFontMainType','fillRect','nwBdQ','meetsPassiveStateConditionSwitches','PIESr','isMaxDebuffAffected','Enemy','_colorCache','MultiplierJS','helpWindowRectSkillsStatesCore','Parse_Notetags_State_Category','_cache','opacity','addCommand','onAddDebuffGlobalJS','onExpireBuffJS','JcaAj','nhnMQ','Game_Battler_addBuff','setStatusWindow','hpDamage','parameters','boxWidth','stateTpSlipHealJS','applySkillsStatesCoreEffects','skillTypeWindowRectSkillsStatesCore','VisuMZ_1_MainMenuCore','_subject','checkSkillConditionsNotetags','MLpGr','maodG','itemAt','stateMaximumTurns','shopStatusWidth','Sprite_Gauge_setup','JSbNT','onExpireStateJS','Window_SkillStatus_refresh','clearStateDisplay','vROyi','makeAdditionalSkillCostText','aaEeo','DisplayedParams','RLaDY','_tempBattler','pCnIn','_checkingTraitsSetSkillsStatesCore','commandStyle','labelOutlineWidth','stateMpSlipDamageJS','emXlR','isPartyAllAffectedByGroupDefeatStates','drawActorBuffTurns','_stateSteps','isUseSkillsStatesCoreUpdatedLayout','getStateOrigin','createItemWindow','valueOutlineColor','onEraseStateJS','getStateIdWithName','pdygg','Game_BattlerBase_eraseBuff','statusWidth','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Scene_Boot_onDatabaseLoaded','useDigitGrouping','createSkillCostText','allBattleMembers','oDvPC','TextJS','reset','DeDqy','EcYby','hasStateCategory','sJyPL','uTFRL','commandName','uOBUs','onEraseStateGlobalJS','SkillsStatesCore','convertTargetToStateOriginKey','commandNameWindowCenter','qUHnP','TtqFX','rgba(0,\x200,\x200,\x201)','CalcJS','updateStatesActionEnd','SkillSceneStatusBgType','_turnDisplaySprite','AEnZr','meetsSkillConditionsGlobalJS','onEraseBuff','iconHeight','removeStatesByCategory','setupSkillsStatesCore','hasSkill','CmdWidth','_battler','Game_BattlerBase_traitsSet','oJsJT','dPAVM','indexOf','SkillSceneAdjustSkillList','buffLength','process_VisuMZ_SkillsStatesCore_Skill_Notetags','skillVisibleJS','isStateCategoryResisted','Game_Battler_addState','isActor','calcWindowHeight','mainFontFace','numberFontFace','match','onExpireDebuff','HzuKV','clearStates','isBuffAffected','learnSkill','qEISG','hdsSV','updateTurnDisplaySprite','Game_Actor_learnSkill','_stateDisplay','_costSettings','isStateResist','helpAreaHeight','GaugeDrawJS','Game_BattlerBase_increaseBuff','%1%','ColorDebuff','EbKGK','NEGATIVE','States','isSkillTypeMatchForUse','setStateRetainType','lHABn','Parse_Notetags_State_PassiveJS','stateId','skillMpCost','XBPrU','iconIndex','drawActorStateTurns','skillEnableJS','remove','addStateTurns','Window_SkillList_maxCols','death','MatchLabelGaugeColor','<enemy-%1>','inFCN','addBuffTurns','active','drawExtendedSkillsStatesCoreStatus','ARRAYSTRUCT','drawTextEx','VisuMZ_1_ElementStatusCore','8LmDjOy','canClearState','ConvertParams','push','onExpireState','statusWindowRectSkillsStatesCore','Sprite_Gauge_redraw','return\x200','zAYdV','VSsJj','HHGee','slice','filter','allowCreateShopStatusWindow'];_0x1848=function(){return _0x484d47;};return _0x1848();}var label=_0x306dc8(0x39c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x306dc8(0x3f5)](function(_0x506ff9){const _0x55fd00=_0x306dc8;return _0x506ff9[_0x55fd00(0x1eb)]&&_0x506ff9['description'][_0x55fd00(0x1fd)]('['+label+']');})[0x0];function _0x3cb5(_0x1c75c0,_0x51d83e){const _0x1848f8=_0x1848();return _0x3cb5=function(_0x3cb587,_0x1c933b){_0x3cb587=_0x3cb587-0x1cb;let _0x5a6739=_0x1848f8[_0x3cb587];return _0x5a6739;},_0x3cb5(_0x1c75c0,_0x51d83e);}VisuMZ[label]['Settings']=VisuMZ[label][_0x306dc8(0x346)]||{},VisuMZ['ConvertParams']=function(_0x37e42d,_0x249ea5){const _0x1e8590=_0x306dc8;for(const _0x223810 in _0x249ea5){if(_0x223810['match'](/(.*):(.*)/i)){if(_0x1e8590(0x2f2)!==_0x1e8590(0x438)){const _0x1b89de=String(RegExp['$1']),_0xc80dbe=String(RegExp['$2'])[_0x1e8590(0x2a3)]()[_0x1e8590(0x29d)]();let _0x2e6e29,_0x5130f0,_0x3e4350;switch(_0xc80dbe){case _0x1e8590(0x33b):_0x2e6e29=_0x249ea5[_0x223810]!==''?Number(_0x249ea5[_0x223810]):0x0;break;case'ARRAYNUM':_0x5130f0=_0x249ea5[_0x223810]!==''?JSON[_0x1e8590(0x49e)](_0x249ea5[_0x223810]):[],_0x2e6e29=_0x5130f0[_0x1e8590(0x4e1)](_0x34da31=>Number(_0x34da31));break;case _0x1e8590(0x2e2):_0x2e6e29=_0x249ea5[_0x223810]!==''?eval(_0x249ea5[_0x223810]):null;break;case _0x1e8590(0x207):_0x5130f0=_0x249ea5[_0x223810]!==''?JSON[_0x1e8590(0x49e)](_0x249ea5[_0x223810]):[],_0x2e6e29=_0x5130f0[_0x1e8590(0x4e1)](_0x55c8a5=>eval(_0x55c8a5));break;case _0x1e8590(0x4a2):_0x2e6e29=_0x249ea5[_0x223810]!==''?JSON['parse'](_0x249ea5[_0x223810]):'';break;case _0x1e8590(0x25f):_0x5130f0=_0x249ea5[_0x223810]!==''?JSON[_0x1e8590(0x49e)](_0x249ea5[_0x223810]):[],_0x2e6e29=_0x5130f0[_0x1e8590(0x4e1)](_0x1fe435=>JSON[_0x1e8590(0x49e)](_0x1fe435));break;case _0x1e8590(0x345):_0x2e6e29=_0x249ea5[_0x223810]!==''?new Function(JSON[_0x1e8590(0x49e)](_0x249ea5[_0x223810])):new Function(_0x1e8590(0x3f0));break;case _0x1e8590(0x437):_0x5130f0=_0x249ea5[_0x223810]!==''?JSON[_0x1e8590(0x49e)](_0x249ea5[_0x223810]):[],_0x2e6e29=_0x5130f0[_0x1e8590(0x4e1)](_0x58e8cc=>new Function(JSON[_0x1e8590(0x49e)](_0x58e8cc)));break;case _0x1e8590(0x3f8):_0x2e6e29=_0x249ea5[_0x223810]!==''?String(_0x249ea5[_0x223810]):'';break;case'ARRAYSTR':_0x5130f0=_0x249ea5[_0x223810]!==''?JSON[_0x1e8590(0x49e)](_0x249ea5[_0x223810]):[],_0x2e6e29=_0x5130f0[_0x1e8590(0x4e1)](_0x2a812c=>String(_0x2a812c));break;case _0x1e8590(0x480):_0x3e4350=_0x249ea5[_0x223810]!==''?JSON['parse'](_0x249ea5[_0x223810]):{},_0x37e42d[_0x1b89de]={},VisuMZ['ConvertParams'](_0x37e42d[_0x1b89de],_0x3e4350);continue;case _0x1e8590(0x3e6):_0x5130f0=_0x249ea5[_0x223810]!==''?JSON['parse'](_0x249ea5[_0x223810]):[],_0x2e6e29=_0x5130f0['map'](_0x4f49fa=>VisuMZ[_0x1e8590(0x3eb)]({},JSON[_0x1e8590(0x49e)](_0x4f49fa)));break;default:continue;}_0x37e42d[_0x1b89de]=_0x2e6e29;}else{const _0x29c593=this[_0x1e8590(0x36e)](),_0x20b511=this['_itemWindow'][_0x1e8590(0x423)],_0x3e9439=this['isRightInputMode']()?0x0:_0x508d3a['boxWidth']-this[_0x1e8590(0x36e)](),_0x199f62=this[_0x1e8590(0x293)]['y'];return new _0x5eace5(_0x3e9439,_0x199f62,_0x29c593,_0x20b511);}}}return _0x37e42d;},(_0x3e9ca0=>{const _0x417566=_0x306dc8,_0x4e8728=_0x3e9ca0['name'];for(const _0x54b83f of dependencies){if(_0x417566(0x4ba)!=='ILMXM')return _0x4648f3[_0x417566(0x1eb)]&&_0x5dd81c[_0x417566(0x217)][_0x417566(0x1fd)]('['+_0x22720b+']');else{if(!Imported[_0x54b83f]){alert(_0x417566(0x4d8)['format'](_0x4e8728,_0x54b83f)),SceneManager[_0x417566(0x294)]();break;}}}const _0x28493a=_0x3e9ca0[_0x417566(0x217)];if(_0x28493a[_0x417566(0x3bd)](/\[Version[ ](.*?)\]/i)){const _0x300f25=Number(RegExp['$1']);_0x300f25!==VisuMZ[label][_0x417566(0x2de)]&&(alert(_0x417566(0x38c)['format'](_0x4e8728,_0x300f25)),SceneManager['exit']());}if(_0x28493a[_0x417566(0x3bd)](/\[Tier[ ](\d+)\]/i)){const _0x2e6034=Number(RegExp['$1']);_0x2e6034<tier?(alert(_0x417566(0x4a8)[_0x417566(0x505)](_0x4e8728,_0x2e6034,tier)),SceneManager['exit']()):tier=Math[_0x417566(0x1d3)](_0x2e6034,tier);}VisuMZ[_0x417566(0x3eb)](VisuMZ[label]['Settings'],_0x3e9ca0[_0x417566(0x362)]);})(pluginData),VisuMZ['SkillsStatesCore'][_0x306dc8(0x38d)]=Scene_Boot[_0x306dc8(0x2d9)][_0x306dc8(0x451)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x435f33=_0x306dc8;VisuMZ[_0x435f33(0x39c)][_0x435f33(0x38d)]['call'](this),this[_0x435f33(0x2b6)](),VisuMZ[_0x435f33(0x39c)]['CheckIncompatibleStates']();},Scene_Boot[_0x306dc8(0x2d9)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x3ccd72=_0x306dc8;if(VisuMZ[_0x3ccd72(0x432)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot[_0x306dc8(0x2d9)][_0x306dc8(0x3b5)]=function(){const _0x4f3c79=_0x306dc8;for(const _0x56d1f2 of $dataSkills){if(!_0x56d1f2)continue;VisuMZ[_0x4f3c79(0x39c)][_0x4f3c79(0x4e6)](_0x56d1f2),VisuMZ['SkillsStatesCore'][_0x4f3c79(0x46c)](_0x56d1f2);}},Scene_Boot[_0x306dc8(0x2d9)][_0x306dc8(0x245)]=function(){const _0x5a3e03=_0x306dc8;for(const _0x223925 of $dataStates){if(_0x5a3e03(0x3c4)===_0x5a3e03(0x2c8))return _0x339e1b[_0x5a3e03(0x39c)][_0x5a3e03(0x346)][_0x5a3e03(0x439)][_0x5a3e03(0x4d4)]||0x0;else{if(!_0x223925)continue;VisuMZ[_0x5a3e03(0x39c)][_0x5a3e03(0x357)](_0x223925),VisuMZ[_0x5a3e03(0x39c)][_0x5a3e03(0x3d5)](_0x223925),VisuMZ[_0x5a3e03(0x39c)]['Parse_Notetags_State_SlipEffectJS'](_0x223925),VisuMZ[_0x5a3e03(0x39c)][_0x5a3e03(0x26f)](_0x223925);}}},VisuMZ['SkillsStatesCore'][_0x306dc8(0x329)]=VisuMZ[_0x306dc8(0x329)],VisuMZ['ParseSkillNotetags']=function(_0x1e7f57){const _0x2d1f56=_0x306dc8;VisuMZ[_0x2d1f56(0x39c)][_0x2d1f56(0x329)]['call'](this,_0x1e7f57),VisuMZ[_0x2d1f56(0x39c)][_0x2d1f56(0x4e6)](_0x1e7f57),VisuMZ['SkillsStatesCore'][_0x2d1f56(0x46c)](_0x1e7f57);},VisuMZ[_0x306dc8(0x39c)]['ParseStateNotetags']=VisuMZ['ParseStateNotetags'],VisuMZ['ParseStateNotetags']=function(_0x5d3e1b){const _0x282ba2=_0x306dc8;VisuMZ[_0x282ba2(0x39c)][_0x282ba2(0x2ec)]['call'](this,_0x5d3e1b),VisuMZ['SkillsStatesCore'][_0x282ba2(0x357)](_0x5d3e1b),VisuMZ[_0x282ba2(0x39c)][_0x282ba2(0x3d5)](_0x5d3e1b),VisuMZ[_0x282ba2(0x39c)][_0x282ba2(0x4de)](_0x5d3e1b),VisuMZ[_0x282ba2(0x39c)][_0x282ba2(0x26f)](_0x5d3e1b);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x4e6)]=function(_0x221d83){const _0x298edf=_0x306dc8,_0x42baee=_0x221d83[_0x298edf(0x324)];_0x42baee[_0x298edf(0x3bd)](/<MP COST:[ ](\d+)>/i)&&(_0x221d83[_0x298edf(0x242)]=Number(RegExp['$1'])),_0x42baee['match'](/<TP COST:[ ](\d+)>/i)&&(_0x221d83[_0x298edf(0x202)]=Number(RegExp['$1']));},VisuMZ[_0x306dc8(0x39c)]['skillEnableJS']={},VisuMZ[_0x306dc8(0x39c)]['skillVisibleJS']={},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x46c)]=function(_0x13a72a){const _0x5ebdb8=_0x306dc8,_0x2dd6c7=_0x13a72a[_0x5ebdb8(0x324)];if(_0x2dd6c7[_0x5ebdb8(0x3bd)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x31cd65=String(RegExp['$1']),_0x430e0b=_0x5ebdb8(0x347)['format'](_0x31cd65);VisuMZ[_0x5ebdb8(0x39c)]['skillEnableJS'][_0x13a72a['id']]=new Function('skill',_0x430e0b);}if(_0x2dd6c7[_0x5ebdb8(0x3bd)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x539626=String(RegExp['$1']),_0x3b2a1c=_0x5ebdb8(0x281)[_0x5ebdb8(0x505)](_0x539626);VisuMZ[_0x5ebdb8(0x39c)][_0x5ebdb8(0x3b6)][_0x13a72a['id']]=new Function(_0x5ebdb8(0x2be),_0x3b2a1c);}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x357)]=function(_0x308803){const _0xc7e92e=_0x306dc8;_0x308803[_0xc7e92e(0x220)]=[_0xc7e92e(0x210),_0xc7e92e(0x4f7)];const _0x301dff=_0x308803[_0xc7e92e(0x324)],_0x16f9ab=_0x301dff[_0xc7e92e(0x3bd)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x16f9ab)for(const _0x431bc2 of _0x16f9ab){_0x431bc2['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xc1fa09=String(RegExp['$1'])[_0xc7e92e(0x2a3)]()[_0xc7e92e(0x29d)]()[_0xc7e92e(0x471)](',');for(const _0x1e2383 of _0xc1fa09){_0x308803['categories']['push'](_0x1e2383[_0xc7e92e(0x29d)]());}}if(_0x301dff[_0xc7e92e(0x3bd)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0xc7e92e(0x3fb)===_0xc7e92e(0x3fb)){const _0x57e58f=RegExp['$1']['split'](/[\r\n]+/);for(const _0x48dc00 of _0x57e58f){if(_0xc7e92e(0x254)===_0xc7e92e(0x336)){if(!this[_0xc7e92e(0x4f0)])return;const _0x5f4403=this['_actor'][_0xc7e92e(0x429)]();for(const _0x56d404 of _0x5f4403){const _0x4bee9c=this[_0xc7e92e(0x1e5)](_0x56d404);this[_0xc7e92e(0x35a)](_0x4bee9c,_0xc7e92e(0x2be),!![],_0x56d404);}}else _0x308803['categories']['push'](_0x48dc00[_0xc7e92e(0x2a3)]()[_0xc7e92e(0x29d)]());}}else{for(_0x3da260 of _0x45aac3['SkillsStatesCore']['Settings'][_0xc7e92e(0x348)]){let _0x642028=_0xe7545[_0xc7e92e(0x3a2)][_0xc7e92e(0x227)](this,_0x4ebb3a);_0x642028=this[_0xc7e92e(0x29f)](_0x1cf3e8,_0x642028,_0x56974a);if(!_0x400dec['CanPayJS'][_0xc7e92e(0x227)](this,_0x362f58,_0x642028))return![];}return!![];}}if(_0x301dff[_0xc7e92e(0x3bd)](/<POSITIVE STATE>/i)){if(_0xc7e92e(0x475)===_0xc7e92e(0x475))_0x308803[_0xc7e92e(0x220)][_0xc7e92e(0x3ec)](_0xc7e92e(0x43f));else return _0x46ce31=_0xf237ef(_0x597937),this['_colorCache']=this[_0xc7e92e(0x354)]||{},_0x4ede62[_0xc7e92e(0x3bd)](/#(.*)/i)?this['_colorCache'][_0x121a50]=_0xc7e92e(0x466)['format'](_0x13e2a6(_0x278a8a['$1'])):this[_0xc7e92e(0x354)][_0x4a30fa]=this['textColor'](_0x472641(_0x561d71)),this['_colorCache'][_0x1abf1a];}_0x301dff[_0xc7e92e(0x3bd)](/<NEGATIVE STATE>/i)&&_0x308803[_0xc7e92e(0x220)][_0xc7e92e(0x3ec)](_0xc7e92e(0x3d0));},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x1f6)]={},VisuMZ['SkillsStatesCore'][_0x306dc8(0x3d5)]=function(_0x5bf613){const _0x42edd4=_0x306dc8,_0x1f28cf=_0x5bf613[_0x42edd4(0x324)];if(_0x1f28cf[_0x42edd4(0x3bd)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if(_0x42edd4(0x1f3)===_0x42edd4(0x1f3)){const _0x431656=String(RegExp['$1']),_0x5c6832=_0x42edd4(0x307)[_0x42edd4(0x505)](_0x431656);VisuMZ[_0x42edd4(0x39c)][_0x42edd4(0x1f6)][_0x5bf613['id']]=new Function('state',_0x5c6832);}else{const _0x5b881b=this[_0x42edd4(0x444)]();this[_0x42edd4(0x33d)]=new _0x22d7be(_0x5b881b),this[_0x42edd4(0x3ff)](this['_shopStatusWindow']),this[_0x42edd4(0x293)]['setStatusWindow'](this[_0x42edd4(0x33d)]);const _0x9541df=_0x549af2[_0x42edd4(0x39c)]['Settings'][_0x42edd4(0x228)][_0x42edd4(0x3a4)];this[_0x42edd4(0x33d)][_0x42edd4(0x2ee)](_0x9541df||0x0);}}},VisuMZ['SkillsStatesCore'][_0x306dc8(0x4a0)]={},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x2cf)]={},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x37e)]={},VisuMZ['SkillsStatesCore'][_0x306dc8(0x4c0)]={},VisuMZ['SkillsStatesCore'][_0x306dc8(0x1fb)]={},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x364)]={},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x4de)]=function(_0x4cef8f){const _0x3d250d=_0x306dc8,_0x40d913=_0x4cef8f[_0x3d250d(0x324)],_0x224de8='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x40d913[_0x3d250d(0x3bd)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if(_0x3d250d(0x231)!==_0x3d250d(0x231)){_0x58bebf[_0x3d250d(0x3bd)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x3ff8b7=_0x405e21(_0x16db53['$1']);_0x63f37b[_0x3d250d(0x4a4)](_0x3ff8b7);}else{const _0x357b95=String(RegExp['$1']),_0x484b1b=_0x224de8[_0x3d250d(0x505)](_0x357b95,'damage',-0x1,_0x3d250d(0x485));VisuMZ[_0x3d250d(0x39c)][_0x3d250d(0x4a0)][_0x4cef8f['id']]=new Function('stateId',_0x484b1b);}}else{if(_0x40d913[_0x3d250d(0x3bd)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x475053=String(RegExp['$1']),_0x5d9fcd=_0x224de8[_0x3d250d(0x505)](_0x475053,'heal',0x1,'slipHp');VisuMZ[_0x3d250d(0x39c)][_0x3d250d(0x2cf)][_0x4cef8f['id']]=new Function(_0x3d250d(0x3d6),_0x5d9fcd);}}if(_0x40d913[_0x3d250d(0x3bd)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x1723ad=String(RegExp['$1']),_0x1e9a67=_0x224de8[_0x3d250d(0x505)](_0x1723ad,_0x3d250d(0x407),-0x1,_0x3d250d(0x47d));VisuMZ[_0x3d250d(0x39c)]['stateMpSlipDamageJS'][_0x4cef8f['id']]=new Function(_0x3d250d(0x3d6),_0x1e9a67);}else{if(_0x40d913['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x564ef7=String(RegExp['$1']),_0x9b5ac9=_0x224de8[_0x3d250d(0x505)](_0x564ef7,'heal',0x1,_0x3d250d(0x47d));VisuMZ[_0x3d250d(0x39c)]['stateMpSlipHealJS'][_0x4cef8f['id']]=new Function(_0x3d250d(0x3d6),_0x9b5ac9);}}if(_0x40d913[_0x3d250d(0x3bd)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x3d250d(0x41f)!=='KJwex'){const _0x2b10f5=String(RegExp['$1']),_0x1561d9=_0x224de8[_0x3d250d(0x505)](_0x2b10f5,_0x3d250d(0x407),-0x1,'slipTp');VisuMZ[_0x3d250d(0x39c)][_0x3d250d(0x1fb)][_0x4cef8f['id']]=new Function(_0x3d250d(0x3d6),_0x1561d9);}else _0x37e5c1[_0x3d250d(0x299)]((_0x3d8259,_0x3201ee)=>{const _0x159f30=_0x3d250d,_0x33fadd=_0x3d8259[_0x159f30(0x21f)],_0x2400de=_0x3201ee[_0x159f30(0x21f)];if(_0x33fadd!==_0x2400de)return _0x2400de-_0x33fadd;return _0x3d8259-_0x3201ee;});}else{if(_0x40d913[_0x3d250d(0x3bd)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if('TtqFX'===_0x3d250d(0x3a0)){const _0x37b533=String(RegExp['$1']),_0x3c5ce0=_0x224de8[_0x3d250d(0x505)](_0x37b533,_0x3d250d(0x1e7),0x1,'slipTp');VisuMZ[_0x3d250d(0x39c)][_0x3d250d(0x364)][_0x4cef8f['id']]=new Function(_0x3d250d(0x3d6),_0x3c5ce0);}else return _0x2129d4[_0x3d250d(0x1f2)]()[_0x27cc73(_0x4d8719['$1'])];}}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x315)]={},VisuMZ[_0x306dc8(0x39c)]['stateEraseJS']={},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x2f3)]={},VisuMZ['SkillsStatesCore'][_0x306dc8(0x26f)]=function(_0x3bf522){const _0x1dd9f4=_0x306dc8,_0x29b50c=_0x3bf522['note'],_0x510c9e=_0x1dd9f4(0x2af);if(_0x29b50c[_0x1dd9f4(0x3bd)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if(_0x1dd9f4(0x4e4)!==_0x1dd9f4(0x4e4)){const _0x438227=_0x115170[_0x1dd9f4(0x39c)],_0x30a251=[_0x1dd9f4(0x4a0),_0x1dd9f4(0x2cf),'stateMpSlipDamageJS',_0x1dd9f4(0x4c0),'stateTpSlipDamageJS',_0x1dd9f4(0x364)];for(const _0x18e24d of _0x30a251){_0x438227[_0x18e24d][_0x41d7b8]&&_0x438227[_0x18e24d][_0x4f5f30][_0x1dd9f4(0x227)](this,_0x85ce27);}}else{const _0x52f63e=String(RegExp['$1']),_0xce4d8f=_0x510c9e['format'](_0x52f63e);VisuMZ['SkillsStatesCore'][_0x1dd9f4(0x315)][_0x3bf522['id']]=new Function(_0x1dd9f4(0x3d6),_0xce4d8f);}}if(_0x29b50c[_0x1dd9f4(0x3bd)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x28246f=String(RegExp['$1']),_0x28df40=_0x510c9e[_0x1dd9f4(0x505)](_0x28246f);VisuMZ[_0x1dd9f4(0x39c)][_0x1dd9f4(0x251)][_0x3bf522['id']]=new Function(_0x1dd9f4(0x3d6),_0x28df40);}if(_0x29b50c[_0x1dd9f4(0x3bd)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x3cc189=String(RegExp['$1']),_0x10c9f5=_0x510c9e['format'](_0x3cc189);VisuMZ['SkillsStatesCore'][_0x1dd9f4(0x2f3)][_0x3bf522['id']]=new Function(_0x1dd9f4(0x3d6),_0x10c9f5);}},VisuMZ[_0x306dc8(0x39c)]['CheckIncompatibleStates']=function(){const _0x415eba=_0x306dc8;if(!VisuMZ[_0x415eba(0x39c)]['Settings'][_0x415eba(0x3d1)][_0x415eba(0x4b2)])return;for(const _0x35840a of $dataStates){if(!_0x35840a)continue;_0x35840a['restriction']===0x4&&_0x35840a[_0x415eba(0x454)]===0x1&&(_0x35840a[_0x415eba(0x454)]=0x2);}},DataManager[_0x306dc8(0x311)]=function(_0x511437){const _0x265b83=_0x306dc8;_0x511437=_0x511437[_0x265b83(0x2a3)]()['trim'](),this[_0x265b83(0x492)]=this[_0x265b83(0x492)]||{};if(this['_classIDs'][_0x511437])return this[_0x265b83(0x492)][_0x511437];for(const _0x29dd3b of $dataClasses){if(!_0x29dd3b)continue;let _0x29e665=_0x29dd3b[_0x265b83(0x4ed)];_0x29e665=_0x29e665[_0x265b83(0x30d)](/\x1I\[(\d+)\]/gi,''),_0x29e665=_0x29e665[_0x265b83(0x30d)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x29e665[_0x265b83(0x2a3)]()['trim']()]=_0x29dd3b['id'];}return this['_classIDs'][_0x511437]||0x0;},DataManager[_0x306dc8(0x287)]=function(_0x5c50ca){const _0xed14cd=_0x306dc8;this['_stypeIDs']=this[_0xed14cd(0x409)]||{};if(this[_0xed14cd(0x409)][_0x5c50ca['id']])return this[_0xed14cd(0x409)][_0x5c50ca['id']];this['_stypeIDs'][_0x5c50ca['id']]=[_0x5c50ca[_0xed14cd(0x30b)]];if(_0x5c50ca[_0xed14cd(0x324)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xed14cd(0x296)===_0xed14cd(0x440))return _0x3154b6[_0xed14cd(0x1f9)](_0x1f5bb2(_0x4c50fd['$1']));else{const _0x39d60b=JSON[_0xed14cd(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0xed14cd(0x409)][_0x5c50ca['id']]=this[_0xed14cd(0x409)][_0x5c50ca['id']][_0xed14cd(0x337)](_0x39d60b);}}else{if(_0x5c50ca[_0xed14cd(0x324)][_0xed14cd(0x3bd)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0xed14cd(0x2e6)==='buBAc'){const _0x3f3d6e=RegExp['$1']['split'](',');for(const _0x1a9490 of _0x3f3d6e){const _0x4651d8=DataManager[_0xed14cd(0x20f)](_0x1a9490);if(_0x4651d8)this[_0xed14cd(0x409)][_0x5c50ca['id']][_0xed14cd(0x3ec)](_0x4651d8);}}else return this[_0xed14cd(0x383)]()?this[_0xed14cd(0x356)]():_0x40f33d[_0xed14cd(0x39c)][_0xed14cd(0x27f)]['call'](this);}}return this[_0xed14cd(0x409)][_0x5c50ca['id']];},DataManager[_0x306dc8(0x20f)]=function(_0x414f1c){const _0x5f0850=_0x306dc8;_0x414f1c=_0x414f1c[_0x5f0850(0x2a3)]()[_0x5f0850(0x29d)](),this['_stypeIDs']=this[_0x5f0850(0x409)]||{};if(this[_0x5f0850(0x409)][_0x414f1c])return this['_stypeIDs'][_0x414f1c];for(let _0xab9a5c=0x1;_0xab9a5c<0x64;_0xab9a5c++){if('Cxvis'!=='Cxvis'){const _0x35d807=_0x4d007d[_0x5f0850(0x49e)]('['+_0x13e046['$1'][_0x5f0850(0x3bd)](/\d+/g)+']');for(const _0x2dec47 of _0x35d807){if(_0x46b062['isLearnedSkill'](_0x2dec47))return!![];}return![];}else{if(!$dataSystem[_0x5f0850(0x429)][_0xab9a5c])continue;let _0x483a6d=$dataSystem[_0x5f0850(0x429)][_0xab9a5c][_0x5f0850(0x2a3)]()[_0x5f0850(0x29d)]();_0x483a6d=_0x483a6d[_0x5f0850(0x30d)](/\x1I\[(\d+)\]/gi,''),_0x483a6d=_0x483a6d[_0x5f0850(0x30d)](/\\I\[(\d+)\]/gi,''),this[_0x5f0850(0x409)][_0x483a6d]=_0xab9a5c;}}return this['_stypeIDs'][_0x414f1c]||0x0;},DataManager[_0x306dc8(0x428)]=function(_0x126d44){const _0xee555e=_0x306dc8;_0x126d44=_0x126d44['toUpperCase']()[_0xee555e(0x29d)](),this[_0xee555e(0x45b)]=this['_skillIDs']||{};if(this[_0xee555e(0x45b)][_0x126d44])return this[_0xee555e(0x45b)][_0x126d44];for(const _0x2e21ec of $dataSkills){if(!_0x2e21ec)continue;this[_0xee555e(0x45b)][_0x2e21ec[_0xee555e(0x4ed)]['toUpperCase']()[_0xee555e(0x29d)]()]=_0x2e21ec['id'];}return this['_skillIDs'][_0x126d44]||0x0;},DataManager[_0x306dc8(0x388)]=function(_0xd5920c){const _0x279765=_0x306dc8;_0xd5920c=_0xd5920c['toUpperCase']()[_0x279765(0x29d)](),this['_stateIDs']=this['_stateIDs']||{};if(this[_0x279765(0x465)][_0xd5920c])return this['_stateIDs'][_0xd5920c];for(const _0xfef14a of $dataStates){if('vYKgF'===_0x279765(0x3bf))_0x393912['SkillsStatesCore'][_0x279765(0x325)][_0x279765(0x227)](this),this['initMembersSkillsStatesCore']();else{if(!_0xfef14a)continue;this[_0x279765(0x465)][_0xfef14a[_0x279765(0x4ed)]['toUpperCase']()[_0x279765(0x29d)]()]=_0xfef14a['id'];}}return this[_0x279765(0x465)][_0xd5920c]||0x0;},DataManager[_0x306dc8(0x36d)]=function(_0x41e1de){const _0x2cd3d5=_0x306dc8;this[_0x2cd3d5(0x4cf)]=this[_0x2cd3d5(0x4cf)]||{};if(this[_0x2cd3d5(0x4cf)][_0x41e1de])return this['_stateMaxTurns'][_0x41e1de];return $dataStates[_0x41e1de][_0x2cd3d5(0x324)][_0x2cd3d5(0x3bd)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x2cd3d5(0x4cf)][_0x41e1de]=Number(RegExp['$1']):this[_0x2cd3d5(0x4cf)][_0x41e1de]=VisuMZ[_0x2cd3d5(0x39c)][_0x2cd3d5(0x346)][_0x2cd3d5(0x3d1)][_0x2cd3d5(0x20c)],this[_0x2cd3d5(0x4cf)][_0x41e1de];},ColorManager[_0x306dc8(0x405)]=function(_0x51eec4,_0x592182){const _0x2f5367=_0x306dc8;return _0x592182=String(_0x592182),this[_0x2f5367(0x354)]=this[_0x2f5367(0x354)]||{},_0x592182[_0x2f5367(0x3bd)](/#(.*)/i)?this[_0x2f5367(0x354)][_0x51eec4]=_0x2f5367(0x466)['format'](String(RegExp['$1'])):this[_0x2f5367(0x354)][_0x51eec4]=this[_0x2f5367(0x2df)](Number(_0x592182)),this[_0x2f5367(0x354)][_0x51eec4];},ColorManager['getColor']=function(_0x45b6fa){const _0x583df6=_0x306dc8;_0x45b6fa=String(_0x45b6fa);if(_0x45b6fa['match'](/#(.*)/i)){if(_0x583df6(0x487)!=='VzsVc')return _0x583df6(0x466)[_0x583df6(0x505)](String(RegExp['$1']));else{if(_0x1634b4[_0x583df6(0x432)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x583df6(0x245)]();}}else return this[_0x583df6(0x2df)](Number(_0x45b6fa));},ColorManager[_0x306dc8(0x4e0)]=function(_0x4ca741){const _0x2cce92=_0x306dc8;if(typeof _0x4ca741==='number')_0x4ca741=$dataStates[_0x4ca741];const _0x450def=_0x2cce92(0x435)['format'](_0x4ca741['id']);this[_0x2cce92(0x354)]=this['_colorCache']||{};if(this[_0x2cce92(0x354)][_0x450def])return this['_colorCache'][_0x450def];const _0x445790=this['retrieveStateColor'](_0x4ca741);return this[_0x2cce92(0x405)](_0x450def,_0x445790);},ColorManager[_0x306dc8(0x490)]=function(_0x41f7d5){const _0x538b63=_0x306dc8,_0x4864c4=_0x41f7d5[_0x538b63(0x324)];if(_0x4864c4[_0x538b63(0x3bd)](/<TURN COLOR:[ ](.*)>/i)){if(_0x538b63(0x2f7)==='vKldr')return String(RegExp['$1']);else{if(!_0x3d3b0a[_0x538b63(0x2c9)](_0x3a8799))return![];}}else{if(_0x4864c4[_0x538b63(0x3bd)](/<POSITIVE STATE>/i))return VisuMZ[_0x538b63(0x39c)]['Settings'][_0x538b63(0x3d1)]['ColorPositive'];else{if(_0x4864c4[_0x538b63(0x3bd)](/<NEGATIVE STATE>/i)){if(_0x538b63(0x418)!==_0x538b63(0x495))return VisuMZ[_0x538b63(0x39c)][_0x538b63(0x346)][_0x538b63(0x3d1)][_0x538b63(0x4f1)];else for(const _0x1573fd of _0x445310[_0x538b63(0x390)]()){if(_0x1573fd)_0x1573fd[_0x538b63(0x417)]();}}else return VisuMZ[_0x538b63(0x39c)][_0x538b63(0x346)][_0x538b63(0x3d1)]['ColorNeutral'];}}},ColorManager['buffColor']=function(){const _0x1ced33=_0x306dc8,_0x332735=_0x1ced33(0x33c);this[_0x1ced33(0x354)]=this[_0x1ced33(0x354)]||{};if(this[_0x1ced33(0x354)][_0x332735])return this[_0x1ced33(0x354)][_0x332735];const _0x1e07f9=VisuMZ[_0x1ced33(0x39c)][_0x1ced33(0x346)][_0x1ced33(0x310)][_0x1ced33(0x24f)];return this[_0x1ced33(0x405)](_0x332735,_0x1e07f9);},ColorManager['debuffColor']=function(){const _0xb456bf=_0x306dc8,_0x2fd12c='_stored_debuffColor';this[_0xb456bf(0x354)]=this['_colorCache']||{};if(this[_0xb456bf(0x354)][_0x2fd12c])return this['_colorCache'][_0x2fd12c];const _0x48b56e=VisuMZ[_0xb456bf(0x39c)][_0xb456bf(0x346)]['Buffs'][_0xb456bf(0x3ce)];return this[_0xb456bf(0x405)](_0x2fd12c,_0x48b56e);},SceneManager[_0x306dc8(0x29e)]=function(){const _0x47047c=_0x306dc8;return this[_0x47047c(0x47b)]&&this['_scene'][_0x47047c(0x2c2)]===Scene_Battle;},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x2b3)]=BattleManager[_0x306dc8(0x27e)],BattleManager[_0x306dc8(0x27e)]=function(){const _0x2d871b=_0x306dc8;this[_0x2d871b(0x3a3)](),VisuMZ[_0x2d871b(0x39c)][_0x2d871b(0x2b3)][_0x2d871b(0x227)](this);},BattleManager[_0x306dc8(0x3a3)]=function(){const _0x487fdc=_0x306dc8,_0x3ed20d=VisuMZ['SkillsStatesCore']['Settings']['States'];if(!_0x3ed20d)return;if(_0x3ed20d['ActionEndUpdate']===![])return;if(!this[_0x487fdc(0x368)])return;this['_subject']['updateStatesActionEnd']();},Game_Battler['prototype']['updateStatesActionEnd']=function(){const _0x501262=_0x306dc8;if(BattleManager[_0x501262(0x288)]!=='action')return;if(this[_0x501262(0x4e2)]===Graphics[_0x501262(0x32a)])return;this[_0x501262(0x4e2)]=Graphics[_0x501262(0x32a)];for(const _0x2524a1 of this[_0x501262(0x200)]){const _0x727bfb=$dataStates[_0x2524a1];if(!_0x727bfb)continue;if(_0x727bfb[_0x501262(0x454)]!==0x1)continue;if(this['_stateTurns'][_0x2524a1]>0x0){if(_0x501262(0x389)===_0x501262(0x2cc)){if(!this[_0x501262(0x208)](_0x356693))return![];return!![];}else this[_0x501262(0x215)][_0x2524a1]--;}}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x306dc8(0x2d9)]['updateStateTurns']=function(){const _0xc6d6e2=_0x306dc8,_0x1f7a6d=VisuMZ['SkillsStatesCore']['Settings'][_0xc6d6e2(0x3d1)];for(const _0x1c7459 of this[_0xc6d6e2(0x200)]){if(_0xc6d6e2(0x1f5)===_0xc6d6e2(0x2c4))this[_0xc6d6e2(0x2ef)](_0xe3ee7f);else{const _0x53b8ed=$dataStates[_0x1c7459];if(_0x1f7a6d&&_0x1f7a6d[_0xc6d6e2(0x4b2)]!==![]){if(_0x53b8ed&&_0x53b8ed['autoRemovalTiming']===0x1)continue;}this[_0xc6d6e2(0x215)][_0x1c7459]>0x0&&(_0xc6d6e2(0x28f)!==_0xc6d6e2(0x241)?this[_0xc6d6e2(0x215)][_0x1c7459]--:this[_0xc6d6e2(0x3da)](_0x532873,_0x2ffd81,_0x9f7bd7,_0x5c61da));}}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x504)]=Game_Switches[_0x306dc8(0x2d9)][_0x306dc8(0x467)],Game_Switches[_0x306dc8(0x2d9)][_0x306dc8(0x467)]=function(){const _0x4db84a=_0x306dc8;VisuMZ[_0x4db84a(0x39c)]['Game_Switches_onChange'][_0x4db84a(0x227)](this);const _0x52572e=VisuMZ[_0x4db84a(0x39c)]['Settings'][_0x4db84a(0x2b1)]['RefreshCacheSwitch']??!![];if(!_0x52572e)return;if(SceneManager[_0x4db84a(0x29e)]())for(const _0x2b9ce6 of BattleManager[_0x4db84a(0x390)]()){if(_0x2b9ce6)_0x2b9ce6['refresh']();}},VisuMZ['SkillsStatesCore'][_0x306dc8(0x4cc)]=Game_Variables[_0x306dc8(0x2d9)]['onChange'],Game_Variables[_0x306dc8(0x2d9)][_0x306dc8(0x467)]=function(){const _0x399bc6=_0x306dc8;VisuMZ[_0x399bc6(0x39c)][_0x399bc6(0x4cc)][_0x399bc6(0x227)](this);const _0x5f2efb=VisuMZ[_0x399bc6(0x39c)][_0x399bc6(0x346)]['PassiveStates'][_0x399bc6(0x2b2)]??!![];if(!_0x5f2efb)return;if(SceneManager[_0x399bc6(0x29e)]())for(const _0x42b90f of BattleManager[_0x399bc6(0x390)]()){if(_0x42b90f)_0x42b90f['refresh']();}},VisuMZ[_0x306dc8(0x39c)]['Game_Action_applyItemUserEffect']=Game_Action[_0x306dc8(0x2d9)][_0x306dc8(0x21a)],Game_Action['prototype'][_0x306dc8(0x21a)]=function(_0x194769){const _0x384ae3=_0x306dc8;VisuMZ[_0x384ae3(0x39c)][_0x384ae3(0x318)]['call'](this,_0x194769),this['applySkillsStatesCoreEffects'](_0x194769);},Game_Action['prototype'][_0x306dc8(0x365)]=function(_0x35ac4c){const _0x103283=_0x306dc8;this[_0x103283(0x48a)](_0x35ac4c),this['applyStateTurnManipulationEffects'](_0x35ac4c),this[_0x103283(0x40c)](_0x35ac4c),this[_0x103283(0x424)](_0x35ac4c);},VisuMZ['SkillsStatesCore'][_0x306dc8(0x4b7)]=Game_Action[_0x306dc8(0x2d9)][_0x306dc8(0x30a)],Game_Action[_0x306dc8(0x2d9)][_0x306dc8(0x30a)]=function(_0x4f10dd){const _0x270139=_0x306dc8;if(this[_0x270139(0x26d)](_0x4f10dd))return!![];return VisuMZ[_0x270139(0x39c)][_0x270139(0x4b7)][_0x270139(0x227)](this,_0x4f10dd);},Game_Action[_0x306dc8(0x2d9)][_0x306dc8(0x26d)]=function(_0x3fcfc5){const _0x4ebcd8=_0x306dc8;if(!this[_0x4ebcd8(0x232)]())return;const _0x386fe7=this[_0x4ebcd8(0x232)]()[_0x4ebcd8(0x324)];if(_0x386fe7[_0x4ebcd8(0x3bd)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x48fac9=String(RegExp['$1']);if(_0x3fcfc5[_0x4ebcd8(0x49a)](_0x48fac9))return!![];}if(_0x386fe7[_0x4ebcd8(0x3bd)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x4d7127=Number(RegExp['$1']);if(_0x3fcfc5[_0x4ebcd8(0x317)](_0x4d7127))return!![];}else{if(_0x386fe7[_0x4ebcd8(0x3bd)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x4ebcd8(0x280)===_0x4ebcd8(0x374))return _0xe573b7[_0x3f9b7b['id']][_0x4ebcd8(0x227)](this,_0x345a56);else{const _0x3deca9=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x3fcfc5['isStateAffected'](_0x3deca9))return!![];}}}return![];},Game_Action[_0x306dc8(0x2d9)][_0x306dc8(0x48a)]=function(_0x39a92f){const _0x2e9691=_0x306dc8;if(_0x39a92f['states']()[_0x2e9691(0x4aa)]<=0x0)return;const _0x1a76e0=this[_0x2e9691(0x232)]()[_0x2e9691(0x324)];{if('NmWaI'===_0x2e9691(0x24b)){const _0x434f77=_0x1a76e0[_0x2e9691(0x3bd)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x434f77)for(const _0x1ceb19 of _0x434f77){if('AFzAc'==='rzmXJ')_0x1fca9c=_0x5b8bfc['concat'](_0x369a98[_0x2e9691(0x2e9)]);else{_0x1ceb19['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x58f599=String(RegExp['$1']);_0x39a92f[_0x2e9691(0x4a4)](_0x58f599);}}}else return![];}{if(_0x2e9691(0x265)===_0x2e9691(0x226)){const _0x2a2af9=_0x1dbe82(_0x1e25ad['$1']),_0x3a6079=_0x2ebdad[_0x2e9691(0x505)](_0x2a2af9,_0x2e9691(0x1e7),0x1,_0x2e9691(0x47d));_0x542fc7[_0x2e9691(0x39c)][_0x2e9691(0x4c0)][_0x36fefa['id']]=new _0x16a92e(_0x2e9691(0x3d6),_0x3a6079);}else{const _0x93b184=_0x1a76e0[_0x2e9691(0x3bd)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x93b184){if(_0x2e9691(0x509)!=='rufyU')this[_0x2e9691(0x1d9)](_0x2445ee);else for(const _0x461d4a of _0x93b184){if(_0x2e9691(0x470)===_0x2e9691(0x470)){_0x461d4a[_0x2e9691(0x3bd)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4366fb=String(RegExp['$1']),_0x30662e=Number(RegExp['$2']);_0x39a92f[_0x2e9691(0x3aa)](_0x4366fb,_0x30662e);}else{const _0x5716bb=_0x2cc845[_0x2e9691(0x324)],_0x5549f0=_0x1e2bf9[_0x2e9691(0x39c)][_0x2e9691(0x3b6)];return _0x5549f0[_0x317446['id']]?_0x5549f0[_0x8788d3['id']]['call'](this,_0x5898d7):!![];}}}}}},Game_Action[_0x306dc8(0x2d9)]['applyStateTurnManipulationEffects']=function(_0x3b29a3){const _0x524f62=_0x306dc8,_0x588d23=this['item']()[_0x524f62(0x324)],_0x62177e=_0x588d23[_0x524f62(0x3bd)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x62177e)for(const _0x21ccbb of _0x62177e){let _0x1c9924=0x0,_0x439f2f=0x0;if(_0x21ccbb[_0x524f62(0x3bd)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x1c9924=Number(RegExp['$1']),_0x439f2f=Number(RegExp['$2']);else _0x21ccbb[_0x524f62(0x3bd)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x1c9924=DataManager['getStateIdWithName'](RegExp['$1']),_0x439f2f=Number(RegExp['$2']));_0x3b29a3[_0x524f62(0x46a)](_0x1c9924,_0x439f2f),this[_0x524f62(0x1d6)](_0x3b29a3);}const _0x33dcdb=_0x588d23[_0x524f62(0x3bd)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x33dcdb){if(_0x524f62(0x2bc)===_0x524f62(0x2bc))for(const _0x44bac8 of _0x33dcdb){let _0xfda3bf=0x0,_0x1ea4ff=0x0;if(_0x44bac8[_0x524f62(0x3bd)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x524f62(0x3e2)===_0x524f62(0x39f)){_0x25daa5[_0x524f62(0x39c)][_0x524f62(0x415)][_0x524f62(0x227)](this,_0x5f0028);if(!this[_0x524f62(0x4ab)](_0x521ee5))this[_0x524f62(0x448)](_0x3b3cf2);}else _0xfda3bf=Number(RegExp['$1']),_0x1ea4ff=Number(RegExp['$2']);}else{if(_0x44bac8['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if('kqTSu'!==_0x524f62(0x1fe))_0xfda3bf=DataManager[_0x524f62(0x388)](RegExp['$1']),_0x1ea4ff=Number(RegExp['$2']);else{let _0xf2cbfc=_0x51100b[_0x524f62(0x3a2)][_0x524f62(0x227)](this,_0x160270);_0xf2cbfc=this[_0x524f62(0x29f)](_0x5e6a63,_0xf2cbfc,_0x7dceaf),_0x380635[_0x524f62(0x298)][_0x524f62(0x227)](this,_0x516357,_0xf2cbfc);}}}_0x3b29a3[_0x524f62(0x3dd)](_0xfda3bf,_0x1ea4ff),this[_0x524f62(0x1d6)](_0x3b29a3);}else{if(!_0x50845a[_0x524f62(0x4dc)](_0x546afc))return![];}}},Game_Action[_0x306dc8(0x2d9)][_0x306dc8(0x40c)]=function(_0x30bc7a){const _0x44eec7=_0x306dc8,_0x56ea59=['MAXHP','MAXMP',_0x44eec7(0x43e),_0x44eec7(0x47a),_0x44eec7(0x31c),_0x44eec7(0x2e0),'AGI',_0x44eec7(0x4af)],_0x2bfe5d=this[_0x44eec7(0x232)]()[_0x44eec7(0x324)],_0x54e2c7=_0x2bfe5d[_0x44eec7(0x3bd)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x54e2c7){if('TixCI'!==_0x44eec7(0x404))for(const _0x279a68 of _0x54e2c7){if('MLpGr'!==_0x44eec7(0x36a))return _0x122cf3['SkillsStatesCore'][_0x44eec7(0x346)][_0x44eec7(0x3d1)][_0x44eec7(0x4f1)];else{_0x279a68['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3332d3=_0x56ea59['indexOf'](String(RegExp['$1'])[_0x44eec7(0x2a3)]()),_0x4d07b1=Number(RegExp['$2']);if(_0x3332d3>=0x0){if(_0x44eec7(0x1e4)!==_0x44eec7(0x1fc))_0x30bc7a[_0x44eec7(0x2a6)](_0x3332d3,_0x4d07b1),this[_0x44eec7(0x1d6)](_0x30bc7a);else{const _0x1ce0bf=_0x1190e1[_0x44eec7(0x49e)]('['+_0x5a6687['$1'][_0x44eec7(0x3bd)](/\d+/g)+']');for(const _0x24cf5c of _0x1ce0bf){if(!_0x48c02c['hasSkill'](_0x24cf5c))return![];}return!![];}}}}else{const _0x304ee3=_0x1a37eb[_0x44eec7(0x49e)]('['+_0x4a6976['$1'][_0x44eec7(0x3bd)](/\d+/g)+']');for(const _0xa1218f of _0x304ee3){if(!_0x90137['value'](_0xa1218f))return!![];}return![];}}const _0x1d31e3=_0x2bfe5d[_0x44eec7(0x3bd)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1d31e3)for(const _0x53a74d of _0x54e2c7){_0x53a74d[_0x44eec7(0x3bd)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x159fe1=_0x56ea59[_0x44eec7(0x3b2)](String(RegExp['$1'])['toUpperCase']()),_0x490b08=Number(RegExp['$2']);_0x159fe1>=0x0&&(_0x44eec7(0x4bf)!=='XXtVX'?_0x3ced67['categories'][_0x44eec7(0x3ec)]('POSITIVE'):(_0x30bc7a[_0x44eec7(0x3e3)](_0x159fe1,_0x490b08),this['makeSuccess'](_0x30bc7a)));}},Game_Action[_0x306dc8(0x2d9)][_0x306dc8(0x424)]=function(_0x4a3f9b){const _0x53fef9=_0x306dc8,_0x38d9aa=[_0x53fef9(0x32d),'MAXMP','ATK',_0x53fef9(0x47a),_0x53fef9(0x31c),'MDF',_0x53fef9(0x421),_0x53fef9(0x4af)],_0x74705a=this[_0x53fef9(0x232)]()['note'],_0x586707=_0x74705a['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x586707){if(_0x53fef9(0x35e)!==_0x53fef9(0x35e)){let _0x27066b=[this['actor'](),this[_0x53fef9(0x2ea)]()];_0x27066b=_0x27066b[_0x53fef9(0x337)](this[_0x53fef9(0x2a4)]()[_0x53fef9(0x3f5)](_0x386491=>_0x386491));for(const _0x52f3d1 of this[_0x53fef9(0x1e2)]){const _0x4c6d3d=_0x41ec82[_0x52f3d1];if(_0x4c6d3d)_0x27066b['push'](_0x4c6d3d);}return _0x27066b;}else for(const _0x55440d of _0x586707){_0x55440d['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x123a89=_0x38d9aa[_0x53fef9(0x3b2)](String(RegExp['$1'])[_0x53fef9(0x2a3)]()),_0xe9310c=Number(RegExp['$2']);if(_0x123a89>=0x0){if(_0x53fef9(0x24a)!==_0x53fef9(0x24a)){const _0x5a5ed6=this[_0x53fef9(0x300)],_0x52d6c1=_0x339dfa['windowPadding'](),_0x2178fa=_0xf285a['x']+_0x487b04[_0x53fef9(0x224)](_0x59fa50[_0x53fef9(0x443)]/0x2)+_0x52d6c1;_0x5a5ed6['x']=_0x5a5ed6[_0x53fef9(0x443)]/-0x2+_0x2178fa,_0x5a5ed6['y']=_0x211893[_0x53fef9(0x224)](_0x26a9d7['height']/0x2);}else _0x4a3f9b[_0x53fef9(0x45d)](_0x123a89,_0xe9310c),this[_0x53fef9(0x1d6)](_0x4a3f9b);}}}const _0x7aee9a=_0x74705a['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x7aee9a){if(_0x53fef9(0x461)===_0x53fef9(0x4cd))this[_0x53fef9(0x235)](_0x1b5484),this['onEraseStateGlobalJS'](_0x2749f7),_0x37181e[_0x53fef9(0x2d9)]['onRemoveState'][_0x53fef9(0x227)](this,_0x5be4dd);else for(const _0x309c4c of _0x586707){_0x309c4c[_0x53fef9(0x3bd)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x234672=_0x38d9aa[_0x53fef9(0x3b2)](String(RegExp['$1'])['toUpperCase']()),_0x527ef5=Number(RegExp['$2']);_0x234672>=0x0&&(_0x4a3f9b['addDebuffTurns'](_0x234672,_0x527ef5),this[_0x53fef9(0x1d6)](_0x4a3f9b));}}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x233)]=Game_BattlerBase['prototype']['initMembers'],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x483)]=function(){const _0x189d8a=_0x306dc8;this[_0x189d8a(0x358)]={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x189d8a(0x39c)]['Game_BattlerBase_initMembers'][_0x189d8a(0x227)](this);},Game_BattlerBase['prototype'][_0x306dc8(0x43c)]=function(){const _0xceba91=_0x306dc8;this[_0xceba91(0x2eb)]='',this[_0xceba91(0x335)]={},this[_0xceba91(0x3c7)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x330)]=function(_0x1af94c){const _0x41133b=_0x306dc8;return this[_0x41133b(0x358)]=this['_cache']||{},this[_0x41133b(0x358)][_0x1af94c]!==undefined;},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x209)]=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x417)],Game_BattlerBase['prototype'][_0x306dc8(0x417)]=function(){const _0x37f34f=_0x306dc8;this[_0x37f34f(0x358)]={},VisuMZ[_0x37f34f(0x39c)]['Game_BattlerBase_refresh'][_0x37f34f(0x227)](this);},VisuMZ['SkillsStatesCore'][_0x306dc8(0x28d)]=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x221)],Game_BattlerBase[_0x306dc8(0x2d9)]['eraseState']=function(_0x20b839){const _0x29b1d2=_0x306dc8;let _0x5333fd=this[_0x29b1d2(0x317)](_0x20b839);VisuMZ[_0x29b1d2(0x39c)][_0x29b1d2(0x28d)][_0x29b1d2(0x227)](this,_0x20b839);if(_0x5333fd&&!this[_0x29b1d2(0x317)](_0x20b839))this['onRemoveState'](_0x20b839);},Game_BattlerBase[_0x306dc8(0x2d9)]['onRemoveState']=function(_0x38e6eb){const _0x5d1add=_0x306dc8;this[_0x5d1add(0x4d7)](_0x38e6eb),this[_0x5d1add(0x373)](_0x38e6eb),this['clearStateOrigin'](_0x38e6eb);},VisuMZ[_0x306dc8(0x39c)]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase['prototype'][_0x306dc8(0x463)],Game_BattlerBase[_0x306dc8(0x2d9)]['resetStateCounts']=function(_0x42e32d){const _0x5af779=_0x306dc8,_0x3f8d05=$dataStates[_0x42e32d],_0x29bc20=this[_0x5af779(0x413)](_0x42e32d),_0x382f8c=this[_0x5af779(0x2c6)](_0x3f8d05)[_0x5af779(0x1ff)]()['trim']();switch(_0x382f8c){case _0x5af779(0x1cc):if(_0x29bc20<=0x0)VisuMZ[_0x5af779(0x39c)][_0x5af779(0x450)][_0x5af779(0x227)](this,_0x42e32d);break;case _0x5af779(0x393):VisuMZ[_0x5af779(0x39c)]['Game_BattlerBase_resetStateCounts'][_0x5af779(0x227)](this,_0x42e32d);break;case _0x5af779(0x502):VisuMZ[_0x5af779(0x39c)][_0x5af779(0x450)][_0x5af779(0x227)](this,_0x42e32d),this[_0x5af779(0x215)][_0x42e32d]=Math[_0x5af779(0x1d3)](this['_stateTurns'][_0x42e32d],_0x29bc20);break;case'add':VisuMZ[_0x5af779(0x39c)]['Game_BattlerBase_resetStateCounts'][_0x5af779(0x227)](this,_0x42e32d),this[_0x5af779(0x215)][_0x42e32d]+=_0x29bc20;break;default:VisuMZ[_0x5af779(0x39c)][_0x5af779(0x450)][_0x5af779(0x227)](this,_0x42e32d);break;}},Game_BattlerBase['prototype'][_0x306dc8(0x2c6)]=function(_0x2f6cfb){const _0x5561d2=_0x306dc8,_0x159bf8=_0x2f6cfb[_0x5561d2(0x324)];return _0x159bf8[_0x5561d2(0x3bd)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore'][_0x5561d2(0x346)][_0x5561d2(0x3d1)]['ReapplyRules'];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase['prototype'][_0x306dc8(0x225)],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x225)]=function(_0x4e99b1,_0x15d686){const _0x881177=_0x306dc8,_0x5b4515=VisuMZ['SkillsStatesCore'][_0x881177(0x346)][_0x881177(0x310)][_0x881177(0x271)],_0x5346df=this[_0x881177(0x4f6)](_0x4e99b1);switch(_0x5b4515){case'ignore':if(_0x5346df<=0x0)this[_0x881177(0x1ef)][_0x4e99b1]=_0x15d686;break;case _0x881177(0x393):this[_0x881177(0x1ef)][_0x4e99b1]=_0x15d686;break;case _0x881177(0x502):this[_0x881177(0x1ef)][_0x4e99b1]=Math['max'](_0x5346df,_0x15d686);break;case _0x881177(0x26a):this[_0x881177(0x1ef)][_0x4e99b1]+=_0x15d686;break;default:VisuMZ[_0x881177(0x39c)][_0x881177(0x23a)][_0x881177(0x227)](this,_0x4e99b1,_0x15d686);break;}const _0x4e2a4b=VisuMZ[_0x881177(0x39c)][_0x881177(0x346)][_0x881177(0x310)][_0x881177(0x20c)];this[_0x881177(0x1ef)][_0x4e99b1]=this[_0x881177(0x1ef)][_0x4e99b1][_0x881177(0x2a8)](0x0,_0x4e2a4b);},Game_BattlerBase['prototype'][_0x306dc8(0x1d5)]=function(){const _0x4dad4e=_0x306dc8;if(this[_0x4dad4e(0x358)][_0x4dad4e(0x31d)]!==undefined)return this[_0x4dad4e(0x358)][_0x4dad4e(0x31d)];this[_0x4dad4e(0x358)]['groupDefeat']=![];const _0x46d116=this[_0x4dad4e(0x4e8)]();for(const _0x5a0e74 of _0x46d116){if(!_0x5a0e74)continue;if(_0x5a0e74[_0x4dad4e(0x324)]['match'](/<GROUP DEFEAT>/i)){if(_0x4dad4e(0x1f8)===_0x4dad4e(0x397)){let _0x5a52b7=this[_0x4dad4e(0x317)](_0x1c7938);_0x5b2028[_0x4dad4e(0x39c)][_0x4dad4e(0x28d)]['call'](this,_0x5a00da);if(_0x5a52b7&&!this[_0x4dad4e(0x317)](_0x44fc1b))this[_0x4dad4e(0x1cb)](_0x1da5ea);}else{this['_cache']['groupDefeat']=!![];break;}}}return this[_0x4dad4e(0x358)]['groupDefeat'];},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x2f5)]=Game_Unit['prototype'][_0x306dc8(0x27b)],Game_Unit[_0x306dc8(0x2d9)][_0x306dc8(0x27b)]=function(){const _0x14cf94=_0x306dc8;let _0x19f29a=VisuMZ['SkillsStatesCore'][_0x14cf94(0x2f5)][_0x14cf94(0x227)](this);return BattleManager[_0x14cf94(0x4ae)]&&(_0x19f29a=_0x19f29a[_0x14cf94(0x337)](this[_0x14cf94(0x1f2)]()['filter'](_0x35eaa9=>_0x35eaa9[_0x14cf94(0x1d5)]()))),_0x19f29a;},VisuMZ[_0x306dc8(0x39c)]['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3c0)],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3c0)]=function(){const _0x4b7b49=_0x306dc8;this[_0x4b7b49(0x2d6)]()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0x4b7b49(0x39c)][_0x4b7b49(0x325)][_0x4b7b49(0x227)](this),this[_0x4b7b49(0x43c)]());},Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x3c0)]=function(){const _0x469fd7=_0x306dc8;this[_0x469fd7(0x382)]=this[_0x469fd7(0x382)]||{},Game_Battler[_0x469fd7(0x2d9)][_0x469fd7(0x3c0)][_0x469fd7(0x227)](this);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x203)]=function(){const _0x5bdbf1=_0x306dc8,_0x56760e=this[_0x5bdbf1(0x4e8)]();for(const _0x2dd643 of _0x56760e){if(_0x2dd643&&this[_0x5bdbf1(0x3ea)](_0x2dd643))this[_0x5bdbf1(0x221)](_0x2dd643['id']);}this[_0x5bdbf1(0x358)]={};},Game_BattlerBase['prototype'][_0x306dc8(0x3ea)]=function(_0x373376){const _0x436e65=_0x306dc8,_0x3a5e8a=this[_0x436e65(0x2d6)]();if(_0x3a5e8a!==''){const _0x2bada2=_0x373376[_0x436e65(0x324)];if(_0x3a5e8a===_0x436e65(0x3df)&&_0x2bada2[_0x436e65(0x3bd)](/<NO DEATH CLEAR>/i))return![];if(_0x3a5e8a==='recover\x20all'&&_0x2bada2[_0x436e65(0x3bd)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x436e65(0x317)](_0x373376['id']);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x2d6)]=function(){const _0xae40f0=_0x306dc8;return this[_0xae40f0(0x2eb)];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3d3)]=function(_0x2d8f83){const _0x15ff01=_0x306dc8;this[_0x15ff01(0x2eb)]=_0x2d8f83;},Game_BattlerBase[_0x306dc8(0x2d9)]['clearStateRetainType']=function(){const _0x41d9b2=_0x306dc8;this[_0x41d9b2(0x2eb)]='';},VisuMZ[_0x306dc8(0x39c)]['Game_BattlerBase_die']=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x312)],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x312)]=function(){const _0x279fe5=_0x306dc8;this[_0x279fe5(0x3d3)](_0x279fe5(0x3df)),VisuMZ['SkillsStatesCore']['Game_BattlerBase_die'][_0x279fe5(0x227)](this),this[_0x279fe5(0x30e)]();},VisuMZ[_0x306dc8(0x39c)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x326)],Game_BattlerBase['prototype'][_0x306dc8(0x326)]=function(){const _0x4655fb=_0x306dc8;this[_0x4655fb(0x3d3)](_0x4655fb(0x486)),VisuMZ[_0x4655fb(0x39c)][_0x4655fb(0x46f)][_0x4655fb(0x227)](this),this['clearStateRetainType']();},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x29f)]=function(_0x3910e4,_0x155cf9,_0x167458){return _0x155cf9;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x333)]=function(_0x1b7156){const _0x5552dd=_0x306dc8;for(settings of VisuMZ[_0x5552dd(0x39c)]['Settings'][_0x5552dd(0x348)]){let _0x4d929a=settings['CalcJS'][_0x5552dd(0x227)](this,_0x1b7156);_0x4d929a=this[_0x5552dd(0x29f)](_0x1b7156,_0x4d929a,settings);if(!settings[_0x5552dd(0x275)][_0x5552dd(0x227)](this,_0x1b7156,_0x4d929a))return![];}return!![];},Game_BattlerBase[_0x306dc8(0x2d9)]['paySkillCost']=function(_0x59880b){const _0x25d7b6=_0x306dc8;for(settings of VisuMZ[_0x25d7b6(0x39c)][_0x25d7b6(0x346)][_0x25d7b6(0x348)]){if(_0x25d7b6(0x3fe)==='YWcpz')_0x86be88['SkillsStatesCore'][_0x25d7b6(0x346)][_0x25d7b6(0x3d1)][_0x25d7b6(0x387)][_0x25d7b6(0x227)](this,_0x1e1379);else{let _0x59a8f8=settings[_0x25d7b6(0x3a2)][_0x25d7b6(0x227)](this,_0x59880b);_0x59a8f8=this[_0x25d7b6(0x29f)](_0x59880b,_0x59a8f8,settings),settings[_0x25d7b6(0x298)][_0x25d7b6(0x227)](this,_0x59880b,_0x59a8f8);}}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x30f)]=Game_BattlerBase['prototype'][_0x306dc8(0x2c5)],Game_BattlerBase[_0x306dc8(0x2d9)]['meetsSkillConditions']=function(_0x374984){const _0x5389ef=_0x306dc8;if(!_0x374984)return![];if(!VisuMZ[_0x5389ef(0x39c)][_0x5389ef(0x30f)][_0x5389ef(0x227)](this,_0x374984))return![];if(!this[_0x5389ef(0x369)](_0x374984))return![];if(!this['meetsSkillConditionsEnableJS'](_0x374984))return![];if(!this[_0x5389ef(0x3a7)](_0x374984))return![];return!![];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x369)]=function(_0x243ac6){if(!this['checkSkillConditionsSwitchNotetags'](_0x243ac6))return![];return!![];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x208)]=function(_0x3dbb50){const _0x39e5fe=_0x306dc8,_0x40c470=_0x3dbb50[_0x39e5fe(0x324)];if(_0x40c470[_0x39e5fe(0x3bd)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2edcf2=JSON[_0x39e5fe(0x49e)]('['+RegExp['$1'][_0x39e5fe(0x3bd)](/\d+/g)+']');for(const _0x529b4f of _0x2edcf2){if(!$gameSwitches[_0x39e5fe(0x4dc)](_0x529b4f))return![];}return!![];}if(_0x40c470[_0x39e5fe(0x3bd)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43726d=JSON[_0x39e5fe(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3b16f9 of _0x43726d){if('yOJQe'===_0x39e5fe(0x291)){if(!$gameSwitches[_0x39e5fe(0x4dc)](_0x3b16f9))return![];}else{const _0x4b7795=_0x3355c6(_0x56315a['$1']);if(_0x1f9174[_0x39e5fe(0x49a)](_0x4b7795))return!![];}}return!![];}if(_0x40c470['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x85b75f=JSON[_0x39e5fe(0x49e)]('['+RegExp['$1'][_0x39e5fe(0x3bd)](/\d+/g)+']');for(const _0x167a1e of _0x85b75f){if($gameSwitches['value'](_0x167a1e))return!![];}return![];}if(_0x40c470[_0x39e5fe(0x3bd)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xaa2887=JSON[_0x39e5fe(0x49e)]('['+RegExp['$1'][_0x39e5fe(0x3bd)](/\d+/g)+']');for(const _0x5818a5 of _0xaa2887){if(!$gameSwitches[_0x39e5fe(0x4dc)](_0x5818a5))return!![];}return![];}if(_0x40c470[_0x39e5fe(0x3bd)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x621233=JSON['parse']('['+RegExp['$1'][_0x39e5fe(0x3bd)](/\d+/g)+']');for(const _0x15bb63 of _0x621233){if(_0x39e5fe(0x25e)==='PPRcH')_0x416655['autoRemovalTiming']=0x2;else{if(!$gameSwitches[_0x39e5fe(0x4dc)](_0x15bb63))return!![];}}return![];}if(_0x40c470[_0x39e5fe(0x3bd)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x39e5fe(0x2c1)!==_0x39e5fe(0x2c1)){const _0x35e5ba=_0x57555c(_0x20d517['$1']),_0x27a4ec=_0x2a63db[_0x39e5fe(0x505)](_0x35e5ba);_0x411336[_0x39e5fe(0x39c)]['stateAddJS'][_0x314a9a['id']]=new _0xbc724d(_0x39e5fe(0x3d6),_0x27a4ec);}else{const _0x1e080a=JSON[_0x39e5fe(0x49e)]('['+RegExp['$1'][_0x39e5fe(0x3bd)](/\d+/g)+']');for(const _0x2432d4 of _0x1e080a){if(_0x39e5fe(0x378)!=='yZNEm'){if($gameSwitches[_0x39e5fe(0x4dc)](_0x2432d4))return![];}else{const _0x37524e=_0x2619c2['SkillsStatesCore'][_0x39e5fe(0x346)]['States'];if(!_0x37524e)return;if(_0x37524e[_0x39e5fe(0x4b2)]===![])return;if(!this[_0x39e5fe(0x368)])return;this['_subject'][_0x39e5fe(0x3a3)]();}}return!![];}}return!![];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x4fc)]=function(_0x20fb4d){const _0x5b5f58=_0x306dc8,_0x5ae4b3=_0x20fb4d[_0x5b5f58(0x324)],_0x37474e=VisuMZ[_0x5b5f58(0x39c)][_0x5b5f58(0x3db)];return _0x37474e[_0x20fb4d['id']]?_0x37474e[_0x20fb4d['id']][_0x5b5f58(0x227)](this,_0x20fb4d):!![];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3a7)]=function(_0x1c82d6){const _0x2e9f50=_0x306dc8;return VisuMZ[_0x2e9f50(0x39c)]['Settings'][_0x2e9f50(0x228)]['SkillConditionJS'][_0x2e9f50(0x227)](this,_0x1c82d6);},VisuMZ[_0x306dc8(0x39c)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3d7)],Game_BattlerBase[_0x306dc8(0x2d9)]['skillMpCost']=function(_0x35374a){const _0x5d1860=_0x306dc8;for(settings of VisuMZ[_0x5d1860(0x39c)][_0x5d1860(0x346)][_0x5d1860(0x348)]){if(settings[_0x5d1860(0x297)][_0x5d1860(0x2a3)]()==='MP'){let _0x3d2f0f=settings[_0x5d1860(0x3a2)][_0x5d1860(0x227)](this,_0x35374a);return _0x3d2f0f=this[_0x5d1860(0x29f)](_0x35374a,_0x3d2f0f,settings),_0x3d2f0f;}}return VisuMZ[_0x5d1860(0x39c)][_0x5d1860(0x305)]['call'](this,_0x35374a);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x23e)]=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x205)],Game_BattlerBase['prototype'][_0x306dc8(0x205)]=function(_0x539863){const _0x3d743c=_0x306dc8;for(settings of VisuMZ[_0x3d743c(0x39c)][_0x3d743c(0x346)][_0x3d743c(0x348)]){if(_0x3d743c(0x292)==='ytLOA'){const _0x1d7dd6=_0x47468a(_0x3bd53b['$1']),_0x50e4af=_0x135d33[_0x3d743c(0x505)](_0x1d7dd6,'damage',-0x1,_0x3d743c(0x47d));_0x435764[_0x3d743c(0x39c)][_0x3d743c(0x37e)][_0x5425ff['id']]=new _0x259206(_0x3d743c(0x3d6),_0x50e4af);}else{if(settings[_0x3d743c(0x297)][_0x3d743c(0x2a3)]()==='TP'){if(_0x3d743c(0x37a)!=='pCnIn')_0xaba8c4+=this['buffTurns'](_0x1f5d13),this[_0x3d743c(0x45d)](_0x2a00dd,_0x4b7c13);else{let _0x9d3eac=settings[_0x3d743c(0x3a2)][_0x3d743c(0x227)](this,_0x539863);return _0x9d3eac=this['adjustSkillCost'](_0x539863,_0x9d3eac,settings),_0x9d3eac;}}}}return VisuMZ[_0x3d743c(0x39c)][_0x3d743c(0x23e)][_0x3d743c(0x227)](this,_0x539863);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x301)]=function(_0x396e62){const _0x2fd446=_0x306dc8;if(typeof _0x396e62===_0x2fd446(0x1e0))_0x396e62=$dataStates[_0x396e62];return this['states']()[_0x2fd446(0x1fd)](_0x396e62);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x260)]=Game_BattlerBase[_0x306dc8(0x2d9)]['states'],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x4e8)]=function(){const _0x4675dd=_0x306dc8;let _0x4ff430=VisuMZ[_0x4675dd(0x39c)][_0x4675dd(0x260)][_0x4675dd(0x227)](this);if($gameTemp['_checkingPassiveStates'])return _0x4ff430;return $gameTemp['_checkingPassiveStates']=!![],this[_0x4675dd(0x2aa)](_0x4ff430),$gameTemp[_0x4675dd(0x243)]=undefined,_0x4ff430;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x2aa)]=function(_0x1850e0){const _0x280406=_0x306dc8,_0x4c14ca=this[_0x280406(0x2cd)]();for(state of _0x4c14ca){if('CqOPg'!==_0x280406(0x1df))return!![];else{if(!state)continue;if(!this[_0x280406(0x33a)](state)&&_0x1850e0['includes'](state))continue;_0x1850e0[_0x280406(0x3ec)](state);}}if(_0x4c14ca[_0x280406(0x4aa)]>0x0){if(_0x280406(0x42d)!==_0x280406(0x4ca))_0x1850e0['sort']((_0x296ec5,_0x1f7a48)=>{const _0xf0c566=_0x280406,_0x2eb1f7=_0x296ec5[_0xf0c566(0x21f)],_0x293773=_0x1f7a48[_0xf0c566(0x21f)];if(_0x2eb1f7!==_0x293773)return _0x293773-_0x2eb1f7;return _0x296ec5-_0x1f7a48;});else return _0x516aa4['prototype']['statusWidth']();}},Game_BattlerBase[_0x306dc8(0x2d9)]['isPassiveStateStackable']=function(_0x4c312a){const _0x4f90f2=_0x306dc8;return _0x4c312a[_0x4f90f2(0x324)][_0x4f90f2(0x3bd)](/<PASSIVE STACKABLE>/i);},VisuMZ['SkillsStatesCore'][_0x306dc8(0x3af)]=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x1e6)],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x1e6)]=function(_0x2bd35c){const _0x870e21=_0x306dc8;this[_0x870e21(0x37b)]=!![];let _0x5a9e7b=VisuMZ[_0x870e21(0x39c)]['Game_BattlerBase_traitsSet'][_0x870e21(0x227)](this,_0x2bd35c);return this[_0x870e21(0x37b)]=undefined,_0x5a9e7b;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x4c8)]=function(){const _0x580140=_0x306dc8;let _0x476575=[];this[_0x580140(0x2e4)]=this[_0x580140(0x2e4)]||{};for(;;){_0x476575=[];let _0x2cc24b=!![];for(const _0x343f17 of this['_cache'][_0x580140(0x2cd)]){if('vTzOb'!==_0x580140(0x4fa)){const _0x47b6e6=$dataStates[_0x343f17];if(!_0x47b6e6)continue;let _0x2d12aa=this[_0x580140(0x22d)](_0x47b6e6);if(this['_passiveStateResults'][_0x343f17]!==_0x2d12aa){if('qMnZN'!==_0x580140(0x3b1))_0x2cc24b=![],this['_passiveStateResults'][_0x343f17]=_0x2d12aa;else{_0x4e54aa[_0x580140(0x39c)][_0x580140(0x3cc)][_0x580140(0x227)](this,_0x551958);if(!this[_0x580140(0x4ab)](_0x105338))this[_0x580140(0x448)](_0x3a2c70);}}if(!_0x2d12aa)continue;_0x476575[_0x580140(0x3ec)](_0x47b6e6);}else{if(!_0x338185[_0x580140(0x4dc)](_0x4bc0ac))return!![];}}if(_0x2cc24b){if('ksGcD'!==_0x580140(0x2fa))break;else{const _0x360658=_0x5d9c22[_0x580140(0x39c)][_0x580140(0x346)]['Gauge'];return _0x360658['LabelFontMainType']==='number'?_0x366476['numberFontFace']():_0x270dca[_0x580140(0x3bb)]();}}else{if(!this[_0x580140(0x37b)])this[_0x580140(0x417)]();this['createPassiveStatesCache']();}}return _0x476575;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x22d)]=function(_0x3ffe6a){const _0x4fdc4d=_0x306dc8;if(!this[_0x4fdc4d(0x42b)](_0x3ffe6a))return![];if(!this[_0x4fdc4d(0x350)](_0x3ffe6a))return![];if(!this[_0x4fdc4d(0x249)](_0x3ffe6a))return![];if(!this[_0x4fdc4d(0x2e7)](_0x3ffe6a))return![];return!![];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x42b)]=function(_0xe17397){return!![];},Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x42b)]=function(_0x9362a1){const _0x284ac1=_0x306dc8,_0xc27a80=_0x9362a1[_0x284ac1(0x324)];if(_0xc27a80[_0x284ac1(0x3bd)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x2ef2dd=String(RegExp['$1'])[_0x284ac1(0x471)](',')[_0x284ac1(0x4e1)](_0x25bdc4=>_0x25bdc4['trim']()),_0x2d8be5=VisuMZ[_0x284ac1(0x39c)][_0x284ac1(0x2b7)](_0x2ef2dd);return _0x2d8be5[_0x284ac1(0x1fd)](this[_0x284ac1(0x2ea)]());}if(_0xc27a80[_0x284ac1(0x3bd)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x284ac1(0x50b)===_0x284ac1(0x48f))return this['_skillTypeWindow']&&this['_skillTypeWindow'][_0x284ac1(0x3e4)]?_0x3075ca[_0x284ac1(0x2da)]:'';else{const _0x1382fa=String(RegExp['$1'])[_0x284ac1(0x471)](',')[_0x284ac1(0x4e1)](_0x4c383c=>_0x4c383c['trim']()),_0x22c01a=VisuMZ['SkillsStatesCore'][_0x284ac1(0x2b7)](_0x1382fa);let _0x249b5f=[this['currentClass']()];if(Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x284ac1(0x2b0)]){if(_0x284ac1(0x214)===_0x284ac1(0x214))_0x249b5f=this[_0x284ac1(0x2b0)]();else return _0x1e99cb[_0x284ac1(0x39c)][_0x284ac1(0x346)][_0x284ac1(0x228)][_0x284ac1(0x212)];}return _0x22c01a['filter'](_0x20984d=>_0x249b5f[_0x284ac1(0x1fd)](_0x20984d))[_0x284ac1(0x4aa)]>0x0;}}return Game_BattlerBase[_0x284ac1(0x2d9)][_0x284ac1(0x42b)][_0x284ac1(0x227)](this,_0x9362a1);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x2b7)]=function(_0x301b65){const _0x12f8be=_0x306dc8,_0x5cc8e8=[];for(let _0x489dd0 of _0x301b65){_0x489dd0=(String(_0x489dd0)||'')[_0x12f8be(0x29d)]();const _0x32623f=/^\d+$/[_0x12f8be(0x2d7)](_0x489dd0);if(_0x32623f){if('UTUVM'!==_0x12f8be(0x278)){const _0x22e384=_0x3aa232[_0x12f8be(0x49e)]('['+_0x2bf552['$1'][_0x12f8be(0x3bd)](/\d+/g)+']');for(const _0x412da3 of _0x22e384){if(!_0x13f41b['hasSkill'](_0x412da3))return![];}return!![];}else _0x5cc8e8[_0x12f8be(0x3ec)](Number(_0x489dd0));}else _0x5cc8e8[_0x12f8be(0x3ec)](DataManager['getClassIdWithName'](_0x489dd0));}return _0x5cc8e8[_0x12f8be(0x4e1)](_0x3278f1=>$dataClasses[Number(_0x3278f1)])[_0x12f8be(0x3dc)](null);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x350)]=function(_0x48937d){const _0x1c97e7=_0x306dc8,_0x24fb0b=_0x48937d[_0x1c97e7(0x324)];if(_0x24fb0b['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c97e7(0x3f1)!==_0x1c97e7(0x4c5)){const _0xc47de3=JSON[_0x1c97e7(0x49e)]('['+RegExp['$1'][_0x1c97e7(0x3bd)](/\d+/g)+']');for(const _0x553700 of _0xc47de3){if(!$gameSwitches[_0x1c97e7(0x4dc)](_0x553700))return![];}return!![];}else{const _0x2f7fc9=_0x8b0709[_0x1c97e7(0x36d)](_0x1f3bc4);this['_stateTurns'][_0x14e473]=_0x3786e2[_0x1c97e7(0x2a8)](0x0,_0x2f7fc9);if(this[_0x1c97e7(0x215)][_0x1490b6]<=0x0)this[_0x1c97e7(0x42e)](_0x48284e);}}if(_0x24fb0b[_0x1c97e7(0x3bd)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c97e7(0x2e1)!=='PxDpt'){const _0x3b7843=JSON[_0x1c97e7(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2e85f8 of _0x3b7843){if(!$gameSwitches[_0x1c97e7(0x4dc)](_0x2e85f8))return![];}return!![];}else{const _0x229a8a=this[_0x1c97e7(0x1e5)](_0x117594);this[_0x1c97e7(0x35a)](_0x229a8a,_0x1c97e7(0x2be),!![],_0x2767fd);}}if(_0x24fb0b['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c97e7(0x253)===_0x1c97e7(0x34f)){const _0x5bd98c=_0x4839db(_0x2a487d['$1']),_0x23a0d3=_0x162c94[_0x1c97e7(0x505)](_0x5bd98c,_0x1c97e7(0x407),-0x1,_0x1c97e7(0x49f));_0x537164[_0x1c97e7(0x39c)]['stateTpSlipDamageJS'][_0x3b3d8a['id']]=new _0x4fa773(_0x1c97e7(0x3d6),_0x23a0d3);}else{const _0x25685d=JSON[_0x1c97e7(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4da23c of _0x25685d){if($gameSwitches['value'](_0x4da23c))return!![];}return![];}}if(_0x24fb0b[_0x1c97e7(0x3bd)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a18e5=JSON['parse']('['+RegExp['$1'][_0x1c97e7(0x3bd)](/\d+/g)+']');for(const _0xd2995d of _0x2a18e5){if(!$gameSwitches[_0x1c97e7(0x4dc)](_0xd2995d))return!![];}return![];}if(_0x24fb0b[_0x1c97e7(0x3bd)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2bddfa=JSON[_0x1c97e7(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x301e9a of _0x2bddfa){if(!$gameSwitches[_0x1c97e7(0x4dc)](_0x301e9a))return!![];}return![];}if(_0x24fb0b[_0x1c97e7(0x3bd)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29bc91=JSON[_0x1c97e7(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2412dc of _0x29bc91){if($gameSwitches[_0x1c97e7(0x4dc)](_0x2412dc))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x306dc8(0x249)]=function(_0x105ab7){const _0x169f75=_0x306dc8,_0x6ac9f4=VisuMZ[_0x169f75(0x39c)]['statePassiveConditionJS'];if(_0x6ac9f4[_0x105ab7['id']]&&!_0x6ac9f4[_0x105ab7['id']][_0x169f75(0x227)](this,_0x105ab7))return![];return!![];},Game_BattlerBase['prototype'][_0x306dc8(0x2e7)]=function(_0x9ee698){const _0xfe1c1b=_0x306dc8;return VisuMZ['SkillsStatesCore']['Settings'][_0xfe1c1b(0x2b1)]['PassiveConditionJS']['call'](this,_0x9ee698);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x2cd)]=function(){const _0x270a60=_0x306dc8;if(this['checkCacheKey'](_0x270a60(0x2cd)))return this[_0x270a60(0x4c8)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x270a60(0x21b)]=!![],this[_0x270a60(0x4fe)](),this[_0x270a60(0x21b)]=undefined,this[_0x270a60(0x4c8)]();},Game_BattlerBase[_0x306dc8(0x2d9)]['createPassiveStatesCache']=function(){const _0x339e70=_0x306dc8;this[_0x339e70(0x21b)]=!![],this[_0x339e70(0x358)][_0x339e70(0x2cd)]=[],this[_0x339e70(0x1d8)](),this[_0x339e70(0x44b)](),this[_0x339e70(0x2d3)](),this[_0x339e70(0x21b)]=undefined;},Game_BattlerBase[_0x306dc8(0x2d9)]['addPassiveStatesFromOtherPlugins']=function(){const _0x333237=_0x306dc8;if(Imported[_0x333237(0x3e8)])this[_0x333237(0x327)]();},Game_BattlerBase['prototype']['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x306dc8(0x2d9)]['addPassiveStatesByNotetag']=function(){const _0xcd45bb=_0x306dc8,_0x4e91e1=this[_0xcd45bb(0x222)]();for(const _0x399de3 of _0x4e91e1){if(_0xcd45bb(0x45e)===_0xcd45bb(0x2b9)){const _0x28f5ab=_0x29db63[_0xcd45bb(0x21f)],_0x29b2e0=_0xc7b33a[_0xcd45bb(0x21f)];if(_0x28f5ab!==_0x29b2e0)return _0x29b2e0-_0x28f5ab;return _0xdd2afa-_0x38360a;}else{if(!_0x399de3)continue;const _0x1caabf=_0x399de3[_0xcd45bb(0x324)]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x1caabf)for(const _0x5100e7 of _0x1caabf){if(_0xcd45bb(0x2fd)!==_0xcd45bb(0x4d0)){_0x5100e7['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x406c7a=RegExp['$1'];if(_0x406c7a[_0xcd45bb(0x3bd)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x566529=JSON['parse']('['+RegExp['$1'][_0xcd45bb(0x3bd)](/\d+/g)+']');this[_0xcd45bb(0x358)]['passiveStates']=this['_cache'][_0xcd45bb(0x2cd)]['concat'](_0x566529);}else{const _0x247be2=_0x406c7a['split'](',');for(const _0x48bb73 of _0x247be2){if(_0xcd45bb(0x44e)==='AGjGj'){const _0x4a88d0=DataManager[_0xcd45bb(0x388)](_0x48bb73);if(_0x4a88d0)this['_cache'][_0xcd45bb(0x2cd)][_0xcd45bb(0x3ec)](_0x4a88d0);}else _0x3aac19['SkillsStatesCore'][_0xcd45bb(0x329)][_0xcd45bb(0x227)](this,_0xbcd3cf),_0x4eff0d[_0xcd45bb(0x39c)]['Parse_Notetags_Skill_Cost'](_0x36117c),_0x2a7ba7[_0xcd45bb(0x39c)][_0xcd45bb(0x46c)](_0x4f63c0);}}}else for(const _0x43df9f of _0x22a18f['allBattleMembers']()){if(_0x43df9f)_0x43df9f[_0xcd45bb(0x417)]();}}}}},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x2d3)]=function(){const _0x25867b=_0x306dc8,_0x5a3288=VisuMZ[_0x25867b(0x39c)][_0x25867b(0x346)]['PassiveStates'][_0x25867b(0x500)];this[_0x25867b(0x358)][_0x25867b(0x2cd)]=this[_0x25867b(0x358)][_0x25867b(0x2cd)][_0x25867b(0x337)](_0x5a3288);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x413)]=function(_0x1a78d1){const _0x42952f=_0x306dc8;if(typeof _0x1a78d1!==_0x42952f(0x1e0))_0x1a78d1=_0x1a78d1['id'];return this[_0x42952f(0x215)][_0x1a78d1]||0x0;},Game_BattlerBase['prototype'][_0x306dc8(0x46a)]=function(_0x3d5f43,_0x55333a){const _0x57138e=_0x306dc8;if(typeof _0x3d5f43!==_0x57138e(0x1e0))_0x3d5f43=_0x3d5f43['id'];if(this[_0x57138e(0x317)](_0x3d5f43)){if(_0x57138e(0x2cb)===_0x57138e(0x2cb)){const _0xbfdceb=DataManager[_0x57138e(0x36d)](_0x3d5f43);this[_0x57138e(0x215)][_0x3d5f43]=_0x55333a['clamp'](0x0,_0xbfdceb);if(this[_0x57138e(0x215)][_0x3d5f43]<=0x0)this[_0x57138e(0x42e)](_0x3d5f43);}else{_0x514eef['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x47e25a=_0x54f021['indexOf'](_0x3dfbaf(_0x176ff3['$1'])[_0x57138e(0x2a3)]()),_0x604485=_0x1cae5a(_0x209606['$2']);_0x47e25a>=0x0&&(_0x181f70['addBuffTurns'](_0x47e25a,_0x604485),this[_0x57138e(0x1d6)](_0x9d1917));}}},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3dd)]=function(_0x362dab,_0xe43bd0){const _0x19285b=_0x306dc8;if(typeof _0x362dab!==_0x19285b(0x1e0))_0x362dab=_0x362dab['id'];this['isStateAffected'](_0x362dab)&&(_0xe43bd0+=this[_0x19285b(0x413)](_0x362dab),this[_0x19285b(0x46a)](_0x362dab,_0xe43bd0));},VisuMZ[_0x306dc8(0x39c)]['Game_BattlerBase_eraseBuff']=Game_BattlerBase['prototype'][_0x306dc8(0x448)],Game_BattlerBase['prototype'][_0x306dc8(0x448)]=function(_0x287e92){const _0x4ad0fa=_0x306dc8,_0x5d98fc=this[_0x4ad0fa(0x4c4)][_0x287e92];VisuMZ[_0x4ad0fa(0x39c)][_0x4ad0fa(0x38a)][_0x4ad0fa(0x227)](this,_0x287e92);if(_0x5d98fc>0x0)this['onEraseBuff'](_0x287e92);if(_0x5d98fc<0x0)this['onEraseDebuff'](_0x287e92);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x3cc)]=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x1ec)],Game_BattlerBase[_0x306dc8(0x2d9)]['increaseBuff']=function(_0x131baa){const _0x333912=_0x306dc8;VisuMZ[_0x333912(0x39c)][_0x333912(0x3cc)][_0x333912(0x227)](this,_0x131baa);if(!this['isBuffOrDebuffAffected'](_0x131baa))this[_0x333912(0x448)](_0x131baa);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x415)]=Game_BattlerBase[_0x306dc8(0x2d9)]['decreaseBuff'],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x4ec)]=function(_0x46dfa0){const _0x495bf4=_0x306dc8;VisuMZ['SkillsStatesCore'][_0x495bf4(0x415)][_0x495bf4(0x227)](this,_0x46dfa0);if(!this[_0x495bf4(0x4ab)](_0x46dfa0))this[_0x495bf4(0x448)](_0x46dfa0);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3a8)]=function(_0x49ac0b){},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x264)]=function(_0x53c15e){},Game_BattlerBase['prototype'][_0x306dc8(0x3fc)]=function(_0x50d0ed){const _0x1bb8d5=_0x306dc8;return this['_buffs'][_0x50d0ed]===VisuMZ[_0x1bb8d5(0x39c)][_0x1bb8d5(0x346)][_0x1bb8d5(0x310)][_0x1bb8d5(0x47e)];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x352)]=function(_0x255ca2){const _0x2ee7f6=_0x306dc8;return this[_0x2ee7f6(0x4c4)][_0x255ca2]===-VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x2ee7f6(0x309)];},VisuMZ[_0x306dc8(0x39c)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x43a)],Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x43a)]=function(_0x4ca3a1,_0x1af036){const _0x5a9fd1=_0x306dc8;return _0x4ca3a1=_0x4ca3a1[_0x5a9fd1(0x2a8)](-0x2,0x2),VisuMZ['SkillsStatesCore']['Game_BattlerBase_buffIconIndex'][_0x5a9fd1(0x227)](this,_0x4ca3a1,_0x1af036);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x48d)]=function(_0x4d2c3b){const _0x16199d=_0x306dc8,_0x2e8fcb=this['_buffs'][_0x4d2c3b];return VisuMZ['SkillsStatesCore']['Settings'][_0x16199d(0x310)][_0x16199d(0x355)][_0x16199d(0x227)](this,_0x4d2c3b,_0x2e8fcb);},Game_BattlerBase['prototype']['buffTurns']=function(_0x48bcbc){const _0x317f59=_0x306dc8;return this[_0x317f59(0x1ef)][_0x48bcbc]||0x0;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x2d2)]=function(_0x280e37){return this['buffTurns'](_0x280e37);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x2a6)]=function(_0x5da396,_0x58badd){const _0x46d8b3=_0x306dc8;if(this[_0x46d8b3(0x3c1)](_0x5da396)){if('giLTf'===_0x46d8b3(0x416))for(const _0x32a628 of _0x578583){let _0x5e8e48=0x0,_0xb8b585=0x0;if(_0x32a628[_0x46d8b3(0x3bd)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5e8e48=_0x400288(_0x25f27e['$1']),_0xb8b585=_0x56c181(_0x1cbb71['$2']);else _0x32a628[_0x46d8b3(0x3bd)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x5e8e48=_0x63fc00[_0x46d8b3(0x388)](_0x2418ff['$1']),_0xb8b585=_0x289791(_0x5c4126['$2']));_0x4e60c2[_0x46d8b3(0x3dd)](_0x5e8e48,_0xb8b585),this[_0x46d8b3(0x1d6)](_0x48cc70);}else{const _0x12e0d8=VisuMZ[_0x46d8b3(0x39c)][_0x46d8b3(0x346)][_0x46d8b3(0x310)][_0x46d8b3(0x20c)];this[_0x46d8b3(0x1ef)][_0x5da396]=_0x58badd[_0x46d8b3(0x2a8)](0x0,_0x12e0d8);}}},Game_BattlerBase[_0x306dc8(0x2d9)]['addBuffTurns']=function(_0x3269a8,_0x1a12cc){const _0x1f604e=_0x306dc8;this['isBuffAffected'](_0x3269a8)&&(_0x1f604e(0x3f3)===_0x1f604e(0x2f9)?this[_0x1f604e(0x3c1)](_0x15957f)&&(_0x148fdf+=this[_0x1f604e(0x4f6)](_0x90fb7c),this[_0x1f604e(0x2a6)](_0x5dd531,_0x2aae5e)):(_0x1a12cc+=this[_0x1f604e(0x4f6)](stateId),this[_0x1f604e(0x2a6)](_0x3269a8,_0x1a12cc)));},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x45d)]=function(_0x5727de,_0x34e93d){const _0x48149b=_0x306dc8;if(this[_0x48149b(0x4bc)](_0x5727de)){if(_0x48149b(0x441)==='WMhCL'){const _0x1b1e48=VisuMZ[_0x48149b(0x39c)][_0x48149b(0x346)][_0x48149b(0x310)][_0x48149b(0x20c)];this[_0x48149b(0x1ef)][_0x5727de]=_0x34e93d[_0x48149b(0x2a8)](0x0,_0x1b1e48);}else{const _0x5b1233=_0x4e7731[_0x48149b(0x39c)][_0x48149b(0x346)][_0x48149b(0x439)];if(this[_0x48149b(0x48b)]()<=0x0)return _0x48149b(0x1de);else return _0x5b1233[_0x48149b(0x4ad)]?_0x48149b(0x3a1):_0x251c28[_0x48149b(0x45a)]();}}},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x28a)]=function(_0x590fb9,_0x1bb060){const _0x44af3f=_0x306dc8;this[_0x44af3f(0x4bc)](_0x590fb9)&&(_0x1bb060+=this[_0x44af3f(0x4f6)](stateId),this['setDebuffTurns'](_0x590fb9,_0x1bb060));},Game_BattlerBase[_0x306dc8(0x2d9)]['stateData']=function(_0x43b7d5){const _0x184431=_0x306dc8;if(typeof _0x43b7d5!==_0x184431(0x1e0))_0x43b7d5=_0x43b7d5['id'];return this[_0x184431(0x335)]=this['_stateData']||{},this['_stateData'][_0x43b7d5]=this[_0x184431(0x335)][_0x43b7d5]||{},this['_stateData'][_0x43b7d5];},Game_BattlerBase[_0x306dc8(0x2d9)]['getStateData']=function(_0x575eaa,_0x33ec0c){const _0x3d8c0d=_0x306dc8;if(typeof _0x575eaa!==_0x3d8c0d(0x1e0))_0x575eaa=_0x575eaa['id'];const _0xe5dade=this[_0x3d8c0d(0x247)](_0x575eaa);return _0xe5dade[_0x33ec0c];},Game_BattlerBase['prototype'][_0x306dc8(0x414)]=function(_0x126407,_0x361cf2,_0xfc3d51){const _0x26e6a8=_0x306dc8;if(typeof _0x126407!==_0x26e6a8(0x1e0))_0x126407=_0x126407['id'];const _0x11b1a7=this['stateData'](_0x126407);_0x11b1a7[_0x361cf2]=_0xfc3d51;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x4d7)]=function(_0x4f45be){const _0x4faf5d=_0x306dc8;if(typeof _0x4f45be!=='number')_0x4f45be=_0x4f45be['id'];this[_0x4faf5d(0x335)]=this[_0x4faf5d(0x335)]||{},this['_stateData'][_0x4f45be]={};},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x204)]=function(_0x2070e){const _0x537908=_0x306dc8;if(typeof _0x2070e!==_0x537908(0x1e0))_0x2070e=_0x2070e['id'];return this[_0x537908(0x3c7)]=this['_stateDisplay']||{},this[_0x537908(0x3c7)][_0x2070e]===undefined&&(this[_0x537908(0x3c7)][_0x2070e]=''),this[_0x537908(0x3c7)][_0x2070e];},Game_BattlerBase['prototype'][_0x306dc8(0x31e)]=function(_0x3083ce,_0x2fe25f){const _0x53e0c9=_0x306dc8;if(typeof _0x3083ce!==_0x53e0c9(0x1e0))_0x3083ce=_0x3083ce['id'];this[_0x53e0c9(0x3c7)]=this[_0x53e0c9(0x3c7)]||{},this[_0x53e0c9(0x3c7)][_0x3083ce]=_0x2fe25f;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x373)]=function(_0x19a5ee){const _0x419587=_0x306dc8;if(typeof _0x19a5ee!==_0x419587(0x1e0))_0x19a5ee=_0x19a5ee['id'];this[_0x419587(0x3c7)]=this[_0x419587(0x3c7)]||{},this[_0x419587(0x3c7)][_0x19a5ee]='';},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x384)]=function(_0x3f1c93){const _0x60ffd2=_0x306dc8;if(typeof _0x3f1c93!==_0x60ffd2(0x1e0))_0x3f1c93=_0x3f1c93['id'];this['_stateOrigin']=this[_0x60ffd2(0x1da)]||{},this[_0x60ffd2(0x1da)][_0x3f1c93]=this[_0x60ffd2(0x1da)][_0x3f1c93]||_0x60ffd2(0x339);const _0x2ae791=this[_0x60ffd2(0x1da)][_0x3f1c93];return this[_0x60ffd2(0x308)](_0x2ae791);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x44d)]=function(_0x2af6e2,_0x153d6c){const _0x5d7619=_0x306dc8;this[_0x5d7619(0x1da)]=this[_0x5d7619(0x1da)]||{};const _0x406fb4=_0x153d6c?this[_0x5d7619(0x39d)](_0x153d6c):this[_0x5d7619(0x29c)]();this['_stateOrigin'][_0x2af6e2]=_0x406fb4;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x21d)]=function(_0x4d6bf3){const _0x42ad3c=_0x306dc8;this[_0x42ad3c(0x1da)]=this[_0x42ad3c(0x1da)]||{},delete this['_stateOrigin'][_0x4d6bf3];},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x29c)]=function(){const _0x1dd5fc=_0x306dc8,_0x3c5cb6=this[_0x1dd5fc(0x43d)]();return this[_0x1dd5fc(0x39d)](_0x3c5cb6);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x43d)]=function(){const _0x3ac9c3=_0x306dc8;if($gameParty[_0x3ac9c3(0x479)]()){if(_0x3ac9c3(0x2ae)!=='DTMMq'){if(BattleManager[_0x3ac9c3(0x368)]){if(_0x3ac9c3(0x289)==='GyhMN'){const _0x28f607=_0x3c18c9[_0x3ac9c3(0x324)];if(_0x28f607['match'](/<HIDE IN BATTLE>/i)&&_0x619fcc['inBattle']())return![];else return _0x28f607[_0x3ac9c3(0x3bd)](/<HIDE OUTSIDE BATTLE>/i)&&!_0x47b454[_0x3ac9c3(0x479)]()?![]:!![];}else return BattleManager[_0x3ac9c3(0x368)];}else{if(BattleManager['_currentActor'])return BattleManager[_0x3ac9c3(0x2d1)];}}else{if(!_0x17dfc5[_0x3ac9c3(0x39c)][_0x3ac9c3(0x26e)](this,_0x33268e))return!![];if(!_0x4380dc[_0x3ac9c3(0x39c)][_0x3ac9c3(0x24c)](this,_0x41debd))return!![];if(!_0x4bc949[_0x3ac9c3(0x39c)][_0x3ac9c3(0x340)](this,_0x31b7c7))return!![];return![];}}else{const _0x12ce7d=SceneManager[_0x3ac9c3(0x47b)];if(![Scene_Map,Scene_Item][_0x3ac9c3(0x1fd)](_0x12ce7d[_0x3ac9c3(0x2c2)])){if(_0x3ac9c3(0x2bd)!==_0x3ac9c3(0x4e7))return $gameParty['menuActor']();else{if(this[_0x3ac9c3(0x380)]())return!![];return _0x25cfe3[_0x3ac9c3(0x39c)][_0x3ac9c3(0x41b)][_0x3ac9c3(0x227)](this);}}}return this;},Game_BattlerBase['prototype'][_0x306dc8(0x39d)]=function(_0x2914bd){const _0x5d8d24=_0x306dc8;if(!_0x2914bd)return _0x5d8d24(0x339);if(_0x2914bd['isActor']())return'<actor-%1>'[_0x5d8d24(0x505)](_0x2914bd[_0x5d8d24(0x2e5)]());else{const _0xf2466d=_0x5d8d24(0x3e1)['format'](_0x2914bd[_0x5d8d24(0x4f9)]()),_0x40607a=_0x5d8d24(0x244)['format'](_0x2914bd[_0x5d8d24(0x412)]()),_0x2d3af6=_0x5d8d24(0x48e)[_0x5d8d24(0x505)]($gameTroop[_0x5d8d24(0x411)]());return _0x5d8d24(0x1cd)[_0x5d8d24(0x505)](_0xf2466d,_0x40607a,_0x2d3af6);}return _0x5d8d24(0x339);},Game_BattlerBase[_0x306dc8(0x2d9)]['getStateOriginByKey']=function(_0x3e98f4){const _0x43880d=_0x306dc8;if(_0x3e98f4===_0x43880d(0x339)){if('XqMXu'===_0x43880d(0x20e))return this;else _0x404069[_0x43880d(0x39c)]['Sprite_Gauge_redraw'][_0x43880d(0x227)](this);}else{if(_0x3e98f4['match'](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if('fORGY'!=='HKtSp'){if($gameParty[_0x43880d(0x479)]()&&_0x3e98f4[_0x43880d(0x3bd)](/<troop-(\d+)>/i)){const _0x2e0107=Number(RegExp['$1']);if(_0x2e0107===$gameTroop[_0x43880d(0x411)]()){if('XBPrU'===_0x43880d(0x3d8)){if(_0x3e98f4[_0x43880d(0x3bd)](/<member-(\d+)>/i)){if(_0x43880d(0x4b8)===_0x43880d(0x4b8))return $gameTroop[_0x43880d(0x1f2)]()[Number(RegExp['$1'])];else this[_0x43880d(0x4cf)][_0x860564]=_0x4934a6(_0x187714['$1']);}}else{const _0x5cdff6=_0x553f0c['split'](',');for(const _0x579a6d of _0x5cdff6){const _0x3586cc=_0x21b5bf['getStateIdWithName'](_0x579a6d);if(_0x3586cc)this['_cache']['passiveStates'][_0x43880d(0x3ec)](_0x3586cc);}}}}if(_0x3e98f4[_0x43880d(0x3bd)](/<enemy-(\d+)>/i)){if('jIarO'==='jIarO')return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);else _0x3b368d[_0x43880d(0x2a6)](_0x5292cf,_0x39dcc1),this['makeSuccess'](_0x4a4177);}}else return _0x43880d(0x456);}}return this;},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x3b8)]=Game_Battler['prototype'][_0x306dc8(0x218)],Game_Battler[_0x306dc8(0x2d9)]['addState']=function(_0x4d0d94){const _0x1f8b74=_0x306dc8,_0x29ef89=this[_0x1f8b74(0x4eb)](_0x4d0d94);VisuMZ[_0x1f8b74(0x39c)]['Game_Battler_addState']['call'](this,_0x4d0d94);if(_0x29ef89&&this[_0x1f8b74(0x301)]($dataStates[_0x4d0d94])){this[_0x1f8b74(0x4fd)](_0x4d0d94);;}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x452)]=Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x4eb)],Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x4eb)]=function(_0x34fb0b){const _0x59f2aa=_0x306dc8,_0x27f3eb=$dataStates[_0x34fb0b];if(_0x27f3eb&&_0x27f3eb[_0x59f2aa(0x324)][_0x59f2aa(0x3bd)](/<NO DEATH CLEAR>/i))return!this[_0x59f2aa(0x3c9)](_0x34fb0b)&&!this['isStateRestrict'](_0x34fb0b)&&!this['_result'][_0x59f2aa(0x4be)](_0x34fb0b);return VisuMZ[_0x59f2aa(0x39c)][_0x59f2aa(0x452)]['call'](this,_0x34fb0b);},Game_Battler[_0x306dc8(0x2d9)]['onAddState']=function(_0x799fb2){const _0x39245d=_0x306dc8;this[_0x39245d(0x44d)](_0x799fb2),this[_0x39245d(0x426)](_0x799fb2),this[_0x39245d(0x499)](_0x799fb2),this[_0x39245d(0x4d1)](_0x799fb2),this[_0x39245d(0x29b)](_0x799fb2);},Game_Battler[_0x306dc8(0x2d9)]['onRemoveState']=function(_0x42a1c2){const _0x48ec7b=_0x306dc8;this[_0x48ec7b(0x235)](_0x42a1c2),this[_0x48ec7b(0x39b)](_0x42a1c2),Game_BattlerBase['prototype']['onRemoveState'][_0x48ec7b(0x227)](this,_0x42a1c2);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x29a)]=function(_0x3a6dc0){const _0x2bf452=_0x306dc8;for(const _0x5b5d1e of this[_0x2bf452(0x4e8)]()){if(_0x2bf452(0x501)===_0x2bf452(0x28e))for(const _0x213376 of _0x408889){_0x213376[_0x2bf452(0x3bd)](_0x1531a2);const _0x550986=_0x2bbaee(_0x5bb775['$1'])[_0x2bf452(0x471)](',')[_0x2bf452(0x4e1)](_0x2283c0=>_0x2ea681(_0x2283c0)[_0x2bf452(0x2a3)]()[_0x2bf452(0x29d)]());_0x3937b7=_0x6e8706['concat'](_0x550986);}else this[_0x2bf452(0x47f)](_0x5b5d1e['id'])&&_0x5b5d1e['autoRemovalTiming']===_0x3a6dc0&&('uOBUs'!==_0x2bf452(0x39a)?(this[_0x2bf452(0x358)]={},this[_0x2bf452(0x43c)](),_0x85b8a8[_0x2bf452(0x39c)][_0x2bf452(0x233)][_0x2bf452(0x227)](this)):(this[_0x2bf452(0x42e)](_0x5b5d1e['id']),this['onExpireState'](_0x5b5d1e['id']),this[_0x2bf452(0x420)](_0x5b5d1e['id'])));}},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x3ed)]=function(_0xf3070c){const _0x1530d9=_0x306dc8;this[_0x1530d9(0x26c)](_0xf3070c);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x4d1)]=function(_0x17a229){const _0x27ffcc=_0x306dc8;if(this['_tempActor']||this[_0x27ffcc(0x379)])return;const _0x79eadf=VisuMZ[_0x27ffcc(0x39c)]['stateAddJS'];if(_0x79eadf[_0x17a229])_0x79eadf[_0x17a229]['call'](this,_0x17a229);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x235)]=function(_0x143130){const _0x149d17=_0x306dc8;if(this['_tempActor']||this[_0x149d17(0x379)])return;const _0x588480=VisuMZ[_0x149d17(0x39c)]['stateEraseJS'];if(_0x588480[_0x143130])_0x588480[_0x143130][_0x149d17(0x227)](this,_0x143130);},Game_Battler['prototype'][_0x306dc8(0x26c)]=function(_0x3e20af){const _0x3a0dd8=_0x306dc8;if(this['_tempActor']||this[_0x3a0dd8(0x379)])return;const _0x76137a=VisuMZ[_0x3a0dd8(0x39c)]['stateExpireJS'];if(_0x76137a[_0x3e20af])_0x76137a[_0x3e20af]['call'](this,_0x3e20af);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x29b)]=function(_0xe6f01b){const _0x17ffda=_0x306dc8;if(this['_tempActor']||this[_0x17ffda(0x379)])return;try{VisuMZ[_0x17ffda(0x39c)][_0x17ffda(0x346)]['States'][_0x17ffda(0x2ca)][_0x17ffda(0x227)](this,_0xe6f01b);}catch(_0x2e7c9c){if($gameTemp[_0x17ffda(0x1e3)]())console[_0x17ffda(0x2d5)](_0x2e7c9c);}},Game_Battler['prototype'][_0x306dc8(0x39b)]=function(_0x355688){const _0x36fc96=_0x306dc8;if(this[_0x36fc96(0x22e)]||this['_tempBattler'])return;try{VisuMZ[_0x36fc96(0x39c)]['Settings'][_0x36fc96(0x3d1)][_0x36fc96(0x387)]['call'](this,_0x355688);}catch(_0x367f67){if($gameTemp[_0x36fc96(0x1e3)]())console['log'](_0x367f67);}},Game_Battler['prototype'][_0x306dc8(0x420)]=function(_0x327843){const _0x538bb7=_0x306dc8;if(this[_0x538bb7(0x22e)]||this[_0x538bb7(0x379)])return;try{VisuMZ['SkillsStatesCore'][_0x538bb7(0x346)][_0x538bb7(0x3d1)][_0x538bb7(0x371)]['call'](this,_0x327843);}catch(_0x2b6d8a){if($gameTemp[_0x538bb7(0x1e3)]())console['log'](_0x2b6d8a);}},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x419)]=function(_0x2825f7){const _0x4c7c3f=_0x306dc8;return _0x2825f7=_0x2825f7[_0x4c7c3f(0x2a3)]()[_0x4c7c3f(0x29d)](),this[_0x4c7c3f(0x4e8)]()[_0x4c7c3f(0x3f5)](_0x440391=>_0x440391[_0x4c7c3f(0x220)][_0x4c7c3f(0x1fd)](_0x2825f7));},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x3aa)]=function(_0x32f93b,_0x214644){const _0x329383=_0x306dc8;_0x32f93b=_0x32f93b['toUpperCase']()[_0x329383(0x29d)](),_0x214644=_0x214644||0x0;const _0x2336f1=this['statesByCategory'](_0x32f93b),_0x2eb63b=[];for(const _0x37c1d1 of _0x2336f1){if(!_0x37c1d1)continue;if(_0x214644<=0x0)break;_0x2eb63b[_0x329383(0x3ec)](_0x37c1d1['id']),this[_0x329383(0x406)][_0x329383(0x40d)]=!![],_0x214644--;}while(_0x2eb63b[_0x329383(0x4aa)]>0x0){if(_0x329383(0x398)==='JvFxU'){let _0x11fe43=_0x1541af[_0x329383(0x3a2)][_0x329383(0x227)](this,_0x253cec);_0x11fe43=this['adjustSkillCost'](_0x43e38b,_0x11fe43,_0x483bf9);if(!_0x3abfc7[_0x329383(0x275)][_0x329383(0x227)](this,_0x2106d5,_0x11fe43))return![];}else this[_0x329383(0x42e)](_0x2eb63b[_0x329383(0x458)]());}},Game_Battler['prototype'][_0x306dc8(0x4a4)]=function(_0x3444dc,_0x3a7010){const _0x732e10=_0x306dc8;_0x3444dc=_0x3444dc[_0x732e10(0x2a3)]()['trim'](),_0x3a7010=_0x3a7010||[];const _0x38e63f=this['statesByCategory'](_0x3444dc),_0x1d145b=[];for(const _0x28a6e7 of _0x38e63f){if(_0x732e10(0x462)===_0x732e10(0x370)){const _0xe9b649=_0x239de7[_0x732e10(0x39c)][_0x732e10(0x23c)][_0x732e10(0x227)](this);return _0xe9b649[_0x732e10(0x2a8)](0x0,0x1);}else{if(!_0x28a6e7)continue;if(_0x3a7010[_0x732e10(0x1fd)](_0x28a6e7))continue;_0x1d145b[_0x732e10(0x3ec)](_0x28a6e7['id']),this[_0x732e10(0x406)][_0x732e10(0x40d)]=!![];}}while(_0x1d145b['length']>0x0){this[_0x732e10(0x42e)](_0x1d145b[_0x732e10(0x458)]());}},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x49a)]=function(_0x920a90){const _0x34a189=_0x306dc8;return this[_0x34a189(0x453)](_0x920a90)>0x0;},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x396)]=function(_0x191ca1){return this['totalStateCategory'](_0x191ca1)>0x0;},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x453)]=function(_0x16a767){const _0x33e037=_0x306dc8,_0x18c474=this['statesByCategory'](_0x16a767)[_0x33e037(0x3f5)](_0x108acb=>this[_0x33e037(0x317)](_0x108acb['id']));return _0x18c474['length'];},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x4fb)]=function(_0xa8500){const _0x1d258f=_0x306dc8,_0x31324f=this[_0x1d258f(0x419)](_0xa8500);return _0x31324f[_0x1d258f(0x4aa)];},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x41a)]=Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3c9)],Game_BattlerBase[_0x306dc8(0x2d9)]['isStateResist']=function(_0x43db10){const _0x2ade99=_0x306dc8,_0xf72caa=$dataStates[_0x43db10];if(_0xf72caa&&_0xf72caa[_0x2ade99(0x220)][_0x2ade99(0x4aa)]>0x0)for(const _0x333165 of _0xf72caa[_0x2ade99(0x220)]){if(_0x2ade99(0x42a)!==_0x2ade99(0x2a9)){if(this[_0x2ade99(0x3b7)](_0x333165))return!![];}else{const _0x1c476f=_0x3b308c[_0x2ade99(0x39c)][_0x2ade99(0x346)][_0x2ade99(0x439)];return _0x1c476f[_0x2ade99(0x2a1)]==='number'?_0x4d2283[_0x2ade99(0x25a)]()-0x6:_0x4d3764[_0x2ade99(0x25a)]()-0x2;}}return VisuMZ[_0x2ade99(0x39c)][_0x2ade99(0x41a)]['call'](this,_0x43db10);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x3b7)]=function(_0xf320eb){const _0x473068=_0x306dc8;let _0x5682af=_0x473068(0x246);if(this[_0x473068(0x330)](_0x5682af))return this[_0x473068(0x358)][_0x5682af]['includes'](_0xf320eb);return this[_0x473068(0x358)][_0x5682af]=this['makeResistedStateCategories'](),this[_0x473068(0x358)][_0x5682af][_0x473068(0x1fd)](_0xf320eb);},Game_BattlerBase['prototype'][_0x306dc8(0x4df)]=function(){const _0x559c3f=_0x306dc8,_0x31824d=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x422a5d=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x2a774f=[];for(const _0x498c6a of this[_0x559c3f(0x422)]()){if(_0x559c3f(0x459)===_0x559c3f(0x4b9))for(const _0x52e819 of _0x187243){let _0x2f0fb0=0x0,_0x3c3c66=0x0;if(_0x52e819[_0x559c3f(0x3bd)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x2f0fb0=_0x1ed978(_0x3e859a['$1']),_0x3c3c66=_0x355454(_0x19283e['$2']);else _0x52e819[_0x559c3f(0x3bd)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2f0fb0=_0x48d5a8[_0x559c3f(0x388)](_0x3055e3['$1']),_0x3c3c66=_0x2da9d1(_0x5356f['$2']));_0x3ecdb3[_0x559c3f(0x46a)](_0x2f0fb0,_0x3c3c66),this[_0x559c3f(0x1d6)](_0x356348);}else{if(!_0x498c6a)continue;const _0x590cc8=_0x498c6a['note'],_0x5e1678=_0x590cc8[_0x559c3f(0x3bd)](_0x31824d);if(_0x5e1678){if('CaYdE'===_0x559c3f(0x338))for(const _0x2841b7 of _0x314332){_0x2841b7['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4e8d5b=_0x508b85['indexOf'](_0x11a722(_0x5d698d['$1'])[_0x559c3f(0x2a3)]()),_0x1556fc=_0x265455(_0x4bbb54['$2']);_0x4e8d5b>=0x0&&(_0x1c232f[_0x559c3f(0x2a6)](_0x4e8d5b,_0x1556fc),this[_0x559c3f(0x1d6)](_0x15e2c1));}else for(const _0x493461 of _0x5e1678){_0x493461[_0x559c3f(0x3bd)](_0x31824d);const _0x37a7a7=String(RegExp['$1'])['split'](',')[_0x559c3f(0x4e1)](_0x1814b7=>String(_0x1814b7)[_0x559c3f(0x2a3)]()[_0x559c3f(0x29d)]());_0x2a774f=_0x2a774f[_0x559c3f(0x337)](_0x37a7a7);}}if(_0x590cc8['match'](_0x422a5d)){const _0x29c535=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x559c3f(0x4e1)](_0x3631a7=>String(_0x3631a7)['toUpperCase']()[_0x559c3f(0x29d)]());_0x2a774f=_0x2a774f[_0x559c3f(0x337)](_0x29c535);}}}return _0x2a774f;},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x426)]=function(_0x1d65de){const _0x3d0f7d=_0x306dc8,_0x4bc4e5=$dataStates[_0x1d65de];if(!_0x4bc4e5)return;const _0x2b847b=_0x4bc4e5[_0x3d0f7d(0x324)]||'',_0x13878b=_0x2b847b[_0x3d0f7d(0x3bd)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x13878b){const _0x1e9611=[_0x4bc4e5];for(const _0xe87c66 of _0x13878b){_0xe87c66['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x214b0c=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x214b0c,_0x1e9611);}}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x35f)]=Game_Battler['prototype'][_0x306dc8(0x33e)],Game_Battler[_0x306dc8(0x2d9)]['addBuff']=function(_0x34e8de,_0x4d03f7){const _0x19630c=_0x306dc8;VisuMZ[_0x19630c(0x39c)]['Game_Battler_addBuff'][_0x19630c(0x227)](this,_0x34e8de,_0x4d03f7);if(this[_0x19630c(0x3c1)](_0x34e8de)){if('AlLzy'==='pIgfb'){const _0x57f03a=_0x37c2ea[_0x19630c(0x39c)][_0x19630c(0x216)][_0x19630c(0x227)](this),_0x3e98ad=_0x14bbe5[_0x19630c(0x39c)][_0x19630c(0x346)][_0x19630c(0x228)];let _0x22ac4d=_0x3e98ad[_0x19630c(0x4b3)];return _0x268668[_0x19630c(0x479)]()&&(_0x22ac4d=_0x22ac4d[_0x19630c(0x337)](_0x3e98ad[_0x19630c(0x2e9)])),_0x57f03a['filter'](_0x241fdb=>!_0x22ac4d['includes'](_0x241fdb));}else this[_0x19630c(0x430)](_0x34e8de,_0x4d03f7);}},Game_Battler['prototype']['isBuffPrevented']=function(_0x5ba3a2){},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x252)]=Game_Battler['prototype']['addDebuff'],Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x457)]=function(_0x4156d0,_0x43e705){const _0x5a1926=_0x306dc8;VisuMZ[_0x5a1926(0x39c)][_0x5a1926(0x252)][_0x5a1926(0x227)](this,_0x4156d0,_0x43e705),this['isDebuffAffected'](_0x4156d0)&&(_0x5a1926(0x376)!==_0x5a1926(0x2dc)?this[_0x5a1926(0x236)](_0x4156d0,_0x43e705):this[_0x5a1926(0x35b)](_0xaf05d2,_0x195e8a));},Game_Battler['prototype']['removeBuffsAuto']=function(){const _0x5d40e8=_0x306dc8;for(let _0x2a1271=0x0;_0x2a1271<this[_0x5d40e8(0x3b4)]();_0x2a1271++){if(this['isBuffExpired'](_0x2a1271)){const _0x1ff8a1=this[_0x5d40e8(0x4c4)][_0x2a1271];this[_0x5d40e8(0x477)](_0x2a1271);if(_0x1ff8a1>0x0)this[_0x5d40e8(0x4bd)](_0x2a1271);if(_0x1ff8a1<0x0)this[_0x5d40e8(0x3be)](_0x2a1271);}}},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x430)]=function(_0x58588e,_0x627836){const _0xb77ac3=_0x306dc8;this[_0xb77ac3(0x342)](_0x58588e,_0x627836);},Game_Battler['prototype'][_0x306dc8(0x236)]=function(_0x2f21de,_0x192c2e){const _0x1ac115=_0x306dc8;this[_0x1ac115(0x35b)](_0x2f21de,_0x192c2e);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x3a8)]=function(_0x56065c){const _0x35590b=_0x306dc8;Game_BattlerBase[_0x35590b(0x2d9)]['onEraseBuff'][_0x35590b(0x227)](this,_0x56065c),this['onEraseBuffGlobalJS'](_0x56065c);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x264)]=function(_0xc4da36){const _0x9e1429=_0x306dc8;Game_BattlerBase[_0x9e1429(0x2d9)][_0x9e1429(0x264)][_0x9e1429(0x227)](this,_0xc4da36),this['onEraseDebuffGlobalJS'](_0xc4da36);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x4bd)]=function(_0x3b42a5){const _0xb631c2=_0x306dc8;this[_0xb631c2(0x2ef)](_0x3b42a5);},Game_Battler['prototype'][_0x306dc8(0x3be)]=function(_0x34bf23){const _0x5beed5=_0x306dc8;this[_0x5beed5(0x4bb)](_0x34bf23);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x342)]=function(_0x1c778e,_0x20943e){const _0x1272dd=_0x306dc8;VisuMZ[_0x1272dd(0x39c)][_0x1272dd(0x346)][_0x1272dd(0x310)][_0x1272dd(0x4cb)][_0x1272dd(0x227)](this,_0x1c778e,_0x20943e);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x35b)]=function(_0x329f68,_0x3405e7){const _0x19d689=_0x306dc8;VisuMZ['SkillsStatesCore']['Settings'][_0x19d689(0x310)]['onAddDebuffJS'][_0x19d689(0x227)](this,_0x329f68,_0x3405e7);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x284)]=function(_0x16e011){const _0x23c30b=_0x306dc8;VisuMZ[_0x23c30b(0x39c)][_0x23c30b(0x346)][_0x23c30b(0x310)]['onEraseBuffJS']['call'](this,_0x16e011);},Game_BattlerBase[_0x306dc8(0x2d9)][_0x306dc8(0x506)]=function(_0x3ad5d8){const _0x28ca7b=_0x306dc8;VisuMZ['SkillsStatesCore'][_0x28ca7b(0x346)]['Buffs']['onEraseDebuffJS']['call'](this,_0x3ad5d8);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x2ef)]=function(_0x3903d4){const _0x6a70ec=_0x306dc8;VisuMZ[_0x6a70ec(0x39c)][_0x6a70ec(0x346)]['Buffs'][_0x6a70ec(0x35c)][_0x6a70ec(0x227)](this,_0x3903d4);},Game_Battler[_0x306dc8(0x2d9)]['onExpireDebuffGlobalJS']=function(_0x3602a3){const _0x7e8386=_0x306dc8;VisuMZ[_0x7e8386(0x39c)][_0x7e8386(0x346)][_0x7e8386(0x310)]['onExpireDebuffJS'][_0x7e8386(0x227)](this,_0x3602a3);},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x499)]=function(_0x2712d1){const _0x27fd4c=_0x306dc8,_0x51aa63=VisuMZ['SkillsStatesCore'],_0x43c14b=[_0x27fd4c(0x4a0),'stateHpSlipHealJS',_0x27fd4c(0x37e),'stateMpSlipHealJS',_0x27fd4c(0x1fb),'stateTpSlipHealJS'];for(const _0x5f7309 of _0x43c14b){if(_0x27fd4c(0x3a6)!==_0x27fd4c(0x3a6)){if(!_0x4e691b['isLearnedSkill'](_0xcc47dd))return![];}else{if(_0x51aa63[_0x5f7309][_0x2712d1]){if(_0x27fd4c(0x41d)===_0x27fd4c(0x496)){const _0x5c51a8=_0x4f4645[_0x27fd4c(0x39c)][_0x27fd4c(0x346)][_0x27fd4c(0x439)];if(_0x5c51a8[_0x27fd4c(0x50a)]){if(_0x5c51a8[_0x27fd4c(0x3e0)]===0x1)return this[_0x27fd4c(0x1d4)]();else{if(_0x5c51a8['MatchLabelGaugeColor']===0x2)return this['gaugeColor2']();}}const _0x3e203b=_0x5c51a8[_0x27fd4c(0x27c)];return _0x124b83[_0x27fd4c(0x2a2)](_0x3e203b);}else _0x51aa63[_0x5f7309][_0x2712d1]['call'](this,_0x2712d1);}}}},VisuMZ['SkillsStatesCore'][_0x306dc8(0x262)]=Game_Battler['prototype'][_0x306dc8(0x401)],Game_Battler['prototype'][_0x306dc8(0x401)]=function(){const _0x313f92=_0x306dc8;this[_0x313f92(0x434)](),VisuMZ[_0x313f92(0x39c)][_0x313f92(0x262)][_0x313f92(0x227)](this),this[_0x313f92(0x25c)](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x25c)]=function(){const _0x330ab5=_0x306dc8;for(const _0x492dff of this[_0x330ab5(0x2cd)]()){if('RUAAe'!=='RapUT'){if(!_0x492dff)continue;this[_0x330ab5(0x499)](_0x492dff['id']);}else this[_0x330ab5(0x236)](_0x3edb74,_0x1a833c);}},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x434)]=function(){const _0x4d1918=_0x306dc8;for(const _0x29a99a of this[_0x4d1918(0x4e8)]()){if(!_0x29a99a)continue;if(_0x29a99a[_0x4d1918(0x324)]['match'](/<JS SLIP REFRESH>/i)){if('dEvWH'===_0x4d1918(0x334))this[_0x4d1918(0x499)](_0x29a99a['id']);else return _0x8336f7[_0x4d1918(0x47b)][_0x4d1918(0x2c2)]===_0x12c5b0?_0x2324d1[_0x4d1918(0x39c)][_0x4d1918(0x3de)][_0x4d1918(0x227)](this):_0x77ba66['SkillsStatesCore'][_0x4d1918(0x346)][_0x4d1918(0x228)][_0x4d1918(0x42f)];}}},Game_Battler[_0x306dc8(0x2d9)][_0x306dc8(0x1ea)]=function(){if(!this['isAlive']())return;const _0x5bdcef=this['states']();for(const _0x1df330 of _0x5bdcef){if(!_0x1df330)continue;this['onRegenerateCustomStateDamageOverTime'](_0x1df330);}},Game_Battler[_0x306dc8(0x2d9)]['onRegenerateCustomStateDamageOverTime']=function(_0x4214e9){const _0x161eb4=_0x306dc8,_0xcf791f=this[_0x161eb4(0x1e1)](_0x4214e9['id'],_0x161eb4(0x485))||0x0,_0x329623=-this['maxSlipDamage'](),_0x37be4a=Math['max'](_0xcf791f,_0x329623);if(_0x37be4a!==0x0){if(_0x161eb4(0x295)==='RsHgu'){const _0x376ff9=this[_0x161eb4(0x406)]['hpDamage']||0x0;this[_0x161eb4(0x2f8)](_0x37be4a),this['_result'][_0x161eb4(0x361)]+=_0x376ff9;}else{_0x216112[_0x161eb4(0x39c)][_0x161eb4(0x4cc)][_0x161eb4(0x227)](this);const _0x39ce19=_0x242b5e[_0x161eb4(0x39c)]['Settings'][_0x161eb4(0x2b1)][_0x161eb4(0x2b2)]??!![];if(!_0x39ce19)return;if(_0x18b60e[_0x161eb4(0x29e)]())for(const _0x3c50e6 of _0x6353f[_0x161eb4(0x390)]()){if(_0x3c50e6)_0x3c50e6[_0x161eb4(0x417)]();}}}const _0x422df4=this[_0x161eb4(0x1e1)](_0x4214e9['id'],_0x161eb4(0x47d))||0x0;if(_0x422df4!==0x0){const _0xf3ebee=this['_result'][_0x161eb4(0x1d2)]||0x0;this[_0x161eb4(0x303)](_0x422df4),this[_0x161eb4(0x406)][_0x161eb4(0x1d2)]+=_0xf3ebee;}const _0x362446=this['getStateData'](_0x4214e9['id'],_0x161eb4(0x49f))||0x0;_0x362446!==0x0&&this['gainSilentTp'](_0x362446);},VisuMZ[_0x306dc8(0x39c)]['Game_Actor_skillTypes']=Game_Actor['prototype'][_0x306dc8(0x429)],Game_Actor['prototype'][_0x306dc8(0x429)]=function(){const _0x165e0f=_0x306dc8,_0x10c81f=VisuMZ['SkillsStatesCore'][_0x165e0f(0x216)]['call'](this),_0x29c86d=VisuMZ[_0x165e0f(0x39c)][_0x165e0f(0x346)]['Skills'];let _0x4a6de6=_0x29c86d[_0x165e0f(0x4b3)];if($gameParty['inBattle']()){if(_0x165e0f(0x22c)!==_0x165e0f(0x22c)){_0x80b943['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x37a102=_0x3888dd(_0x49a5c1['$1'])[_0x165e0f(0x2a3)]()[_0x165e0f(0x29d)]()[_0x165e0f(0x471)](',');for(const _0x530505 of _0x37a102){_0x168920['categories'][_0x165e0f(0x3ec)](_0x530505[_0x165e0f(0x29d)]());}}else _0x4a6de6=_0x4a6de6[_0x165e0f(0x337)](_0x29c86d[_0x165e0f(0x2e9)]);}return _0x10c81f['filter'](_0x5eb460=>!_0x4a6de6['includes'](_0x5eb460));},Game_Actor[_0x306dc8(0x2d9)]['usableSkills']=function(){const _0x908b97=_0x306dc8;return this[_0x908b97(0x4c2)]()[_0x908b97(0x3f5)](_0x421b33=>this[_0x908b97(0x2c3)](_0x421b33));},Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x2c3)]=function(_0x1670f5){const _0x58c96f=_0x306dc8;if(!this[_0x58c96f(0x47c)](_0x1670f5))return![];if(!_0x1670f5)return![];if(!this['isSkillTypeMatchForUse'](_0x1670f5))return![];if(this[_0x58c96f(0x484)](_0x1670f5))return![];return!![];},Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x3d2)]=function(_0x51ab40){const _0x226a71=_0x306dc8,_0x3bc9f2=this['skillTypes'](),_0x3f1abd=DataManager[_0x226a71(0x287)](_0x51ab40),_0x4208ee=_0x3bc9f2[_0x226a71(0x3f5)](_0xd23c95=>_0x3f1abd[_0x226a71(0x1fd)](_0xd23c95));return _0x4208ee['length']>0x0;},Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x484)]=function(_0x5ad086){const _0x1d6da2=_0x306dc8;if(!VisuMZ['SkillsStatesCore'][_0x1d6da2(0x26e)](this,_0x5ad086))return!![];if(!VisuMZ[_0x1d6da2(0x39c)][_0x1d6da2(0x24c)](this,_0x5ad086))return!![];if(!VisuMZ['SkillsStatesCore'][_0x1d6da2(0x340)](this,_0x5ad086))return!![];return![];},Game_Actor[_0x306dc8(0x2d9)]['passiveStateObjects']=function(){const _0x202166=_0x306dc8;let _0x2f7a09=[this['actor'](),this[_0x202166(0x2ea)]()];_0x2f7a09=_0x2f7a09[_0x202166(0x337)](this[_0x202166(0x2a4)]()[_0x202166(0x3f5)](_0xa15dc5=>_0xa15dc5));for(const _0x19c6c5 of this[_0x202166(0x1e2)]){const _0x19d19e=$dataSkills[_0x19c6c5];if(_0x19d19e)_0x2f7a09[_0x202166(0x3ec)](_0x19d19e);}return _0x2f7a09;},Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x2d3)]=function(){const _0x30e1fd=_0x306dc8;Game_Battler[_0x30e1fd(0x2d9)][_0x30e1fd(0x2d3)][_0x30e1fd(0x227)](this);const _0x26ecb2=VisuMZ['SkillsStatesCore'][_0x30e1fd(0x346)][_0x30e1fd(0x2b1)]['Actor'];this[_0x30e1fd(0x358)][_0x30e1fd(0x2cd)]=this['_cache'][_0x30e1fd(0x2cd)][_0x30e1fd(0x337)](_0x26ecb2);},VisuMZ['SkillsStatesCore'][_0x306dc8(0x3c6)]=Game_Actor['prototype'][_0x306dc8(0x3c2)],Game_Actor['prototype'][_0x306dc8(0x3c2)]=function(_0xc91bc){const _0x33c332=_0x306dc8;VisuMZ[_0x33c332(0x39c)][_0x33c332(0x3c6)][_0x33c332(0x227)](this,_0xc91bc),this[_0x33c332(0x358)]={},this[_0x33c332(0x2cd)]();},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x4f8)]=Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x2f0)],Game_Actor[_0x306dc8(0x2d9)][_0x306dc8(0x2f0)]=function(_0x5bd450){const _0x539328=_0x306dc8;VisuMZ[_0x539328(0x39c)][_0x539328(0x4f8)][_0x539328(0x227)](this,_0x5bd450),this[_0x539328(0x358)]={},this[_0x539328(0x2cd)]();},Game_Actor['prototype']['stepsForTurn']=function(){const _0x2afa9f=_0x306dc8;return VisuMZ['SkillsStatesCore']['Settings'][_0x2afa9f(0x3d1)]['TurnEndOnMap']??0x14;},Game_Enemy[_0x306dc8(0x2d9)][_0x306dc8(0x222)]=function(){const _0x50c047=_0x306dc8;let _0x35f1ff=[this[_0x50c047(0x497)]()];return _0x35f1ff[_0x50c047(0x337)](this[_0x50c047(0x4c2)]());},Game_Enemy['prototype'][_0x306dc8(0x2d3)]=function(){const _0x284747=_0x306dc8;Game_Battler[_0x284747(0x2d9)]['addPassiveStatesByPluginParameters'][_0x284747(0x227)](this);const _0x2cfda9=VisuMZ[_0x284747(0x39c)][_0x284747(0x346)][_0x284747(0x2b1)][_0x284747(0x353)];this['_cache']['passiveStates']=this[_0x284747(0x358)]['passiveStates'][_0x284747(0x337)](_0x2cfda9);},Game_Enemy[_0x306dc8(0x2d9)][_0x306dc8(0x4c2)]=function(){const _0x29da34=_0x306dc8,_0x3162eb=[];for(const _0x531ecf of this['enemy']()[_0x29da34(0x43b)]){const _0x1a15f2=$dataSkills[_0x531ecf[_0x29da34(0x2a7)]];if(_0x1a15f2&&!_0x3162eb[_0x29da34(0x1fd)](_0x1a15f2))_0x3162eb[_0x29da34(0x3ec)](_0x1a15f2);}return _0x3162eb;},Game_Enemy['prototype'][_0x306dc8(0x4da)]=function(_0x4c6fc6){const _0x1c0e8f=_0x306dc8;return this[_0x1c0e8f(0x301)]($dataStates[_0x4c6fc6]);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x41b)]=Game_Unit[_0x306dc8(0x2d9)][_0x306dc8(0x258)],Game_Unit[_0x306dc8(0x2d9)][_0x306dc8(0x258)]=function(){const _0x5abd51=_0x306dc8;if(this[_0x5abd51(0x380)]())return!![];return VisuMZ['SkillsStatesCore'][_0x5abd51(0x41b)][_0x5abd51(0x227)](this);},Game_Unit[_0x306dc8(0x2d9)][_0x306dc8(0x380)]=function(){const _0x5aa384=_0x306dc8,_0x3a2a20=this['aliveMembers']();for(const _0x3abaf8 of _0x3a2a20){if(_0x5aa384(0x2d8)!=='uEicb')return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x5aa384(0x4f5)]():_0x2a73e9[_0x5aa384(0x39c)][_0x5aa384(0x346)][_0x5aa384(0x228)]['SkillMenuStatusRect']['call'](this);else{if(!_0x3abaf8['isGroupDefeatStateAffected']())return![];}}return!![];},VisuMZ['SkillsStatesCore']['Game_Troop_setup']=Game_Troop[_0x306dc8(0x2d9)][_0x306dc8(0x341)],Game_Troop[_0x306dc8(0x2d9)][_0x306dc8(0x341)]=function(_0x3dbcc7){const _0x206e22=_0x306dc8;VisuMZ[_0x206e22(0x39c)][_0x206e22(0x314)][_0x206e22(0x227)](this,_0x3dbcc7),this[_0x206e22(0x4ee)]();},Game_Troop['prototype'][_0x306dc8(0x4ee)]=function(){const _0x14d539=_0x306dc8;this[_0x14d539(0x2f4)]=Graphics[_0x14d539(0x32a)];},Game_Troop['prototype'][_0x306dc8(0x411)]=function(){const _0x3f41d0=_0x306dc8;return this[_0x3f41d0(0x2f4)]=this[_0x3f41d0(0x2f4)]||Graphics[_0x3f41d0(0x32a)],this[_0x3f41d0(0x2f4)];},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x2c0)]=function(){const _0x49b453=_0x306dc8;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x49b453(0x447)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x49b453(0x383)]())return this[_0x49b453(0x2ff)]()[_0x49b453(0x3bd)](/LOWER/i);else'pqjiS'!==_0x49b453(0x395)?Scene_ItemBase[_0x49b453(0x2d9)][_0x49b453(0x2fb)]['call'](this):_0x23e3cd['SkillsStatesCore'][_0x49b453(0x346)]['Buffs'][_0x49b453(0x35c)][_0x49b453(0x227)](this,_0x32d5d9);}},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x2fb)]=function(){const _0x40c0a6=_0x306dc8;if(ConfigManager[_0x40c0a6(0x304)]&&ConfigManager[_0x40c0a6(0x23d)]!==undefined)return ConfigManager[_0x40c0a6(0x23d)];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this['updatedLayoutStyle']()[_0x40c0a6(0x3bd)](/RIGHT/i):Scene_ItemBase[_0x40c0a6(0x2d9)]['isRightInputMode'][_0x40c0a6(0x227)](this);},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x2ff)]=function(){const _0x27a69d=_0x306dc8;return VisuMZ[_0x27a69d(0x39c)][_0x27a69d(0x346)]['Skills'][_0x27a69d(0x1db)];},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x455)]=function(){const _0x3d75f9=_0x306dc8;return this['_categoryWindow']&&this[_0x3d75f9(0x22a)][_0x3d75f9(0x455)]();},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x383)]=function(){const _0x5dd3a2=_0x306dc8;return VisuMZ[_0x5dd3a2(0x39c)]['Settings'][_0x5dd3a2(0x228)][_0x5dd3a2(0x400)];},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x27f)]=Scene_Skill['prototype']['helpWindowRect'],Scene_Skill['prototype'][_0x306dc8(0x49b)]=function(){const _0x4b2832=_0x306dc8;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x4b2832(0x356)]();else{if(_0x4b2832(0x4c9)!==_0x4b2832(0x436))return VisuMZ[_0x4b2832(0x39c)][_0x4b2832(0x27f)][_0x4b2832(0x227)](this);else{const _0x23aced=_0x4b2832(0x3e1)[_0x4b2832(0x505)](_0x131c37[_0x4b2832(0x4f9)]()),_0x3294e5=_0x4b2832(0x244)[_0x4b2832(0x505)](_0x5b60fa['index']()),_0x425737=_0x4b2832(0x48e)[_0x4b2832(0x505)](_0x52c8d5[_0x4b2832(0x411)]());return _0x4b2832(0x1cd)[_0x4b2832(0x505)](_0x23aced,_0x3294e5,_0x425737);}}},Scene_Skill['prototype'][_0x306dc8(0x356)]=function(){const _0x21fbe9=_0x306dc8,_0x5d609b=0x0,_0x185786=this[_0x21fbe9(0x2db)](),_0x5f1fbb=Graphics[_0x21fbe9(0x363)],_0x85d2ea=this[_0x21fbe9(0x3ca)]();return new Rectangle(_0x5d609b,_0x185786,_0x5f1fbb,_0x85d2ea);},VisuMZ[_0x306dc8(0x39c)]['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x306dc8(0x2d9)]['skillTypeWindowRect'],Scene_Skill['prototype'][_0x306dc8(0x1ce)]=function(){const _0x2f8919=_0x306dc8;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x2f8919(0x240)!=='kqIZK')return this[_0x2f8919(0x366)]();else _0x1f1794[_0x2f8919(0x3e3)](_0x235693,_0x297607),this[_0x2f8919(0x1d6)](_0x469f1f);}else return VisuMZ[_0x2f8919(0x39c)][_0x2f8919(0x4ff)][_0x2f8919(0x227)](this);},Scene_Skill['prototype'][_0x306dc8(0x302)]=function(){const _0x567931=_0x306dc8;return VisuMZ['SkillsStatesCore']['Settings']['Skills'][_0x567931(0x3ad)]??Scene_MenuBase[_0x567931(0x2d9)][_0x567931(0x302)][_0x567931(0x227)](this);},Scene_Skill['prototype'][_0x306dc8(0x366)]=function(){const _0x2c208b=_0x306dc8,_0x178e8d=this[_0x2c208b(0x302)](),_0x50b64a=this[_0x2c208b(0x3ba)](0x3,!![]),_0x4a4518=this[_0x2c208b(0x2fb)]()?Graphics['boxWidth']-_0x178e8d:0x0,_0x2addcc=this['mainAreaTop']();return new Rectangle(_0x4a4518,_0x2addcc,_0x178e8d,_0x50b64a);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x4b1)]=Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x320)],Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x320)]=function(){const _0x5dad21=_0x306dc8;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x5dad21(0x2f6)!==_0x5dad21(0x41e))return this['statusWindowRectSkillsStatesCore']();else{let _0x21643b=_0x351ef9[_0x5dad21(0x429)][_0x4c3208];if(_0x21643b[_0x5dad21(0x3bd)](/\\I\[(\d+)\]/i))return _0x21643b;if(this[_0x5dad21(0x37c)]()===_0x5dad21(0x323))return _0x21643b;const _0x35808d=_0x708a48[_0x5dad21(0x39c)][_0x5dad21(0x346)]['Skills'],_0x1ff281=_0x189967[_0x5dad21(0x213)][_0x5dad21(0x1fd)](_0x26fc60),_0x146728=_0x1ff281?_0x35808d['IconStypeMagic']:_0x35808d[_0x5dad21(0x40b)];return _0x5dad21(0x4ea)[_0x5dad21(0x505)](_0x146728,_0x21643b);}}else return VisuMZ['SkillsStatesCore'][_0x5dad21(0x4b1)]['call'](this);},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x3ee)]=function(){const _0x1b35eb=_0x306dc8,_0x4779fb=Graphics['boxWidth']-this['mainCommandWidth'](),_0x3417ff=this[_0x1b35eb(0x4a7)][_0x1b35eb(0x423)],_0x6373d=this[_0x1b35eb(0x2fb)]()?0x0:Graphics[_0x1b35eb(0x363)]-_0x4779fb,_0x4aace4=this[_0x1b35eb(0x1ee)]();return new Rectangle(_0x6373d,_0x4aace4,_0x4779fb,_0x3417ff);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x267)]=Scene_Skill[_0x306dc8(0x2d9)]['createItemWindow'],Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x385)]=function(){const _0x870b10=_0x306dc8;VisuMZ['SkillsStatesCore']['Scene_Skill_createItemWindow'][_0x870b10(0x227)](this),this['allowCreateShopStatusWindow']()&&this[_0x870b10(0x21c)]();},VisuMZ['SkillsStatesCore'][_0x306dc8(0x469)]=Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x234)],Scene_Skill['prototype'][_0x306dc8(0x234)]=function(){const _0x301610=_0x306dc8;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['itemWindowRectSkillsStatesCore']();else{if(_0x301610(0x394)==='MAmjX'){if(_0xfa84fc[_0x301610(0x304)]&&_0x1b055b[_0x301610(0x447)]!==_0x37c4ab)return _0x12893a[_0x301610(0x447)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x301610(0x2ff)]()['match'](/LOWER/i);else _0x5f3e9f['prototype'][_0x301610(0x2fb)][_0x301610(0x227)](this);}}else{const _0xdc21de=VisuMZ[_0x301610(0x39c)][_0x301610(0x469)][_0x301610(0x227)](this);return this[_0x301610(0x3f6)]()&&this[_0x301610(0x425)]()&&(_0xdc21de[_0x301610(0x443)]-=this[_0x301610(0x36e)]()),_0xdc21de;}}},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x3f7)]=function(){const _0x582a12=_0x306dc8,_0x5b56a4=Graphics['boxWidth']-this[_0x582a12(0x36e)](),_0x50dc2c=this['mainAreaHeight']()-this[_0x582a12(0x1ed)]['height'],_0x5b48ac=this[_0x582a12(0x2fb)]()?Graphics[_0x582a12(0x363)]-_0x5b56a4:0x0,_0x381ffb=this[_0x582a12(0x1ed)]['y']+this[_0x582a12(0x1ed)][_0x582a12(0x423)];return new Rectangle(_0x5b48ac,_0x381ffb,_0x5b56a4,_0x50dc2c);},Scene_Skill[_0x306dc8(0x2d9)]['allowCreateShopStatusWindow']=function(){const _0x32d64b=_0x306dc8;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else{if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x32d64b(0x489)==='WFsKa')return!![];else{if(typeof _0x29ca65!=='number')_0x1e5540=_0x5ad016['id'];if(this[_0x32d64b(0x317)](_0x3ded5a)){const _0x20e164=_0x19f629['stateMaximumTurns'](_0x5a83d8);this['_stateTurns'][_0x30d7fc]=_0x48a52a[_0x32d64b(0x2a8)](0x0,_0x20e164);if(this[_0x32d64b(0x215)][_0x5503a8]<=0x0)this[_0x32d64b(0x42e)](_0x17d75f);}}}else return VisuMZ[_0x32d64b(0x39c)][_0x32d64b(0x346)][_0x32d64b(0x228)][_0x32d64b(0x212)];}},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x425)]=function(){const _0x39302b=_0x306dc8;return VisuMZ[_0x39302b(0x39c)][_0x39302b(0x346)][_0x39302b(0x228)][_0x39302b(0x3b3)];},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x21c)]=function(){const _0xb1d3c7=_0x306dc8,_0xf2defa=this[_0xb1d3c7(0x444)]();this['_shopStatusWindow']=new Window_ShopStatus(_0xf2defa),this[_0xb1d3c7(0x3ff)](this['_shopStatusWindow']),this[_0xb1d3c7(0x293)][_0xb1d3c7(0x360)](this[_0xb1d3c7(0x33d)]);const _0x4b2f22=VisuMZ[_0xb1d3c7(0x39c)]['Settings'][_0xb1d3c7(0x228)][_0xb1d3c7(0x3a4)];this['_shopStatusWindow'][_0xb1d3c7(0x2ee)](_0x4b2f22||0x0);},Scene_Skill['prototype'][_0x306dc8(0x444)]=function(){const _0x482ad0=_0x306dc8;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x482ad0(0x449)!==_0x482ad0(0x503))return this[_0x482ad0(0x4f5)]();else this[_0x482ad0(0x3a3)](),_0x5658cf['SkillsStatesCore'][_0x482ad0(0x2b3)][_0x482ad0(0x227)](this);}else return VisuMZ[_0x482ad0(0x39c)][_0x482ad0(0x346)]['Skills'][_0x482ad0(0x272)][_0x482ad0(0x227)](this);},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x4f5)]=function(){const _0x7b416d=_0x306dc8,_0x221369=this['shopStatusWidth'](),_0x26adf5=this['_itemWindow'][_0x7b416d(0x423)],_0x5e181b=this[_0x7b416d(0x2fb)]()?0x0:Graphics[_0x7b416d(0x363)]-this[_0x7b416d(0x36e)](),_0x1b50a4=this['_itemWindow']['y'];return new Rectangle(_0x5e181b,_0x1b50a4,_0x221369,_0x26adf5);},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x36e)]=function(){const _0x305e5f=_0x306dc8;if(Imported['VisuMZ_1_ItemsEquipsCore']){if('QOBtE'===_0x305e5f(0x1d0)){const _0x7778a6=this[_0x305e5f(0x2ac)](_0x3f3ec5),_0x11c742=this['commandName'](_0x432e74),_0x2a4dc4=this[_0x305e5f(0x48c)](_0x11c742)[_0x305e5f(0x443)];this[_0x305e5f(0x230)](this[_0x305e5f(0x316)](_0x4081b4));const _0x25dee1=this['itemTextAlign']();if(_0x25dee1==='right')this[_0x305e5f(0x3e7)](_0x11c742,_0x7778a6['x']+_0x7778a6[_0x305e5f(0x443)]-_0x2a4dc4,_0x7778a6['y'],_0x2a4dc4);else{if(_0x25dee1==='center'){const _0x49fedb=_0x7778a6['x']+_0x1b9224[_0x305e5f(0x224)]((_0x7778a6[_0x305e5f(0x443)]-_0x2a4dc4)/0x2);this[_0x305e5f(0x3e7)](_0x11c742,_0x49fedb,_0x7778a6['y'],_0x2a4dc4);}else this[_0x305e5f(0x3e7)](_0x11c742,_0x7778a6['x'],_0x7778a6['y'],_0x2a4dc4);}}else return Scene_Shop[_0x305e5f(0x2d9)][_0x305e5f(0x38b)]();}else{if(_0x305e5f(0x24d)===_0x305e5f(0x33f)){this[_0x305e5f(0x1da)]=this[_0x305e5f(0x1da)]||{};const _0xee86cf=_0x690e37?this[_0x305e5f(0x39d)](_0x5d247e):this[_0x305e5f(0x29c)]();this[_0x305e5f(0x1da)][_0x10b5d3]=_0xee86cf;}else return 0x0;}},Scene_Skill[_0x306dc8(0x2d9)][_0x306dc8(0x263)]=function(){const _0x360d73=_0x306dc8;return this[_0x360d73(0x4a7)]&&this['_skillTypeWindow'][_0x360d73(0x3e4)]?TextManager[_0x360d73(0x2da)]:'';},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x268)]=Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x483)],Sprite_Gauge[_0x306dc8(0x2d9)]['initMembers']=function(){const _0x4af42b=_0x306dc8;VisuMZ[_0x4af42b(0x39c)][_0x4af42b(0x268)][_0x4af42b(0x227)](this),this[_0x4af42b(0x3c8)]=null;},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x36f)]=Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x341)],Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x341)]=function(_0x596da5,_0x2e6d6f){const _0x8f1513=_0x306dc8;this[_0x8f1513(0x3ab)](_0x596da5,_0x2e6d6f),_0x2e6d6f=_0x2e6d6f['toLowerCase'](),VisuMZ[_0x8f1513(0x39c)][_0x8f1513(0x36f)][_0x8f1513(0x227)](this,_0x596da5,_0x2e6d6f);},Sprite_Gauge['prototype'][_0x306dc8(0x3ab)]=function(_0x2fd218,_0xc1fdca){const _0x42b223=_0x306dc8,_0x1c2434=VisuMZ[_0x42b223(0x39c)][_0x42b223(0x346)][_0x42b223(0x348)][_0x42b223(0x3f5)](_0x4ae00d=>_0x4ae00d[_0x42b223(0x297)][_0x42b223(0x2a3)]()===_0xc1fdca[_0x42b223(0x2a3)]());_0x1c2434[_0x42b223(0x4aa)]>=0x1?this[_0x42b223(0x3c8)]=_0x1c2434[0x0]:this['_costSettings']=null;},VisuMZ['SkillsStatesCore'][_0x306dc8(0x276)]=Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x1d1)],Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x1d1)]=function(){const _0x1aff8d=_0x306dc8;if(this[_0x1aff8d(0x3ae)]&&this['_costSettings']){if(_0x1aff8d(0x3f2)!==_0x1aff8d(0x4a9))return this[_0x1aff8d(0x46e)]();else{if(_0x234371[_0x1aff8d(0x4aa)]>0x0)_0x19eb77+=this['skillCostSeparator']();_0x5c0dc2+=_0x503601(_0x3e5e0e['$1']);}}else return _0x1aff8d(0x4d2)===_0x1aff8d(0x351)?this[_0x1aff8d(0x4f6)](_0x43f6):VisuMZ[_0x1aff8d(0x39c)][_0x1aff8d(0x276)][_0x1aff8d(0x227)](this);},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x46e)]=function(){const _0x188c6b=_0x306dc8;return this[_0x188c6b(0x3c8)]['GaugeCurrentJS'][_0x188c6b(0x227)](this['_battler']);},VisuMZ['SkillsStatesCore'][_0x306dc8(0x4f3)]=Sprite_Gauge['prototype'][_0x306dc8(0x34c)],Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x34c)]=function(){const _0x1c85d5=_0x306dc8;if(this[_0x1c85d5(0x3ae)]&&this[_0x1c85d5(0x3c8)])return this['currentMaxValueSkillsStatesCore']();else{if(_0x1c85d5(0x49d)!==_0x1c85d5(0x49d))this[_0x1c85d5(0x4ce)](_0x3e5260[_0x1c85d5(0x25d)]()),this[_0x1c85d5(0x1f4)](_0x1321ea[_0x1c85d5(0x45a)]());else return VisuMZ['SkillsStatesCore'][_0x1c85d5(0x4f3)][_0x1c85d5(0x227)](this);}},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x2ba)]=function(){const _0x528da8=_0x306dc8;return this[_0x528da8(0x3c8)][_0x528da8(0x4c3)]['call'](this[_0x528da8(0x3ae)]);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x23c)]=Sprite_Gauge[_0x306dc8(0x2d9)]['gaugeRate'],Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x4ef)]=function(){const _0x252d0e=_0x306dc8,_0x2a16bb=VisuMZ[_0x252d0e(0x39c)]['Sprite_Gauge_gaugeRate'][_0x252d0e(0x227)](this);return _0x2a16bb['clamp'](0x0,0x1);},VisuMZ['SkillsStatesCore'][_0x306dc8(0x3ef)]=Sprite_Gauge[_0x306dc8(0x2d9)]['redraw'],Sprite_Gauge[_0x306dc8(0x2d9)]['redraw']=function(){const _0x3cb616=_0x306dc8;this[_0x3cb616(0x3ae)]&&this[_0x3cb616(0x3c8)]?(this[_0x3cb616(0x4db)][_0x3cb616(0x4b5)](),this[_0x3cb616(0x2dd)]()):VisuMZ[_0x3cb616(0x39c)][_0x3cb616(0x3ef)][_0x3cb616(0x227)](this);},Sprite_Gauge['prototype']['currentDisplayedValue']=function(){const _0x4afb5e=_0x306dc8;let _0x435564=this[_0x4afb5e(0x1d1)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x4afb5e(0x38e)]()&&(_0x435564=VisuMZ[_0x4afb5e(0x408)](_0x435564)),_0x435564;},Sprite_Gauge['prototype'][_0x306dc8(0x2dd)]=function(){const _0x2c6570=_0x306dc8;this['bitmap']['clear'](),this[_0x2c6570(0x3c8)][_0x2c6570(0x3cb)][_0x2c6570(0x227)](this);},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x27a)]=function(_0xe79d29,_0x62284d,_0x3be54b,_0x36b2ff,_0x2bfb41,_0xab19b1){const _0x1f8356=_0x306dc8,_0x1aa129=this['gaugeRate'](),_0x2c43c3=Math[_0x1f8356(0x224)]((_0x2bfb41-0x2)*_0x1aa129),_0x542af2=_0xab19b1-0x2,_0x470941=this[_0x1f8356(0x42c)]();this[_0x1f8356(0x4db)][_0x1f8356(0x34e)](_0x3be54b,_0x36b2ff,_0x2bfb41,_0xab19b1,_0x470941),this[_0x1f8356(0x4db)][_0x1f8356(0x4f4)](_0x3be54b+0x1,_0x36b2ff+0x1,_0x2c43c3,_0x542af2,_0xe79d29,_0x62284d);},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x22f)]=function(){const _0x42395f=_0x306dc8,_0x59b0d9=VisuMZ[_0x42395f(0x39c)][_0x42395f(0x346)][_0x42395f(0x439)];if(_0x59b0d9[_0x42395f(0x2a1)]==='number')return $gameSystem[_0x42395f(0x3bc)]();else{if(_0x42395f(0x473)===_0x42395f(0x1f7)){const _0x514973=this[_0x42395f(0x300)];_0x514973[_0x42395f(0x2fc)](_0x2c0bdc,0x0,_0x4eb574['y'],_0x514973[_0x42395f(0x23b)],'center');}else return $gameSystem[_0x42395f(0x3bb)]();}},Sprite_Gauge['prototype'][_0x306dc8(0x478)]=function(){const _0x3ff077=_0x306dc8,_0x40812e=VisuMZ[_0x3ff077(0x39c)][_0x3ff077(0x346)][_0x3ff077(0x439)];return _0x40812e['LabelFontMainType']==='number'?$gameSystem[_0x3ff077(0x25a)]()-0x6:$gameSystem[_0x3ff077(0x25a)]()-0x2;},Sprite_Gauge['prototype'][_0x306dc8(0x31b)]=function(){const _0x2e7cb8=_0x306dc8,_0x274f2e=VisuMZ[_0x2e7cb8(0x39c)][_0x2e7cb8(0x346)][_0x2e7cb8(0x439)];return _0x274f2e[_0x2e7cb8(0x34d)]===_0x2e7cb8(0x1e0)?$gameSystem[_0x2e7cb8(0x3bc)]():$gameSystem[_0x2e7cb8(0x3bb)]();},Sprite_Gauge['prototype']['valueFontSize']=function(){const _0x3c4d4d=_0x306dc8,_0x3e94ae=VisuMZ[_0x3c4d4d(0x39c)]['Settings'][_0x3c4d4d(0x439)];if(_0x3e94ae[_0x3c4d4d(0x34d)]===_0x3c4d4d(0x1e0))return $gameSystem[_0x3c4d4d(0x25a)]()-0x6;else{if('TUnSt'==='TUnSt')return $gameSystem[_0x3c4d4d(0x25a)]()-0x2;else{this[_0x3c4d4d(0x409)]=this['_stypeIDs']||{};if(this[_0x3c4d4d(0x409)][_0x5d0931['id']])return this['_stypeIDs'][_0x5ea1c4['id']];this[_0x3c4d4d(0x409)][_0x4268a2['id']]=[_0x9b8b6e[_0x3c4d4d(0x30b)]];if(_0x3ab748[_0x3c4d4d(0x324)][_0x3c4d4d(0x3bd)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x526cb4=_0x69f00f[_0x3c4d4d(0x49e)]('['+_0x8fdda2['$1'][_0x3c4d4d(0x3bd)](/\d+/g)+']');this[_0x3c4d4d(0x409)][_0x55f4a8['id']]=this[_0x3c4d4d(0x409)][_0x758610['id']][_0x3c4d4d(0x337)](_0x526cb4);}else{if(_0x58e35e[_0x3c4d4d(0x324)][_0x3c4d4d(0x3bd)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x3ccbff=_0x55c8c9['$1'][_0x3c4d4d(0x471)](',');for(const _0x15cf21 of _0x3ccbff){const _0x36b612=_0x3496b6['getStypeIdWithName'](_0x15cf21);if(_0x36b612)this[_0x3c4d4d(0x409)][_0x4190b7['id']][_0x3c4d4d(0x3ec)](_0x36b612);}}}return this[_0x3c4d4d(0x409)][_0x21d64c['id']];}}},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x349)]=function(){const _0x368e63=_0x306dc8,_0x404547=VisuMZ[_0x368e63(0x39c)][_0x368e63(0x346)]['Gauge'];if(_0x404547['MatchLabelColor']){if(_0x404547['MatchLabelGaugeColor']===0x1){if(_0x368e63(0x2f1)==='tqELm')return this[_0x368e63(0x1d4)]();else _0x486913['categories']['push'](_0x368e63(0x3d0));}else{if(_0x404547[_0x368e63(0x3e0)]===0x2)return this[_0x368e63(0x2b4)]();}}const _0x33f4a7=_0x404547[_0x368e63(0x27c)];return ColorManager[_0x368e63(0x2a2)](_0x33f4a7);},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x4b6)]=function(){const _0x26497f=_0x306dc8,_0x13248a=VisuMZ[_0x26497f(0x39c)][_0x26497f(0x346)][_0x26497f(0x439)];if(this[_0x26497f(0x37d)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else{if(_0x13248a[_0x26497f(0x4ac)])return _0x26497f(0x3a1);else{if(_0x26497f(0x321)===_0x26497f(0x4e3)){if(!_0x45f43e['value'](_0x226562))return![];}else return ColorManager[_0x26497f(0x45a)]();}}},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x37d)]=function(){const _0x4d512b=_0x306dc8;return VisuMZ[_0x4d512b(0x39c)]['Settings']['Gauge'][_0x4d512b(0x259)]||0x0;},Sprite_Gauge[_0x306dc8(0x2d9)][_0x306dc8(0x386)]=function(){const _0x217259=_0x306dc8,_0x39b481=VisuMZ[_0x217259(0x39c)][_0x217259(0x346)][_0x217259(0x439)];if(this[_0x217259(0x48b)]()<=0x0)return _0x217259(0x3d4)!=='lHABn'?_0x5caf12[_0x217259(0x25a)]()-0x2:_0x217259(0x1de);else{if(_0x39b481['ValueOutlineSolid']){if(_0x217259(0x27d)!=='VZdJo')return _0x217259(0x3a1);else this[_0x217259(0x4db)][_0x217259(0x4b5)](),this[_0x217259(0x3c8)][_0x217259(0x3cb)][_0x217259(0x227)](this);}else return ColorManager[_0x217259(0x45a)]();}},Sprite_Gauge[_0x306dc8(0x2d9)]['valueOutlineWidth']=function(){const _0x34bb62=_0x306dc8;return VisuMZ[_0x34bb62(0x39c)][_0x34bb62(0x346)][_0x34bb62(0x439)][_0x34bb62(0x4d4)]||0x0;},VisuMZ['SkillsStatesCore'][_0x306dc8(0x498)]=Sprite_StateIcon['prototype'][_0x306dc8(0x2ed)],Sprite_StateIcon['prototype'][_0x306dc8(0x2ed)]=function(){const _0xe7bb99=_0x306dc8;VisuMZ[_0xe7bb99(0x39c)][_0xe7bb99(0x498)][_0xe7bb99(0x227)](this),this[_0xe7bb99(0x313)]();},Sprite_StateIcon[_0x306dc8(0x2d9)][_0x306dc8(0x313)]=function(){const _0x28dee4=_0x306dc8,_0x291bb2=Window_Base[_0x28dee4(0x2d9)][_0x28dee4(0x410)]();this['_turnDisplaySprite']=new Sprite(),this['_turnDisplaySprite'][_0x28dee4(0x4db)]=new Bitmap(ImageManager['iconWidth'],_0x291bb2),this[_0x28dee4(0x3a5)]['anchor']['x']=this[_0x28dee4(0x229)]['x'],this['_turnDisplaySprite'][_0x28dee4(0x229)]['y']=this[_0x28dee4(0x229)]['y'],this[_0x28dee4(0x274)](this[_0x28dee4(0x3a5)]),this['contents']=this['_turnDisplaySprite']['bitmap'];},VisuMZ[_0x306dc8(0x39c)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x306dc8(0x2d9)]['updateFrame'],Sprite_StateIcon[_0x306dc8(0x2d9)]['updateFrame']=function(){const _0x91182=_0x306dc8;VisuMZ['SkillsStatesCore'][_0x91182(0x219)][_0x91182(0x227)](this),this[_0x91182(0x3c5)]();},Sprite_StateIcon[_0x306dc8(0x2d9)][_0x306dc8(0x2fc)]=function(_0x334e6e,_0x46b325,_0x47ad4e,_0x429258,_0x1f75a2){const _0x3fd199=_0x306dc8;this[_0x3fd199(0x322)][_0x3fd199(0x2fc)](_0x334e6e,_0x46b325,_0x47ad4e,_0x429258,this[_0x3fd199(0x322)][_0x3fd199(0x423)],_0x1f75a2);},Sprite_StateIcon[_0x306dc8(0x2d9)][_0x306dc8(0x3c5)]=function(){const _0x1b61f2=_0x306dc8;this['resetFontSettings'](),this['contents'][_0x1b61f2(0x4b5)]();const _0x1f8ceb=this[_0x1b61f2(0x3ae)];if(!_0x1f8ceb)return;const _0x2de382=_0x1f8ceb[_0x1b61f2(0x4e8)]()['filter'](_0x567619=>_0x567619[_0x1b61f2(0x3d9)]>0x0),_0x29ebac=[...Array(0x8)['keys']()][_0x1b61f2(0x3f5)](_0x51ca53=>_0x1f8ceb[_0x1b61f2(0x40e)](_0x51ca53)!==0x0),_0x26d6ff=this[_0x1b61f2(0x402)],_0x347e9f=_0x2de382[_0x26d6ff];if(_0x347e9f){if(_0x1b61f2(0x2bf)!=='ibybW'){const _0x289e7c=this[_0x1b61f2(0x300)];_0x289e7c[_0x1b61f2(0x322)][_0x1b61f2(0x4b5)]();const _0x44caf4=this[_0x1b61f2(0x290)](this[_0x1b61f2(0x412)]());if(_0x44caf4==='icon'&&this['maxItems']()>0x0){const _0x1f4689=this[_0x1b61f2(0x2ac)](this[_0x1b61f2(0x412)]());let _0x195ec7=this[_0x1b61f2(0x399)](this['index']());_0x195ec7=_0x195ec7[_0x1b61f2(0x30d)](/\\I\[(\d+)\]/gi,''),_0x289e7c[_0x1b61f2(0x2c7)](),this[_0x1b61f2(0x283)](_0x195ec7,_0x1f4689),this[_0x1b61f2(0x4a3)](_0x195ec7,_0x1f4689),this[_0x1b61f2(0x39e)](_0x195ec7,_0x1f4689);}}else Window_Base[_0x1b61f2(0x2d9)][_0x1b61f2(0x3da)][_0x1b61f2(0x227)](this,_0x1f8ceb,_0x347e9f,0x0,0x0),Window_Base[_0x1b61f2(0x2d9)][_0x1b61f2(0x481)][_0x1b61f2(0x227)](this,_0x1f8ceb,_0x347e9f,0x0,0x0);}else{const _0x409789=_0x29ebac[_0x26d6ff-_0x2de382[_0x1b61f2(0x4aa)]];if(_0x409789===undefined)return;Window_Base['prototype'][_0x1b61f2(0x381)][_0x1b61f2(0x227)](this,_0x1f8ceb,_0x409789,0x0,0x0),Window_Base['prototype'][_0x1b61f2(0x46b)]['call'](this,_0x1f8ceb,_0x409789,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x306dc8(0x2c7)]=function(){const _0x1ca18f=_0x306dc8;this[_0x1ca18f(0x322)][_0x1ca18f(0x2b5)]=$gameSystem[_0x1ca18f(0x3bb)](),this[_0x1ca18f(0x322)][_0x1ca18f(0x28c)]=$gameSystem[_0x1ca18f(0x25a)](),this[_0x1ca18f(0x45f)]();},Sprite_StateIcon[_0x306dc8(0x2d9)][_0x306dc8(0x45f)]=function(){const _0x29acec=_0x306dc8;this['changeTextColor'](ColorManager[_0x29acec(0x25d)]()),this[_0x29acec(0x1f4)](ColorManager[_0x29acec(0x45a)]());},Sprite_StateIcon[_0x306dc8(0x2d9)]['changeTextColor']=function(_0x285e90){const _0x184eef=_0x306dc8;this[_0x184eef(0x322)][_0x184eef(0x2df)]=_0x285e90;},Sprite_StateIcon[_0x306dc8(0x2d9)]['changeOutlineColor']=function(_0xea9556){const _0x3e31b1=_0x306dc8;this[_0x3e31b1(0x322)][_0x3e31b1(0x45a)]=_0xea9556;},Sprite_StateIcon['prototype'][_0x306dc8(0x319)]=function(){const _0x49aacd=_0x306dc8;this[_0x49aacd(0x256)]=!![],this[_0x49aacd(0x3fd)]();},Window_Base[_0x306dc8(0x2d9)]['drawSkillCost']=function(_0x2611f0,_0x493167,_0x2853be,_0x45f10d,_0x5282c8){const _0x47ab66=_0x306dc8,_0x4bdfa6=this[_0x47ab66(0x24e)](_0x2611f0,_0x493167),_0x2bf721=this[_0x47ab66(0x48c)](_0x4bdfa6,_0x2853be,_0x45f10d,_0x5282c8),_0x40447f=_0x2853be+_0x5282c8-_0x2bf721[_0x47ab66(0x443)];this['drawTextEx'](_0x4bdfa6,_0x40447f,_0x45f10d,_0x5282c8),this[_0x47ab66(0x2c7)]();},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x24e)]=function(_0x48589a,_0x2d00af){const _0x2035e6=_0x306dc8;let _0x2ed594='';for(settings of VisuMZ[_0x2035e6(0x39c)]['Settings'][_0x2035e6(0x348)]){if(!this[_0x2035e6(0x2a5)](_0x48589a,_0x2d00af,settings))continue;if(_0x2ed594['length']>0x0)_0x2ed594+=this[_0x2035e6(0x442)]();_0x2ed594+=this[_0x2035e6(0x38f)](_0x48589a,_0x2d00af,settings);}_0x2ed594=this['makeAdditionalSkillCostText'](_0x48589a,_0x2d00af,_0x2ed594);if(_0x2d00af['note'][_0x2035e6(0x3bd)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x2035e6(0x4d3)===_0x2035e6(0x4d3)){if(_0x2ed594[_0x2035e6(0x4aa)]>0x0)_0x2ed594+=this[_0x2035e6(0x442)]();_0x2ed594+=String(RegExp['$1']);}else{const _0x1be4b1=this[_0x2035e6(0x399)](_0x10cba3);if(_0x1be4b1['match'](/\\I\[(\d+)\]/i)){const _0x3e8573=this['itemLineRect'](_0x59f927),_0x10e056=this[_0x2035e6(0x48c)](_0x1be4b1)[_0x2035e6(0x443)];return _0x10e056<=_0x3e8573[_0x2035e6(0x443)]?_0x2035e6(0x1fa):'icon';}}}return _0x2ed594;},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x375)]=function(_0x5f58a7,_0x14b1a9,_0x49a4bc){return _0x49a4bc;},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x2a5)]=function(_0x1ea0bf,_0x14c528,_0x509265){const _0x3f32d0=_0x306dc8;let _0x319382=_0x509265[_0x3f32d0(0x3a2)][_0x3f32d0(0x227)](_0x1ea0bf,_0x14c528);return _0x319382=_0x1ea0bf[_0x3f32d0(0x29f)](_0x14c528,_0x319382,_0x509265),_0x509265['ShowJS'][_0x3f32d0(0x227)](_0x1ea0bf,_0x14c528,_0x319382,_0x509265);},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x38f)]=function(_0x9b040b,_0xc449f8,_0x2f5a1f){const _0xbdfc51=_0x306dc8;let _0x3bb0b3=_0x2f5a1f['CalcJS']['call'](_0x9b040b,_0xc449f8);return _0x3bb0b3=_0x9b040b[_0xbdfc51(0x29f)](_0xc449f8,_0x3bb0b3,_0x2f5a1f),_0x2f5a1f[_0xbdfc51(0x392)][_0xbdfc51(0x227)](_0x9b040b,_0xc449f8,_0x3bb0b3,_0x2f5a1f);},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x442)]=function(){return'\x20';},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x1f1)]=function(_0x3abea8,_0x4ede9e,_0x5d8a94,_0x3a35d7){const _0x3f34f4=_0x306dc8;if(!_0x3abea8)return;VisuMZ[_0x3f34f4(0x39c)]['Window_StatusBase_drawActorIcons'][_0x3f34f4(0x227)](this,_0x3abea8,_0x4ede9e,_0x5d8a94,_0x3a35d7),this['drawActorIconsAllTurnCounters'](_0x3abea8,_0x4ede9e,_0x5d8a94,_0x3a35d7);},Window_Base[_0x306dc8(0x2d9)]['drawActorIconsAllTurnCounters']=function(_0x59c5d1,_0x25637d,_0x36aafc,_0x535a10){const _0x58e4a2=_0x306dc8;_0x535a10=_0x535a10||0x90;const _0x5aa30b=ImageManager['iconWidth'],_0x49319e=_0x59c5d1['allIcons']()[_0x58e4a2(0x3f4)](0x0,Math[_0x58e4a2(0x224)](_0x535a10/_0x5aa30b)),_0x5a6e7b=_0x59c5d1['states']()[_0x58e4a2(0x3f5)](_0x5ce75f=>_0x5ce75f[_0x58e4a2(0x3d9)]>0x0),_0x2e3699=[...Array(0x8)[_0x58e4a2(0x30c)]()]['filter'](_0x1fca7d=>_0x59c5d1[_0x58e4a2(0x40e)](_0x1fca7d)!==0x0),_0xdae6b8=[];let _0x4aa5e8=_0x25637d;for(let _0x20f051=0x0;_0x20f051<_0x49319e[_0x58e4a2(0x4aa)];_0x20f051++){this['resetFontSettings']();const _0x28e8d=_0x5a6e7b[_0x20f051];if(_0x28e8d)!_0xdae6b8[_0x58e4a2(0x1fd)](_0x28e8d)&&this['drawActorStateTurns'](_0x59c5d1,_0x28e8d,_0x4aa5e8,_0x36aafc),this['drawActorStateData'](_0x59c5d1,_0x28e8d,_0x4aa5e8,_0x36aafc),_0xdae6b8[_0x58e4a2(0x3ec)](_0x28e8d);else{const _0x55ef48=_0x2e3699[_0x20f051-_0x5a6e7b[_0x58e4a2(0x4aa)]];this[_0x58e4a2(0x381)](_0x59c5d1,_0x55ef48,_0x4aa5e8,_0x36aafc),this[_0x58e4a2(0x46b)](_0x59c5d1,_0x55ef48,_0x4aa5e8,_0x36aafc);}_0x4aa5e8+=_0x5aa30b;}},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x3da)]=function(_0x4879fb,_0x670a31,_0x2e8a45,_0x21332a){const _0x4b85c3=_0x306dc8;if(!VisuMZ[_0x4b85c3(0x39c)][_0x4b85c3(0x346)][_0x4b85c3(0x3d1)][_0x4b85c3(0x44a)])return;if(!_0x4879fb['isStateAffected'](_0x670a31['id']))return;if(_0x670a31['autoRemovalTiming']===0x0)return;if(_0x670a31[_0x4b85c3(0x324)]['match'](/<HIDE STATE TURNS>/i))return;const _0x35c228=_0x4879fb['stateTurns'](_0x670a31['id']),_0x1d9af9=ImageManager[_0x4b85c3(0x4f2)],_0x32b7d8=ColorManager['stateColor'](_0x670a31);this['changeTextColor'](_0x32b7d8),this['changeOutlineColor'](_0x4b85c3(0x3a1)),this[_0x4b85c3(0x322)][_0x4b85c3(0x32b)]=!![],this[_0x4b85c3(0x322)]['fontSize']=VisuMZ[_0x4b85c3(0x39c)]['Settings']['States']['TurnFontSize'],_0x2e8a45+=VisuMZ[_0x4b85c3(0x39c)][_0x4b85c3(0x346)][_0x4b85c3(0x3d1)][_0x4b85c3(0x433)],_0x21332a+=VisuMZ[_0x4b85c3(0x39c)]['Settings']['States'][_0x4b85c3(0x491)],this[_0x4b85c3(0x2fc)](_0x35c228,_0x2e8a45,_0x21332a,_0x1d9af9,_0x4b85c3(0x45c)),this[_0x4b85c3(0x322)][_0x4b85c3(0x32b)]=![],this[_0x4b85c3(0x2c7)]();},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x481)]=function(_0x49f84c,_0x2f2a13,_0x56f820,_0x274a8b){const _0x4c5386=_0x306dc8;if(!VisuMZ['SkillsStatesCore'][_0x4c5386(0x346)]['States']['ShowData'])return;const _0x15e6d6=ImageManager[_0x4c5386(0x4f2)],_0x611b2b=ImageManager[_0x4c5386(0x3a9)]/0x2,_0x488ccc=ColorManager[_0x4c5386(0x25d)]();this['changeTextColor'](_0x488ccc),this[_0x4c5386(0x1f4)]('rgba(0,\x200,\x200,\x201)'),this['contents']['fontBold']=!![],this[_0x4c5386(0x322)]['fontSize']=VisuMZ[_0x4c5386(0x39c)][_0x4c5386(0x346)][_0x4c5386(0x3d1)][_0x4c5386(0x266)],_0x56f820+=VisuMZ[_0x4c5386(0x39c)]['Settings'][_0x4c5386(0x3d1)][_0x4c5386(0x2d4)],_0x274a8b+=VisuMZ[_0x4c5386(0x39c)][_0x4c5386(0x346)][_0x4c5386(0x3d1)]['DataOffsetY'];const _0x49c7df=String(_0x49f84c[_0x4c5386(0x204)](_0x2f2a13['id']));this['drawText'](_0x49c7df,_0x56f820,_0x274a8b,_0x15e6d6,_0x4c5386(0x1e8)),this['contents'][_0x4c5386(0x32b)]=![],this[_0x4c5386(0x2c7)]();},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x381)]=function(_0x94743a,_0x28782b,_0xca24e0,_0x279f11){const _0x28a7cc=_0x306dc8;if(!VisuMZ[_0x28a7cc(0x39c)][_0x28a7cc(0x346)][_0x28a7cc(0x310)][_0x28a7cc(0x44a)])return;const _0x44b5ff=_0x94743a['buff'](_0x28782b);if(_0x44b5ff===0x0)return;const _0x263be0=_0x94743a['buffTurns'](_0x28782b),_0x11e9ae=ImageManager['iconWidth'],_0x31b6c8=_0x44b5ff>0x0?ColorManager[_0x28a7cc(0x494)]():ColorManager['debuffColor']();this[_0x28a7cc(0x4ce)](_0x31b6c8),this[_0x28a7cc(0x1f4)]('rgba(0,\x200,\x200,\x201)'),this['contents']['fontBold']=!![],this[_0x28a7cc(0x322)][_0x28a7cc(0x28c)]=VisuMZ['SkillsStatesCore'][_0x28a7cc(0x346)][_0x28a7cc(0x310)][_0x28a7cc(0x286)],_0xca24e0+=VisuMZ['SkillsStatesCore']['Settings'][_0x28a7cc(0x310)][_0x28a7cc(0x433)],_0x279f11+=VisuMZ[_0x28a7cc(0x39c)][_0x28a7cc(0x346)]['Buffs']['TurnOffsetY'],this['drawText'](_0x263be0,_0xca24e0,_0x279f11,_0x11e9ae,'right'),this['contents'][_0x28a7cc(0x32b)]=![],this[_0x28a7cc(0x2c7)]();},Window_Base[_0x306dc8(0x2d9)][_0x306dc8(0x46b)]=function(_0xcb7aba,_0x243c36,_0x190ee7,_0x1a7606){const _0x1ed1ca=_0x306dc8;if(!VisuMZ[_0x1ed1ca(0x39c)][_0x1ed1ca(0x346)][_0x1ed1ca(0x310)]['ShowData'])return;const _0x47a5e8=_0xcb7aba[_0x1ed1ca(0x48d)](_0x243c36),_0x341c6=_0xcb7aba[_0x1ed1ca(0x40e)](_0x243c36),_0x167fab=ImageManager[_0x1ed1ca(0x4f2)],_0x1aa4eb=ImageManager['iconHeight']/0x2,_0x409460=_0x341c6>0x0?ColorManager[_0x1ed1ca(0x494)]():ColorManager['debuffColor']();this['changeTextColor'](_0x409460),this[_0x1ed1ca(0x1f4)](_0x1ed1ca(0x3a1)),this[_0x1ed1ca(0x322)][_0x1ed1ca(0x32b)]=!![],this['contents'][_0x1ed1ca(0x28c)]=VisuMZ[_0x1ed1ca(0x39c)]['Settings'][_0x1ed1ca(0x310)][_0x1ed1ca(0x266)],_0x190ee7+=VisuMZ[_0x1ed1ca(0x39c)]['Settings'][_0x1ed1ca(0x310)][_0x1ed1ca(0x2d4)],_0x1a7606+=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x1ed1ca(0x306)];const _0x5b63ba=_0x1ed1ca(0x3cd)[_0x1ed1ca(0x505)](Math[_0x1ed1ca(0x507)](_0x47a5e8*0x64));this[_0x1ed1ca(0x2fc)](_0x5b63ba,_0x190ee7,_0x1a7606,_0x167fab,_0x1ed1ca(0x1e8)),this['contents']['fontBold']=![],this[_0x1ed1ca(0x2c7)]();},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x4c6)]=Window_StatusBase['prototype'][_0x306dc8(0x331)],Window_StatusBase[_0x306dc8(0x2d9)][_0x306dc8(0x331)]=function(_0x297975,_0x1c961f,_0x1a1bad,_0x42f621){const _0x289a2c=_0x306dc8;if(_0x297975[_0x289a2c(0x3b9)]())_0x1c961f=this['convertGaugeTypeSkillsStatesCore'](_0x297975,_0x1c961f);this['placeExactGauge'](_0x297975,_0x1c961f,_0x1a1bad,_0x42f621);},Window_StatusBase['prototype'][_0x306dc8(0x255)]=function(_0x34ef66,_0x4b16d7,_0x349775,_0x11edef){const _0x54a5c5=_0x306dc8;if([_0x54a5c5(0x403),_0x54a5c5(0x4b0)][_0x54a5c5(0x1fd)](_0x4b16d7[_0x54a5c5(0x1ff)]()))return;VisuMZ[_0x54a5c5(0x39c)][_0x54a5c5(0x4c6)][_0x54a5c5(0x227)](this,_0x34ef66,_0x4b16d7,_0x349775,_0x11edef);},Window_StatusBase[_0x306dc8(0x2d9)][_0x306dc8(0x4e5)]=function(_0x4f9f44,_0x8cf8fb){const _0x96679b=_0x306dc8,_0x1738a8=_0x4f9f44['currentClass']()[_0x96679b(0x324)];if(_0x8cf8fb==='hp'&&_0x1738a8['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x8cf8fb==='mp'&&_0x1738a8[_0x96679b(0x3bd)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x96679b(0x239)!==_0x96679b(0x239)){const _0x4ad6e8=_0x375e9c['note'];if(_0x4ad6e8['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x109607=_0x3ac1b8(_0x17a363['$1']),_0x4c5645=_0x96679b(0x347)['format'](_0x109607);_0x43a40d[_0x96679b(0x39c)][_0x96679b(0x3db)][_0x20be0f['id']]=new _0x14cc97(_0x96679b(0x2be),_0x4c5645);}if(_0x4ad6e8[_0x96679b(0x3bd)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x16836d=_0x2f24fe(_0x3c3289['$1']),_0xa99f8b=_0x96679b(0x281)[_0x96679b(0x505)](_0x16836d);_0x30301d[_0x96679b(0x39c)]['skillVisibleJS'][_0x5a639b['id']]=new _0x45c70c(_0x96679b(0x2be),_0xa99f8b);}}else return String(RegExp['$1']);}else{if(_0x8cf8fb==='tp'&&_0x1738a8[_0x96679b(0x3bd)](/<REPLACE TP GAUGE:[ ](.*)>/i)){if(_0x96679b(0x1dd)===_0x96679b(0x1dd))return String(RegExp['$1']);else{const _0x22924d=this['mainCommandWidth'](),_0x13390a=this[_0x96679b(0x3ba)](0x3,!![]),_0x493737=this[_0x96679b(0x2fb)]()?_0x152b37['boxWidth']-_0x22924d:0x0,_0x766e2e=this[_0x96679b(0x1ee)]();return new _0x551c38(_0x493737,_0x766e2e,_0x22924d,_0x13390a);}}else return _0x8cf8fb;}}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x4c7)]=Window_StatusBase[_0x306dc8(0x2d9)][_0x306dc8(0x1f1)],Window_StatusBase[_0x306dc8(0x2d9)][_0x306dc8(0x1f1)]=function(_0x522642,_0x11eda4,_0x4ce3d8,_0x7a6dc0){const _0x177583=_0x306dc8;if(!_0x522642)return;Window_Base[_0x177583(0x2d9)][_0x177583(0x1f1)][_0x177583(0x227)](this,_0x522642,_0x11eda4,_0x4ce3d8,_0x7a6dc0);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x269)]=Window_SkillType[_0x306dc8(0x2d9)]['initialize'],Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x488)]=function(_0x1a5ecf){const _0x33bd37=_0x306dc8;VisuMZ[_0x33bd37(0x39c)][_0x33bd37(0x269)][_0x33bd37(0x227)](this,_0x1a5ecf),this[_0x33bd37(0x4dd)](_0x1a5ecf);},Window_SkillType['prototype'][_0x306dc8(0x4dd)]=function(_0x3a1332){const _0x1b2093=_0x306dc8,_0x1c75e8=new Rectangle(0x0,0x0,_0x3a1332[_0x1b2093(0x443)],_0x3a1332['height']);this[_0x1b2093(0x300)]=new Window_Base(_0x1c75e8),this[_0x1b2093(0x300)][_0x1b2093(0x359)]=0x0,this[_0x1b2093(0x274)](this[_0x1b2093(0x300)]),this[_0x1b2093(0x344)]();},Window_SkillType['prototype'][_0x306dc8(0x468)]=function(){const _0x1b4719=_0x306dc8;Window_Command[_0x1b4719(0x2d9)][_0x1b4719(0x468)][_0x1b4719(0x227)](this);if(this[_0x1b4719(0x300)])this['updateCommandNameWindow']();},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x344)]=function(){const _0x14d8e1=_0x306dc8,_0x27877f=this[_0x14d8e1(0x300)];_0x27877f[_0x14d8e1(0x322)][_0x14d8e1(0x4b5)]();const _0x2c9bc2=this[_0x14d8e1(0x290)](this[_0x14d8e1(0x412)]());if(_0x2c9bc2===_0x14d8e1(0x456)&&this[_0x14d8e1(0x206)]()>0x0){const _0x5e82cf=this[_0x14d8e1(0x2ac)](this[_0x14d8e1(0x412)]());let _0x2ef174=this[_0x14d8e1(0x399)](this[_0x14d8e1(0x412)]());_0x2ef174=_0x2ef174[_0x14d8e1(0x30d)](/\\I\[(\d+)\]/gi,''),_0x27877f['resetFontSettings'](),this[_0x14d8e1(0x283)](_0x2ef174,_0x5e82cf),this[_0x14d8e1(0x4a3)](_0x2ef174,_0x5e82cf),this['commandNameWindowCenter'](_0x2ef174,_0x5e82cf);}},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x283)]=function(_0x11e598,_0x315678){},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x4a3)]=function(_0x38ae4f,_0x54d11a){const _0x24b852=_0x306dc8,_0x166126=this['_commandNameWindow'];_0x166126[_0x24b852(0x2fc)](_0x38ae4f,0x0,_0x54d11a['y'],_0x166126['innerWidth'],_0x24b852(0x1e8));},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x39e)]=function(_0x1dfe23,_0x5c2204){const _0x29c308=_0x306dc8,_0x53998d=this[_0x29c308(0x300)],_0x449b37=$gameSystem[_0x29c308(0x40a)](),_0x53823b=_0x5c2204['x']+Math[_0x29c308(0x224)](_0x5c2204[_0x29c308(0x443)]/0x2)+_0x449b37;_0x53998d['x']=_0x53998d[_0x29c308(0x443)]/-0x2+_0x53823b,_0x53998d['y']=Math[_0x29c308(0x224)](_0x5c2204[_0x29c308(0x423)]/0x2);},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x455)]=function(){const _0x4a99d5=_0x306dc8;return Imported[_0x4a99d5(0x211)]&&Window_Command['prototype'][_0x4a99d5(0x455)][_0x4a99d5(0x227)](this);},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x2ad)]=function(){const _0x42321b=_0x306dc8;if(!this[_0x42321b(0x4f0)])return;const _0x12e40d=this[_0x42321b(0x4f0)][_0x42321b(0x429)]();for(const _0x379bf0 of _0x12e40d){const _0x52c8c1=this[_0x42321b(0x1e5)](_0x379bf0);this[_0x42321b(0x35a)](_0x52c8c1,_0x42321b(0x2be),!![],_0x379bf0);}},Window_SkillType[_0x306dc8(0x2d9)]['makeCommandName']=function(_0x528736){const _0x9c5a9c=_0x306dc8;let _0x25fa7e=$dataSystem[_0x9c5a9c(0x429)][_0x528736];if(_0x25fa7e[_0x9c5a9c(0x3bd)](/\\I\[(\d+)\]/i))return _0x25fa7e;if(this[_0x9c5a9c(0x37c)]()===_0x9c5a9c(0x323))return _0x25fa7e;const _0x3c7a06=VisuMZ[_0x9c5a9c(0x39c)][_0x9c5a9c(0x346)][_0x9c5a9c(0x228)],_0x585259=$dataSystem[_0x9c5a9c(0x213)][_0x9c5a9c(0x1fd)](_0x528736),_0x36d1b2=_0x585259?_0x3c7a06[_0x9c5a9c(0x257)]:_0x3c7a06[_0x9c5a9c(0x40b)];return _0x9c5a9c(0x4ea)[_0x9c5a9c(0x505)](_0x36d1b2,_0x25fa7e);},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x427)]=function(){const _0x5a0d5e=_0x306dc8;return VisuMZ[_0x5a0d5e(0x39c)]['Settings']['Skills']['CmdTextAlign'];},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x28b)]=function(_0x59fae5){const _0x256e6e=_0x306dc8,_0x545043=this['commandStyleCheck'](_0x59fae5);if(_0x545043===_0x256e6e(0x1fa))this[_0x256e6e(0x1d9)](_0x59fae5);else{if(_0x545043==='icon')_0x256e6e(0x4b4)===_0x256e6e(0x4b4)?this[_0x256e6e(0x4d5)](_0x59fae5):(_0x18207d[_0x256e6e(0x39c)]['Game_Troop_setup']['call'](this,_0xbb4035),this['makeCurrentTroopUniqueID']());else{if(_0x256e6e(0x37f)!==_0x256e6e(0x332))Window_Command[_0x256e6e(0x2d9)]['drawItem']['call'](this,_0x59fae5);else return _0x1cebe6=_0x410c61[_0x256e6e(0x2a8)](-0x2,0x2),_0x4f71b4['SkillsStatesCore']['Game_BattlerBase_buffIconIndex'][_0x256e6e(0x227)](this,_0xe59494,_0x50d7a2);}}},Window_SkillType[_0x306dc8(0x2d9)]['commandStyle']=function(){const _0x153d4f=_0x306dc8;return VisuMZ['SkillsStatesCore'][_0x153d4f(0x346)][_0x153d4f(0x228)]['CmdStyle'];},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x290)]=function(_0x5e65da){const _0x16fd51=_0x306dc8;if(_0x5e65da<0x0)return _0x16fd51(0x323);const _0x32c2d7=this[_0x16fd51(0x37c)]();if(_0x32c2d7!=='auto'){if(_0x16fd51(0x20b)!==_0x16fd51(0x20b))for(let _0x27b3be=0x0;_0x27b3be<this[_0x16fd51(0x3b4)]();_0x27b3be++){if(this[_0x16fd51(0x31a)](_0x27b3be)){const _0x1d3d5e=this[_0x16fd51(0x4c4)][_0x27b3be];this[_0x16fd51(0x477)](_0x27b3be);if(_0x1d3d5e>0x0)this[_0x16fd51(0x4bd)](_0x27b3be);if(_0x1d3d5e<0x0)this[_0x16fd51(0x3be)](_0x27b3be);}}else return _0x32c2d7;}else{if(this[_0x16fd51(0x206)]()>0x0){const _0x21020a=this[_0x16fd51(0x399)](_0x5e65da);if(_0x21020a['match'](/\\I\[(\d+)\]/i)){if('IAykQ'!=='XfJxO'){const _0x478199=this['itemLineRect'](_0x5e65da),_0x303d53=this['textSizeEx'](_0x21020a)[_0x16fd51(0x443)];return _0x303d53<=_0x478199[_0x16fd51(0x443)]?_0x16fd51(0x1fa):_0x16fd51(0x456);}else{if(_0x141673[_0x16fd51(0x3b9)]())_0xf7bbfc=this[_0x16fd51(0x4e5)](_0x27f6ad,_0x229301);this[_0x16fd51(0x255)](_0x306738,_0x4d2a8f,_0x12259c,_0x1ea6a7);}}}}return _0x16fd51(0x323);},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x1d9)]=function(_0xace153){const _0x463cc7=_0x306dc8,_0xad916=this['itemLineRect'](_0xace153),_0x2fc090=this[_0x463cc7(0x399)](_0xace153),_0xb459ee=this[_0x463cc7(0x48c)](_0x2fc090)[_0x463cc7(0x443)];this[_0x463cc7(0x230)](this[_0x463cc7(0x316)](_0xace153));const _0x4d9486=this[_0x463cc7(0x427)]();if(_0x4d9486===_0x463cc7(0x45c))this[_0x463cc7(0x3e7)](_0x2fc090,_0xad916['x']+_0xad916[_0x463cc7(0x443)]-_0xb459ee,_0xad916['y'],_0xb459ee);else{if(_0x4d9486===_0x463cc7(0x1e8)){const _0x5f1eca=_0xad916['x']+Math[_0x463cc7(0x224)]((_0xad916[_0x463cc7(0x443)]-_0xb459ee)/0x2);this[_0x463cc7(0x3e7)](_0x2fc090,_0x5f1eca,_0xad916['y'],_0xb459ee);}else'nsOMR'===_0x463cc7(0x474)?this[_0x463cc7(0x3e7)](_0x2fc090,_0xad916['x'],_0xad916['y'],_0xb459ee):_0x1165aa=_0x31fbbe['max'](_0x5b9741,_0x4af95f);}},Window_SkillType[_0x306dc8(0x2d9)][_0x306dc8(0x4d5)]=function(_0x3a035b){const _0x1ea96f=_0x306dc8;this[_0x1ea96f(0x399)](_0x3a035b)[_0x1ea96f(0x3bd)](/\\I\[(\d+)\]/i);const _0xa5005a=Number(RegExp['$1'])||0x0,_0x2df946=this[_0x1ea96f(0x2ac)](_0x3a035b),_0x3cb0be=_0x2df946['x']+Math['floor']((_0x2df946[_0x1ea96f(0x443)]-ImageManager[_0x1ea96f(0x4f2)])/0x2),_0x1fc9fd=_0x2df946['y']+(_0x2df946[_0x1ea96f(0x423)]-ImageManager[_0x1ea96f(0x3a9)])/0x2;this[_0x1ea96f(0x261)](_0xa5005a,_0x3cb0be,_0x1fc9fd);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x372)]=Window_SkillStatus[_0x306dc8(0x2d9)][_0x306dc8(0x417)],Window_SkillStatus[_0x306dc8(0x2d9)][_0x306dc8(0x417)]=function(){const _0x51820b=_0x306dc8;VisuMZ[_0x51820b(0x39c)]['Window_SkillStatus_refresh'][_0x51820b(0x227)](this);if(this['_actor'])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x306dc8(0x2d9)][_0x306dc8(0x3e5)]=function(){const _0x51411f=_0x306dc8;if(!Imported[_0x51411f(0x211)])return;if(!Imported[_0x51411f(0x367)])return;const _0x53bc25=this['gaugeLineHeight']();let _0x40be33=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x5828a0=this[_0x51411f(0x23b)]-_0x40be33-0x2;if(_0x5828a0>=0x12c){if(_0x51411f(0x250)===_0x51411f(0x36b))this[_0x51411f(0x4d7)](_0x5b0ed0),this[_0x51411f(0x373)](_0x45e32c),this[_0x51411f(0x21d)](_0x41788d);else{const _0x48a142=VisuMZ['CoreEngine'][_0x51411f(0x346)]['Param'][_0x51411f(0x377)],_0x36df7f=Math[_0x51411f(0x224)](_0x5828a0/0x2)-0x18;let _0x4e3a2c=_0x40be33,_0x2db49e=Math[_0x51411f(0x224)]((this['innerHeight']-Math['ceil'](_0x48a142[_0x51411f(0x4aa)]/0x2)*_0x53bc25)/0x2),_0x51bfe8=0x0;for(const _0x513d0b of _0x48a142){_0x51411f(0x493)==='DmVeJ'?(this[_0x51411f(0x237)](_0x4e3a2c,_0x2db49e,_0x36df7f,_0x513d0b),_0x51bfe8++,_0x51bfe8%0x2===0x0?(_0x4e3a2c=_0x40be33,_0x2db49e+=_0x53bc25):_0x4e3a2c+=_0x36df7f+0x18):(_0x1242cb=_0x513287,_0x516665+=_0x46ef10);}}}this[_0x51411f(0x2c7)]();},Window_SkillStatus[_0x306dc8(0x2d9)]['drawExtendedParameter']=function(_0x281820,_0xa61c46,_0x331824,_0x4021de){const _0x57a97d=_0x306dc8,_0xc643bf=this[_0x57a97d(0x26b)]();this['resetFontSettings'](),this[_0x57a97d(0x270)](_0x281820,_0xa61c46,_0x331824,_0x4021de,!![]),this[_0x57a97d(0x45f)](),this[_0x57a97d(0x322)]['fontSize']-=0x8;const _0x49eea1=this[_0x57a97d(0x4f0)]['paramValueByName'](_0x4021de,!![]);this[_0x57a97d(0x322)][_0x57a97d(0x2fc)](_0x49eea1,_0x281820,_0xa61c46,_0x331824,_0xc643bf,_0x57a97d(0x45c));},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x25b)]=Window_SkillList[_0x306dc8(0x2d9)]['includes'],Window_SkillList[_0x306dc8(0x2d9)]['includes']=function(_0x1ab77f){return this['includesSkillsStatesCore'](_0x1ab77f);},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x3de)]=Window_SkillList[_0x306dc8(0x2d9)]['maxCols'],Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x4e9)]=function(){const _0x56495f=_0x306dc8;return SceneManager[_0x56495f(0x47b)]['constructor']===Scene_Battle?VisuMZ[_0x56495f(0x39c)][_0x56495f(0x3de)][_0x56495f(0x227)](this):VisuMZ[_0x56495f(0x39c)][_0x56495f(0x346)][_0x56495f(0x228)]['ListWindowCols'];},VisuMZ['SkillsStatesCore'][_0x306dc8(0x2d0)]=Window_SkillList['prototype'][_0x306dc8(0x1e9)],Window_SkillList['prototype'][_0x306dc8(0x1e9)]=function(_0x3dd7b7){const _0xe54d44=_0x306dc8,_0xbe3e95=this[_0xe54d44(0x4f0)]!==_0x3dd7b7;VisuMZ[_0xe54d44(0x39c)]['Window_SkillList_setActor'][_0xe54d44(0x227)](this,_0x3dd7b7),_0xbe3e95&&(this[_0xe54d44(0x1ed)]&&this[_0xe54d44(0x1ed)][_0xe54d44(0x2c2)]===Window_ShopStatus&&this[_0xe54d44(0x1ed)][_0xe54d44(0x23f)](this[_0xe54d44(0x36c)](0x0)));},Window_SkillList[_0x306dc8(0x2d9)]['setStypeId']=function(_0xe4b3f6){const _0x5a0cd8=_0x306dc8;if(this['_stypeId']===_0xe4b3f6)return;this['_stypeId']=_0xe4b3f6,this['refresh'](),this[_0x5a0cd8(0x2bb)](0x0,0x0);if(this['_statusWindow']&&this[_0x5a0cd8(0x1ed)][_0x5a0cd8(0x2c2)]===Window_ShopStatus){if(_0x5a0cd8(0x279)!==_0x5a0cd8(0x1dc))this[_0x5a0cd8(0x1ed)]['setItem'](this[_0x5a0cd8(0x36c)](0x0));else{const _0x3026b3=_0x38098d['parse']('['+_0x2625a3['$1'][_0x5a0cd8(0x3bd)](/\d+/g)+']');for(const _0x243d3d of _0x3026b3){if(!_0x3988d5[_0x5a0cd8(0x2c9)](_0x243d3d))return!![];}return![];}}},Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x1f0)]=function(_0x57e713){const _0x26db94=_0x306dc8;if(!_0x57e713)return VisuMZ[_0x26db94(0x39c)][_0x26db94(0x25b)][_0x26db94(0x227)](this,_0x57e713);if(!this['checkSkillTypeMatch'](_0x57e713))return![];if(!this[_0x26db94(0x460)](_0x57e713))return![];if(!this[_0x26db94(0x34a)](_0x57e713))return![];return!![];},Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x201)]=function(_0x19215a){const _0x1cf37f=_0x306dc8;return DataManager[_0x1cf37f(0x287)](_0x19215a)[_0x1cf37f(0x1fd)](this[_0x1cf37f(0x2e3)]);},Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x460)]=function(_0x41ded0){const _0x3009bc=_0x306dc8;if(!VisuMZ['SkillsStatesCore']['CheckVisibleBattleNotetags'](this[_0x3009bc(0x4f0)],_0x41ded0))return![];if(!VisuMZ[_0x3009bc(0x39c)][_0x3009bc(0x24c)](this[_0x3009bc(0x4f0)],_0x41ded0))return![];if(!VisuMZ[_0x3009bc(0x39c)][_0x3009bc(0x340)](this[_0x3009bc(0x4f0)],_0x41ded0))return![];return!![];},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x26e)]=function(_0x27c21c,_0x2bb0f5){const _0x125250=_0x306dc8,_0x184adf=_0x2bb0f5['note'];if(_0x184adf[_0x125250(0x3bd)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x125250(0x479)]()){if('RowLB'!==_0x125250(0x4d9))return![];else{if(_0x5ecde1['value'](_0x27d5d9))return!![];}}else{if(_0x184adf[_0x125250(0x3bd)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x125250(0x479)]()){if(_0x125250(0x44c)!==_0x125250(0x3cf))return![];else _0x2409f7[_0x125250(0x39c)][_0x125250(0x22b)][_0x125250(0x227)](this),this[_0x125250(0x1ed)]&&this[_0x125250(0x1ed)][_0x125250(0x2c2)]===_0x727d8b&&this['_statusWindow'][_0x125250(0x23f)](this['item']());}else return!![];}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x24c)]=function(_0x35e088,_0x3a8095){const _0x31e833=_0x306dc8,_0x220cb5=_0x3a8095[_0x31e833(0x324)];if(_0x220cb5['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('GvueQ'!==_0x31e833(0x445)){const _0x1ff1c9=JSON[_0x31e833(0x49e)]('['+RegExp['$1'][_0x31e833(0x3bd)](/\d+/g)+']');for(const _0x306b25 of _0x1ff1c9){if(_0x31e833(0x277)===_0x31e833(0x277)){if(!$gameSwitches[_0x31e833(0x4dc)](_0x306b25))return![];}else{const _0x12de81=_0x36300f[_0x31e833(0x49e)]('['+_0x14f124['$1'][_0x31e833(0x3bd)](/\d+/g)+']');this[_0x31e833(0x409)][_0x4e030e['id']]=this[_0x31e833(0x409)][_0x115b1c['id']][_0x31e833(0x337)](_0x12de81);}}return!![];}else return[];}if(_0x220cb5[_0x31e833(0x3bd)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ImdEP'===_0x31e833(0x285))_0x2afc1f['prototype'][_0x31e833(0x3a8)][_0x31e833(0x227)](this,_0x1c9f73),this[_0x31e833(0x284)](_0x42d426);else{const _0x341ed9=JSON['parse']('['+RegExp['$1'][_0x31e833(0x3bd)](/\d+/g)+']');for(const _0x294a74 of _0x341ed9){if(!$gameSwitches[_0x31e833(0x4dc)](_0x294a74))return![];}return!![];}}if(_0x220cb5[_0x31e833(0x3bd)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe5e63c=JSON[_0x31e833(0x49e)]('['+RegExp['$1'][_0x31e833(0x3bd)](/\d+/g)+']');for(const _0xbc3995 of _0xe5e63c){if($gameSwitches[_0x31e833(0x4dc)](_0xbc3995))return!![];}return![];}if(_0x220cb5[_0x31e833(0x3bd)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x568fe6=JSON[_0x31e833(0x49e)]('['+RegExp['$1'][_0x31e833(0x3bd)](/\d+/g)+']');for(const _0x1405ea of _0x568fe6){if(!$gameSwitches[_0x31e833(0x4dc)](_0x1405ea))return!![];}return![];}if(_0x220cb5[_0x31e833(0x3bd)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xefa9fe=JSON[_0x31e833(0x49e)]('['+RegExp['$1'][_0x31e833(0x3bd)](/\d+/g)+']');for(const _0x12be97 of _0xefa9fe){if(!$gameSwitches['value'](_0x12be97))return!![];}return![];}if(_0x220cb5[_0x31e833(0x3bd)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x31e833(0x482)==='XgAcv'){const _0x17dc32=JSON['parse']('['+RegExp['$1'][_0x31e833(0x3bd)](/\d+/g)+']');for(const _0x1c56d9 of _0x17dc32){if(_0x31e833(0x44f)!==_0x31e833(0x44f)){const _0x43f030=_0x3529ff(_0x3107c2['$1']);if(_0x3d8794['isStateAffected'](_0x43f030))return!![];}else{if($gameSwitches['value'](_0x1c56d9))return![];}}return!![];}else this[_0x31e833(0x1ed)]&&this[_0x31e833(0x1ed)][_0x31e833(0x2c2)]===_0x144614&&this['_statusWindow'][_0x31e833(0x23f)](this[_0x31e833(0x36c)](0x0));}return!![];},VisuMZ['SkillsStatesCore'][_0x306dc8(0x340)]=function(_0x42b412,_0x2ace66){const _0x2e347b=_0x306dc8,_0x5539aa=_0x2ace66[_0x2e347b(0x324)];if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2e347b(0x223)===_0x2e347b(0x508))_0x171f11[_0x2e347b(0x242)]=_0x5cea71(_0x5e1225['$1']);else{const _0x409d7e=JSON[_0x2e347b(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5b697f of _0x409d7e){if(!_0x42b412['isLearnedSkill'](_0x5b697f))return![];}return!![];}}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1f18ce=RegExp['$1']['split'](',');for(const _0x1d0d9c of _0x1f18ce){if(_0x2e347b(0x49c)==='qmDtH'){if(!_0x55d868[_0x2e347b(0x3ac)](_0x45aa67))return![];}else{const _0x2adc7f=DataManager[_0x2e347b(0x428)](_0x1d0d9c);if(!_0x2adc7f)continue;if(!_0x42b412['isLearnedSkill'](_0x2adc7f))return![];}}return!![];}}if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16404e=JSON[_0x2e347b(0x49e)]('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x3e7ed2 of _0x16404e){if(_0x2e347b(0x3c3)===_0x2e347b(0x3c3)){if(!_0x42b412[_0x2e347b(0x2c9)](_0x3e7ed2))return![];}else this[_0x2e347b(0x203)]();}return!![];}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x38d661=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0x89bd2 of _0x38d661){const _0x2f1f74=DataManager[_0x2e347b(0x428)](_0x89bd2);if(!_0x2f1f74)continue;if(!_0x42b412[_0x2e347b(0x2c9)](_0x2f1f74))return![];}return!![];}}if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2e347b(0x328)===_0x2e347b(0x328)){const _0x2d31a5=JSON[_0x2e347b(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x404be4 of _0x2d31a5){if(_0x2e347b(0x4a5)===_0x2e347b(0x4a5)){if(_0x42b412['isLearnedSkill'](_0x404be4))return!![];}else{if(typeof _0x405b68!==_0x2e347b(0x1e0))_0xe6b3d8=_0x3f0d48['id'];this['_stateData']=this['_stateData']||{},this[_0x2e347b(0x335)][_0x94b8d0]={};}}return![];}else{if(!_0x5017c9[_0x2e347b(0x4dc)](_0x1c3267))return![];}}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3827c5=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0x3ed717 of _0x3827c5){if('BbAIm'===_0x2e347b(0x273))return _0x2e347b(0x3a1);else{const _0x24eaf9=DataManager[_0x2e347b(0x428)](_0x3ed717);if(!_0x24eaf9)continue;if(_0x42b412[_0x2e347b(0x2c9)](_0x24eaf9))return!![];}}return![];}}if(_0x5539aa['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2e347b(0x238)===_0x2e347b(0x238)){const _0x235241=JSON[_0x2e347b(0x49e)]('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x1ed057 of _0x235241){if(!_0x42b412[_0x2e347b(0x2c9)](_0x1ed057))return!![];}return![];}else _0xd3d9b4=_0x500dc6(_0x5b99ef['$1']),_0x20d88b=_0x7e0bd6(_0x2c252e['$2']);}else{if(_0x5539aa['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x15c55f=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0x5ed5d9 of _0x15c55f){if(_0x2e347b(0x248)===_0x2e347b(0x21e)){const _0x2df8b2=this[_0x2e347b(0x4e8)]();for(const _0x17c017 of _0x2df8b2){if(_0x17c017&&this['canClearState'](_0x17c017))this[_0x2e347b(0x221)](_0x17c017['id']);}this['_cache']={};}else{const _0x543342=DataManager['getSkillIdWithName'](_0x5ed5d9);if(!_0x543342)continue;if(!_0x42b412[_0x2e347b(0x2c9)](_0x543342))return!![];}}return![];}}if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35a8b2=JSON[_0x2e347b(0x49e)]('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x33cfa1 of _0x35a8b2){if(_0x2e347b(0x3b0)!=='fclCP'){if(!_0x42b412[_0x2e347b(0x2c9)](_0x33cfa1))return!![];}else return!![];}return![];}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3f9abd=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0x56ed00 of _0x3f9abd){if(_0x2e347b(0x1d7)!==_0x2e347b(0x1d7))return this;else{const _0x5b61ee=DataManager[_0x2e347b(0x428)](_0x56ed00);if(!_0x5b61ee)continue;if(!_0x42b412['isLearnedSkill'](_0x5b61ee))return!![];}}return![];}}if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2e347b(0x3fa)===_0x2e347b(0x3fa)){const _0x1dc630=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3603f2 of _0x1dc630){if(_0x42b412[_0x2e347b(0x2c9)](_0x3603f2))return![];}return!![];}else!_0x3132ee[_0x2e347b(0x1fd)](_0x32f046)&&this[_0x2e347b(0x3da)](_0x180dc2,_0x4b1cab,_0x3a207b,_0x5b6bfa),this['drawActorStateData'](_0x39e55e,_0x234a92,_0x34dc28,_0x36a72),_0x25a4b3[_0x2e347b(0x3ec)](_0x4c3d37);}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x149782=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0x3f88b3 of _0x149782){const _0x593b33=DataManager[_0x2e347b(0x428)](_0x3f88b3);if(!_0x593b33)continue;if(_0x42b412[_0x2e347b(0x2c9)](_0x593b33))return![];}return!![];}}if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2e347b(0x34b)!==_0x2e347b(0x391)){const _0x2b1c57=JSON['parse']('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x38ff5d of _0x2b1c57){if(!_0x42b412[_0x2e347b(0x3ac)](_0x38ff5d))return![];}return!![];}else return _0x24b66a[_0x2e347b(0x39c)][_0x2e347b(0x346)][_0x2e347b(0x2b1)][_0x2e347b(0x46d)]['call'](this,_0xa215b2);}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2b75d1=RegExp['$1']['split'](',');for(const _0x4b19ee of _0x2b75d1){if(_0x2e347b(0x4a1)===_0x2e347b(0x431)){const _0x4c94cf=_0xb8f640(_0x1b9a7a['$1']),_0x52e520=_0x2e347b(0x347)[_0x2e347b(0x505)](_0x4c94cf);_0x4ead0c['SkillsStatesCore'][_0x2e347b(0x3db)][_0x2e52b9['id']]=new _0x1a3719(_0x2e347b(0x2be),_0x52e520);}else{const _0x3607bf=DataManager[_0x2e347b(0x428)](_0x4b19ee);if(!_0x3607bf)continue;if(!_0x42b412['hasSkill'](_0x3607bf))return![];}}return!![];}}if(_0x5539aa['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x433b22=JSON[_0x2e347b(0x49e)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x17d35a of _0x433b22){if(!_0x42b412[_0x2e347b(0x3ac)](_0x17d35a))return![];}return!![];}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('yiAnj'!==_0x2e347b(0x2b8)){const _0x126143=RegExp['$1']['split'](',');for(const _0x176f42 of _0x126143){const _0x3c7156=DataManager[_0x2e347b(0x428)](_0x176f42);if(!_0x3c7156)continue;if(!_0x42b412['hasSkill'](_0x3c7156))return![];}return!![];}else this[_0x2e347b(0x42e)](_0x477ef6['id']),this['onExpireState'](_0x3e7351['id']),this[_0x2e347b(0x420)](_0x1106de['id']);}}if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1cf924=JSON[_0x2e347b(0x49e)]('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x4318fc of _0x1cf924){if(_0x42b412[_0x2e347b(0x3ac)](_0x4318fc))return!![];}return![];}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x2e347b(0x2fe)!==_0x2e347b(0x476)){const _0x5047eb=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0x121aec of _0x5047eb){const _0x590348=DataManager[_0x2e347b(0x428)](_0x121aec);if(!_0x590348)continue;if(_0x42b412[_0x2e347b(0x3ac)](_0x590348))return!![];}return![];}else{const _0x1ddd87=_0x6a2234['$1'][_0x2e347b(0x471)](',');for(const _0x388ad4 of _0x1ddd87){const _0x1491d0=_0x34486f['getStypeIdWithName'](_0x388ad4);if(_0x1491d0)this[_0x2e347b(0x409)][_0x59e331['id']][_0x2e347b(0x3ec)](_0x1491d0);}}}}if(_0x5539aa['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2e347b(0x35d)!==_0x2e347b(0x41c)){const _0xbfb104=JSON[_0x2e347b(0x49e)]('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x53b388 of _0xbfb104){if(_0x2e347b(0x31f)!==_0x2e347b(0x31f)){const _0xb27f6d=_0x2f31eb[_0x2e347b(0x49e)]('['+_0x1fd5c5['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0xde1c36 of _0xb27f6d){if(!_0x2765df[_0x2e347b(0x4dc)](_0xde1c36))return![];}return!![];}else{if(!_0x42b412[_0x2e347b(0x3ac)](_0x53b388))return!![];}}return![];}else{const _0x670cad=_0x1c217d[_0x2e347b(0x47b)];if(![_0xe9d5a9,_0x2fa919][_0x2e347b(0x1fd)](_0x670cad[_0x2e347b(0x2c2)]))return _0x27cf1d['menuActor']();}}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x99c10d=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0x35ab80 of _0x99c10d){if(_0x2e347b(0x2ce)===_0x2e347b(0x2ce)){const _0x283dbd=DataManager[_0x2e347b(0x428)](_0x35ab80);if(!_0x283dbd)continue;if(!_0x42b412[_0x2e347b(0x3ac)](_0x283dbd))return!![];}else this[_0x2e347b(0x1ed)]=_0x1e774b,this['callUpdateHelp']();}return![];}}if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6c3ecc=JSON[_0x2e347b(0x49e)]('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x27ff53 of _0x6c3ecc){if(_0x2e347b(0x1cf)!=='opqOm'){if(!_0x42b412[_0x2e347b(0x3ac)](_0x27ff53))return!![];}else{if(_0x3a4874[_0x2e347b(0x4dc)](_0x123d75))return![];}}return![];}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x20482b=RegExp['$1'][_0x2e347b(0x471)](',');for(const _0xa30a4c of _0x20482b){const _0x1c68ec=DataManager[_0x2e347b(0x428)](_0xa30a4c);if(!_0x1c68ec)continue;if(!_0x42b412[_0x2e347b(0x3ac)](_0x1c68ec))return!![];}return![];}}if(_0x5539aa['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54e3da=JSON[_0x2e347b(0x49e)]('['+RegExp['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x79529a of _0x54e3da){if(_0x42b412[_0x2e347b(0x3ac)](_0x79529a))return![];}return!![];}else{if(_0x5539aa[_0x2e347b(0x3bd)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1fb359=RegExp['$1']['split'](',');for(const _0x5d5cf5 of _0x1fb359){if(_0x2e347b(0x282)===_0x2e347b(0x282)){const _0x56b192=DataManager[_0x2e347b(0x428)](_0x5d5cf5);if(!_0x56b192)continue;if(_0x42b412['hasSkill'](_0x56b192))return![];}else{const _0x305eae=_0x161e29[_0x2e347b(0x49e)]('['+_0x24df90['$1'][_0x2e347b(0x3bd)](/\d+/g)+']');for(const _0x18f794 of _0x305eae){if(!_0x20cf11[_0x2e347b(0x4dc)](_0x18f794))return!![];}return![];}}return!![];}}return!![];},Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x34a)]=function(_0x5ddd21){const _0x22df68=_0x306dc8,_0x485e0c=_0x5ddd21[_0x22df68(0x324)],_0x3b0de4=VisuMZ[_0x22df68(0x39c)][_0x22df68(0x3b6)];if(_0x3b0de4[_0x5ddd21['id']])return _0x3b0de4[_0x5ddd21['id']][_0x22df68(0x227)](this,_0x5ddd21);else{if(_0x22df68(0x343)===_0x22df68(0x343))return!![];else{const _0xf726b8=[_0x44839f];for(const _0x373320 of _0x36784c){_0x373320[_0x22df68(0x3bd)](/<REMOVE OTHER (.*) STATES>/i);const _0x5694e4=_0x954474(_0x5ef6d0['$1']);this[_0x22df68(0x4a4)](_0x5694e4,_0xf726b8);}}}},VisuMZ[_0x306dc8(0x39c)][_0x306dc8(0x4d6)]=Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x28b)],Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x28b)]=function(_0xdc8687){const _0x28dc3d=_0x306dc8,_0x3da2e9=this[_0x28dc3d(0x36c)](_0xdc8687),_0x4510a3=_0x3da2e9?_0x3da2e9['name']:'';if(_0x3da2e9)this[_0x28dc3d(0x20a)](_0x3da2e9);VisuMZ[_0x28dc3d(0x39c)]['Window_SkillList_drawItem'][_0x28dc3d(0x227)](this,_0xdc8687);if(_0x3da2e9)_0x3da2e9[_0x28dc3d(0x4ed)]=_0x4510a3;},Window_SkillList[_0x306dc8(0x2d9)]['alterSkillName']=function(_0x1a6d73){const _0x143464=_0x306dc8;if(_0x1a6d73&&_0x1a6d73[_0x143464(0x324)][_0x143464(0x3bd)](/<LIST NAME:[ ](.*)>/i)){if(_0x143464(0x472)!==_0x143464(0x472)){_0x1749b4[_0x143464(0x3bd)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x407c8d=_0x13d494[_0x143464(0x3b2)](_0xd5c420(_0x5ba3e5['$1'])[_0x143464(0x2a3)]()),_0x1a93a9=_0x4893cb(_0x69394b['$2']);_0x407c8d>=0x0&&(_0x591099[_0x143464(0x28a)](_0x407c8d,_0x1a93a9),this[_0x143464(0x1d6)](_0x3e0378));}else{_0x1a6d73[_0x143464(0x4ed)]=String(RegExp['$1'])['trim']();for(;;){if(_0x143464(0x2a0)!=='iygCJ'){if(_0x1a6d73[_0x143464(0x4ed)][_0x143464(0x3bd)](/\\V\[(\d+)\]/gi))_0x1a6d73[_0x143464(0x4ed)]=_0x1a6d73[_0x143464(0x4ed)][_0x143464(0x30d)](/\\V\[(\d+)\]/gi,(_0x3be307,_0x1371a6)=>$gameVariables['value'](parseInt(_0x1371a6)));else break;}else{const _0xee70db=_0x6ca07d[_0x143464(0x39c)][_0x143464(0x1f6)];if(_0xee70db[_0x26b801['id']]&&!_0xee70db[_0x180bc2['id']][_0x143464(0x227)](this,_0x5d32cf))return![];return!![];}}}}},Window_SkillList['prototype'][_0x306dc8(0x32e)]=function(_0x4dffae,_0x202385,_0xd844e8,_0x65ddf2){const _0x28f5f3=_0x306dc8;Window_Base[_0x28f5f3(0x2d9)][_0x28f5f3(0x32e)]['call'](this,this[_0x28f5f3(0x4f0)],_0x4dffae,_0x202385,_0xd844e8,_0x65ddf2);},Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x360)]=function(_0x36c0b3){const _0x48f7cb=_0x306dc8;this[_0x48f7cb(0x1ed)]=_0x36c0b3,this[_0x48f7cb(0x468)]();},VisuMZ['SkillsStatesCore'][_0x306dc8(0x22b)]=Window_SkillList['prototype'][_0x306dc8(0x3f9)],Window_SkillList[_0x306dc8(0x2d9)][_0x306dc8(0x3f9)]=function(){const _0x129ab9=_0x306dc8;VisuMZ[_0x129ab9(0x39c)][_0x129ab9(0x22b)][_0x129ab9(0x227)](this),this[_0x129ab9(0x1ed)]&&this[_0x129ab9(0x1ed)][_0x129ab9(0x2c2)]===Window_ShopStatus&&this['_statusWindow'][_0x129ab9(0x23f)](this[_0x129ab9(0x232)]());};