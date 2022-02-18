const axios = require("axios");
const { Telegraf, Markup, Scenes, session } = require("telegraf");
require("dotenv").config();
const my_const = require("./const");
const categoryScene = require("./scenes/category.js");
const transactionScene = require("./scenes/transaction.js");

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([categoryScene, transactionScene]);
bot.use(session());
bot.use(stage.middleware());  

bot.start(async (ctx) => {
  try {
    await ctx.reply(
      `Привіт ${
        ctx.message.from.first_name
          ? ctx.message.from.first_name
          : "назнайомець"
      }! \n ${my_const.commands}`
    );
  } catch (e) {
    console.error(e);
  }
});

bot.help((ctx) => ctx.reply(my_const.commands))

bot.command('show', async (ctx) => {
  try {
    await ctx.replyWithHTML('<b>Переглянути</b>', Markup.inlineKeyboard(
      [
        [Markup.button.callback('Категорії', 'btn_1')],
        [Markup.button.callback('Транзакції', 'btn_2')]
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

bot.command("add_category",(ctx) =>  ctx.scene.enter("categoryWizard"));

bot.command("add_transaction",(ctx) =>  ctx.scene.enter("transactionWizard"))

 
bot.action("btn_1", async (ctx) => {
  try {
    const response = await getCategory();
    let str = "",
      list = "",
      i = 0;
    for (let item of response) {
      ++i;
      str = `<b>${i}</b> \n<b>Назва:</b> ${item.name} \n<b>Опис:</b> ${item.description}\n ---------------\n`;
      list += str;
    } 
    await ctx.replyWithHTML(list)
    await ctx.answerCbQuery();
    
  } catch (e) {
    console.error(e);
  }
});
bot.action("btn_2", async (ctx) => {
  try {
    const response = await getTransaction();
    let str = "",
      list = "",
      i = 0;
    for (let item of response) {
      ++i;
      str = `<b>${i}</b> \n<b>Категорія:</b> ${item.category} \n<b>Тип:</b> ${item.type} \n<b>Ціна:</b> ${item.price} грн \n<b>Дата:</b> ${item.date.slice(0, 10)}  \n<b>Опис:</b> ${item.description} \n ---------------\n`;
      list += str;
    } 
    
    await ctx.replyWithHTML(list)
    await ctx.answerCbQuery();
    
  } catch (e) {
    console.error(e);
  }
});

bot.launch();

async function getCategory() {
  const response = await axios.get("http://localhost:5000/categories");
  return response.data;
}
async function getTransaction() {
  const response = await axios.get("http://localhost:5000/transactions");
  return response.data;
}
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
