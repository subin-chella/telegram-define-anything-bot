import { Bot } from "grammy";
import axios from "axios";

const bot = new Bot("*"); // Replace with your bot token

// Reply to any message with definition
bot.on("message", async (ctx) => {
  const username = ctx.from.username;
  const userId = ctx.from.id;

  try {
    const definition = await findDefinition(ctx.message.text);
    ctx.reply(definition);
  } catch (error) {
    console.error("Error:", error);
  }
});

bot.start();

async function findDefinition(word) {
  try {
    const response = await axios.get(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );
    // console.log(response.data)

    let data;
    if(typeof response.data === 'object'){
      data = response.data
    } else {
    data = JSON.parse(response.data);
    }
    

    let allDefinitions = "";

    for (const entry of data) {
      const meanings = entry.meanings;

      for (const meaning of meanings) {
        const definitions = meaning.definitions;

        for (const definition of definitions) {
          const definitionText = definition.definition;
          allDefinitions += definitionText + "\n";
        }
      }
    }

    if (allDefinitions.length > 0) {
      return allDefinitions;
    } else {
      return "No definitions found";
    }
  } catch (error) {

    console.log(error)

    return "No definitions found";
  }
}
