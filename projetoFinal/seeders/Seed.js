/**
 * seed.js  –  Popula a base de dados com dados de demonstração
 *
 * Uso:  node seeders/seed.js
 */

require('dotenv').config({ path: '../.env' });
const bcrypt = require('bcryptjs');
const { sequelize, syncDB, User, Profile, Tweet, Comment, Like, Follow } = require('../models');

const seed = async () => {
  await syncDB();

  // Limpar todas as tabelas pela ordem correta (respeitar FKs)
  console.log('🗑️   A limpar tabelas...');
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await Like.destroy({ truncate: true });
  await Comment.destroy({ truncate: true });
  await Follow.destroy({ truncate: true });
  await Tweet.destroy({ truncate: true });
  await Profile.destroy({ truncate: true });
  await User.destroy({ truncate: true });
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  // ── UTILIZADORES ─────────────────────────────────
  console.log('👤  A criar utilizadores...');
  const hash = pw => bcrypt.hashSync(pw, 10);

  const [admin, alice, bob, carla, duarte] = await User.bulkCreate([
    { username: 'admin',   email: 'admin@xwitter.pt',   password: hash('admin123'),   role: 'admin' },
    { username: 'alice',   email: 'alice@xwitter.pt',   password: hash('alice123'),   role: 'user'  },
    { username: 'bob',     email: 'bob@xwitter.pt',     password: hash('bob123'),     role: 'user'  },
    { username: 'carla',   email: 'carla@xwitter.pt',   password: hash('carla123'),   role: 'user'  },
    { username: 'duarte',  email: 'duarte@xwitter.pt',  password: hash('duarte123'),  role: 'user'  },
  ]);

  // ── PERFIS (1-para-1) ─────────────────────────────
  console.log('📋  A criar perfis...');
  await Profile.bulkCreate([
    { userId: admin.id,  bio: '⚙️ Administrador do sistema.',         location: 'Lisboa'   },
    { userId: alice.id,  bio: '☕ Dev front-end & coffee lover.',      location: 'Porto'    },
    { userId: bob.id,    bio: '🚀 Back-end developer. Node.js fan.',   location: 'Braga'    },
    { userId: carla.id,  bio: '🎨 UI/UX designer & illustrator.',     location: 'Coimbra'  },
    { userId: duarte.id, bio: '📚 Estudante de Engenharia Informática.', location: 'Faro'  },
  ]);

  // ── TWEETS ────────────────────────────────────────
  console.log('🐦  A criar tweets...');
  const tweets = await Tweet.bulkCreate([
    { userId: alice.id,  content: 'Primeiro tweet da plataforma! Olá a todos 👋' },
    { userId: bob.id,    content: 'Node.js + Sequelize é uma combinação poderosa para APIs REST. Recomendo! 🚀' },
    { userId: carla.id,  content: 'A trabalhar num novo design system. Aqui vão alguns sneak peeks em breve 🎨' },
    { userId: duarte.id, content: 'Acabei o trabalho de base de dados às 2 da manhã. Valeu a pena! 😅' },
    { userId: alice.id,  content: 'Dica do dia: usem CSS variables para themes. Torna o código muito mais limpo!' },
    { userId: bob.id,    content: 'JWT + bcrypt é o par perfeito para autenticação. Seguro e simples de implementar.' },
    { userId: admin.id,  content: 'Bem-vindos ao Xwitter! A plataforma está online. 🎉' },
    { userId: carla.id,  content: 'Menos é mais. Um bom design não precisa de decoração excessiva.' },
    { userId: duarte.id, content: 'O Sequelize simplifica muito a gestão de relações entre tabelas. ORM para sempre!' },
    { userId: alice.id,  content: 'Alguém mais viciado em caffeine para escrever código? ☕☕☕' },
  ]);

  // ── COMENTÁRIOS ───────────────────────────────────
  console.log('💬  A criar comentários...');
  await Comment.bulkCreate([
    { userId: bob.id,    tweetId: tweets[0].id, content: 'Bem-vinda! Grande plataforma 🙌' },
    { userId: carla.id,  tweetId: tweets[0].id, content: 'Óptimo! Vemo-nos por aqui então 😊' },
    { userId: alice.id,  tweetId: tweets[1].id, content: 'Concordo! Express + Sequelize = stack perfeita' },
    { userId: duarte.id, tweetId: tweets[1].id, content: 'Estou a usar no meu projeto de faculdade!' },
    { userId: bob.id,    tweetId: tweets[3].id, content: 'Haha conheces bem! Boa sorte com a entrega 💪' },
    { userId: alice.id,  tweetId: tweets[6].id, content: 'Obrigada admin! Boa plataforma 🎉' },
    { userId: carla.id,  tweetId: tweets[5].id, content: 'Importante mesmo! Nunca guardem passwords em plain text.' },
    { userId: duarte.id, tweetId: tweets[8].id, content: 'Sim! As associações do Sequelize são mesmo úteis.' },
  ]);

  // ── LIKES ─────────────────────────────────────────
  console.log('❤️   A criar likes...');
  await Like.bulkCreate([
    { userId: bob.id,    tweetId: tweets[0].id },
    { userId: carla.id,  tweetId: tweets[0].id },
    { userId: duarte.id, tweetId: tweets[0].id },
    { userId: alice.id,  tweetId: tweets[1].id },
    { userId: carla.id,  tweetId: tweets[1].id },
    { userId: alice.id,  tweetId: tweets[6].id },
    { userId: bob.id,    tweetId: tweets[6].id },
    { userId: carla.id,  tweetId: tweets[6].id },
    { userId: duarte.id, tweetId: tweets[6].id },
    { userId: alice.id,  tweetId: tweets[3].id },
    { userId: carla.id,  tweetId: tweets[7].id },
    { userId: bob.id,    tweetId: tweets[8].id },
    { userId: alice.id,  tweetId: tweets[8].id },
  ]);

  // ── FOLLOWS ───────────────────────────────────────
  console.log('👥  A criar follows...');
  await Follow.bulkCreate([
    // alice segue bob, carla, duarte
    { followerId: alice.id,  followedId: bob.id    },
    { followerId: alice.id,  followedId: carla.id  },
    { followerId: alice.id,  followedId: duarte.id },
    // bob segue alice, carla
    { followerId: bob.id,    followedId: alice.id  },
    { followerId: bob.id,    followedId: carla.id  },
    // carla segue alice, bob, duarte
    { followerId: carla.id,  followedId: alice.id  },
    { followerId: carla.id,  followedId: bob.id    },
    { followerId: carla.id,  followedId: duarte.id },
    // duarte segue alice
    { followerId: duarte.id, followedId: alice.id  },
    // todos seguem admin
    { followerId: alice.id,  followedId: admin.id  },
    { followerId: bob.id,    followedId: admin.id  },
    { followerId: carla.id,  followedId: admin.id  },
    { followerId: duarte.id, followedId: admin.id  },
  ]);

  console.log('\n✅  Seed concluído com sucesso!');
  console.log('──────────────────────────────────');
  console.log('   Utilizadores de teste:');
  console.log('   admin   / admin123  (role: admin)');
  console.log('   alice   / alice123');
  console.log('   bob     / bob123');
  console.log('   carla   / carla123');
  console.log('   duarte  / duarte123');
  console.log('──────────────────────────────────\n');

  await sequelize.close();
  process.exit(0);
};

seed().catch(err => {
  console.error('❌  Erro no seed:', err);
  process.exit(1);
});