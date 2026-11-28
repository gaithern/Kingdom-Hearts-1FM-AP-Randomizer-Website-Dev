const trackerConfig = {
  "defaultApiAddress": "http://127.0.0.1:47111",
  "checkForUpdatesEveryMilliseconds": 1000,
  "foundIconSizesToTryInPixels": [26, 22, 18, 15, 12, 10],
  "broadcastWindowSize": { "width": 502, "height": 1230 },

  "catalogFiles": { "locations": "tracker/locations.json", "items": "tracker/items.json" },
  "roomReconnectAfterMilliseconds": 5000,
  "roomGameName": "Kingdom Hearts",
  "roomItemsHandling": 3,
  "archipelagoVersion": { "major": 0, "minor": 6, "build": 0, "class": "Version" },
  "roomRefusalMessages": {
    "InvalidSlot": "Slot not found",
    "InvalidGame": "Wrong game",
    "InvalidPassword": "Wrong password",
    "IncompatibleVersion": "Server too old",
    "InvalidItemsHandling": "Room refused"
  },

  "apItemPlaceholder": 2641230,
  "synthesisLocationType": "Synth",
  "settingsHiddenFromList": ["seed", "slot_name", "starting_items", "remote_location_ids", "synthesis_item_name_byte_arrays", "spell_effectiveness", "spell_mp_costs", "entrance_pairings", "door_destinations"],

  "keybladeChestIcon": "tracker/images/Chest.png",
  "importantMultiworldItem": { "name": "Important item for another player" },

  "worlds": {
    "destiny_islands":    { "name": "Destiny Islands", "category": "Destiny Islands", "worldId": 1, "icon": "tracker/images/Destiny Islands.png", "chestKeyblade": "Oathkeeper", "unlockedByItem": "Destiny Islands" },
    "traverse_town":      { "name": "Traverse Town", "category": "Traverse Town", "worldId": 3, "icon": "tracker/images/Traverse Town KH1.png", "chestKeyblade": "Lionheart" },
    "wonderland":         { "name": "Wonderland", "category": "Wonderland", "worldId": 4, "icon": "tracker/images/Wonderland.png", "chestKeyblade": "Lady Luck", "unlockedByItem": "Wonderland" },
    "deep_jungle":        { "name": "Deep Jungle", "category": "Deep Jungle", "worldId": 5, "icon": "tracker/images/Deep Jungle.png", "chestKeyblade": "Jungle King", "unlockedByItem": "Deep Jungle" },
    "hundred_acre_wood":  { "name": "100 Acre Wood", "category": "100 Acre Wood", "worldId": 6, "icon": "tracker/images/100 Acre Wood.png", "chestKeyblade": "Spellbinder" },
    "agrabah":            { "name": "Agrabah", "category": "Agrabah", "worldId": 8, "icon": "tracker/images/Agrabah.png", "chestKeyblade": "Three Wishes", "unlockedByItem": "Agrabah" },
    "atlantica":          { "name": "Atlantica", "category": "Atlantica", "worldId": 9, "icon": "tracker/images/Atlantica KH1.png", "chestKeyblade": "Crabclaw", "unlockedByItem": "Atlantica" },
    "halloween_town":     { "name": "Halloween Town", "category": "Halloween Town", "worldId": 10, "icon": "tracker/images/Halloween Town.png", "chestKeyblade": "Pumpkinhead", "unlockedByItem": "Halloween Town" },
    "olympus_coliseum":   { "name": "Olympus Coliseum", "category": "Olympus Coliseum", "worldId": 11, "icon": "tracker/images/Olympus Coliseum KH1.png", "chestKeyblade": "Olympia", "unlockedByItem": "Olympus Coliseum" },
    "monstro":            { "name": "Monstro", "category": "Monstro", "worldId": 12, "icon": "tracker/images/Monstro.png", "chestKeyblade": "Wishing Star", "unlockedByItem": "Monstro" },
    "neverland":          { "name": "Neverland", "category": "Neverland", "worldId": 13, "icon": "tracker/images/Neverland KH1.png", "chestKeyblade": "Fairy Harp", "unlockedByItem": "Neverland" },
    "hollow_bastion":     { "name": "Hollow Bastion", "category": "Hollow Bastion", "worldId": 15, "icon": "tracker/images/Hollow Bastion.png", "chestKeyblade": "Divine Rose", "unlockedByItem": "Hollow Bastion" },
    "end_of_the_world":   { "name": "End of the World", "category": "End of the World", "worldId": 16, "icon": "tracker/images/End of the World.png", "chestKeyblade": "Oblivion", "unlockedByItem": "End of the World" },
    "levels":             { "name": "Levels", "category": "Levels", "icon": "tracker/images/Sora's Level.png" },
    "synthesis":          { "name": "Synthesis", "icon": "tracker/images/Synthesis.png" },
    "archipelago":        { "name": "Archipelago", "icon": "tracker/images/Archipelago.png" }
  },

  "importantCheckOptions": [
    { "key": "only_tracked_items_are_important", "name": "Treat untracked items as unimportant", "isOnByDefault": true, "unavailableWhenSettingIs": { "remote_items": "full" }, "unavailableNote": "Not available because this seed's remote items setting is full, so the tracker can't see which of your items are in unchecked locations." },
    { "key": "all_tracked_items_are_important", "name": "Treat all tracked items as important", "isOnByDefault": true, "unavailableWhenSettingIs": { "remote_items": "full" }, "unavailableNote": "Not available because this seed's remote items setting is full, so the tracker can't see which of your items are in unchecked locations." }
  ],

  "cornerIconOptions": [
    { "key": "arts", "name": "Arts", "isOnByDefault": false }
  ],

  "broadcastOptions": [
    { "key": "transparent_background", "name": "Transparent background for broadcast view", "isOnByDefault": false }
  ],

  "mostItemsInARow": 8,

  "itemGroups": [
    { "key": "magic", "name": "Magic", "isOnByDefault": true, "items": [
      { "label": "Fire", "countsItems": ["Progressive Fire"], "icon": "tracker/images/Fire Magic.png", "cornerIconItem": "Fire Arts", "cornerIconOption": "arts", "cornerIcon": "tracker/images/Key Item.png" },
      { "label": "Blizzard", "countsItems": ["Progressive Blizzard"], "icon": "tracker/images/Blizzard Magic.png", "cornerIconItem": "Blizzard Arts", "cornerIconOption": "arts", "cornerIcon": "tracker/images/Key Item.png" },
      { "label": "Thunder", "countsItems": ["Progressive Thunder"], "icon": "tracker/images/Thunder Magic.png", "cornerIconItem": "Thunder Arts", "cornerIconOption": "arts", "cornerIcon": "tracker/images/Key Item.png" },
      { "label": "Cure", "countsItems": ["Progressive Cure"], "icon": "tracker/images/Cure Magic.png", "cornerIconItem": "Cure Arts", "cornerIconOption": "arts", "cornerIcon": "tracker/images/Key Item.png" },
      { "label": "Gravity", "countsItems": ["Progressive Gravity"], "icon": "tracker/images/Gravity Magic.png", "cornerIconItem": "Gravity Arts", "cornerIconOption": "arts", "cornerIcon": "tracker/images/Key Item.png" },
      { "label": "Stop", "countsItems": ["Progressive Stop"], "icon": "tracker/images/Stop Magic.png", "cornerIconItem": "Stop Arts", "cornerIconOption": "arts", "cornerIcon": "tracker/images/Key Item.png" },
      { "label": "Aero", "countsItems": ["Progressive Aero"], "icon": "tracker/images/Aero Magic.png", "cornerIconItem": "Aero Arts", "cornerIconOption": "arts", "cornerIcon": "tracker/images/Key Item.png" }
    ] },
    { "key": "keyblades", "name": "Keyblades", "isOnByDefault": false, "items": [
      { "label": "Keyblades", "countsItems": ["Oathkeeper", "Lionheart", "Lady Luck", "Jungle King", "Spellbinder", "Three Wishes", "Crabclaw", "Pumpkinhead", "Olympia", "Wishing Star", "Fairy Harp", "Divine Rose", "Oblivion"], "icon": "tracker/images/Keyblade.png" }
    ] },
    { "key": "summons", "name": "Summons", "isOnByDefault": true, "items": [
      { "label": "Simba", "countsItems": ["Simba"], "icon": "tracker/images/Simba Summon.png" },
      { "label": "Dumbo", "countsItems": ["Dumbo"], "icon": "tracker/images/Dumbo Summon.png" },
      { "label": "Bambi", "countsItems": ["Bambi"], "icon": "tracker/images/Bambi Summon.png" },
      { "label": "Genie", "countsItems": ["Genie"], "icon": "tracker/images/Genie Summon.png" },
      { "label": "Tinker Bell", "countsItems": ["Tinker Bell"], "icon": "tracker/images/Tinkerbell Summon.png" },
      { "label": "Mushu", "countsItems": ["Mushu"], "icon": "tracker/images/Mushu Summon.png" }
    ] },
    { "key": "items_for_other_players", "name": "Multiworld Items", "isOnByDefault": false, "items": [
      { "label": "Important items found for other players", "countsItems": ["Important item for another player"], "icon": "tracker/images/Archipelago.png" }
    ] },
    { "key": "summon_gems", "name": "Summon Gems", "isOnByDefault": true, "items": [
      { "label": "Earthshine", "countsItems": ["Earthshine"], "icon": "tracker/images/Earthshine.png" },
      { "label": "Naturespark", "countsItems": ["Naturespark"], "icon": "tracker/images/Naturespark.png" },
      { "label": "Watergleam", "countsItems": ["Watergleam"], "icon": "tracker/images/Watergleam.png" },
      { "label": "Fireglow", "countsItems": ["Fireglow"], "icon": "tracker/images/Fireglow.png" }
    ] },
    { "key": "movement", "name": "Movement Abilities", "isOnByDefault": true, "items": [
      { "label": "High Jump", "countsItems": ["High Jump"], "icon": "tracker/images/High Jump.png" },
      { "label": "Glide", "countsItems": ["Progressive Glide"], "icon": "tracker/images/Glide.png" },
      { "label": "Mermaid Kick", "countsItems": ["Mermaid Kick"], "icon": "tracker/images/Mermaid Kick.png" },
      { "label": "Dodge Roll", "countsItems": ["Dodge Roll"], "icon": "tracker/images/Dodge Roll.png" }
    ] },
    { "key": "air_guard_dodge_roll", "name": "Air Guard/Dodge Roll", "isOnByDefault": false, "items": [
      { "label": "Air Guard/Dodge Roll", "countsItems": ["Air Guard/Dodge Roll"], "icon": "tracker/images/Air Guard Dodge Roll.png" }
    ] },
    { "key": "combat_abilities", "name": "Combat Abilities", "isOnByDefault": false, "items": [
      { "label": "Combo Master", "countsItems": ["Combo Master"], "icon": "tracker/images/Combo Master.png" },
      { "label": "Air Combo Plus", "countsItems": ["Air Combo Plus"], "icon": "tracker/images/Air Combo Plus.png" },
      { "label": "Sonic Blade", "countsItems": ["Sonic Blade"], "icon": "tracker/images/Sonic Blade.png" },
      { "label": "Strike Raid", "countsItems": ["Strike Raid"], "icon": "tracker/images/Strike Raid.png" },
      { "label": "Ragnarok", "countsItems": ["Ragnarok"], "icon": "tracker/images/Ragnarok.png" },
      { "label": "Counterattack", "countsItems": ["Counterattack"], "icon": "tracker/images/Counterattack.png" }
    ] },
    { "key": "support_abilities", "name": "Support Abilities", "isOnByDefault": false, "items": [
      { "label": "Guard", "countsItems": ["Guard"], "icon": "tracker/images/Guard.png" },
      { "label": "Leaf Bracer", "countsItems": ["Leaf Bracer"], "icon": "tracker/images/Leaf Bracer.png" },
      { "label": "Second Chance", "countsItems": ["Second Chance"], "icon": "tracker/images/Second Chance.png" },
      { "label": "MP Rage", "countsItems": ["MP Rage"], "icon": "tracker/images/MP Rage.png" }
    ] },
    { "key": "synthesis_materials", "name": "Synthesis Materials", "isOnByDefault": false, "items": [
      { "label": "Mythril", "countsItems": ["Mythril"], "icon": "tracker/images/Mythril.png" },
      { "label": "Orichalcum", "countsItems": ["Orichalcum"], "icon": "tracker/images/Orichalcum.png" }
    ] },
    { "key": "trinities", "name": "Trinities", "isOnByDefault": true, "items": [
      { "label": "Blue Trinity", "countsItems": ["Blue Trinity"], "icon": "tracker/images/Blue Trinity.png" },
      { "label": "Red Trinity", "countsItems": ["Red Trinity"], "icon": "tracker/images/Red Trinity.png" },
      { "label": "Green Trinity", "countsItems": ["Green Trinity"], "icon": "tracker/images/Green Trinity.png" },
      { "label": "Yellow Trinity", "countsItems": ["Yellow Trinity"], "icon": "tracker/images/Yellow Trinity.png" },
      { "label": "White Trinity", "countsItems": ["White Trinity"], "icon": "tracker/images/White Trinity.png" }
    ] },
    { "key": "cups", "name": "Cups", "isOnByDefault": true, "items": [
      { "label": "Phil Cup", "countsItems": ["Phil Cup"], "icon": "tracker/images/Phil Cup.png" },
      { "label": "Pegasus Cup", "countsItems": ["Pegasus Cup"], "icon": "tracker/images/Pegasus Cup.png" },
      { "label": "Hercules Cup", "countsItems": ["Hercules Cup"], "icon": "tracker/images/Hercules Cup.png" }
    ] },
    { "key": "world_key_items", "name": "World Key Items", "isOnByDefault": true, "items": [
      { "label": "Entry Pass", "countsItems": ["Entry Pass"], "icon": "tracker/images/Entry Pass.png" },
      { "label": "Evidence", "countsItems": ["Footprints", "Claw Marks", "Stench", "Antenna"], "icon": "tracker/images/Evidence.png" },
      { "label": "Slides", "countsItems": ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5", "Slide 6"], "icon": "tracker/images/Slides.png" },
      { "label": "Crystal Trident", "countsItems": ["Crystal Trident"], "icon": "tracker/images/Crystal Trident.png" },
      { "label": "Forget-Me-Not", "countsItems": ["Forget-Me-Not"], "icon": "tracker/images/Forget-Me-Not.png" },
      { "label": "Jack-In-The-Box", "countsItems": ["Jack-In-The-Box"], "icon": "tracker/images/Jack in the Box.png" },
      { "label": "Theon Vol. 6", "countsItems": ["Theon Vol. 6"], "icon": "tracker/images/Theon Vol. 6.png" },
      { "label": "Emblem Pieces", "countsItems": ["Emblem Piece (Flame)", "Emblem Piece (Chest)", "Emblem Piece (Statue)", "Emblem Piece (Fountain)"], "iconForEachCombination": "tracker/images/Emblem Pieces/{combination}.png" }
    ] },
    { "key": "collectibles", "name": "Collectibles", "isOnByDefault": true, "items": [
      { "label": "Puppies", "countsItems": ["Puppy"], "icon": "tracker/images/Dalmatians.png", "multiplyCountBySetting": "puppy_value" },
      { "label": "Postcards", "countsItems": ["Postcard"], "icon": "tracker/images/Postcards.png" },
      { "label": "Old Book", "countsItems": ["Old Book"], "icon": "tracker/images/Library Books.png" },
      { "label": "Torn Pages", "countsItems": ["Torn Page"], "icon": "tracker/images/Torn Pages.png" }
    ] },
    { "key": "goal", "name": "Goal", "isOnByDefault": true, "items": [
      { "label": "Lucky Emblems", "countsItems": ["Lucky Emblem"], "icon": "tracker/images/Emblem.png" },
      { "label": "Final Door Key", "countsItems": ["Final Door Key"], "icon": "tracker/images/Twilight Town.png" }
    ] },
    { "key": "destiny_islands", "name": "Destiny Islands", "isOnByDefault": true, "items": [
      { "label": "Raft Materials", "countsItems": ["Raft Materials"], "icon": "tracker/images/Raft Supplies.png" },
      { "label": "Empty Bottle", "countsItems": ["Empty Bottle"], "icon": "tracker/images/Drinking Water.png" }
    ] }
  ],

  "itemsTheGameGivesYou": [
    { "onlyWhenSettingIs": { "end_of_the_world_unlock": "lucky_emblems" }, "whenYouHave": "Lucky Emblem", "howManyFromSetting": "required_lucky_emblems_eotw", "youAlsoGet": ["End of the World"] },
    { "onlyWhenSettingIs": { "final_rest_door_key": "lucky_emblems" }, "whenYouHave": "Lucky Emblem", "howManyFromSetting": "required_lucky_emblems_door", "youAlsoGet": ["Final Door Key"] },
    { "onlyWhenSettingIsOn": "stacking_world_items", "whenYouHave": "Wonderland", "howMany": 2, "youAlsoGet": ["Footprints"] },
    { "onlyWhenSettingIsOn": "stacking_world_items", "whenYouHave": "Olympus Coliseum", "howMany": 2, "youAlsoGet": ["Entry Pass"] },
    { "onlyWhenSettingIsOn": "stacking_world_items", "whenYouHave": "Deep Jungle", "howMany": 2, "youAlsoGet": ["Slide 1"] },
    { "onlyWhenSettingIsOn": "stacking_world_items", "whenYouHave": "Halloween Town", "howMany": 2, "youAlsoGet": ["Forget-Me-Not"] },
    { "onlyWhenSettingIsOn": "stacking_world_items", "whenYouHave": "Halloween Town", "howMany": 2, "youAlsoGet": ["Jack-In-The-Box"] },
    { "onlyWhenSettingIsOn": "stacking_world_items", "whenYouHave": "Atlantica", "howMany": 2, "youAlsoGet": ["Crystal Trident"] },
    { "onlyWhenSettingIsOn": "stacking_world_items", "whenYouHave": "Hollow Bastion", "howMany": 2, "youAlsoGet": ["Theon Vol. 6"] },
    { "onlyWhenSettingIsOn": "halloween_town_key_item_bundle", "whenYouHave": "Forget-Me-Not", "howMany": 1, "youAlsoGet": ["Jack-In-The-Box"] },
    { "onlyWhenSettingIsOn": "slides_bundle", "settingIsOnWhenMissing": true, "whenYouHave": "Slide 1", "howMany": 1, "youAlsoGet": ["Slide 2", "Slide 3", "Slide 4", "Slide 5", "Slide 6"] }
  ]
};
