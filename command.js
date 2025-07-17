/**
 * === HỆ THỐNG ĐIỀU KHIỂN 33 BOT MINEFLAYER ===
 * Server: minefc.com | Phiên bản: 1.12.2
 * Tên bot: Blite_001 → Blite_033
 *
 * ✅ Các lệnh CMD (sau khi chạy chương trình):
 * - say <tin nhắn>     → Tất cả bot chat trong server
 * - drop               → Quăng toàn bộ vật phẩm
 * - use                → Dùng vật phẩm đang cầm
 * - takeGrass          → Chọn khối "grass" từ menu đã mở
 * - move x y z         → Di chuyển đến tọa độ

 * 📢 Trong server, người chơi `taolao2214` có thể điều khiển bot bằng chat:
 * - !say Hello
 * - !drop
 * - !move 100 64 -40
 */

console.log("🟢 Đang khởi động 33 bot...");
console.log(`📘 HƯỚNG DẪN SỬ DỤNG CMD:
────────────────────────────────────────────
say <tin nhắn>         → Chat trong server
drop                   → Quăng toàn bộ vật phẩm
use                    → Dùng vật phẩm đang cầm
takeGrass              → Lấy khối 'grass' từ menu đang mở
move x y z             → Di chuyển đến tọa độ

📢 Trong server, người chơi taolao2214 có thể điều khiển bot bằng cú pháp:
!say Hello server
────────────────────────────────────────────\n`);

const mineflayer = require("mineflayer");
const { plugin: cmd } = require("mineflayer-cmd");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const { GoalBlock } = goals;

const bots = [];
const controller = "taolao2214"; // Người chơi duy nhất có quyền điều khiển bot qua chat

for (let i = 1; i <= 15; i++) {
  const name = `Blite_0${i}`;
  const bot = mineflayer.createBot({
    username: name,
    host: "minefc.com",
    version: "1.12.2"
  });

  bot.loadPlugin(cmd);
  bot.loadPlugin(pathfinder);
  cmd.allowConsoleInput = true;

  bot.on("spawn", async () => {
    console.log(`[✅ ${bot.username}] đã vào server`);
    setTimeout(() => {
      bot.chat(`/login ${bot.username}2214`);
    }, 5000);
    await(2000);
    bot.setQuickBarSlot(0);
    await(2000);
    bot.activateItem(false);
    await(2000);
    bot.on('windowOpen', function(window) {
      bot.clickWindow(29, 0 ,0);
    });
    await(2000);
    bot.chat('/kit newbie');
    await(2000);
    bot.chat('Bo may la Blite!');
    bot.pathfinder.setMovements(new Movements(bot));
    setInterval(() => {
      bot.chat('/kit newbie');
    }, 47000);
  });

  bot.once("cmd_ready", () => {
    bot.cmd.registerCommand("say", (sender, flags, args) => {
      bot.chat(args.join(" "));
      return Promise.resolve();
    }, "Chat từ bot", "say <tin nhắn>");

    bot.cmd.registerCommand("drop", () => {
      const items = bot.inventory.items();
      return Promise.all(items.map(item => bot.tossStack(item)));
    }, "Quăng toàn bộ vật phẩm", "drop");

    bot.cmd.registerCommand("use", () => {
      bot.activateItem();
      return Promise.resolve();
    }, "Dùng vật phẩm đang cầm", "use");

    bot.cmd.registerCommand("takeGrass", () => {
      const window = bot.currentWindow;
      if (!window) return Promise.reject("⚠️ Chưa mở menu");
      const slotIndex = window.slots.findIndex(item => item && item.name === "grass");
      if (slotIndex === -1) return Promise.reject("⚠️ Không tìm thấy grass");
      bot.clickWindow(slotIndex, 0, 0);
      return Promise.resolve();
    }, "Chọn khối 'grass' trong menu", "takeGrass");

    bot.cmd.registerCommand("move", (sender, flags, args) => {
      const [x, y, z] = args.map(Number);
      if ([x, y, z].some(isNaN)) return Promise.reject("⚠️ Tọa độ không hợp lệ");
      const goal = new GoalBlock(x, y, z);
      bot.pathfinder.setGoal(goal);
      return Promise.resolve();
    }, "Di chuyển đến vị trí", "move <x> <y> <z>");
  });

  bot.on("chat", (username, message) => {
    if (username !== controller) return; // Chỉ người chơi được chỉ định mới có quyền
    if (message.startsWith("!")) {
      const command = message.slice(1);
      bot.cmd.run(username, command);
    }
  });

  bot.on("kicked", reason => console.log(`⛔ ${bot.username} bị kick:`, reason));
  bot.on("error", err => console.error(`⚠️ ${bot.username} lỗi:`, err));
  bot.on("end", () => console.log(`🔌 ${bot.username} ngắt kết nối.`));

  bots.push(bot);
}
