const router = require("express").Router();
const Words = require("./wordsModel");
const { validateWord } = require("./wordsUtils");

/*
 * This route is for adding words to the database in bulk. Expects a JSON array in the following format:
 *
 * [
 *   { word1: definition },
 *   { word2: definition },
 *   ...
 * ]
 */
router.post("/json", (req, res) => {
  const words = req.body;
  let added = 0;
  let skipped = 0;
  words.forEach((pair) => {
    const [wordWithDef] = Object.entries(pair);
    const wordObj = {
      word: wordWithDef[0],
      definition: wordWithDef[1],
    };

    if (validateWord(wordObj)) {
      Words.add(wordObj)
        .then(() => {})
        .catch((err) => {
          console.log(wordObj, err.message);
        });
      added++;
    } else {
      skipped++;
    }
  });

  res.status(201).json({ added, skipped });
});

router.get("/", (req, res) => {
  Words.getApprovedWords()
    .then((possibleWords) => {
      const index = Math.floor(Math.random() * possibleWords.length);
      res.status(200).json({ word: possibleWords[index] });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/unmoderated", (req, res) => {
  Words.getUnmoderatedWord()
    .then((word) => {
      res.status(200).json(word);
    })
    .catch((err) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  Words.update(id, changes)
    .then((word) => {
      res.status(200).json({ updated: word });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id/approve", (req, res) => {
  Words.getById(req.params.id).then((wordObj) => {
    wordObj = {
      ...wordObj,
      moderated: true,
      approved: true,
    };

    Words.update(req.params.id, wordObj)
      .then((word) => {
        res.status(200).json({ word });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});

router.put("/:id/reject", (req, res) => {
  Words.getById(req.params.id).then((wordObj) => {
    wordObj = {
      ...wordObj,
      moderated: true,
      approved: false,
    };

    Words.update(req.params.id, wordObj)
      .then((word) => {
        res.status(200).json({ word });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});

module.exports = router;
