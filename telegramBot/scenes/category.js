const {  Scenes, Composer } = require("telegraf");
const axios = require("axios");

const startStep = new Composer();
startStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data = {};  
    await ctx.reply("Назва:");
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
}); 

const nameStep = new Composer();
nameStep.on("text", async (ctx) => {
  try {
    ctx.wizard.state.data.name = ctx.message.text;
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
    const wizardData=ctx.wizard.state.data
    await ctx.reply(`Назва: ${wizardData.name} \nОпис: ${wizardData.description}  ` )
    await ctx.reply('Дані збережено' ) 
  await axios.post('http://localhost:5000/categories/add', wizardData)  
    return ctx.scene.leave()
     
  } catch (e) {
    console.error(e);
  }
});

const categoryScene = new Scenes.WizardScene(
  "categoryWizard",
  startStep,
  nameStep,
  descriptionStep
);
module.exports = categoryScene;
