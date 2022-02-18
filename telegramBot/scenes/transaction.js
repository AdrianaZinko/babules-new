const { Markup, Scenes, Composer } = require("telegraf");
const axios = require("axios");

const startStep = new Composer();
startStep.on("text", async (ctx) => {
  try {
    const response = await getCategory();
    const arr = []
     let i = 0;
    for (let item of response) {
      arr.push([Markup.button.callback(item.name, `remote${i}`)]);
      i++;
    }
    ctx.wizard.state.data = {};
    await ctx.reply("Категорія:", Markup.inlineKeyboard(arr));
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const categoryStep = new Composer();
categoryStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.category = ctx.message.text;
    await ctx.reply("Тип:");
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

buttonsCategory();

const typeStep = new Composer();
typeStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.type = ctx.message.text;
    await ctx.reply("Ціна:");
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const priceStep = new Composer();
priceStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.price = ctx.message.text;
    await ctx.reply("Дата(YYYY-MM-DD):");
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});
const dateStep = new Composer();
dateStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.date = new Date(ctx.message.text);
    await ctx.reply("Опис:");
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});
const descriptionStep = new Composer();
descriptionStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.description = ctx.message.text;
    const wizardData = ctx.wizard.state.data;
    await ctx.replyWithHTML(
      `<b>Категорія:</b> ${wizardData.category} \n<b>Тип:</b> ${wizardData.type} \n<b>Ціна:</b> ${wizardData.price} грн \n<b>Дата:</b> ${wizardData.date.toISOString().slice(0, 10)}  \n<b>Опис:</b> ${wizardData.description} `
    );
    await axios.post("http://localhost:5000/transactions/add", wizardData);
    await ctx.reply("Дані збережено");
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});
async function getCategory() {
  const response = await axios.get("http://localhost:5000/categories");
  return response.data;
}

async function buttonsCategory() {
  const response = await getCategory();
  for (let i = 0; i < response.length; i++) {
    categoryStep.action(`remote${i}`, async (ctx) => {
      try {
        ctx.wizard.state.data.category = response[i].name;
        await ctx.answerCbQuery();
        await ctx.reply("Тип:");
        return ctx.wizard.next();
      } catch (e) {
        console.error(e);
      }
    });
  }
}
const transactionScene = new Scenes.WizardScene(
  "transactionWizard",
  startStep,
  categoryStep,
  typeStep,
  priceStep,
  dateStep,
  descriptionStep
);
module.exports = transactionScene;
