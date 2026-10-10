const trackerConfig = {
  "defaultApiAddress": "http://127.0.0.1:47111",
  "checkForUpdatesEveryMilliseconds": 1000,
  "foundIconSizesToTryInPixels": [26, 22, 18, 15, 12, 10],
  "broadcastWindowSize": { "width": 502, "height": 1230 },

  "apItemPlaceholder": 2641230,
  "synthesisLocationType": "Synth",
  "settingsHiddenFromList": ["seed", "slot_name", "starting_items", "remote_location_ids", "synthesis_item_name_byte_arrays", "spell_effectiveness", "spell_mp_costs"],

  "keybladeChestIcon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Config/Chest.png",

  "worlds": {
    "destiny_islands":    { "name": "Destiny Islands", "category": "Destiny Islands", "worldId": 1, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Destiny Islands.png", "chestKeyblade": "Oathkeeper", "unlockedByItem": "Destiny Islands", "hiddenWhenSettingIsOff": "destiny_islands" },
    "traverse_town":      { "name": "Traverse Town", "category": "Traverse Town", "worldId": 3, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Traverse Town KH1.png", "chestKeyblade": "Lionheart" },
    "wonderland":         { "name": "Wonderland", "category": "Wonderland", "worldId": 4, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Wonderland.png", "chestKeyblade": "Lady Luck", "unlockedByItem": "Wonderland" },
    "deep_jungle":        { "name": "Deep Jungle", "category": "Deep Jungle", "worldId": 5, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Deep Jungle.png", "chestKeyblade": "Jungle King", "unlockedByItem": "Deep Jungle" },
    "hundred_acre_wood":  { "name": "100 Acre Wood", "category": "100 Acre Wood", "worldId": 6, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/100 Acre Wood.png", "chestKeyblade": "Spellbinder" },
    "agrabah":            { "name": "Agrabah", "category": "Agrabah", "worldId": 8, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Agrabah.png", "chestKeyblade": "Three Wishes", "unlockedByItem": "Agrabah" },
    "atlantica":          { "name": "Atlantica", "category": "Atlantica", "worldId": 9, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Atlantica KH1.png", "chestKeyblade": "Crabclaw", "unlockedByItem": "Atlantica", "hiddenWhenSettingIsOff": "atlantica" },
    "halloween_town":     { "name": "Halloween Town", "category": "Halloween Town", "worldId": 10, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Halloween Town.png", "chestKeyblade": "Pumpkinhead", "unlockedByItem": "Halloween Town" },
    "olympus_coliseum":   { "name": "Olympus Coliseum", "category": "Olympus Coliseum", "worldId": 11, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Olympus Coliseum KH1.png", "chestKeyblade": "Olympia", "unlockedByItem": "Olympus Coliseum" },
    "monstro":            { "name": "Monstro", "category": "Monstro", "worldId": 12, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Monstro.png", "chestKeyblade": "Wishing Star", "unlockedByItem": "Monstro" },
    "neverland":          { "name": "Neverland", "category": "Neverland", "worldId": 13, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Neverland KH1.png", "chestKeyblade": "Fairy Harp", "unlockedByItem": "Neverland" },
    "hollow_bastion":     { "name": "Hollow Bastion", "category": "Hollow Bastion", "worldId": 15, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/Hollow Bastion.png", "chestKeyblade": "Divine Rose", "unlockedByItem": "Hollow Bastion" },
    "end_of_the_world":   { "name": "End of the World", "category": "End of the World", "worldId": 16, "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Worlds/End of the World.png", "chestKeyblade": "Oblivion", "unlockedByItem": "End of the World" },
    "levels":             { "name": "Levels", "category": "Levels", "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/Sora's Level.png" },
    "synthesis":          { "name": "Synthesis", "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/Synthesis.png" },
    "archipelago":        { "name": "Archipelago", "icon": "tracker/images/Archipelago.png" }
  },

  "itemRows": [
    [
      { "label": "Fire", "countsItems": ["Progressive Fire"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Magic/Fire Magic.png" },
      { "label": "Blizzard", "countsItems": ["Progressive Blizzard"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Magic/Blizzard Magic.png" },
      { "label": "Thunder", "countsItems": ["Progressive Thunder"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Magic/Thunder Magic.png" },
      { "label": "Cure", "countsItems": ["Progressive Cure"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Magic/Cure Magic.png" },
      { "label": "Gravity", "countsItems": ["Progressive Gravity"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Magic/Gravity Magic.png" },
      { "label": "Stop", "countsItems": ["Progressive Stop"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Magic/Stop Magic.png" },
      { "label": "Aero", "countsItems": ["Progressive Aero"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Magic/Aero Magic.png" }
    ],
    [
      { "label": "Simba", "countsItems": ["Simba"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Summons/Simba Summon.png" },
      { "label": "Dumbo", "countsItems": ["Dumbo"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Summons/Dumbo Summon.png" },
      { "label": "Bambi", "countsItems": ["Bambi"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Summons/Bambi Summon.png" },
      { "label": "Genie", "countsItems": ["Genie"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Summons/Genie Summon.png" },
      { "label": "Tinker Bell", "countsItems": ["Tinker Bell"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Summons/Tinkerbell Summon.png" },
      { "label": "Mushu", "countsItems": ["Mushu"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Summons/Mushu Summon.png" }
    ],
    [
      { "label": "High Jump", "countsItems": ["High Jump"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/Growth/High Jump.png" },
      { "label": "Glide", "countsItems": ["Progressive Glide"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/Growth/Glide.png" },
      { "label": "Mermaid Kick", "countsItems": ["Mermaid Kick"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/Growth/Mermaid Kick.png" },
      { "label": "Dodge Roll", "countsItems": ["Dodge Roll"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/Growth/Dodge Roll.png" },
      { "label": "Lucky Emblems", "countsItems": ["Lucky Emblem"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Config/Emblem.png" },
      { "label": "Final Door Key", "countsItems": ["Final Door Key"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Config/Keyblade.png" },
      { "label": "Raft Materials (Day 2 and Homecoming)", "countsItems": ["Raft Materials"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Raft Supplies.png" },
      { "label": "Empty Bottle", "countsItems": ["Empty Bottle"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Drinking Water.png" }
    ],
    [
      { "label": "Entry Pass", "countsItems": ["Entry Pass"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Olympus Cups.png" },
      { "label": "Evidence", "countsItems": ["Footprints", "Claw Marks", "Stench", "Antenna"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Evidence.png" },
      { "label": "Slides", "countsItems": ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5", "Slide 6"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Slides.png" },
      { "label": "Crystal Trident", "countsItems": ["Crystal Trident"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Crystal Trident.png" },
      { "label": "Forget-Me-Not", "countsItems": ["Forget-Me-Not"], "icon": "tracker/images/Forget-Me-Not.png" },
      { "label": "Jack-In-The-Box", "countsItems": ["Jack-In-The-Box"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Jack in the Box.png" },
      { "label": "Theon Vol. 6", "countsItems": ["Theon Vol. 6"], "icon": "tracker/images/Theon Vol. 6.png" },
      { "label": "Emblem Pieces", "countsItems": ["Emblem Piece (Flame)", "Emblem Piece (Chest)", "Emblem Piece (Statue)", "Emblem Piece (Fountain)"], "iconForEachCombination": "tracker/images/Emblem Pieces/{combination}.png" }
    ],
    [
      { "label": "Puppies", "countsItems": ["Puppy"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Dalmatians.png", "multiplyCountBySetting": "puppy_value" },
      { "label": "Postcards", "countsItems": ["Postcard"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Postcards.png" },
      { "label": "Old Book", "countsItems": ["Old Book"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Library Books.png" },
      { "label": "Torn Pages", "countsItems": ["Torn Page"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/Torn Pages.png" },
      { "label": "Phil Cup", "countsItems": ["Phil Cup"], "icon": "tracker/images/Phil Cup.png" },
      { "label": "Pegasus Cup", "countsItems": ["Pegasus Cup"], "icon": "tracker/images/Pegasus Cup.png" },
      { "label": "Hercules Cup", "countsItems": ["Hercules Cup"], "icon": "tracker/images/Hercules Cup.png" }
    ],
    [
      { "label": "Blue Trinity", "countsItems": ["Blue Trinity"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Blue Trinity.png" },
      { "label": "Red Trinity", "countsItems": ["Red Trinity"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Red Trinity.png" },
      { "label": "Green Trinity", "countsItems": ["Green Trinity"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Green Trinity.png" },
      { "label": "Yellow Trinity", "countsItems": ["Yellow Trinity"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/Yellow Trinity.png" },
      { "label": "White Trinity", "countsItems": ["White Trinity"], "icon": "https://cdn.jsdelivr.net/gh/Televo/kingdom-hearts-recollection@main/Minimal/Key Items/KH1 Key Items/White Trinity.png" }
    ],
    [
      { "label": "Earthshine", "countsItems": ["Earthshine"], "icon": "tracker/images/Earthshine.png" },
      { "label": "Naturespark", "countsItems": ["Naturespark"], "icon": "tracker/images/Naturespark.png" },
      { "label": "Watergleam", "countsItems": ["Watergleam"], "icon": "tracker/images/Watergleam.png" },
      { "label": "Fireglow", "countsItems": ["Fireglow"], "icon": "tracker/images/Fireglow.png" }
    ]
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
