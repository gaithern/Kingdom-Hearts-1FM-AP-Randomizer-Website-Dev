# Enemy randomizer data

Everything the enemy randomizer page needs lives in this folder. The page reads it at
load time - nothing is baked into `index.html` any more, so editing a file here is
enough to change what the page does. Heartless are named in plain text throughout
(`Shadow`, not `xa_ex_2020`); `heartless.json` is the one place the model names appear.

```
json/
  index.json        the manifest
  heartless.json    the catalogue
  defaults.json     the picks the page starts from
  rooms/            one file per room
```

## `index.json`

The manifest. The page reads this first, because a browser cannot list a folder. Every
path in it is relative to `json/`.

```json
{
  "version": 1,
  "heartless": "heartless.json",
  "defaults": "defaults.json",
  "rooms": [
    { "ard": "al02.ard", "file": "rooms/al02.ard.json",
      "world": "Agrabah", "worldId": 8, "room": "Desert: Cave" }
  ]
}
```

**Adding a room means adding it to `rooms` as well as dropping the file in.** A room
file that is not listed here is never read.

## `heartless.json`

The catalogue, keyed by the plaintext name used everywhere else.

```json
"Shadow (Halloween Town)": {
  "model": "xa_ex_2021.mdls",
  "mset": "xa_ex_2020.mset",
  "charId": 301, "slots": 4, "weight": 3, "halloweenTown": true
}
```

| field | meaning |
| --- | --- |
| `model` | the `.mdls` written into the model slot |
| `mset` | the `.mset` written into the entry’s `msetIndex` slot - not always the model’s own, as above, which is why both are spelled out in full |
| `charId` | the game's internal character id |
| `slots` | how much room the game needs to spawn it; a heartless can only be replaced by one whose `slots` is the same or lower |
| `weight` | rough difficulty, 0-7 |
| `halloweenTown` | true for the Halloween Town re-skin of an existing heartless |

## `defaults.json`

The picks the page starts from, before anyone touches it, and what it falls back to if
stored picks cannot be read. Same shape as a downloaded settings file: a source name
mapped to the list of names it is allowed to become. To change it, set the picks up on
the page, click **Download settings**, and drop the file in here as `defaults.json`.

Anything the game cannot honour is dropped on load, so a stale entry is harmless.
A source left out of `mapping` allows nothing and is never swapped.

## `rooms/<room>.ard.json`

One file per room, named after its `.ard`. An entry is **one enemy and every slot it
occupies**: `mdlsIndex` lists the slots that get its `.mdls`, `msetIndex` the slots
that get its `.mset`.

```json
{
  "ard": "al02.ard",
  "world": "Agrabah",
  "worldId": 8,
  "room": "Desert: Cave",
  "exclude": [],
  "pairs": [
    { "enemy": "Bandit", "mdlsIndex": [12], "msetIndex": [13],
      "randomize": true, "exclude": [] }
  ]
}
```

Almost always that is one of each, side by side. The exception is what the arrays exist
for: a base model and its Halloween Town re-skin are the same heartless with different
textures, so they **share one animation set**, and the set can sit anywhere in the room.
Such an entry carries both model slots and is named for the form the room plays it as:

```json
{ "enemy": "Wight Knight (Halloween Town)", "mdlsIndex": [22, 90], "msetIndex": [23],
  "randomize": true, "exclude": [] }
```

**The named enemy's settings alone decide what the entry may become.** When it is
swapped, the replacement's `.mdls` is written to every `mdlsIndex` slot and its
`.mset` to every `msetIndex` slot - the room simply loads the one model for more than
one spawn point. Writing the slots together is what keeps the room from crashing: a
model rewritten apart from the set it reads is left with nobody's animations.

Five entries in the game span two model slots - two in `nm09`, three in `ew23`. `world`,
`worldId` and `room` are labels only; they are `null` where the room has not been
identified yet.

### `randomize` and `lockedReason`

`"randomize": false` means the build leaves the pair exactly as it is. `lockedReason`
says why:

| reason | what is wrong |
| --- | --- |
| `extramset` | the enemy owns a second animation set elsewhere in the room, so swapping the model would orphan it |
| `variant` | the `msetIndex` slot holds a scripted variant of the enemy's own set (`xa_ex_2020_sora.mset`), which no other enemy has |

Setting one of these back to `"randomize": true` will produce a mod that builds but is
likely to crash or animate wrongly in that room.

### `exclude`

Two lists of plaintext heartless names that must never be **spawned as a replacement**
here, applied on top of the allow-list the page's checkboxes produce:

- the room-level `exclude` blocks a name anywhere in that room
- an entry's `exclude` blocks a name at that one entry, all of its model slots

Use it for placements a heartless would break rather than merely be odd in - a flier
over a pit, something too large for the arena, a room whose script expects the fight to
end. Neither list touches what vanilla already puts in the room, only what may be put
there instead; and neither can allow anything, so a name excluded here stays excluded
however the checkboxes are set.

```json
{
  "exclude": ["Pink Agaricus", "Black Fungi"],
  "pairs": [
    { "enemy": "Shadow", "mdlsIndex": [12], "msetIndex": [13],
      "randomize": true, "exclude": ["Aquatank"] }
  ]
}
```

Excluding every candidate leaves the pair as vanilla; it is never forced into a pick.
