require("dotenv").config();

const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Objeto para armazenar o estado de atendimento de cada usuário
const atendimento = {};

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
  atendimento[ctx.from.id] = false;
  inicio(ctx);
});

// Verifica se a mensagem é de texto e registra informações
bot.on(message("text"), async (ctx) => {
  // Verifica se o usuário está em modo de atendimento humano
  if (atendimento[ctx.from.id]) {
    // Envia a mensagem do usuário para o grupo de atendimento (ou para um atendente)
    bot.telegram.sendMessage(
      process.env.ATENDENTE_CHAT_ID, // ID do chat ou grupo dos atendentes
      `Mensagem de ${ctx.from.id} (${ctx.from.username}|${ctx.from.first_name})): ${ctx.message.text}`
    );
    console.log(ctx.from);
    ctx.reply(
      "Sua mensagem foi enviada para um atendente. Ele vai entrar em contato assim que possivel."
    );
    atendimento[ctx.from.id] = false;
    atendimentoAberto[ctx.from.id] = ctx.from;
    return;
  }

  // Responde ao usuário
  switch (ctx.message.text) {
    case "Falar com atendente":
      console.log("Atendimento");
      atendimento[ctx.from.id] = true;
      ctx.reply(
        "Você será conectado com um atendente humano. Digite sua mensagem:"
      );
      break;

    case "Comprar um instrumento":
      console.log("Compra");
      ctx.reply("Qual instrumento deseja:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Piano", callback_data: "comp_piano" }],
            [{ text: "violão", callback_data: "comp_violao" }],
          ],
        },
      });

      break;

    case "Serviço de manutenção":
      console.log("Manutenção");
      /* lista de serviços */
      ctx.reply("Qual serviço deseja:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Afinar piano", callback_data: "man_afpiano" }],
            [{ text: "Manutenção em baterias acusticas", callback_data: "man_batac" }],
          ],
        },
    });
      break;
    case "Perguntas Frequentes":
      console.log("Perguntas");
      /*perguntas frequentes */
      ctx.reply
      (`1.Porque o atendente não me respondeu ainda?
        R: Muitas vezes o atendimento com uma pessoa demora por ser uma loja pequena
        
        2.Tem entrega das compras?
        R:Sim, mas fique atento ao frete `);
      break;

    default:
      inicio(ctx);
      break;
  }
});

bot.action('man_batac', (ctx) => {
    ctx.reply("Aqui esta nosso preço: \n Por: R$:00,00  ", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Comprar", callback_data: "comp_comprar" }],
            [{ text: "Cancelar", callback_data: "comp_cancelar" }],
          ],
        },
      });
    // Insira a lógica para exibir os produtos, como outra lista de botões ou informações
});


bot.action('man_afpiano', (ctx) => {
    ctx.reply("Aqui esta nosso preço: \n Por: R$:00,00  ", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Comprar", callback_data: "comp_comprar" }],
            [{ text: "Cancelar", callback_data: "comp_cancelar" }],
          ],
        },
      });
    // Insira a lógica para exibir os produtos, como outra lista de botões ou informações
});

bot.action('comp_piano', (ctx) => {
    ctx.reply("Aqui esta nosso produtos: \n Por: R$:00,00 \n Marca: Yamaha", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Comprar", callback_data: "comp_comprar" }],
            [{ text: "Cancelar", callback_data: "comp_cancelar" }],
          ],
        },
      });
    // Insira a lógica para exibir os produtos, como outra lista de botões ou informações
});
bot.action('comp_violao', (ctx) => {
    ctx.reply("Aqui esta nosso produtos: \n Por: R$:00,00 \n Marca: Yamaha", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Comprar", callback_data: "comp_comprar" }],
            [{ text: "Cancelar", callback_data: "comp_cancelar" }],
          ],
        },
      });
    // Insira a lógica para exibir os produtos, como outra lista de botões ou informações
});
bot.action('comp_comprar', (ctx) => {
    ctx.reply("Agradecemos a preferencia, caso queria fazer algo mais, basta mandar mensagem");
    // Insira a lógica para exibir os produtos, como outra lista de botões ou informações
});

bot.action('comp_cancelar', (ctx) => {
    ctx.reply("Poxa que pena! Sua compra foi cancelada, se precisar de algo mais, basta mandar mensagem");
    // Insira a lógica para exibir os produtos, como outra lista de botões ou informações
});
// Inicia o bot
bot
  .launch()
  .then(() => console.log("Bot rodando..."))
  .catch((err) => console.error("Falha ao rodar o bot:", err));
