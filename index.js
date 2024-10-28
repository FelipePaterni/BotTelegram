require("dotenv").config();

const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);

const inicio = (ctx) => {
    const username = ctx.from.username
    ? ctx.from.username
    : "usuário sem nome de usuário";
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


// Inicia o bot com o comando /start
bot.start((ctx) => {
  console.log("Iniciado com /start");
 inicio(ctx);
});

// Verifica se a mensagem é de texto e registra informações
bot.on(message("text"), async (ctx) => {
  // Responde ao usuário
  switch (ctx.message.text) {
    case "Falar com atendente":
      console.log("Atendimento");
      /*  */
      break;

    case "Comprar um instrumento":
      console.log("Compra");
      /*lista de instrumentos */
      break;

    case "Serviço de manutenção":
      console.log("Manutenção");
      /* lista de serviços */
      break;
    case "Perguntas Frequentes":
      console.log("Perguntas");
      /*perguntas frequentes */
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
