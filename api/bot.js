require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);

const atendimento = {};

const inicio = (ctx) => {
  const username = ctx.from.username || "usuário sem nome de usuário";
  ctx.reply(
    `Olá ${username}! Vamos começar. Para iniciar, digite qualquer mensagem.`,
    {
      reply_markup: {
        keyboard: [
          ["Falar com atendente"],
          ["Comprar um instrumento"],
          ["Serviço de manutenção"],
          ["Perguntas Frequentes"],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
};

bot.start((ctx) => {
  atendimento[ctx.from.id] = false;
  inicio(ctx);
});

bot.on(message("text"), async (ctx) => {
  if (atendimento[ctx.from.id]) {
    bot.telegram.sendMessage(
      process.env.ATENDENTE_CHAT_ID,
      `Mensagem de ${ctx.from.id} (${ctx.from.username}|${ctx.from.first_name})): ${ctx.message.text}`
    );
    ctx.reply("Sua mensagem foi enviada para um atendente.");
    atendimento[ctx.from.id] = false;
    return;
  }

  switch (ctx.message.text) {
    case "Falar com atendente":
      atendimento[ctx.from.id] = true;
      ctx.reply("Você será conectado com um atendente.");
      break;
    case "Comprar um instrumento":
      ctx.reply("Qual instrumento deseja:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Piano", callback_data: "comp_piano" }],
            [{ text: "Violão", callback_data: "comp_violao" }],
          ],
        },
      });
      break;
    case "Serviço de manutenção":
      ctx.reply("Qual serviço deseja:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Afinar piano", callback_data: "man_afpiano" }],
            [{ text: "Manutenção em baterias", callback_data: "man_batac" }],
          ],
        },
      });
      break;
    case "Perguntas Frequentes":
      ctx.reply(
        `1. Por que o atendente não me respondeu ainda? \nR: A loja é pequena, o atendimento pode demorar.\n\n2. Tem entrega das compras?\nR: Sim, com frete.`
      );
      break;
    default:
      inicio(ctx);
      break;
  }
});

bot.action('comp_piano', (ctx) => {
  ctx.reply("Produto: Piano\nPreço: R$00,00\nMarca: Yamaha");
});

// Outros bot.action como no seu código original...

// Função de exportação para o Vercel
module.exports = (req, res) => {
  bot.handleUpdate(req.body, res);
};
