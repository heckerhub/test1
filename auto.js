const mineflayer = require('mineflayer');

// Tạo hàm sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Pixel9957
const Pixel9957 = {
  host: 'minefc.com',
  username: 'Pixel9957',
  version: '1.12.2'
};

let bot = mineflayer.createBot(Pixel9957);

bot.on('login', () => {
  let botSocket = bot._client.socket;
  console.log('Logged in to', botSocket.server ? botSocket.server : botSocket.host);
});

bot.on('spawn', async () => {
  await sleep(2000);
  bot.chat('/login Pixel2214');
  await sleep(2000);
  bot.setQuickBarSlot(0);
  await sleep(2000);
  bot.activateItem(false);
  await sleep(2000);
  bot.on('windowOpen', function(window) {
    bot.clickWindow(29, 0, 0);
  });
  await sleep(2000);
  setInterval(async() => {
    await(19050);
    bot.chat('/kit newbie');
    await(19050);
    bot.chat('/w taolao2214 check var bot');
  }, 19050);
});

bot.on("kicked", reason => console.log(`⛔ ${bot.username} bị kick:`, reason));
bot.on("error", err => console.error(`⚠️ ${bot.username} lỗi:`, err));
bot.on("end", () => console.log(`🔌 ${bot.username} ngắt kết nối.`));
