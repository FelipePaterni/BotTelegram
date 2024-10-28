require("dotenv").config();

const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);

const inicio = (ctx) => {
  ctx.reply("Olá, como posso ajudar:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Suporte", callback_data: "suporte" }],
        [{ text: "FAQ", callback_data: "faq" }],
      ],
    },
  });
};

bot.action("faq", (ctx) => {
  ctx.reply("Aqui estão nossos produtos:");
  // Exibe a lista de produtos ou outras ações
});

// Inicia o bot com o comando /start
bot.start((ctx) => {
  console.log("Iniciado com /start");
  const username = ctx.from.username
    ? ctx.from.username
    : "usuário sem nome de usuário";
  ctx.reply(
    `Olá ${username}! Vamos começar. Para iniciar, digite qualquer mensagem.`,
    {        
      reply_markup: {
        keyboard: [
          [
            "Olá, quais são as opções de ajuda?",
            "Gostaria de comprar um instrumento musical",
          "Gostaria de saber sobre a manutenção de instrumentos musicas"],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
});

// Verifica se a mensagem é de texto e registra informações
bot.on(message("text"), async (ctx) => {
  // Responde ao usuário
  switch (ctx.message.text) {
    case "Gostaria de comprar um instrumento musical":
      console.log("compra");
      /* Lista de instrumentos */
      break;

      case    "Gostaria de saber sobre a manutenção de instrumentos musicas":

      break;    
default:
      inicio(ctx);
      break;
  }
});

// Inicia o bot
bot
  .launch()
  .then(() => console.log("Bot rodando..."))
  .catch((err) => console.error("Falha ao rodar o bot:", err));
