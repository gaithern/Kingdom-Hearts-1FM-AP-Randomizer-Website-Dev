# Enemy randomizer data

Everything the enemy randomizer page needs lives in this folder. The page reads it at
load time — nothing is baked into `index.html` any more, so editing a file here is
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
| `mset` | the `.mset` written into the slot after it — not always the model's own, as above, which is why both are spelled out in full |
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

One file per room, named after its `.ard`. Every pair of indexes in the room that holds
a heartless is listed, whether or not it can be randomized.

```json
{
  "ard": "al02.ard",
  "world": "Agrabah",
  "worldId": 8,
  "room": "Desert: Cave",
  "exclude": [],
  "pairs": [
    {
      "heartless": "Bandit",
      "modelIndex": 12,
      "msetIndex": 13,
      "msetValue": "xa_ex_2090.mset",
      "randomize": true,
      "exclude": []
    }
  ]
}
```

A pair is the two consecutive `.ard` indexes the build rewrites together: `modelIndex`
gets the replacement's `.mdls` and `msetIndex` gets its `.mset`. `msetValue` records
what vanilla has in the second slot, which is what `randomize: false` is usually
explained by.

`world`, `worldId` and `room` are labels only; they are `null` where the room has not
been identified yet.

### `randomize` and `lockedReason`

`"randomize": false` means the build leaves the pair exactly as it is. `lockedReason`
says why:

| reason | what is wrong |
| --- | --- |
| `extramset` | the heartless owns a second animation set elsewhere in the room, so swapping the model would orphan it |
| `layout` | the slot after `modelIndex` is not an `.mset` — it is another `.mdls`, or nothing at all |
| `variant` | the slot after `modelIndex` holds a scripted variant of the heartless's own set (`xa_ex_2020_sora.mset`), which no other heartless has |

Setting one of these back to `"randomize": true` will produce a mod that builds but is
likely to crash or animate wrongly in that room.

### How a pair is drawn

For each pair the build collects everything the heartless there is allowed to become —
the page's checkboxes, minus both `exclude` lists — **adds the heartless already there to
that list**, and picks one at random. Every entry carries the same weight, the original
included, so a pair with 19 candidates keeps what it has one build in twenty and changes
it the other nineteen.

Nothing is weighted by size or difficulty. `slots` decides only *which* heartless are
eligible at all, never how likely one is; `weight` is not used by the page.

Two rules fall out of the list being built that way:

- **Pairs are drawn independently.** Nothing is struck off for being in the room already,
  so a room can end up with several of the same heartless. That is fine — the game loads
  the one model for more than one slot.
- **A pair with nothing available is simply left alone.** Excluding is therefore always
  safe: it can shorten the list, never break the build or force an odd pick.

### `exclude`

Two lists of plaintext heartless names that must never be **spawned as a replacement**
here, applied on top of the allow-list the page's checkboxes produce:

- the room-level `exclude` blocks a name anywhere in that room
- a pair's `exclude` blocks a name at that one pair

Use it for placements a heartless would break rather than merely be odd in — a flier
over a pit, something too large for the arena, a room whose script expects the fight to
end. Neither list touches what vanilla already puts in the room, only what may be put
there instead; and neither can allow anything, so a name excluded here stays excluded
however the checkboxes are set.

```json
{
  "exclude": ["Pink Agaricus", "Black Fungi"],
  "pairs": [
    { "heartless": "Shadow", "modelIndex": 12, "msetIndex": 13,
      "msetValue": "xa_ex_2020.mset", "randomize": true,
      "exclude": ["Aquatank"] }
  ]
}
```

Excluding every candidate leaves the pair as vanilla; it is never forced into a pick.
